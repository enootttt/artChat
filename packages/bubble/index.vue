<script setup lang="ts">
import type { BubbleProps } from './interface';

import { computed, h, ref, useSlots, watch } from 'vue';
import type { Ref, VNode } from 'vue';

import { ElAvatar } from 'element-plus';

import { useNamespace } from '../hooks/useNamespace';
import useTypedEffect from './hooks/useTypedEffect';
import useTypingConfig from './hooks/useTypingConfig';
import Loading from './loading.vue';

const props = withDefaults(defineProps<BubbleProps>(), {
  styles: () => ({}),
  placement: 'start',
  loading: false,
  loadingRender: undefined,
  variant: 'filled',
  content: '',
  avatar: '',
  typing: false,
});

const ns = useNamespace('bubble');

const slot = useSlots();

const [typingEnabled, typingStep, typingInterval] = useTypingConfig(
  props.typing,
);

const contents = computed(() => {
  return props.content;
});
const [typedContent, isTyping]: [Ref<() => string | VNode>, Ref<boolean>] =
  useTypedEffect(
    contents,
    typingEnabled as boolean,
    typingStep as number,
    typingInterval as number,
  );

watch(
  () => typedContent.value,
  () => {
    props.onUpdate?.();
  },
);

const mergeContent = computed(() =>
  props.messageRender
    ? props.messageRender((typedContent.value as () => string)?.() ?? '')
    : typedContent.value,
);

const contentNode = computed<Function>(() => {
  return props.loading
    ? () =>
        props.loadingRender
          ? h(props.loadingRender())
          : h(Loading, { prefixCls: ns.b() })
    : (mergeContent.value as Function);
});

const triggerTypingCompleteRef = ref(false);
watch(
  () => isTyping.value || props.loading,
  () => {
    if (!isTyping.value && !props.loading) {
      if (!triggerTypingCompleteRef.value) {
        triggerTypingCompleteRef.value = true;
        props.onTypingComplete?.();
      }
    } else {
      triggerTypingCompleteRef.value = false;
    }
  },
);
</script>

<template>
  <div :class="[ns.b(), ns.b(placement)]">
    <div
      v-if="slot.avatar || avatar"
      :class="[ns.b('avatar'), props.classNames?.avatar]"
      :style="props.styles?.avatar"
    >
      <slot name="avatar">
        <ElAvatar v-if="typeof avatar === 'string'" :size="32" :src="avatar" />
        <component :is="avatar" v-else />
      </slot>
    </div>
    <div v-if="slot.header || slot.footer" :class="[ns.b('content-wrapper')]">
      <div
        :class="[ns.b('header'), props.classNames?.header]"
        :style="props.styles?.header"
      >
        <slot name="header"> </slot>
      </div>
      <div
        v-if="
          Object.prototype.toString.call(contentNode) === '[object Fonction]' &&
          !!loadingRender
        "
        :class="[
          ns.b('content'),
          ns.b(`content-${props.variant}`),
          props.classNames?.content,
          props.shape && ns.b(`content-${props.placement}-${props.shape}`),
        ]"
        :style="props.styles?.content"
        v-dompurify-html="contentNode?.()"
      ></div>
      <div
        v-else
        :class="[
          ns.b('content'),
          ns.b(`content-${props.variant}`),
          props.classNames?.content,
          props.shape && ns.b(`content-${props.placement}-${props.shape}`),
        ]"
        :style="props.styles?.content"
      >
        <component :is="contentNode" />
      </div>
      <div
        :class="[ns.b('footer'), props.classNames?.footer]"
        :style="props.styles?.footer"
      >
        <slot name="footer"></slot>
      </div>
    </div>
    <template v-else>
      <div
        v-if="
          Object.prototype.toString.call(contentNode) === '[object String]' &&
          !loadingRender
        "
        :class="[
          ns.b('content'),
          ns.b(`content-${props.variant}`),
          props.classNames?.content,
          props.shape && ns.b(`content-${props.placement}-${props.shape}`),
        ]"
        :style="props.styles?.content"
        v-dompurify-html="contentNode || ''"
      ></div>
      <div
        v-else
        :class="[
          ns.b('content'),
          ns.b(`content-${props.variant}`),
          props.classNames?.content,
          props.shape && ns.b(`content-${props.placement}-${props.shape}`),
        ]"
        :style="props.styles?.content"
      >
        <component :is="contentNode" />
      </div>
    </template>
    <!-- <component :is="contentDom"></component> -->
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
