<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { ElCard, ElButton, ElIcon } from "element-plus";
import { CircleCheck, Warning, Loading } from "@element-plus/icons-vue";
import { ThoughtChain } from "@artmate/chat";
import type { ThoughtChainItem } from "@artmate/chat";

function getStatusIcon(status: ThoughtChainItem["status"]) {
  switch (status) {
    case "success":
      return shallowRef(CircleCheck);
    case "error":
      return shallowRef(Warning);
    case "pending":
      return shallowRef(Loading);
    default:
      return undefined;
  }
}

const mockServerResponseData: ThoughtChainItem[] = [
  {
    title: "Thought Chain Item - 1",
    status: "success",
    description: "status: success",
    icon: getStatusIcon("success"),
  },
  {
    title: "Thought Chain Item - 2",
    status: "error",
    description: "status: error",
    icon: getStatusIcon("error"),
  },
];

const delay = (ms: number) => {
  return new Promise<void>((resolve) => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, ms);
  });
};

function addChainItem() {
  mockServerResponseData.push({
    title: `Thought Chain Item - ${mockServerResponseData.length + 1}`,
    status: "pending",
    icon: getStatusIcon("pending"),
    description: "status: pending",
  });
}

async function updateChainItem(status: ThoughtChainItem["status"]) {
  await delay(800);
  mockServerResponseData[mockServerResponseData.length - 1].status = status;
  mockServerResponseData[mockServerResponseData.length - 1].icon = getStatusIcon(status);
  mockServerResponseData[mockServerResponseData.length - 1].description = `status: ${status}`;
}

const items = ref<ThoughtChainItem[]>(mockServerResponseData);
const loading = ref(false);

const mockStatusChange = async () => {
  await updateChainItem("error");
  items.value = [...mockServerResponseData];
  await updateChainItem("pending");
  items.value = [...mockServerResponseData];
  await updateChainItem("success");
  items.value = [...mockServerResponseData];
};

const onClick = async () => {
  loading.value = true;
  addChainItem();
  items.value = [...mockServerResponseData];
  await mockStatusChange();
  loading.value = false;
};
</script>

<template>
  <ElCard>
    <ElButton @click="onClick" style="margin-bottom: 16px" :loading="loading">
      {{ loading ? "Running" : "Run Next" }}
    </ElButton>
    <ThoughtChain :items="items">
      <template #icon="{ info }">
        <ElIcon size="20" color="white" v-if="info?.icon">
          <component :is="info.icon"></component>
        </ElIcon>
      </template>
    </ThoughtChain>
  </ElCard>
</template>

<style lang="scss" scoped></style>
