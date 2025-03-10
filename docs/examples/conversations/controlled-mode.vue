<script setup lang="ts">
import { ref } from "vue";
import { ElButton, ElSpace } from "element-plus";
import { Conversations } from "@artmate/chat";
import type { ConversationsProps } from "@artmate/chat";
const items: ConversationsProps["items"] = Array.from({ length: 3 }).map((_, index) => ({
  key: `item${index + 1}`,
  label: `Conversation Item ${index + 1}`,
}));

const activeKey = ref("item1");
const updateActiveKey = (v: string) => (activeKey.value = v);
</script>

<template>
  <Conversations v-model:active-key="activeKey" :items="items" style="width: 300px" />
  <ElSpace>
    <ElButton type="primary" @click="updateActiveKey('item1')">Active First</ElButton>
    <ElButton type="primary" @click="updateActiveKey('item3')">Active Last</ElButton>
  </ElSpace>
</template>

<style lang="scss" scoped></style>
