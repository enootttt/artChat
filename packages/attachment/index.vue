<script setup lang="ts">
import type { UploadFile } from 'element-plus';

import type { Attachment, AttachmentProps } from './interface';

import { computed, ref, useSlots } from 'vue';

import FileList from '../fileList/index.vue';
import { useNamespace } from '../hooks/useNamespace';
import DropArea from './DropArea.vue';
import PlaceholderUploader from './PlaceholderUploader.vue';
import SilentUploader from './silentUploader.vue';

const props = withDefaults(defineProps<AttachmentProps>(), {
  items: () => [],
});

defineOptions({
  name: 'Attachment',
})

const ns = useNamespace('attachment');

const slots = useSlots();

const CurrentRef = ref<InstanceType<typeof PlaceholderUploader>>();
const uploadRef = ref<InstanceType<typeof SilentUploader>>();
const containerRef = ref<HTMLElement>();

const fileList = ref(props.items);

const triggerChange = (uploadFile: UploadFile, uploadFiles: UploadFile[]) => {
  const info = {
    file: uploadFile,
    fileList: uploadFiles,
  };
  fileList.value = uploadFiles;
  props.onChange?.(info);
};

const mergedUploadProps = computed(() => ({
  ...props.uploadProps,
  fileList: fileList.value,
  onChange: triggerChange,
}));

const onItemRemove = (item: Attachment) => {
  const newFileList = fileList.value.filter(
    (fileItem) => fileItem.uid !== item.uid,
  );
  triggerChange(item, newFileList);
};

const hasFileList = computed(() => {
  return fileList.value.length > 0;
});

defineExpose({
  ref: CurrentRef.value,
  nativeElement: containerRef.value,
  upload: (file: UploadFile) => {
    const fileInput: HTMLInputElement = (
      uploadRef.value?.$el as HTMLElement
    ).querySelector<HTMLInputElement>('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file as any);
      fileInput.files = dataTransfer.files;
      fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  },
});
</script>

<template>
  <template v-if="slots.default">
    <SilentUploader
      ref="uploadRef"
      :disabled="props.disabled"
      :root-class-name="props.rootClassName"
      :upload="mergedUploadProps"
    >
      <slot></slot>
    </SilentUploader>
    <DropArea
      :class-name="props.rootClassName"
      :disabled="props.disabled"
      :get-drop-container="props.getDropContainer"
    >
      <PlaceholderUploader
        ref="CurrentRef"
        :class-name="props.classNames?.placeholder"
        :disabled="props.disabled"
        :upload="mergedUploadProps"
        type="drop"
      />
    </DropArea>
  </template>
  <div
    v-else
    ref="containerRef"
    :class="[
      ns.b(),
      props.direction === 'rtl' && [ns.b('rtl')],
      props.className,
      props.rootClassName,
    ]"
    :dir="props.direction || 'ltr'"
    :style="props.rootStyle"
  >
    <FileList
      :disabled="props.disabled"
      :item-class-name="props.classNames?.item"
      :item-style="props.styles?.item"
      :items="fileList"
      :list-class-name="props.classNames?.list"
      :list-style="{
        ...props.styles?.list,
        display: !hasFileList ? 'none' : '',
      }"
      :on-remove="onItemRemove"
      :overflow="props.overflow"
      :upload="mergedUploadProps"
    />
    <PlaceholderUploader
      ref="uploadRef"
      :class-name="props.classNames?.placeholder"
      :disabled="props.disabled"
      :style="hasFileList ? { display: 'none' } : {}"
      :upload="mergedUploadProps"
      type="inline"
    >
      <template #icon>
        <slot name="icon"></slot>
      </template>
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #description>
        <slot name="description"></slot>
      </template>
    </PlaceholderUploader>
    <DropArea
      :disabled="props.disabled"
      :get-drop-container="props.getDropContainer || (() => containerRef!)"
    >
      <PlaceholderUploader
        ref="CurrentRef"
        :class-name="props.classNames?.placeholder"
        :disabled="props.disabled"
        :upload="mergedUploadProps"
        type="drop"
      >
        <template #icon>
          <slot></slot>
        </template>
        <template #title>
          <slot name="title"></slot>
        </template>
        <template #description>
          <slot name="description"></slot>
        </template>
      </PlaceholderUploader>
    </DropArea>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
