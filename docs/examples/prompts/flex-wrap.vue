<script setup lang="ts">
import type { PromptsProps } from '@artmate/chat'
import { Prompts } from '@artmate/chat'
import {
  AddLocation,
  Aim,
  AlarmClock,
  Apple,
  ArrowDown,
  ArrowDownBold,
  ArrowLeft,
  Star,
} from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'

const items: PromptsProps['items'] = [
  {
    key: 'uuid-1',
    description: 'Got any sparks for a new project?',
  },
  {
    key: 'uuid-2',
    description: 'Help me understand the background of this topic.',
  },
  {
    key: 'uuid-3',
    description: 'How to solve common issues? Share some tips!',
  },
  {
    key: 'uuid-4',
    description: 'How can I work faster and better?',
  },
  {
    key: 'uuid-5',
    description: 'What are some tricks for getting tasks done?',
  },
  {
    key: 'uuid-6',
    description: 'How to rest effectively after long hours of work?',
  },
  {
    key: 'uuid-7',
    description: 'What are the secrets to maintaining a positive mindset?',
  },
  {
    key: 'uuid-8',
    description: 'How to stay calm under immense pressure?',
  },
]

const iconMap: Record<string, any> = {
  'uuid-1': {
    color: '#FFD700',
    icon: Star,
  },
  'uuid-2': {
    color: '#1890FF',
    icon: AddLocation,
  },
  'uuid-3': {
    color: '#FF4D4F',
    icon: Aim,
  },
  'uuid-4': {
    color: '#722ED1',
    icon: AlarmClock,
  },
  'uuid-5': {
    color: '#52C41A',
    icon: Apple,
  },
  'uuid-6': {
    color: '#964B00',
    icon: ArrowDown,
  },
  'uuid-7': {
    color: '#FAAD14',
    icon: ArrowDownBold,
  },
  'uuid-8': {
    color: '#FF4D4F',
    icon: ArrowLeft,
  },
}
</script>

<template>
  <Prompts title="✨ Inspirational Sparks and Marvelous Tips" :items="items" wrap>
    <template #icon="{ info }">
      <ElIcon :color="iconMap[info.key].color">
        <component :is="iconMap[info.key].icon" />
      </ElIcon>
    </template>
  </Prompts>
</template>

<style lang="scss" scoped></style>
