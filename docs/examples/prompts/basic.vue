<script setup lang="ts">
import { ElIcon, ElMessage } from "element-plus";
import { Star } from "@element-plus/icons-vue";
import { Prompts } from "@artmate/chat";
import type { PromptsProps } from "@artmate/chat";
const items: PromptsProps["items"] = [
  {
    key: "1",
    label: "Ignite Your Creativity",
    description: "Got any sparks for a new project?",
  },
  {
    key: "2",
    label: "Uncover Background Info",
    description: "Help me understand the background of this topic.",
  },
  {
    key: "3",
    label: "Efficiency Boost Battle",
    description: "How can I work faster and better?",
  },
  {
    key: "4",
    label: "Tell me a Joke",
    description: "Why do not ants get sick? Because they have tiny ant-bodies!",
  },
  {
    key: "5",
    label: "Common Issue Solutions",
    description: "How to solve common issues? Share some tips!",
  },
];

const itemClick = (info: any) => {
  ElMessage.success(`You clicked a prompt: ${info.data.label}`);
};

const colorMap = ["#FFD700", "#1890FF", "#722ED1", "#52C41A", "#FF4D4F"];
</script>

<template>
  <Prompts title="✨ Inspirational Sparks and Marvelous Tips" :items="items" :onItemClick="itemClick">
    <template #icon="{ info }">
      <ElIcon :color="colorMap[Number(info.key) - 1]">
        <Star />
      </ElIcon>
    </template>
  </Prompts>
</template>

<style lang="scss" scoped></style>
