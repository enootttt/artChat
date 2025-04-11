<script setup lang="ts">
import type { RenderChildrenProps } from '@artmate/chat'
import type { CascaderOption } from 'element-plus'
import { Sender, Suggestion } from '@artmate/chat'
import { Promotion } from '@element-plus/icons-vue'
import { ElButton, ElIcon } from 'element-plus'
import { ref } from 'vue'

const value = ref('')

const suggestions: CascaderOption[] = [
  { label: 'Write a report', value: 'report' },
  { label: 'Draw a picture', value: 'draw' },
  {
    label: 'Check some knowledge',
    value: 'knowledge',
    extra: 'Extra Info',
  },
]

function onSelect(val: string) {
  value.value = `[${val}]:`
}

function senderChange(val: string, onTrigger: RenderChildrenProps<any>['onTrigger']) {
  if (val === '/') {
    onTrigger()
  } else {
    onTrigger(false)
  }
}
</script>

<template>
  <Suggestion :items="suggestions" @select="onSelect">
    <template #default="{ onKeyDown, onTrigger }">
      <Sender
        v-model="value"
        placeholder="输入 / 获取建议"
        :on-key-press="onKeyDown"
        @input="senderChange(value, onTrigger)"
      >
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
