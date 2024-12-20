<script setup lang="ts">
import type { GroupTitleProps } from './interface';

import { useSlots } from 'vue';

import { ElDivider, ElText } from 'element-plus';

const props = defineProps<GroupTitleProps>();

const slots = useSlots();
</script>

<template>
  <ElDivider :content-position="props.direction === 'rtl' ? 'right' : 'left'">
    <ElText v-if="slots.default">
      <slot></slot>
    </ElText>
  </ElDivider>
</template>

<style lang="scss" scoped></style>
