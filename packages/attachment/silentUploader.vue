<script setup lang="ts">
import type { SilentUploaderProps } from './interface';

import { ref } from 'vue';

import { ElUpload } from 'element-plus';

const props = withDefaults(defineProps<SilentUploaderProps>(), {});
const uploadRef = ref<InstanceType<typeof ElUpload>>();

defineExpose({
  uploadRef,
});
</script>

<template>
  <ElUpload
    :auto-upload="false"
    :show-file-list="false"
    action="#"
    v-bind="props.upload"
    ref="uploadRef"
    :class="props.rootClassName"
  >
    <slot></slot>
  </ElUpload>
</template>

<style lang="scss" scoped></style>
