<script setup lang="ts">
import type { SenderProps } from './interface'
import { ElInput } from 'element-plus'

import ArtCollapseTransition from '../collapseTransition/index.vue'
import { useNamespace } from '../hooks/useNamespace'

const props = withDefaults(defineProps<SenderProps>(), {
  disabled: false,
  loading: false,
  submitType: 'enter',
  classNames: undefined,
  rootClassName: '',
  placeholder: '',
  onChange: () => {},
  onKeyPress: () => {},
})

const emit = defineEmits(['update:modelValue', 'onSubmit'])

const slots = defineSlots<{
  header?: () => void
  footer?: () => void
  components?: () => void
  prefix?: () => void
  actions?: () => void
}>()

const ns = useNamespace('sender')

function triggerValueChange(nextValue: string) {
  if (props?.onChange) {
    props.onChange(nextValue)
  }
}

function InputChangeFn(e: string) {
  triggerValueChange(e)
}

function triggerSend() {
  if (props.modelValue && !props.loading) {
    emit('onSubmit')
  }
}

function onInternalKeyPress(e: KeyboardEvent) {
  const canSubmit = e.key === 'Enter'

  switch (props.submitType) {
    case 'enter': {
      if (canSubmit && !e.shiftKey) {
        e.preventDefault()
        triggerSend()
      }
      break
    }

    case 'shiftEnter': {
      if (canSubmit && e.shiftKey) {
        e.preventDefault()
        triggerSend()
      }
      break
    }
  }

  if (props.onKeyPress) {
    props.onKeyPress(e)
  }
}
</script>

<template>
  <div :class="[ns.b(), disabled && ns.b('disabled'), rootClassName]">
    <ArtCollapseTransition>
      <slot name="header" />
    </ArtCollapseTransition>
    <div :class="ns.b('content')">
      <div v-if="slots.prefix" :class="[ns.b('prefix'), classNames?.prefix]">
        <slot name="prefix" />
      </div>
      <slot name="components">
        <ElInput
          :autosize="{ maxRows: 8 }"
          :class="[ns.b('input'), classNames?.input]"
          :disabled="disabled"
          :model-value="modelValue"
          :readonly="readOnly"
          :placeholder="props.placeholder"
          resize="none"
          type="textarea"
          v-bind="$attrs"
          @change="InputChangeFn"
          @keydown="(e) => onInternalKeyPress(e as KeyboardEvent)"
          @update:model-value="emit('update:modelValue', $event)"
        />
      </slot>
      <div v-if="slots.actions" :class="[ns.b('actions-list'), classNames?.actions]">
        <slot name="actions" />
      </div>
    </div>
    <div v-if="slots.footer" :class="ns.b('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
