<script setup lang="ts">
import type { ThoughtChainItemProps } from '@artmate/chat'
import { ThoughtChain } from '@artmate/chat'
import { CircleCheck, Loading, Warning } from '@element-plus/icons-vue'
import { ElButton, ElCard, ElIcon } from 'element-plus'
import { ref, shallowRef } from 'vue'

function getStatusIcon(status: ThoughtChainItemProps['status']) {
  switch (status) {
    case 'success':
      return shallowRef(CircleCheck)
    case 'error':
      return shallowRef(Warning)
    case 'pending':
      return shallowRef(Loading)
    default:
      return undefined
  }
}

const mockServerResponseData: ThoughtChainItemProps[] = [
  {
    title: 'Thought Chain Item - 1',
    status: 'success',
    description: 'status: success',
    icon: getStatusIcon('success'),
  },
  {
    title: 'Thought Chain Item - 2',
    status: 'error',
    description: 'status: error',
    icon: getStatusIcon('error'),
  },
]

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, ms)
  })
}

function addChainItem() {
  mockServerResponseData.push({
    title: `Thought Chain Item - ${mockServerResponseData.length + 1}`,
    status: 'pending',
    icon: getStatusIcon('pending'),
    description: 'status: pending',
  })
}

async function updateChainItem(status: ThoughtChainItemProps['status']) {
  await delay(800)
  mockServerResponseData[mockServerResponseData.length - 1].status = status
  mockServerResponseData[mockServerResponseData.length - 1].icon = getStatusIcon(status)
  mockServerResponseData[mockServerResponseData.length - 1].description = `status: ${status}`
}

const items = ref<ThoughtChainItemProps[]>(mockServerResponseData)
const loading = ref(false)

async function mockStatusChange() {
  await updateChainItem('error')
  items.value = [...mockServerResponseData]
  await updateChainItem('pending')
  items.value = [...mockServerResponseData]
  await updateChainItem('success')
  items.value = [...mockServerResponseData]
}

async function onClick() {
  loading.value = true
  addChainItem()
  items.value = [...mockServerResponseData]
  await mockStatusChange()
  loading.value = false
}
</script>

<template>
  <ElCard>
    <ElButton style="margin-bottom: 16px" :loading="loading" @click="onClick">
      {{ loading ? 'Running' : 'Run Next' }}
    </ElButton>
    <ThoughtChain :items="items">
      <template #icon="{ info }">
        <ElIcon v-if="info?.icon" size="20" color="white">
          <component :is="info.icon" />
        </ElIcon>
      </template>
    </ThoughtChain>
  </ElCard>
</template>

<style lang="scss" scoped></style>
