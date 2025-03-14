<script setup lang="ts">
import { ref } from "vue";
import { ElSpace, ElButton, ElIcon, ElMessage } from "element-plus";
import { Promotion, Link, UploadFilled } from "@element-plus/icons-vue";
import { Sender, SenderHeader, Attachment } from "@artmate/chat";

const value = ref("");
const open = ref(true);

const submit = () => {
  ElMessage.success("Send message successfully!");
};
</script>

<template>
  <ElSpace style="width: 100%; height: 300px" fill alignment="end">
    <Sender v-model="value" @on-submit="submit">
      <template #header>
        <SenderHeader title="Attachments" :open="open">
          <template #default>
            <Attachment title="Upload files">
              <template #icon>
                <ElIcon size="50"><UploadFilled /></ElIcon>
              </template>
              <template #title>Upload Sample</template>
              <template #description> Click or drag files to this area to upload </template>
            </Attachment>
          </template>
        </SenderHeader>
      </template>
      <template #prefix>
        <ElButton type="text" @click="open = !open">
          <ElIcon>
            <Link />
          </ElIcon>
        </ElButton>
      </template>
      <template #actions>
        <ElButton circle type="primary" @click="submit">
          <ElIcon color="white">
            <Promotion />
          </ElIcon>
        </ElButton>
      </template>
    </Sender>
  </ElSpace>
</template>

<style lang="scss" scoped></style>
