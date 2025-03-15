<script setup lang="ts">
import type { AttachmentProps } from '@artmate/chat'
import { Attachment } from '@artmate/chat'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElIcon, ElSegmented, ElSpace, ElSwitch } from 'element-plus'
import { ref } from 'vue'

const presetFiles: AttachmentProps['items'] = Array.from({ length: 30 }).map((_, index) => ({
  uid: index,
  name: `file-${index}.jpg`,
  status: 'ready',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}))

const sizeOptions = [
  { value: 'wrap', label: 'Wrap' },
  { value: 'scrollX', label: 'Scroll X' },
  { value: 'scrollY', label: 'Scroll Y' },
]

const overflow = ref<AttachmentProps['overflow']>('wrap')
const items = ref<AttachmentProps['items']>(presetFiles)
const disabled = ref(false)

const showData = ref(true)
function dataChange(value: string | number | boolean) {
  if (value) {
    items.value = presetFiles
  }
  else {
    items.value = []
  }
}

function FileChange() {}
</script>

<template>
  <div>
    <div class="top">
      <ElSegmented v-model="overflow" :options="sizeOptions" style="margin-inline-end: auto" />

      <ElSpace>
        <ElSwitch
          v-model="showData"
          inline-prompt
          active-text="Data"
          inactive-text="Data"
          @change="dataChange"
        />
        <ElSwitch
          v-model="disabled"
          inline-prompt
          active-text="Disabled"
          inactive-text="Disabled"
        />
      </ElSpace>
    </div>
    <Attachment :overflow="overflow" :items="items" :disabled="disabled" @change="FileChange">
      <template #icon>
        <ElIcon>
          <UploadFilled />
        </ElIcon>
      </template>
      <template #title>
        Click or Drop files here
      </template>
      <template #description>
        Support file type: image, video, audio, document, etc.
      </template>
    </Attachment>
  </div>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 10px;
}
</style>
