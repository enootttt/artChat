<script setup lang="ts">

import { useSlots } from 'vue';
import { ElInput } from 'element-plus';
import type { SenderProps } from './interface';

import ArtCollapseTransition from '../collapseTransition/index.vue';
import { useNamespace } from '../hooks/useNamespace';

const props = withDefaults(defineProps<SenderProps>(), {
  disabled: false,
  loading: false,
  submitType: 'enter',
  classNames: undefined,
  rootClassName: '',
  placeholder: '',
  onChange: () => {},
  onKeyPress: () => {},
});

const emit = defineEmits(['update:modelValue', 'onSubmit']);

const slots = useSlots();

const ns = useNamespace('sender');

const triggerValueChange = (nextValue: string) => {
  if (props?.onChange) {
    props.onChange(nextValue);
  }
};

const InputChangeFn = (e: string) => {
  triggerValueChange(e);
};

const triggerSend = () => {
  if (props.modelValue && !props.loading) {
    emit('onSubmit');
  }
};

const onInternalKeyPress = (e: KeyboardEvent) => {
  const canSubmit = e.key === 'Enter';

  switch (props.submitType) {
    case 'enter': {
      if (canSubmit && !e.shiftKey) {
        e.preventDefault();
        triggerSend();
      }
      break;
    }

    case 'shiftEnter': {
      if (canSubmit && e.shiftKey) {
        e.preventDefault();
        triggerSend();
      }
      break;
    }
  }

  if (props.onKeyPress) {
    props.onKeyPress(e);
  }
};
</script>

<template>
  <div :class="[ns.b(), disabled && ns.b('disabled'), rootClassName]">
    <ArtCollapseTransition>
      <slot name="header"></slot>
    </ArtCollapseTransition>
    <div :class="ns.b('content')">
      <div :class="[ns.b('prefix'), classNames?.prefix]" v-if="slots.prefix">
        <slot name="prefix"></slot>
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
      <div :class="[ns.b('actions-list'), classNames?.actions]" v-if="slots.actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './index.scss';
</style>
