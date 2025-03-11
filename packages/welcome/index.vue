<script setup lang="ts">
import { ref, type CSSProperties } from 'vue';
import { ElButton, ElSpace } from 'element-plus';
import type { WelcomeProps, WelcomeEmits } from './interface';

// 定义组件属性
const props = withDefaults(defineProps<WelcomeProps>(), {
  variant: 'filled'
});

// 定义组件事件
defineEmits<WelcomeEmits>();

// 默认欢迎文本
const welcomeText = ref('欢迎使用 ChatUI,这是一个基于 Vue3 的聊天界面组件库。');

</script>

<template>
  <!-- 欢迎页面容器 -->
  <div 
    :class="[
      'welcome-container', 
      `welcome-${variant}`,
      rootClassName
    ]"
  >
    <div class="welcome-content">
      <!-- 左侧图标区域 -->
      <div class="welcome-left">
        <div v-if="$slots.icon || icon" :class="['welcome-icon', classNames?.icon]" :style="styles?.icon">
          <slot name="icon">
            <img v-if="typeof icon === 'string'" :src="icon" alt="welcome icon" />
            <template v-else>{{ icon }}</template>
          </slot>
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div class="welcome-right">
        <!-- 右上角操作区域 -->
        <div v-if="$slots.extra || extra" :class="['welcome-extra', classNames?.extra]" :style="styles?.extra">
          <slot name="extra">
            <ElSpace>{{ extra }}</ElSpace>
          </slot>
        </div>

        <!-- 标题区域 -->
        <div v-if="$slots.title || title" :class="['welcome-title', classNames?.title]" :style="styles?.title">
          <slot name="title">{{ title }}</slot>
        </div>

        <!-- 描述区域 -->
        <div :class="['welcome-description', classNames?.description]" :style="styles?.description">
          <slot name="description">
            {{ description || welcomeText }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./index.scss";


</style>
