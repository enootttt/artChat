<script setup lang="ts">
import type { ProgressProps } from './interface';

import { computed } from 'vue';

import { ElProgress } from 'element-plus';

const props = withDefaults(defineProps<ProgressProps>(), {});

const size = computed(() => {
  const wh = 30;
  return {
    width: `${wh * 2}px`,
    height: `${wh * 2}px`,
  };
});
</script>

<template>
  <ElProgress :percentage="props.percent" :style="{ ...size }" type="circle">
    <span style="color: #fff">{{ `${(props.percent || 0).toFixed(0)}%` }}</span>
  </ElProgress>
</template>

<style lang="scss" scoped></style>
