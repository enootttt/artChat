<script setup lang="ts">
import type { DropUploaderProps } from './interface';

import { computed, onUnmounted, ref, watch } from 'vue';

import { useNamespace } from '../hooks/useNamespace';

const props = withDefaults(defineProps<DropUploaderProps>(), {
  disabled: false,
  className: '',
  getDropContainer: null,
});

const ns = useNamespace('attachment-drop-area');

const container = ref<HTMLElement | null | undefined>(null);
const showArea = ref<boolean | null>(null);

// ========================== Container ===========================
watch(
  () => props.getDropContainer,
  () => {
    const nextContainer = props.getDropContainer?.();
    if (container.value !== nextContainer) {
      container.value = nextContainer;
    }
  },
);

// =========================== Visible ============================
const showDropdown = computed(
  () => props.getDropContainer && container.value && !props.disabled,
);

const bodyCls = computed(() => {
  return [
    props.className,
    {
      [ns.b('on-body')]: container.value && container.value?.tagName === 'BODY',
    },
  ];
});

const onDragEnter = () => {
  showArea.value = true;
};

const onDragOver = (e: DragEvent) => {
  e.preventDefault();
};

const onDragLeave = (e: DragEvent) => {
  if (!e.relatedTarget) {
    showArea.value = false;
  }
};
const onDrop = (e: DragEvent) => {
  showArea.value = false;
  e.preventDefault();
};

watch(
  () => container.value,
  () => {
    if (container.value) {
      document.addEventListener('dragenter', onDragEnter);
      document.addEventListener('dragover', onDragOver);
      document.addEventListener('dragleave', onDragLeave);
      document.addEventListener('drop', onDrop, true);
    }
  },
);
onUnmounted(() => {
  if (container.value) {
    document.removeEventListener('dragenter', onDragEnter);
    document.removeEventListener('dragover', onDragOver);
    document.removeEventListener('dragleave', onDragLeave);
    document.removeEventListener('drop', onDrop);
  }
});
</script>

<template>
  <teleport v-if="showDropdown" :to="container">
    <div
      :class="[ns.b(), ...bodyCls]"
      :style="{ display: showArea ? 'block' : 'none' }"
    >
      <slot></slot>
    </div>
  </teleport>
</template>

<style lang="scss">
@import './index.scss';
</style>
