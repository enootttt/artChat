<script setup lang="ts">
import { useId, computed, useSlots } from "vue";
import type { CSSProperties } from "vue";
import { ElIcon } from "element-plus";
import { ArrowRightBold } from "@element-plus/icons-vue";
import { useNamespace } from "../hooks/useNamespace";
import { ThoughtChainProps, ThoughtChainItemProps } from "./interface";

interface ThoughtChainNodeProps {
  info?: ThoughtChainItemProps;
  nextStatus?: ThoughtChainItemProps["status"];
  headerClick?: (key: string) => void;
  expandedKeys?: string[];
  className?: string;
  style?: CSSProperties;
  classNames?: ThoughtChainProps["classNames"];
  styles?: ThoughtChainProps["styles"];
  enableCollapse?: boolean;
}

const ns = useNamespace("thought-chain-item");

const props = withDefaults(defineProps<ThoughtChainNodeProps>(), {
  info: () => ({}),
  headerClick: () => {},
});

const slots = useSlots();

const id = useId();

const onThoughtChainNodeClick = () => props.headerClick?.(id);

const contentOpen = computed(() => {
  return props.expandedKeys?.includes(id)
});
</script>

<template>
  <div :class="[ns.b(), props.info?.status && ns.b(`${props.info.status}${nextStatus ? `-${nextStatus}` : ''}`), props.className]" :style="props.style">
    <!-- Header -->
    <div :class="[ns.b('header'), props.classNames?.itemHeader]" :style="props.styles?.itemHeader" @click="onThoughtChainNodeClick">
      <!-- Icon -->
      <div :class="[ns.b('icon')]">
        <slot name="icon" :info="props.info" />
      </div>
      <!-- Header -->
      <div :class="[ns.b('header-box'), enableCollapse && slots.content]">
        <!-- Title -->
        <span :class="[ns.b('title')]">
          <strong>
            <div v-if="props.enableCollapse && slots.content">
              <ElIcon :class="[ns.b('collapse-icon'), contentOpen && 'rotate']"><ArrowRightBold /></ElIcon>
            </div>
            {{ props.info?.title }}
          </strong>
        </span>
        <span :class="[ns.b('desc')]" v-if="props.info?.description">
          {{ props.info?.description }}
        </span>
      </div>
      <div :class="[ns.b('extra')]" v-if="slots.extra">
        <slot name="extra" :info="props.info" />
      </div>
    </div>
    <!-- Content -->
    <template v-if="slots.content">
      <div ref="contentRef" :class="[ns.b('content')]" v-show="props.enableCollapse ? contentOpen : true">
        <div :class="[ns.b('content-box'), props.classNames?.itemContent]" :style="props.styles?.itemContent">
          <slot name="content" :info="props.info" />
        </div>
      </div>
    </template>
    <!-- Footer -->
    <div :class="[ns.b('footer'), props.classNames?.itemFooter]" :style="props.styles?.itemFooter" v-if="slots.footer">
      <slot name="footer" :info="props.info" />
    </div>
  </div>
</template>

<style lang="scss">
@import './index.scss';
</style>