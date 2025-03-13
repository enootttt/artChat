
# ThoughtChain 思维链

思维链组件用于可视化和追踪 Agent 对 Actions 和 Tools 的调用链。

## 何时使用

* 调试和跟踪复杂 Agent System 中的调用链
* 类似的链式场景中使用

## 代码演示

### 基本

:::demo 基础用法。

thought-chain/basic

:::

### 尺寸

:::demo ThoughtChain 有大、中、小三种尺寸。默认尺寸为中 - `middle`。

thought-chain/size

:::

### 节点状态

:::demo 思维链节点支持配置 `status` 属性来明显的表明当前节点的执行状态

thought-chain/status

:::

### 可折叠的

:::demo 配置 `collapsible` 可开启对思维链节点内容区域的折叠功能

thought-chain/collapsible

:::

### 客制化

:::demo `items` 属性支持灵活的客制化配置，详情参考 `ThoughtChainItem` 定义

thought-chain/customization

:::

### 嵌套使用

:::demo ThoughtChain 组件支持嵌套使用

thought-chain/nested

:::

## API

<!-- 通用属性参考：[通用属性](/docs/react/common-props) -->

### ThoughtChainProps

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| collapsible | 是否可折叠 | boolean \| CollapsibleOptions | - | - |
| classNames | 语义化结构的类名 | Record<'item' \| 'itemHeader' \| 'itemContent' \| 'itemFooter', string> | - | - |
| items | 思维节点集合 | ThoughtChainItem[] | - | - |
| rootClassName | 自定义根类名 | string | - | - |
| size | 尺寸 | 'large' \| 'middle' \| 'small' | 'middle' | - |
| styles | 语义化结构的样式 | Record<'item' \| 'itemHeader' \| 'itemContent' \| 'itemFooter', CSSProperties> | - | - |

### ThoughtChainItem

| 属性        | 说明               | 类型                    | 默认值 | 版本 |
| ----------- | ------------------ | ---------------------- | ------ | ---- |
| description | 思维节点描述       | string         | -      | -    |
| key         | 思维节点唯一标识符 | string                  | -      | -    |
| status    | 思维节点状态    | 'pending' \| 'success' \| 'error' | -  | -    |
| title       | 思维节点标题       | string          | -      | -    |

### Slots
| 插槽名 | 说明 |
| --- | --- |
| icon | 自定义图标内容 |
| content | 自定义内容 |
| extra | 自定义额外操作区域内容 |
| footer | 自定义脚注内容 |

### CollapsibleOptions

| 属性         | 说明                   | 类型                             | 默认值 | 版本 |
| ------------ | ---------------------- | -------------------------------- | ------ | ---- |
| expandedKeys | 当前展开的节点         | string[]                         | -      | -    |
| onExpand     | 展开节点变化的回调函数 | (expandedKeys: string[]) => void | -      | -    |
