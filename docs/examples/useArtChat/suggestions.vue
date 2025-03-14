<script setup lang="ts">
import { ref, computed, h, shallowRef } from "vue";
import { ElSpace, ElButton, ElIcon, ElAvatar } from "element-plus";
import { Promotion, Service } from "@element-plus/icons-vue";
import { BubbleList, Sender, Prompts, useArtAgent, useArtChat } from "@artmate/chat";
import type { BubbleListProps } from "@artmate/chat";
import SenderLoading from "./loading.vue";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const roles: BubbleListProps["roles"] = {
  user: {
    placement: "end",
  },
  text: {
    placement: "start",
    typing: true,
  },
  suggestion: {
    placement: "start",
    variant: "borderless",
    messageRender: (content) => {
      return h(Prompts, {
        vertical: true,
        icon: shallowRef(Service),
        items: (content as any as string[]).map((text) => ({
          key: text,
          description: text,
        })),
      });
    },
  },
};

type AgentUserMessage = {
  type: "user";
  content: string;
};

type AgentAIMessage = {
  type: "ai";
  content?: string;
  list?: (
    | {
        type: "text";
        content: string;
      }
    | {
        type: "suggestion";
        content: string[];
      }
  )[];
};

type AgentMessage = AgentUserMessage | AgentAIMessage;

type BubbleMessage = {
  role: string;
};

const content = ref("");
const senderLoading = ref(false);

// Agent for request
const [agent] = useArtAgent<AgentMessage>({
  request: async ({ message }, { onSuccess }) => {
    senderLoading.value = true;
    await sleep();

    const { content } = message || {};

    senderLoading.value = false;
    onSuccess({
      type: "ai",
      list: [
        {
          type: "text",
          content: `Do you want?`,
        },
        {
          type: "suggestion",
          content: [`Look at: ${content}`, `Search: ${content}`, `Try: ${content}`],
        },
      ],
    });
  },
});

// Chat messages
const { onRequest, parsedMessages } = useArtChat<AgentMessage, BubbleMessage>({
  agent,
  defaultMessages: [
    {
      id: "init",
      message: {
        type: "ai",
        content: "Hello, what can I do for you?",
      },
      status: "success",
    },
  ],

  requestPlaceholder: {
    type: "ai",
    content: "Waiting...",
  },

  // Convert AgentMessage to BubbleMessage
  parser: (agentMessages) => {
    const list = agentMessages.content ? [agentMessages] : (agentMessages as AgentAIMessage).list;

    return (list || []).map((msg) => ({
      role: msg.type,
      content: msg.content,
    }));
  },
});

const messageList = computed(() => {
  return parsedMessages.value.map(({ id, message, status }) => ({
    key: id,
    loading: status === "loading",
    ...message,
  }));
});

const submit = () => {
  if (!content.value) return;
  onRequest({
    type: "user",
    content: content.value,
  });
  content.value = "";
};
</script>

<template>
  <ElSpace direction="vertical" style="width: 100%" fill>
    <BubbleList :roles="roles" :style="{ maxHeight: '300px' }" :items="messageList">
      <template #avatar="{ info }">
        <ElAvatar :style="info.role === 'suggestion' ? { visibility: 'hidden' } : {}">
          <template v-if="info.role !== 'suggestion'">
            {{ info.role || info.key }}
          </template>
        </ElAvatar>
      </template>
    </BubbleList>
    <Sender v-model="content" :loading="senderLoading">
      <template #actions>
        <ElButton circle type="primary" @click="submit">
          <ElIcon color="white" v-if="!senderLoading">
            <Promotion />
          </ElIcon>
          <ElIcon color="white" size="32" v-else>
            <SenderLoading />
          </ElIcon>
        </ElButton>
      </template>
    </Sender>
  </ElSpace>
</template>
