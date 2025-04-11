# ArtRequest 请求

## 何时使用

- 向符合 OpenAI 标准的 LLM 发起请求。

## 代码演示

### 基础

:::demo 该示例说明如何使用 ArtRequest 对符合 OpenAI 标准的 LLM 发起 fetch 请求 ，请拷贝代码且在 DEV 环境用实际的值替换 BASE_URL, PATH, MODEL, API_KEY 来使用

ArtRequest/basic

:::

### 自定义转换器

:::demo 为 `ArtRequest` 配置自定义的 `transformStream`

ArtRequest/custom-transformer

:::

## API

### ArtRequestOptions

<!-- todo: add dangerouslyApiKey decs link  -->

| 属性              | 描述                                                                    | 类型   | 默认值 | 版本 |
| ----------------- | ----------------------------------------------------------------------- | ------ | ------ | ---- |
| baseURL           | API 请求的基础 URL                                                      | string | -      | -    |
| model             | 模型名称，例如 'gpt-3.5-turbo'                                          | string | -      | -    |
| dangerouslyApiKey | **注意: 🔥 `dangerouslyApiKey` 存在安全风险，对此有详细的[说明](/#)。** | string | -      | -    |
| fetch             | 可选的自定义 fetch 函数，用于发起请求                                   | fetch  | -      | -    |

### ArtRequestFunction

```ts
type ArtRequestFunction<Input = Record<PropertyKey, any>, Output = Record<string, string>> = (
  params: ArtRequestParams & Input,
  callbacks: ArtRequestCallbacks<Output>,
  transformStream?: ArtStreamOptions<Output>['transformStream']
) => Promise<void>
```

#### ArtRequestParams

| 属性     | 描述                                   | 类型                       | 默认值 | 版本 |
| -------- | -------------------------------------- | -------------------------- | ------ | ---- |
| model    | 生成响应时使用的模型。                 | string                     | -      | -    |
| messages | 消息对象数组，每个对象包含角色和内容。 | Record<PropertyKey, any>[] | -      | -    |
| stream   | 指示是否使用流式响应。                 | boolean                    | false  | -    |

#### ArtRequestCallbacks

| 属性            | 描述                           | 类型                                          | 默认值 | 版本 |
| --------------- | ------------------------------ | --------------------------------------------- | ------ | ---- |
| onSuccess       | 成功时的回调。                 | `(messages: Output[]) => void`                | -      | -    |
| onError         | 错误处理的回调。               | `(error: Error) => void`                      | -      | -    |
| onUpdate        | 消息更新的回调。               | `(message: Output) => void`                   | -      | -    |
| transformStream | 可选的转换函数，用于处理流数据 | `ArtStreamOptions<Output>['transformStream']` | -      | -    |
