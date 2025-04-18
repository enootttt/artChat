# useArtChat 数据管理

配合 Agent hook 进行对话数据管理。

## 何时使用

通过 Agent 进行会话数据管理，并产出供页面渲染使用的数据。

## 代码演示

### 基本

:::demo 基础用法。

useArtChat/basic

:::

### 流式输出

:::demo 使用流式输出更新内容。

useArtChat/stream

:::

### 打断输出

:::demo 打断正在流式输出的内容。

useArtChat/stream-cancel

:::

<!-- ### 多项建议

:::demo 通过定制能力，返回多个推荐内容。

useArtChat/suggestions

::: -->

## API

```ts | pure
type useArtChat<AgentMessage, ParsedMessage = AgentMessage> = (
  config: ArtChatConfig<AgentMessage, ParsedMessage>
) => ArtChatConfigReturnType
```

### ArtChatConfig

| 属性               | 说明                                                                                                                              | 类型                                                        | 默认值 | 版本 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------ | ---- |
| agent              | 通过 `useArtAgent` 生成的 `agent`，当使用 `onRequest` 方法时, `agent` 参数是必需的。                                              | ArtAgent                                                    | -      |      |
| defaultMessages    | 默认展示信息                                                                                                                      | { status, message }[]                                       | -      |      |
| parser             | 将 AgentMessage 转换成消费使用的 ParsedMessage，不设置时则直接消费 AgentMessage。支持将一条 AgentMessage 转换成多条 ParsedMessage | (message: AgentMessage) => BubbleMessage \| BubbleMessage[] | -      |      |
| requestFallback    | 请求失败的兜底信息，不提供则不会展示                                                                                              | AgentMessage \| () => AgentMessage                          | -      |      |
| requestPlaceholder | 请求中的占位信息，不提供则不会展示                                                                                                | AgentMessage \| () => AgentMessage                          | -      |      |

### ArtChatConfigReturnType

| 属性           | 说明                            | 类型                                      | 版本 |
| -------------- | ------------------------------- | ----------------------------------------- | ---- |
| messages       | 当前管理的内容                  | AgentMessages[]                           |      |
| parsedMessages | 经过 `parser` 转译过的内容      | ParsedMessages[]                          |      |
| onRequest      | 添加一条 Message，并且触发请求  | (message) => void                         |      |
| setMessages    | 直接修改 messages，不会触发请求 | (messages: { message, status }[]) => void |      |
