<script setup lang="ts">
import { ref, computed } from "vue";
import { ElSpace, ElButton, ElIcon } from "element-plus";
import { Loading, Discount } from "@element-plus/icons-vue";
import { ArtRequest, ThoughtChain } from "@artmate/chat";
import type { ThoughtChainItemProps } from "@artmate/chat";

const BASE_URL = "https://api.example.host";
const PATH = "/chat";
const MODEL = "gpt-4o";

const ND_JSON_SEPARATOR = "\n";

async function mockFetch() {
  const ndJsonData = `{data:{"id":"0","choices":[{"index":0,"delta":{"content":"Hello","role":"assistant"}}],"created":1733129200,"model":"gpt-4o"}}
{data:{"id":"1","choices":[{"index":1,"delta":{"content":"world!","role":"assistant"}}],"created":1733129300,"model":"gpt-4o"}}
{data:{"id":"2","choices":[{"index":2,"delta":{"content":"I","role":"assistant"}}],"created":1733129400,"model":"gpt-4o"}}
{data:{"id":"3","choices":[{"index":3,"delta":{"content":"am","role":"assistant"}}],"created":1733129500,"model":"gpt-4o"}}
{data:{"id":"4","choices":[{"index":4,"delta":{"content":"Ant Design X!","role":"assistant"}}],"created":1733129600,"model":"gpt-4o"}}`;

  const chunks = ndJsonData.split(ND_JSON_SEPARATOR);

  const response = new Response(
    new ReadableStream({
      async start(controller) {
        for (const chunk of chunks) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          controller.enqueue(new TextEncoder().encode(chunk));
        }
        controller.close();
      },
    }),
    {
      headers: {
        "Content-Type": "application/x-ndjson",
      },
    }
  );

  return response;
}

const exampleRequest = ArtRequest({
  baseURL: BASE_URL + PATH,
  model: MODEL,
  fetch: mockFetch,
});

const status = ref<ThoughtChainItemProps["status"]>();
const lines = ref<string[]>([]);

async function request() {
  status.value = "pending";

  await exampleRequest.create(
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
        lines.value = [...lines.value, msg];
        console.log("onUpdate", msg);
      },
    },
    new TransformStream<string, string>({
      transform(chunk, controller) {
        controller.enqueue(chunk);
      },
    })
  );
}
const items = computed<ThoughtChainItemProps[]>(() => [
  {
    title: "Mock Custom Protocol - Log",
    status: status.value,
    content: lines.value,
  },
]);
</script>

<template>
  <ElSpace alignment="flex-start" :size="20">
    <ElButton type="primary" :disabled="status === 'pending'" @click="request">Agent Request</ElButton>
    <ThoughtChain :items="items">
      <template #icon="{ info }">
        <ElIcon size="20" :color="info.status ? 'white' : 'block'">
          <Loading v-if="info.status === 'pending'" />
          <Discount v-else />
        </ElIcon>
      </template>
      <template #content="{ info }">
        <pre v-if="info.content">
          <code>{{ info.content.join(ND_JSON_SEPARATOR) }}</code>
        </pre>
      </template>
    </ThoughtChain>
  </ElSpace>
</template>

<style lang="scss" scoped>
pre {
  width: auto;
  margin: 0;
  overflow: auto;

  code {
    display: block;
    padding: 12px 16px;
    font-size: 14px;
  }
}
</style>
