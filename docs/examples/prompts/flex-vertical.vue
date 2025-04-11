<script setup lang="ts">
import type { PromptsProps } from '@artmate/chat'
import { Prompts } from '@artmate/chat'
import { CircleCheck, Star, Warning } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'

const items: PromptsProps['items'] = [
  {
    key: 'uuid-6',
    description: 'How to rest effectively after long hours of work?',
    disabled: false,
  },
  {
    key: 'uuid-7',
    description: 'What are the secrets to maintaining a positive mindset?',
    disabled: false,
  },
  {
    key: 'uuid-8',
    description: 'How to stay calm under immense pressure?',
    disabled: false,
  },
]

const iconMap: Record<string, any> = {
  'uuid-6': {
    color: '#964B00',
    icon: CircleCheck,
  },
  'uuid-7': {
    color: '#FAAD14',
    icon: Warning,
  },
  'uuid-8': {
    color: '#FF4D4F',
    icon: Star,
  },
}
</script>

<template>
  <Prompts title="🤔 You might also want to ask:" :items="items" vertical>
    <template #icon="{ info }">
      <ElIcon :color="iconMap[info.key].color">
        <component :is="iconMap[info.key].icon" />
      </ElIcon>
    </template>
  </Prompts>
</template>

<style lang="scss" scoped></style>
