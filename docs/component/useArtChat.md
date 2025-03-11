# useArtChat

`useArtChat` 是一个用于管理聊天状态的 Vue Composition API Hook。它提供了一系列方法来管理聊天消息、对话状态等功能。

## 基础用法

通过 `useArtChat` 可以快速实现一个基础的聊天功能。它提供了 `messages` 和 `addMessage` 等基础 API 来管理消息。

### 代码演示

:::demo 使用 `useArtChat` 实现基础的消息发送和展示功能
useArtChat/basic
:::

### API

#### useArtChat 返回值

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| messages | 消息列表 | `Message[]` | `[]` |
| addMessage | 添加一条消息 | `(message: Message) => void` | - |

#### Message 类型
