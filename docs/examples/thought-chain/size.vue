<script setup lang="ts">
import { ref } from "vue";
import { ElAvatar, ElCard, ElRadioGroup, ElRadioButton } from "element-plus";
import { ThoughtChain } from "@artmate/chat";
import type { ThoughtChainProps, SizeType } from "@artmate/chat";

const items: ThoughtChainProps["items"] = [
  {
    key: "1",
    title: "Thought Chain Item Title",
    description: "description",
  },
  {
    key: "2",
    title: "Thought Chain Item Title",
    description: "description",
  },
  {
    key: "3",
    title: "Thought Chain Item Title",
    description: "description",
  },

  {
    key: "4",
    title: "Thought Chain Item Title",
    description: "description",
  },
];

const size = ref<SizeType>('middle');
</script>

<template>
  <ElCard>
    <ElRadioGroup v-model="size" style="margin-bottom: 16px;">
      <ElRadioButton label="Small" value="small">Small</ElRadioButton>
      <ElRadioButton label="Middle" value="middle">Middle</ElRadioButton>
      <ElRadioButton label="Large" value="large">Large</ElRadioButton>
    </ElRadioGroup>
    <ThoughtChain :items="items" :size="size">
      <template #icon="{ info }">
        <ElAvatar style="width: 100%; height: 100%;">
          {{ info.key }}
        </ElAvatar>
      </template>
    </ThoughtChain>
  </ElCard>
</template>

<style lang="scss" scoped></style>
