<script setup lang="ts">
import { h, ref } from "vue";
import { Conversations } from "@artmate/chat";
import type { ConversationsProps } from "@artmate/chat";
import { ElIcon } from "element-plus";
import { Service } from "@element-plus/icons-vue";
const items: ConversationsProps["items"] = Array.from({ length: 6 }).map((_, index) => {
  const timestamp = index <= 3 ? 1732204800000 : 1732204800000 - 60 * 60 * 24;

  return {
    key: `item${index + 1}`,
    label: `Conversation ${timestamp + index * 60 * 60}`,
    timestamp: timestamp + index * 60 * 60,
    group: index <= 3 ? "Today" : "Yesterday",
  };
});

const groupable = {
  sort(a: string, b: string) {
    if (a === b) return 0;

    return a === "Today" ? -1 : 1;
  },
  title: (group: string, title: any) => {
    // 此处为示例，不推荐，业务上应提取组件出来
    return group
      ? h(title.components.GroupTitle, null, () =>
          h(
            "div",
            {
              style: {
                display: "flex",
                gap: "10px",
                alignItems: "center",
              },
            },
            [h(ElIcon, null, () => h(Service)), h("div", null, group)]
          )
        )
      : title.components.GroupTitle;
  },
};

const activeKey = ref("item1");
</script>

<template>
  <Conversations v-model:active-key="activeKey" :groupable="groupable" :items="items" style="width: 300px" />
</template>

<style lang="scss" scoped></style>
