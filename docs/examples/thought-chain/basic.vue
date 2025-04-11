<script setup lang="ts">
import type { ThoughtChainProps } from '@artmate/chat'
import { ThoughtChain } from '@artmate/chat'
import { AddLocation } from '@element-plus/icons-vue'
import { ElCard, ElIcon } from 'element-plus'

const items: ThoughtChainProps['items'] = [
  {
    title: 'Thought Chain Item Title',
    description: 'description',
  },
  {
    title: 'Thought Chain Item Title',
    description: 'description',
  },
  {
    title: 'Thought Chain Item Title',
    description: 'description',
  },

  {
    title: 'Thought Chain Item Title',
    description: 'description',
  },
]
</script>

<template>
  <ElCard>
    <ThoughtChain :items="items">
      <template #icon>
        <ElIcon><AddLocation /></ElIcon>
      </template>
    </ThoughtChain>
  </ElCard>
</template>

<style lang="scss" scoped></style>
