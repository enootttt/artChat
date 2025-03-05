<script setup lang="ts">
import { computed, ref } from "vue";
import { ElSpace, ElButton } from "element-plus";
import { BubbleList } from "@artmate/chat";
import type { BubbleListProps } from "@artmate/chat";

const BubbleListRef = ref<InstanceType<typeof BubbleList>>();

const rolesAsObject: BubbleListProps["roles"] = {
  ai: {
    placement: "start",
    avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    typing: { step: 5, interval: 20 },
  },
  user: {
    placement: "end",
    avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  },
};

const count = ref<number>(10);

// const useRolesAsFunction = ref(false);

const items = computed<BubbleListProps['items']>(() =>
  Array.from({ length: count.value }).map((_, i) => {
    const isAI = !!(i % 2);
    const content = isAI ? "Mock AI content. ".repeat(20) : "Mock user content.";

    return {
      key: i,
      role: isAI ? "ai" : "user",
      // 保证只有最新的一条回话会打印输出
      typing: isAI && i === count.value - 1 && { step: 5, interval: 20 },
      content,
    };
  })
);

const scrollToFirst = () => {
  BubbleListRef.value?.scrollTo({
    key: 0,
    block: "nearest",
  });
};
</script>

<template>
  <ElSpace direction="vertical" alignment="align-start">
    <div class="btns">
      <ElButton type="primary" @click="count++">Add Bubble</ElButton>
      <ElButton type="primary" @click="scrollToFirst">Scroll To First</ElButton>
    </div>
    <BubbleList ref="BubbleListRef" :items="items" :roles="rolesAsObject" auto-scroll :style="{ maxHeight: '300px' }"/>
  </ElSpace>
</template>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}
</style>
