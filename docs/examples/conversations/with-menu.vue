<script setup lang="ts">
import { ref } from "vue";
import { Conversations } from "@artmate/chat";
import type { ConversationsProps } from "@artmate/chat";
import { AddLocation, Aim, AlarmClock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const items: ConversationsProps["items"] = Array.from({ length: 4 }).map((_, index) => ({
  key: `item${index + 1}`,
  label: `Conversation Item ${index + 1}`,
  disabled: index === 3,
}));

const menuConfig: ConversationsProps["menu"] = () => ({
  items: [
    {
      label: "Operation 1",
      icon: AddLocation,
      command: "command1",
    },
    {
      label: "Operation 2",
      icon: Aim,
      command: "command2",
      disabled: true,
    },
    {
      label: "Operation 3",
      icon: AlarmClock,
      command: "command3",
    },
  ],
  onClick: (e) => {
    ElMessage.info(`You clicked ${e.label} - ${e.key}`);
  }
});

const activeKey = ref("item1");
</script>

<template>
  <Conversations v-model:active-key="activeKey" :items="items" :menu="menuConfig" style="width: 300px" />
</template>

<style lang="scss" scoped></style>
