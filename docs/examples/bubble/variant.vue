<script setup lang="ts">
import { Bubble } from '@artmate/chat'
import { ElSpace } from 'element-plus'
</script>

<template>
  <ElSpace direction="vertical" alignment="align-start">
    <Bubble
      variant="filled"
      avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      content="variant: filled"
    />
    <Bubble
      variant="outlined"
      avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      content="variant: outlined"
    />
    <Bubble
      variant="shadow"
      avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      content="variant: shadow"
    />
    <Bubble
      variant="borderless"
      avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      content="variant: borderless"
    />
  </ElSpace>
</template>

<style lang="scss" scoped></style>
