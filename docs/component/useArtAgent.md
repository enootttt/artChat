
# useArtAgent 模型调度

用于模型调度的 Agent 钩子。

## 何时使用

与后端模型进行交互，提供抽象数据流。

## 代码演示

### 预设请求

:::demo 我们将 ArtRequest 作为预设请求，仅需配置 `baseURL`、`model` 即可

useArtAgent/preset

:::

### 自定义请求

:::demo 通过定制能力，返回多个推荐内容。

useArtAgent/custom

:::

## API

```ts | pure
type useArtAgent<AgentMessage> = (
  config: ArtAgentConfigPreset | ArtAgentConfigCustom<AgentMessage>,
) => [Agent];
```

### ArtAgentConfigPreset

使用预设协议进行请求，尚未实现协议。

<!-- todo: add dangerouslyApiKey desc link -->
| 属性              | 说明                                                                   | 类型   | 默认值 | 版本 |
| ----------------- | ---------------------------------------------------------------------- | ------ | ------ | ---- |
| baseURL           | 请求服务端地址                                                         | string | -      |      |
| key               | 请求秘钥                                                               | string | -      |      |
| model             | 协议模型                                                               | string | -      |      |
| dangerouslyApiKey | **注意: 🔥 `dangerouslyApiKey` 存在安全风险，对此有详细的[说明](/#)。** | string | -      | -    |

### ArtAgentConfigCustom

自定义请求协议。

| 属性    | 说明                         | 类型      | 默认值 | 版本 |
| ------- | ---------------------------- | --------- | ------ | ---- |
| request | 配置自定义请求，支持流式更新 | RequestFn |        |      |

#### RequestFn

```ts | pure
interface RequestFnInfo<Message> extends Partial<ArtAgentConfigPreset>, AnyObject {
  messages?: Message[];
  message?: Message;
}

export type RequestFn<Message> = (
  info: RequestFnInfo<Message>,
  callbacks: {
    onUpdate: (message: Message) => void;
    onSuccess: (message: Message) => void;
    onError: (error: Error) => void;
  },
) => void;
```

### Agent

| 属性         | 说明                        | 类型          | 版本 |
| ------------ | --------------------------- | ------------- | ---- |
| request      | 调用 `useArtAgent` 配置的请求 | RequestFn     |      |
| isRequesting | 是否正在请求                | () => boolean |      |