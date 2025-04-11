<script setup lang="ts">
import { Bubble } from '@artmate/chat'
</script>

<template>
  <Bubble
    content="你好！"
    avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
  >
    <template #header>我是头部</template>
    <template #footer>我是尾部</template>
  </Bubble>
</template>

<style lang="scss" scoped></style>
