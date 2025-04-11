import type { AnyObject } from '../_util/type'

import { computed, unref } from 'vue'

import ArtRequest from '../artRequest'

export interface ArtAgentConfigPreset {
  baseURL: string
  key: string
  model: string
  dangerouslyApiKey: string
}

interface RequestFnInfo<Message> extends Partial<ArtAgentConfigPreset>, AnyObject {
  messages?: Message[]
  message?: Message
}

export type RequestFn<Message> = (
  info: RequestFnInfo<Message>,
  callbacks: {
    onError: (error: Error) => void
    onSuccess: (message: Message) => void
    onUpdate: (message: Message) => void
  }
) => void

export interface ArtAgentConfigCustom<Message> {
  request?: RequestFn<Message>
}

export type ArtAgentConfig<Message> = ArtAgentConfigCustom<Message> & Partial<ArtAgentConfigPreset>

let uuid = 0

/** This is a wrap class to avoid developer can get too much on origin object */
export class ArtAgent<Message = string> {
  private requestingMap: Record<number, boolean> = {}

  config: ArtAgentConfig<Message>

  public request: RequestFn<Message> = (info, callbacks) => {
    const { request } = this.config
    const { onUpdate, onSuccess, onError } = callbacks

    const id = uuid
    uuid += 1
    this.requestingMap[id] = true

    request?.(info, {
      // Status should be unique.
      // One get success or error should not get more message
      onUpdate: (message) => {
        if (this.requestingMap[id]) {
          onUpdate(message)
        }
      },
      onSuccess: (message) => {
        if (this.requestingMap[id]) {
          onSuccess(message)
          this.finishRequest(id)
        }
      },
      onError: (error) => {
        if (this.requestingMap[id]) {
          onError(error)
          this.finishRequest(id)
        }
      },
    })
  }

  constructor(config: ArtAgentConfig<Message>) {
    this.config = config
  }

  private finishRequest(id: number) {
    delete this.requestingMap[id]
  }

  public isRequesting() {
    return Object.keys(this.requestingMap).length > 0
  }
}

export default function useArtAgent<Message = string>(config: ArtAgentConfig<Message>) {
  const { request, ...restConfig } = config

  const memo = computed(
    () =>
      [
        new ArtAgent<Message>({
          request:
            request! ||
            ArtRequest({
              baseURL: restConfig.baseURL as string,
              model: restConfig.model,
              dangerouslyApiKey: restConfig.dangerouslyApiKey,
            }).create,
          ...restConfig,
        }),
      ] as const,
  )
  return unref(memo)
}
