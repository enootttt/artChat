# Suggestion 快捷指令

用于给予用户快捷提示的组件。

## 何时使用

需要构建一个对话场景下的输入框。

## 代码演示

### 基本

:::demo 基础用法，受控进行状态管理。自定义触发器。

suggestion/basic

:::

### 整行宽度

:::demo 通过 `block` 改为整行展示，`extra` 可用于配置额外信息。

suggestion/block

:::

### 自定义

:::demo 根据输入动态展示建议项的多标签示例。

suggestion/trigger

:::

### SuggestionsProps

| 属性          | 说明                 | 类型                                                | 默认值 | 版本 |
| ------------- | -------------------- | --------------------------------------------------- | ------ | ---- |
| block         | 是否整行宽度         | boolean                                             | false  | -    |
| items         | 建议项列表           | CascaderOption[] \| ((info: T) => CascaderOption[]) | -      | -    |
| open          | 受控打开面板         | boolean                                             | -      | -    |
| rootClassName | 根元素样式类名       | string                                              | -      | -    |
| onSelect      | 选中建议项回调       | (value: string) => void                             | -      | -    |
| onOpenChange  | 面板打开状态变化回调 | (open: boolean) => void                             | -      | -    |

#### onTrigger

```ts | pure
type onTrigger<T> = (info: T | false) => void
```

Suggestion 接受泛型以自定义传递给 `items` renderProps 的参数类型，当传递 `false` 时，则关闭建议面板。

### Suggestions Slots

| 插槽名  | 说明             | 类型                       |
| ------- | ---------------- | -------------------------- |
| default | 用于自定义输入框 | \{ onTrigger, onKeyDown \} |

### CascaderOption

继承自 `CascaderPanel` 的 `options` 属性，用于自定义 `Suggestion` 的 `items`。

| 属性     | 说明           | 类型             | 默认值 | 版本 |
| -------- | -------------- | ---------------- | ------ | ---- |
| children | 子项目         | CascaderOption[] | -      | -    |
| label    | 建议项显示内容 | string           | -      | -    |
| value    | 建议项值       | string           | -      | -    |
