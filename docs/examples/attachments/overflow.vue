<script setup lang="ts">
import { ref } from "vue";
import { ElSpace, ElSegmented, ElSwitch, ElIcon } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { Attachment } from "@artmate/chat";
import type { AttachmentProps } from "@artmate/chat";
const presetFiles: AttachmentProps["items"] = Array.from({ length: 30 }).map((_, index) => ({
  uid: index,
  name: `file-${index}.jpg`,
  status: "ready",
  thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
}));

const sizeOptions = [
  { value: "wrap", label: "Wrap" },
  { value: "scrollX", label: "Scroll X" },
  { value: "scrollY", label: "Scroll Y" },
];

const overflow = ref<AttachmentProps["overflow"]>("wrap");
const items = ref<AttachmentProps["items"]>(presetFiles);
const disabled = ref(false);

const showData = ref(true);
const dataChange = (value: string | number | boolean) => {
  if (value) {
    items.value = presetFiles;
  } else {
    items.value = [];
  }
};

const FileChange = () => {};
</script>

<template>
  <div>
    <div class="top">
      <ElSegmented v-model="overflow" :options="sizeOptions" style="margin-inline-end: auto" />

      <ElSpace>
        <ElSwitch v-model="showData" @change="dataChange" inline-prompt active-text="Data" inactive-text="Data"></ElSwitch>
        <ElSwitch v-model="disabled" inline-prompt active-text="Disabled" inactive-text="Disabled"></ElSwitch>
      </ElSpace>
    </div>
    <Attachment :overflow="overflow" :items="items" :disabled="disabled" @change="FileChange">
      <template #icon>
        <ElIcon>
          <UploadFilled />
        </ElIcon>
      </template>
      <template #title>Click or Drop files here</template>
      <template #description>Support file type: image, video, audio, document, etc.</template>
    </Attachment>
  </div>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  flex-wrap: wrap;
}
</style>
