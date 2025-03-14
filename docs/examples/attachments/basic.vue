<script setup lang="ts">
import { ref, computed } from "vue";
import { ElSpace, ElButton, ElIcon, ElMessage, ElSwitch } from "element-plus";
import { Promotion, Link } from "@element-plus/icons-vue";
import { Sender, Attachment } from "@artmate/chat";
import type { AttachmentProps } from "@artmate/chat";
const fullScreenDrop = ref(false);
const divRef = ref<HTMLElement>();

const getDropContainer = computed<() => HTMLElement | null>(() => {
  const el = fullScreenDrop.value ? document.body : (divRef.value as HTMLElement);
  return () => el;
});

const value = ref("");

const FileChange: AttachmentProps["onChange"] = ({ file }) => {
  ElMessage.success(`Mock upload: ${file.name}`);
};
</script>

<template>
  <div ref="divRef">
    <ElSpace direction="vertical" fill style="width: 100%">
      <Sender v-model="value">
        <template #prefix>
          <Attachment :get-drop-container="getDropContainer" @change="FileChange">
            <ElButton text style="padding: 0px 7px">
              <ElIcon size="20">
                <Link />
              </ElIcon>
            </ElButton>
            <template #icon>123</template>
          </Attachment>
        </template>
        <template #actions>
          <ElButton circle type="primary" @click="fullScreenDrop = !fullScreenDrop">
            <ElIcon color="white">
              <Promotion />
            </ElIcon>
          </ElButton>
        </template>
      </Sender>
      <ElSwitch v-model="fullScreenDrop" inline-prompt active-text="Full screen drop" inactive-text="Full screen drop" />
    </ElSpace>
  </div>
</template>

<style lang="scss" scoped></style>
