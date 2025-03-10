<script setup lang="ts">
import { ElIcon } from "element-plus";
import { CircleCheck, Warning } from "@element-plus/icons-vue";
import { Prompts } from "@artmate/chat";
import type { PromptsProps } from "@artmate/chat";
const items: PromptsProps["items"] = [
  {
    key: "uuid-5",
    label: "Task Completion Secrets",
    description: "What are some tricks for getting tasks done?",
    disabled: true,
  },
  {
    key: "uuid-6",
    label: "Time for a Coffee Break",
    description: "How to rest effectively after long hours of work?",
  },
];

const iconMap: Record<string, any> = {
  "uuid-5": {
    color: "#52C41A",
    icon: CircleCheck,
  },
  "uuid-6": {
    color: "#964B00",
    icon: Warning,
  },
};
</script>

<template>
  <Prompts title="✨ Inspirational Sparks and Marvelous Tips" :items="items">
    <template #icon="{ info }">
      <ElIcon :color="iconMap[info.key].color">
        <component :is="iconMap[info.key].icon"></component>
      </ElIcon>
    </template>
  </Prompts>
</template>

<style lang="scss" scoped></style>
