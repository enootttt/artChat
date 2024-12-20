<script setup lang="ts">
import type { LoadingProps } from './interface';

withDefaults(defineProps<LoadingProps>(), {
  prefixCls: '',
});
</script>

<template>
  <span :class="`${prefixCls}-dot`">
    <i :key="`item-${1}`" :class="`${prefixCls}-dot-item`"></i>
    <i :key="`item-${2}`" :class="`${prefixCls}-dot-item`"></i>
    <i :key="`item-${3}`" :class="`${prefixCls}-dot-item`"></i>
  </span>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
