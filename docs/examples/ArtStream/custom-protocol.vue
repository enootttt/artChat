<script setup lang="ts">
import { ref, computed } from "vue";
import { ElSpace, ElButton, ElIcon } from "element-plus";
import { Discount } from "@element-plus/icons-vue";
import { ArtStream, ThoughtChain } from "@artmate/chat";
import type { ThoughtChainItemProps } from "@artmate/chat";
const sipHeaders = ["INVITE sip:[email protected] SIP/2.0\n", "Via: SIP/2.0/UDP [host];branch=123456\n", "Content-Type: application/sdp\n\n"];

const sdp = [
  "v=0\n",
  "o=alice 2890844526 2890844526 IN IP4 [host]\n",
  "s=\n",
  "c=IN IP4 [host]\n",
  "t=0 0\n",
  "m=audio 49170 RTP/AVP 0\n",
  "a=rtpmap:0 PCMU/8000\n",
  "m=video 51372 RTP/AVP 31\n",
  "a=rtpmap:31 H261/90000\n",
  "m=video 53000 RTP/AVP 32\n",
  "a=rtpmap:32 MPV/90000\n\n",
];

function mockReadableStream() {
  return new ReadableStream({
    async start(controller) {
      for (const chunk of sipHeaders.concat(sdp)) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        controller.enqueue(new TextEncoder().encode(chunk));
      }
      controller.close();
    },
  });
}

const lines = ref<string[]>([]);

async function readStream() {
  // 🌟 Read the stream
  for await (const chunk of ArtStream({
    readableStream: mockReadableStream(),
    transformStream: new TransformStream<string, string>({
      transform(chunk, controller) {
        controller.enqueue(chunk);
      },
    }),
  })) {
    lines.value = [...lines.value, chunk];
  }
}

const items = computed<ThoughtChainItemProps[]>(() => {
  if (!lines.value.length) return [];
  return [
    {
      title: "Mock Custom Protocol - Log",
      status: "success",
      content: lines.value,
    },
  ];
});
</script>

<template>
  <ElSpace alignment="flex-start" :size="20">
    <ElButton type="primary" @click="readStream">Mock Custom Protocol - SIP</ElButton>
    <ThoughtChain :items="items">
      <template #icon="{ info }">
        <ElIcon size="20" :color="info.status ? 'white' : 'block'">
          <Discount />
        </ElIcon>
      </template>
      <template #content="{ info }">
        <pre v-if="info.content">
          <code v-for="(item, index) in info.content" :key="index">{{ item }}</code>
        </pre>
      </template>
    </ThoughtChain>
  </ElSpace>
</template>

<style lang="scss" scoped></style>
