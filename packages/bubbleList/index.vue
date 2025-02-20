<script setup lang="ts">
import type { BubbleListProps, scrollTopParameters } from './interface';

import { computed, nextTick, onMounted, ref, watch, useSlots } from 'vue';
import type { Component, Slots } from 'vue';

import Bubble from '../bubble/index.vue';
import { useNamespace } from '../hooks/useNamespace';
import useDisplayData from './hooks/useDisplayData';
import useListData, { type ListItemType } from './hooks/useListData';

const props = withDefaults(defineProps<BubbleListProps>(), {
  autoScroll: true,
  items: () => [],
});

const ns = useNamespace('bubble-list');

const slots: Slots = useSlots();

const TOLERANCE = 1;
const initialized = ref(false);
const scrollReachEnd = ref(false);
const updateCount = ref(0);
const listRef = ref<HTMLElement>();
const bubbleRefs = ref<Record<string, InstanceType<typeof Bubble>>>({});
const { ListData, setListData } = useListData(props.items, props.roles);
const [displayData, onTypingComplete, ItemsWatch] = useDisplayData(ListData);

watch(
  () => props.items,
  () => {
    setListData(props.items);
  },
);

watch(
  () => ListData.value,
  () => {
    ItemsWatch();
  },
);

const onInternalScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  // 兼容 1px 以内的误差
  scrollReachEnd.value = target.scrollHeight - Math.abs(target.scrollTop) - target.clientHeight <= TOLERANCE
};

watch(
  () => updateCount.value,
  () => {
    if (props.autoScroll && listRef.value && scrollReachEnd.value) {
      nextTick(() => {
        listRef.value!.scrollTo({
          top: listRef.value!.scrollHeight,
        });
      });
    }
  },
);

const bubbleInst = computed(() => {
  const lastItemKey: number | string | undefined =
    displayData.value[displayData.value.length - 2]?.key;
  if (!lastItemKey) return undefined;
  const el = bubbleRefs.value[lastItemKey];
  return el;
});

watch(
  () => displayData.value,
  () => {
    nextTick(() => {
      if (props.autoScroll && bubbleInst.value) {
        const { $el: nativeElement } = bubbleInst.value;
        const { top, bottom } = nativeElement.getBoundingClientRect();
        const { top: listTop, bottom: listBottom } =
          listRef.value!.getBoundingClientRect();

        const isVisible = top < listBottom && bottom > listTop;
        if (isVisible) {
          updateCount.value = updateCount.value + 1;
          scrollReachEnd.value = true;
        }
      }
    });
  },
  {
    deep: true,
  },
);

const onBubbleUpdate = () => {
  if (props.autoScroll) {
    updateCount.value = updateCount.value + 1;
  }
};

const onTypingCompleteFn = (bubble: ListItemType) => {
  if (!bubble?.key) return;
  bubble?.onTypingComplete?.();
  onTypingComplete(bubble.key);
};

const scrollTo = ({
  key,
  offset,
  behavior = 'smooth',
  block,
}: scrollTopParameters) => {
  if (typeof offset === 'number') {
    // Offset scroll
    listRef.value!.scrollTo({
      top: offset,
      behavior,
    });
  } else if (key !== undefined) {
    // Key scroll
    const bubbleInst = bubbleRefs.value![key as number];

    if (bubbleInst) {
      // Block current auto scrolling
      const index = displayData.value.findIndex(
        (dataItem) => dataItem.key === key,
      );
      scrollReachEnd.value = index === displayData.value.length - 1;

      // Do native scroll
      bubbleInst.$el.scrollIntoView({
        behavior,
        block,
      });
    }
  }
};

const getBubbleRefs = (
  node: Component<InstanceType<typeof Bubble>> | null,
  key: number | string | undefined,
) => {
  if (!key) return;
  if (node) {
    Reflect.set(bubbleRefs.value, key, node);
  } else {
    Reflect.deleteProperty(bubbleRefs.value, key);
  }
};

onMounted(() => {
  console.log('list mounted');
  nextTick(() => {
    scrollTo({ offset: listRef.value!.scrollHeight, behavior: 'auto' });
    initialized.value = true;
  });
});

defineExpose({
  nativeElement: listRef.value,
  scrollTo,
});
</script>

<template>
  <div
    ref="listRef"
    :class="[
      ns.b(),
      rootClassName,
      className,
      scrollReachEnd && ns.b('reach-end'),
    ]"
    @scroll="onInternalScroll"
  >
    <Bubble
      v-for="bubble in displayData"
      :key="bubble.key"
      v-bind="bubble"
      :ref="(node) => getBubbleRefs(node, bubble.key)"
      :on-typing-complete="() => onTypingCompleteFn(bubble)"
      :on-update="onBubbleUpdate"
      :typing="initialized ? (bubble.typing as boolean) : false"
    >
      <template v-for="(_slot, slotName) in slots" :key="slotName" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="{ ...slotProps, ...bubble }"></slot>
      </template>
    </Bubble>
  </div>
</template>

<style lang="scss">
@import './index.scss';
</style>
