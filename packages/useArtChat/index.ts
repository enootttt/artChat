import { computed, ref } from 'vue';

import { ArtAgent } from '../useArtAgent';
import useSyncState from './useSyncState';

export type SimpleType = boolean | number | object | string;

export type MessageStatus = 'error' | 'loading' | 'local' | 'success';

type RequestPlaceholderFn<Message extends SimpleType> = (
  message: Message,
  info: { messages: Message[] },
) => Message;

type RequestFallbackFn<Message extends SimpleType> = (
  message: Message,
  info: { error: Error; messages: Message[] },
) => Message | Promise<Message>;

export interface MessageInfo<Message extends SimpleType> {
  id: number | string;
  message: Message;
  status: MessageStatus;
}

export type DefaultMessageInfo<Message extends SimpleType> = Partial<
  Omit<MessageInfo<Message>, 'message'>
> &
  Pick<MessageInfo<Message>, 'message'>;

export interface ArtChatConfig<
  AgentMessage extends SimpleType = string,
  BubbleMessage extends SimpleType = AgentMessage,
> {
  agent: ArtAgent<AgentMessage>;

  defaultMessages?: DefaultMessageInfo<AgentMessage>[];

  /** Convert agent message to bubble usage message type */
  parser?: (message: AgentMessage) => BubbleMessage | BubbleMessage[];

  requestFallback?: AgentMessage | RequestFallbackFn<AgentMessage>;
  requestPlaceholder?: AgentMessage | RequestPlaceholderFn<AgentMessage>;
}

export type RequestResultObject<Message> = {
  message: Message | Message[];
  status: MessageStatus;
};

export type RequestResult<Message extends SimpleType> =
  | Message
  | Message[]
  | RequestResultObject<Message>
  | RequestResultObject<Message>[];

export type StandardRequestResult<Message extends SimpleType> = {
  message: Message;
  status?: MessageStatus;
} & Omit<RequestResultObject<Message>, 'message' | 'status'>;

function toArray<T>(item: T | T[]): T[] {
  return Array.isArray(item) ? item : [item];
}

export default function useArtChat<
  AgentMessage extends SimpleType = string,
  ParsedMessage extends SimpleType = AgentMessage,
>(config: ArtChatConfig<AgentMessage, ParsedMessage>) {
  const {
    defaultMessages,
    agent,
    requestFallback,
    requestPlaceholder,
    parser,
  } = config;

  // ========================= Agent Messages =========================
  const idRef = ref(0);

  const [messages, setMessages, getMessages] = useSyncState<
    MessageInfo<AgentMessage>[]
  >(() =>
    (defaultMessages || []).map((info, index) => ({
      id: `default_${index}`,
      status: 'local',
      ...info,
    })),
  );

  const createMessage = (message: AgentMessage, status: MessageStatus) => {
    const msg: MessageInfo<AgentMessage> = {
      id: `msg_${idRef.value}`,
      message,
      status,
    };

    idRef.value += 1;

    return msg;
  };

  // ========================= BubbleMessages =========================
  const parsedMessages = computed(() => {
    const list: MessageInfo<ParsedMessage>[] = [];

    Array.isArray(messages.value) &&
      messages.value.forEach((agentMsg) => {
        const rawParsedMsg = parser
          ? parser(agentMsg.message as AgentMessage)
          : agentMsg.message;
        const bubbleMsgs = toArray(rawParsedMsg as ParsedMessage);

        bubbleMsgs.forEach((bubbleMsg, bubbleMsgIndex) => {
          let key = agentMsg.id;
          if (bubbleMsgs.length > 1) {
            key = `${key}_${bubbleMsgIndex}`;
          }

          list.push({
            id: key,
            message: bubbleMsg,
            status: agentMsg.status,
          });
        });
      });

    return list;
  });

  // ============================ Request =============================
  const getFilteredMessages = (msgs: MessageInfo<AgentMessage>[]) =>
    msgs
      .filter((info) => info.status !== 'loading' && info.status !== 'error')
      .map((info) => info.message);

  // For agent to use. Will filter out loading and error message
  const getRequestMessages = () => {
    return getFilteredMessages(getMessages());
  };

  const onRequest = (message: AgentMessage) => {
    let loadingMsgId: null | number | string = null;

    // Add placeholder message
    setMessages((ori) => {
      let nextMessages: MessageInfo<AgentMessage>[] = [
        ...ori,
        createMessage(message, 'local'),
      ];

      if (requestPlaceholder) {
        let placeholderMsg: AgentMessage;

        // eslint-disable-next-line unicorn/prefer-ternary
        if (typeof requestPlaceholder === 'function') {
          // typescript has bug that not get real return type when use `typeof function` check
          placeholderMsg = (
            requestPlaceholder as RequestPlaceholderFn<AgentMessage>
          )(message, {
            messages: getFilteredMessages(nextMessages),
          });
        } else {
          placeholderMsg = requestPlaceholder;
        }

        const loadingMsg = createMessage(placeholderMsg, 'loading');
        loadingMsgId = loadingMsg.id;

        nextMessages = [...nextMessages, loadingMsg];
      }

      return nextMessages;
    });

    // Request
    let updatingMsgId: null | number | string = null;
    const updateMessage = (message: AgentMessage, status: MessageStatus) => {
      let msg = getMessages().find(
        (info: MessageInfo<AgentMessage>) => info.id === updatingMsgId,
      );

      if (msg) {
        // Update directly
        setMessages((ori) => {
          return ori.map((info: MessageInfo<AgentMessage>) => {
            if (info.id === updatingMsgId) {
              return {
                ...info,
                message,
                status,
              };
            }
            return info;
          });
        });
      } else {
        // Create if not exist
        msg = createMessage(message, status);
        setMessages((ori) => {
          const oriWithoutPending = ori.filter(
            (info: MessageInfo<AgentMessage>) => info.id !== loadingMsgId,
          );
          return [...oriWithoutPending, msg as MessageInfo<AgentMessage>];
        });
        updatingMsgId = msg.id;
      }
      return msg;
    };

    agent.request(
      {
        message,
        messages: getRequestMessages(),
      },
      {
        onUpdate: (message) => {
          updateMessage(message, 'loading');
        },
        onSuccess: (message) => {
          updateMessage(message, 'success');
        },
        onError: async (error: Error) => {
          if (requestFallback) {
            // Update as error
            // typescript has bug that not get real return type when use `typeof function` check
            const fallbackMsg: AgentMessage =
              typeof requestFallback === 'function'
                ? await (requestFallback as RequestFallbackFn<AgentMessage>)(
                    message,
                    {
                      error,
                      messages: getRequestMessages(),
                    },
                  )
                : requestFallback;

            setMessages((ori) => [
              ...ori.filter(
                (info: MessageInfo<AgentMessage>) =>
                  info.id !== loadingMsgId && info.id !== updatingMsgId,
              ),
              createMessage(fallbackMsg, 'error'),
            ]);
          } else {
            // Remove directly
            setMessages((ori) => {
              return ori.filter(
                (info: MessageInfo<AgentMessage>) =>
                  info.id !== loadingMsgId && info.id !== updatingMsgId,
              );
            });
          }
        },
      },
    );
  };

  return {
    onRequest,
    messages,
    parsedMessages,
    setMessages,
  } as const;
}
