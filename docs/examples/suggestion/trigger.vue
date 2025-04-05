<script setup lang="ts">
import { ref } from "vue";
import { ElInputTag } from "element-plus";
import type { CascaderOption } from "element-plus";
import { Suggestion } from "@artmate/chat";
import type { RenderChildrenProps } from "@artmate/chat";


const tags = ref<string[]>([]);

const uuid = ref(0);

const suggestions: (info?: any) => CascaderOption[] = (info) => {
  return [{ label: `Trigger by '${info}'`, value: String(info) }];
};

const onSelect = () => {
  uuid.value++;
  tags.value = [...tags.value, `Cell_${uuid.value}`];
};

const senderChange = (e: KeyboardEvent, onTrigger: RenderChildrenProps<any>["onTrigger"]) => {
  if (e.key === "/" || e.key === "#") {
    onTrigger(e.key);
  } else {
    onTrigger(false);
  }
};
</script>

<template>
  <Suggestion :items="suggestions" @select="onSelect">
    <template #default="{ onKeyDown, onTrigger }">
      <ElInputTag
        v-model="tags"
        placeholder="可任意输入 / 与 # 多次获取建议"
        :save-on-blur="false"
        trigger="Space"
        @keypress="senderChange($event, onTrigger)"
        @keydown="onKeyDown"
      />
    </template>
  </Suggestion>
</template>

<style lang="scss" scoped></style>
