<script setup lang="ts">
import { ref } from "vue";
import { ElButton, ElIcon, ElMessage } from "element-plus";
import { Promotion } from "@element-plus/icons-vue";
import { Sender } from "@artmate/chat";

const value = ref("");

const submit = () => {
  ElMessage.success("Send message successfully!");
};
</script>

<template>
  <Sender v-model="value" submitType="shiftEnter" placeholder="Press Shift + Enter to send message" @on-submit="submit">
    <template #actions>
      <ElButton circle type="primary" @click="submit">
        <ElIcon color="white">
          <Promotion />
        </ElIcon>
      </ElButton>
    </template>
  </Sender>
</template>

<style lang="scss" scoped></style>
