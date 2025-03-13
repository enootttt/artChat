<script setup lang="ts">
import { ElCard, ElAvatar } from "element-plus";
import { ThoughtChain } from "@artmate/chat";
import type { ThoughtChainProps } from "@artmate/chat";

const items: ThoughtChainProps["items"] = [
  {
    key: "1",
    title: "Click me to expand the content",
    description: "Collapsible",
    content: [
      `In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.`,
      `After massive project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development`,
    ],
  },
  {
    key: "2",
    title: "Click me to expand the content",
    description: "Collapsible",
    content: [
      `In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.`,
      `After massive project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development`,
    ],
  },
];
</script>

<template>
  <ElCard>
    <ThoughtChain :items="items" collapsible>
      <template #icon="{ info }">
        <ElAvatar style="width: 100%; height: 100%">
          {{ info.key }}
        </ElAvatar>
      </template>
      <template #content="{ info }">
        <div v-for="(item, index) in info.content" :key="index">
          {{ item }}
        </div>
      </template>
    </ThoughtChain>
  </ElCard>
</template>

<style lang="scss" scoped></style>
