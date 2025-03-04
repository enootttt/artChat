<script setup lang="ts">
import type { fileListProps } from './interface';

import { onMounted, ref, watch } from 'vue';

import { ElButton, ElIcon } from 'element-plus';

import { UploadFilled } from "@element-plus/icons-vue";

import SilentUploader from '../attachment/silentUploader.vue';
import { useNamespace } from '../hooks/useNamespace';
import fileListCard from './fileListCard.vue';

const props = withDefaults(defineProps<fileListProps>(), {
  disabled: false,
  overflow: 'wrap',
  listClassName: '',
  listStyle: undefined,
  itemClassName: '',
  itemStyle: undefined,
});

const ns = useNamespace('attachment-list');

const TOLERANCE = 1;
const containerRef = ref<HTMLElement>();
const pingStart = ref(false);
const pingEnd = ref(false);

const checkPing = () => {
  const containerEle = containerRef.value;
  if (!containerEle) return;
  if (props.overflow === 'scrollX') {
    pingStart.value = Math.abs(containerEle.scrollLeft) >= TOLERANCE;
    pingEnd.value = containerEle.scrollWidth - containerEle.clientWidth - Math.abs(containerEle.scrollLeft) >= TOLERANCE;
  } else if (props.overflow === 'scrollY') {
    pingStart.value = containerEle.scrollTop !== 0;
    pingEnd.value =
      containerEle.scrollHeight - containerEle.clientHeight !==
      containerEle.scrollTop;
  }
};

watch(
  () => props.overflow,
  () => {
    checkPing();
  },
);

const onScrollOffset = (offset: -1 | 1) => {
  const containerEle = containerRef.value;
  if (containerEle) {
    containerEle.scrollTo({
      left: containerEle.scrollLeft + offset * containerEle.clientWidth,
      behavior: 'smooth',
    });
  }
};

const onScrollLeft = () => {
  onScrollOffset(-1);
};

const onScrollRight = () => {
  onScrollOffset(1);
};

onMounted(() => {
  checkPing();
});
</script>

<template>
  <div
    ref="containerRef"
    :class="[
      ns.b(),
      props.overflow && ns.b(`overflow-${props.overflow}`),
      pingStart && ns.b('overflow-ping-start'),
      pingEnd && ns.b('overflow-ping-end'),
      props.listClassName,
    ]"
    :style="props.listStyle"
    @scroll="checkPing"
  >
    <transition-group :name="ns.b('card-motion')">
      <div v-for="item in props.items" :key="item.uid">
        <fileListCard
          :key="item.uid"
          :item="item"
          :on-remove="onRemove"
          :style="props.itemStyle"
        />
      </div>
    </transition-group>
    <SilentUploader v-if="!props.disabled" :upload="props.upload">
      <ElButton :class="[ns.b('upload-btn')]" type="info">
        <template #icon>
          <ElIcon :class="[ns.b('upload-btn-icon')]">
            <UploadFilled />
          </ElIcon>
        </template>
      </ElButton>
    </SilentUploader>
    <template v-if="props.overflow === 'scrollX'">
      <ElButton
        :class="[ns.b('prev-btn')]"
        circle
        icon="ArrowLeftBold"
        size="small"
        type="primary"
        @click="onScrollLeft"
      />
      <ElButton
        :class="[ns.b('next-btn')]"
        circle
        icon="ArrowRightBold"
        size="small"
        type="primary"
        @click="onScrollRight"
      />
    </template>
  </div>
</template>

<style lang="scss">
@import './index.scss';
</style>
