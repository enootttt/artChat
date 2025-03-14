<script setup lang="ts">
import { computed, ref } from "vue";
import { ElSpace, ElButton, ElIcon } from "element-plus";
import { Loading, Discount } from "@element-plus/icons-vue";
import { ThoughtChain, useArtAgent } from "@artmate/chat";
import type { ThoughtChainItemProps } from "@artmate/chat";
const BASE_URL = "https://api.example.com";
const PATH = "/chat";
const MODEL = "gpt-3.5-turbo";
/** 🔥🔥 Its dangerously! */
// const API_KEY = '';

interface YourMessageType {
  role: string;
  content: string;
}

const status = ref<ThoughtChainItemProps["status"]>();
const lines = ref<Record<string, string>[]>([]);

const [agent] = useArtAgent<YourMessageType>({
  baseURL: BASE_URL + PATH,
  model: MODEL,
  // dangerouslyApiKey: API_KEY
});

async function request() {
  status.value = "pending";

  agent.request(
    {
      messages: [{ role: "user", content: "hello, who are u?" }],
      stream: true,
    },
    {
      onSuccess: (messages) => {
        status.value = "success";
        console.log("onSuccess", messages);
      },
      onError: (error) => {
        status.value = "error";
        console.error("onError", error);
      },
      onUpdate: (msg) => {
        lines.value = [...lines.value, msg] as Record<string, string>[];
        console.log("onUpdate", msg);
      },
    }
  );
}

const description = computed(() => {
  if (status.value === "error" && agent.config.baseURL === BASE_URL + PATH) {
    return "Please replace the BASE_URL, PATH, MODEL, API_KEY with your own values.";
  }
  return "";
});

const items = computed<ThoughtChainItemProps[]>(() => [
  {
    title: "Agent Request Log",
    status: status.value,
    description: description.value,
  },
]);
</script>

<template>
  <ElSpace alignment="flex-start" :size="20">
    <ElButton type="primary" @click="request">Agent Request</ElButton>
    <ThoughtChain :items="items">
      <template #icon="{ info }">
        <ElIcon size="20" :color="info.status ? 'white' : 'block'">
          <Loading v-if="info.status === 'pending'" />
          <Discount v-else />
        </ElIcon>
      </template>
      <template #content="{ info }">
        <ElSpace direction="vertical" alignment="flex-start">
          <div>Status：{{ info.status || "-" }}</div>
          <div>Update Times：{{ lines.length }}</div>
        </ElSpace>
      </template>
    </ThoughtChain>
  </ElSpace>
</template>

<style lang="scss" scoped></style>
