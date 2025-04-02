<script setup lang="ts">
import { ref } from "vue";
import { ElButton, ElIcon } from "element-plus";
import { Promotion } from "@element-plus/icons-vue";
import type { CascaderOption } from "element-plus";
import { Suggestion, Sender } from "@artmate/chat";
import type { RenderChildrenProps } from "@artmate/chat";

const value = ref("");

const suggestions: CascaderOption[] = [
  { label: "Write a report", value: "report" },
  { label: "Draw a picture", value: "draw" },
  {
    label: "Check some knowledge",
    value: "knowledge",
    extra: "Extra Info",
  },
];

const onSelect = (val: string) => {
  value.value = `[${val}]:`;
};

const senderChange = (val: string, onTrigger: RenderChildrenProps<any>["onTrigger"]) => {
  if (val === "/") {
    onTrigger();
  } else {
    onTrigger(false);
  }
};
</script>

<template>
  <Suggestion :items="suggestions" block @select="onSelect">
    <template #default="{ onKeyDown, onTrigger }">
      <Sender v-model="value" placeholder="输入 / 获取建议" :onKeyPress="onKeyDown" @input="senderChange(value, onTrigger)">
        <template #actions>
          <ElButton circle type="primary">
            <ElIcon color="white">
              <Promotion />
            </ElIcon>
          </ElButton>
        </template>
      </Sender>
    </template>
  </Suggestion>
</template>

<style lang="scss" scoped></style>
