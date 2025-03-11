<script setup lang="ts">
import { Welcome } from '@artmate/chat';

const welcomeProps = {
  icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*k0oYSZQMoBwAAAAAAAAAAAAADgCCAQ/original',
  title: '欢迎使用 ArtChat',
  description: 'ArtChat 是一个基于 Vue3 的 AI 聊天界面组件库。基于 RICH 设计范式，提供了丰富的组件和功能，帮助你快速构建智能对话界面。',
  extra: '开始体验',
  styles: {
    extra: {
      width: '100px',
      padding: '8px 16px',
      background: '#1677ff',
      color: 'white', 
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer'
    }
  }
} as const;

</script>

<template>
  <div class="variant-demo">
    <!-- 默认变体 -->
    <Welcome v-bind="welcomeProps" variant="filled" />
    
    <!-- 无边框变体 -->
    <Welcome v-bind="welcomeProps" variant="borderless" />
  </div>
</template>

<style scoped>
.variant-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
