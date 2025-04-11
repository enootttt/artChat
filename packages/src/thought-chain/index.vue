<script setup lang="ts">
import { computed } from "vue";
import { useNamespace } from "../hooks/useNamespace";
import type { ThoughtChainItemProps, ThoughtChainProps } from "./interface";
import useCollapsible from "./hooks/useCollapsible";
import ThoughtChainNode from "./item.vue";

const ns = useNamespace("thought-chain");

const props = withDefaults(defineProps<ThoughtChainProps>(), {
  prefixCls: "",
  rootClassName: "",
  items: () => [],
  collapsible: false,
  styles: () => ({}),
  classNames: () => ({}),
  size: "middle",
});

const slots = defineSlots<{
  icon?(slotProps: { info: ThoughtChainItemProps }): void;
  content?(slotProps: { info: ThoughtChainItemProps }): void;
  extra?(slotProps: { info: ThoughtChainItemProps }): void;
  footer?(slotProps: { info: ThoughtChainItemProps }): void;
}>();

const [enableCollapse, expandedKeys, onItemExpand] = useCollapsible(props.collapsible);

const mergedCls = computed(() => {
  return [ns.b(), props.rootClassName, props.prefixCls, ns.b(props.size)];
});
</script>

<template>
  <div :class="mergedCls" :style="props.rootStyle">
    <template v-for="(item, index) in props.items" :key="item.key || `key_${index}`">
      <ThoughtChainNode
        :class-name="props.classNames?.item"
        :style="props.styles.item"
        :styles="props.styles"
        :info="{ ...item }"
        :header-click="onItemExpand"
        :next-status="props.items[index + 1]?.status || item.status"
        :enable-collapse="enableCollapse"
        :expanded-keys="expandedKeys"
      >
        <template v-for="(_slot, slotName) in slots" :key="slotName" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="{ ...slotProps }"></slot>
        </template>
      </ThoughtChainNode>
    </template>
  </div>
</template>

<style lang="scss">
@import './index.scss';
</style>
