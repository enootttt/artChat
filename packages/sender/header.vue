<script setup lang="ts">
import type { HeaderProps } from './interface';

import { useSlots, watch } from 'vue';

import { ElButton } from 'element-plus';

import { useNamespace } from '../hooks/useNamespace';

const props = withDefaults(defineProps<HeaderProps>(), {
  open: false,
  closable: true,
  title: '',
  className: '',
});
const emit = defineEmits(['update:open', 'onOpenChange']);
const ns = useNamespace('sender-header');

const slot = useSlots();

watch(
  () => props.open,
  (newVal) => {
    emit('onOpenChange', newVal);
  },
);
</script>

<template>
  <div v-show="open" :class="[ns.b(), className]">
    <div
      v-if="closable !== false || title || slot.title"
      :class="ns.b('header')"
    >
      <div :class="ns.b('title')">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div :class="ns.b('close')">
        <ElButton
          v-show="closable"
          icon="Close"
          link
          size="large"
          type="info"
          @click="emit('update:open', false)"
        />
      </div>
    </div>
    <div :class="ns.b('content')" v-if="slot.default">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import './index.scss';
</style>
