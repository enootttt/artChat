<script setup lang="ts">
import type { AttachmentProps } from '@artmate/chat'
import { Attachment } from '@artmate/chat'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElButton, ElIcon, ElSpace } from 'element-plus'
import { computed, ref } from 'vue'

const presetFiles: AttachmentProps['items'] = [
  {
    uid: 1,
    name: 'uploading file.xlsx',
    status: 'uploading',
    url: 'http://www.baidu.com/xxx.png',
    percent: 93,
  },
  {
    uid: 2,
    name: 'uploaded file.docx',
    status: 'success',
    size: 123456,
    url: 'http://www.baidu.com/yyy.png',
    descriptions: 'Customize description',
  },
  {
    uid: 3,
    name: 'upload error with long text file name.zip',
    status: 'fail',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png',
  },
  {
    uid: 4,
    name: 'image uploading preview.png',
    status: 'uploading',
    percent: 33,
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: 5,
    name: 'image done preview.png',
    status: 'ready',
    size: 123456,
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: 6,
    name: 'image error preview.png',
    status: 'fail',
    response: 'Server Error 500', // custom error message to show
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
]

const items = ref<AttachmentProps['items']>([])

const sharedAttachmentProps = computed<AttachmentProps>(() => ({
  beforeUpload: () => false,
  items: items.value,
  onChange: ({ fileList }) => {
    console.log('onChange:', fileList)
    items.value = fileList
  },
}))

function setItems(value: AttachmentProps['items']) {
  items.value = value
}
</script>

<template>
  <ElSpace direction="vertical" style="width: 100%">
    <Attachment v-bind="sharedAttachmentProps">
      <template #icon>
        <ElIcon>
          <UploadFilled />
        </ElIcon>
      </template>
      <template #title>Click or Drop files here</template>
      <template #description>Support file type: image, video, audio, document, etc.</template>
    </Attachment>

    <Attachment v-bind="sharedAttachmentProps">
      <template #icon>
        <ElIcon color="#1677ff" size="80">
          <UploadFilled />
        </ElIcon>
      </template>
      <template #title>
        <h1>Click or Drop files here</h1>
      </template>
      <template #description>
        <ElButton type="primary" style="margin-top: 10px">Do Upload</ElButton>
      </template>
    </Attachment>

    <ElSpace>
      <ElButton type="primary" :disabled="!!items?.length" @click="setItems(presetFiles)">
        Fill Files
      </ElButton>
      <ElButton :disabled="!items?.length" @click="setItems([])">Reset Files</ElButton>
    </ElSpace>
  </ElSpace>
</template>

<style lang="scss" scoped></style>
