<script setup lang="ts">
import type { PlaceholderUploaderProps } from './interface';

import { ref } from 'vue';

import { ElUpload } from 'element-plus';

import { useNamespace } from '../hooks/useNamespace';

const props = withDefaults(defineProps<PlaceholderUploaderProps>(), {
  disabled: false,
});

const ns = useNamespace('attachment-placeholder');

const dragIn = ref(false);
const uploadRef = ref<InstanceType<typeof ElUpload>>();

const onDragEnter = () => {
  dragIn.value = true;
};
const onDragLeave = (e: DragEvent) => {
  if (
    !(e.currentTarget as HTMLElement).contains(e.relatedTarget as HTMLElement)
  ) {
    dragIn.value = false;
  }
};
const onDrop = () => {
  dragIn.value = false;
};

defineExpose({
  uploadRef,
});
</script>

<template>
  <div
    :aria-hidden="disabled"
    :class="[
      ns.b(),
      { [ns.b('drag-in')]: dragIn, [ns.b('disabled')]: disabled },
      className,
    ]"
    :style="style"
    @drag="onDrop"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
  >
    <ElUpload
      :auto-upload="false"
      :class="[ns.b('upload-wrapper')]"
      :show-file-list="false"
      action="#"
      drag
      v-bind="props.upload"
      ref="uploadRef"
    >
      <div :class="[ns.b('inner')]">
        <div :class="[ns.b('icon')]">
          <slot name="icon"></slot>
        </div>
        <div :class="[ns.b('title')]">
          <slot name="title"></slot>
        </div>
        <div :class="[ns.b('description')]">
          <slot name="description"></slot>
        </div>
      </div>
    </ElUpload>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
