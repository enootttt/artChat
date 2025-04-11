<script setup lang="ts">
import type { ConversationsProps } from '@artmate/chat'
import { Conversations } from '@artmate/chat'
import { ref } from 'vue'

const items: ConversationsProps['items'] = Array.from({ length: 4 }).map((_, index) => ({
  key: `item${index + 1}`,
  label: `Conversation Item ${index + 1}`,
  disabled: index === 3,
  group: index === 3 ? 'Group2' : 'Group1',
}))

const activeKey = ref('item1')
</script>

<template>
  <Conversations v-model:active-key="activeKey" :items="items" groupable style="width: 300px" />
</template>

<style lang="scss" scoped></style>
