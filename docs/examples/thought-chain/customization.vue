<script setup lang="ts">
import { isVNode, shallowRef } from "vue";
import { ElCard, ElIcon, ElButton } from "element-plus";
import { CircleCheck, MoreFilled } from "@element-plus/icons-vue";
import { ThoughtChain } from "@artmate/chat";
import type { ThoughtChainItemProps, ThoughtChainProps } from "@artmate/chat";
const customizationProps: ThoughtChainItemProps = {
  title: "Thought Chain Item Title",
  description: "description",
  icon: CircleCheck,
  content: [
    ` In the process of internal desktop applications development, many different design specs and
        implementations would be involved, which might cause designers and developers difficulties
        and duplication and reduce the efficiency of development.`,
    `After massive project practice and summaries, Ant Design, a design language for background
        applications, is refined by Ant UED Team, which aims to{' '}`,
    `uniform the user interface specs for internal background projects, lower the unnecessary cost of
        design differences and implementation and liberate the resources of design and front-end
        development`,
  ],
};
const CustomizationPropsFn = (op: ThoughtChainItemProps) => {
  return Object.fromEntries(
    Object.entries(op).map(([k, v]) => {
      return [k, isVNode(v) ? shallowRef(v) : v];
    })
  );
};

const items: ThoughtChainProps["items"] = [
  {
    ...CustomizationPropsFn(customizationProps),
    status: "success",
  },
  {
    ...CustomizationPropsFn(customizationProps),
    status: "error",
  },
  {
    ...CustomizationPropsFn(customizationProps),
    status: "pending",
  },
];
</script>

<template>
  <ElCard>
    <ThoughtChain :items="items">
      <template #icon="{ info }">
        <ElIcon size="20" color="white">
          <component :is="info.icon"></component>
        </ElIcon>
      </template>
      <template #content="{ info }">
        <div v-for="(item, index) in info.content" :key="index">
          {{ item }}
        </div>
      </template>
      <template #extra>
        <ElButton size="small">
          <template #icon>
            <ElIcon><MoreFilled /></ElIcon>
          </template>
        </ElButton>
      </template>
      <template #footer>
        <ElButton style="width: 100%;">Thought Chain Item Footer</ElButton>
      </template>
    </ThoughtChain>
  </ElCard>
</template>
