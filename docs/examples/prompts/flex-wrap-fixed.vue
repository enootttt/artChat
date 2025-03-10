<script setup lang="ts">
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
</script>

<template>
  <Prompts title="✨ Inspirational Sparks and Marvelous Tips" :items="items" wrap :styles="{ item: { flex: 'none', width: 'calc(50% - 6px)' } }" />
</template>

<style lang="scss" scoped></style>
