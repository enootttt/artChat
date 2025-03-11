# Welcome 欢迎页

Welcome 组件用于展示一个美观的欢迎页面,可以包含图标、标题、描述文本和操作区域等内容。

## 何时使用

- 需要展示应用的欢迎页面时
- 需要展示产品介绍或功能引导页面时
- 需要一个简洁优雅的着陆页时

## 代码演示

### 基础用法

基础的欢迎页面,展示了图标、标题、描述文本和操作按钮。

:::demo 通过设置 icon、title、description 和 extra 属性来自定义欢迎页的各个部分。

welcome/basic

:::

## API

### WelcomeProps

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 各部分的自定义类名 | Record<'icon' \| 'title' \| 'description' \| 'extra', string> | - | - |
| description | 描述文本 | string \| number | - | - |
| extra | 额外的操作区域内容 | string \| number \| JSX.Element | - | - |
| icon | 图标内容 | string \| JSX.Element | - | - |
| rootClassName | 根元素类名 | string | - | - |
| styles | 各部分的自定义样式 | Record<'icon' \| 'title' \| 'description' \| 'extra', CSSProperties> | - | - |
| title | 标题文本 | string \| number | - | - |
| variant | 组件变体类型 | 'filled' \| 'borderless' | 'filled' | - |

### Welcome Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| start | 开始使用按钮点击事件 | () => void |
| click-icon | 点击图标事件 | () => void |
| click-title | 点击标题事件 | () => void |

### Welcome Slots

| 插槽名 | 说明 |
| --- | --- |
| icon | 自定义图标内容 |
| title | 自定义标题内容 |
| description | 自定义描述内容 |
| extra | 自定义额外操作区域内容 |
