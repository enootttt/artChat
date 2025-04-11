<script setup lang="ts">
import type { BubbleDataType } from '@artmate/chat'
import { Bubble } from '@artmate/chat'
import { ElSpace } from 'element-plus'

const sharedLongTextProps: BubbleDataType = {
  placement: 'end',
  content:
    'This is a long text message to show the multiline view of the bubble component. '.repeat(3),
  styles: { content: { maxWidth: 500 } },
}
</script>

<template>
  <ElSpace direction="vertical" alignment="align-start">
    <Bubble content="shape: default" />
    <Bubble v-bind="sharedLongTextProps" />
    <Bubble shape="round" content="shape: round" />
    <Bubble v-bind="sharedLongTextProps" shape="round" />
    <Bubble shape="corner" content="shape: corner" />
    <Bubble v-bind="sharedLongTextProps" shape="corner" />
  </ElSpace>
</template>

<style lang="scss" scoped></style>
