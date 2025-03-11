import type { CSSProperties } from 'vue';

// Welcome 组件属性接口定义
export interface WelcomeProps {
  // 各部分的自定义类名
  classNames?: Partial<Record<'icon' | 'title' | 'description' | 'extra', string>>;
  // 描述文本
  description?: string | number;
  // 额外的操作区域内容
  extra?: string | number | JSX.Element;
  // 图标内容
  icon?: string | JSX.Element;
  // 根元素类名
  rootClassName?: string;
  // 各部分的自定义样式
  styles?: Partial<Record<'icon' | 'title' | 'description' | 'extra', CSSProperties>>;
  // 标题文本
  title?: string | number;
  // 组件变体类型
  variant?: 'filled' | 'borderless';
}

// Welcome 组件事件接口定义
export interface WelcomeEmits {
  // 开始使用按钮点击事件
  (e: 'start'): void;
  // 点击图标事件
  (e: 'click-icon'): void;
  // 点击标题事件
  (e: 'click-title'): void;
}
