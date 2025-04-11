<script setup lang="ts">
import { Bubble } from '@artmate/chat'
import { ElSwitch } from 'element-plus'
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <Bubble
    content="hello world！"
    avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    :loading="loading"
  />
  loding state：
  <ElSwitch v-model="loading" />
</template>

<style lang="scss" scoped></style>
