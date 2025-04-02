<script setup lang="ts" generic="T = any">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { ElPopover, ElCascaderPanel } from "element-plus";
import { useNamespace } from "../hooks/useNamespace";
import useActive from "./useActive";
import type { RenderChildrenProps, SuggestionProps } from "./interface";

const props = withDefaults(defineProps<SuggestionProps<T>>(), {
  rootClassName: "",
});

const emit = defineEmits(["select"]);

const slots = defineSlots<{
  default: (options: { onTrigger: RenderChildrenProps<T>["onTrigger"]; onKeyDown: (e: KeyboardEvent) => void }) => RenderChildrenProps<T>;
}>();

const ns = useNamespace("suggestion");

const CascaderPanelRef = ref<InstanceType<typeof ElCascaderPanel>>();

const info = ref<T | undefined>();

const isRTL = computed(() => props.direction === "rtl");

const defaultContainer = ref<HTMLElement>();

// =========================== Trigger ============================
const mergedOpen = ref(props.open);

// ============================ Items =============================
const itemList = computed(() => {
  return typeof props.items === "function" ? props.items(info.value) : props.items;
});

const triggerOpen = (nextOpen: boolean) => {
  mergedOpen.value = nextOpen;
  props.onOpenChange?.(nextOpen);
  if (!nextOpen) {
    CascaderPanelRef.value?.clearCheckedNodes();
  }
};

const onInternalChange = (valuePath: string[]) => {
  emit("select", valuePath[valuePath.length - 1]);
  triggerOpen(false);
};

const onClose = () => {
  triggerOpen(false);
};

const onTrigger: RenderChildrenProps<T>["onTrigger"] = (nextInfo) => {
  if (nextInfo === false) {
    triggerOpen(false);
  } else {
    info.value = nextInfo;
    triggerOpen(true);
  }
};

const [activePath, onKeyDown] = useActive(itemList, mergedOpen, isRTL, onInternalChange, onClose);

const onDropdownVisibleChange = (nextOpen: boolean) => {
  if (!nextOpen) {
    onClose();
  } else {
    console.log(activePath.value);
    onInternalChange(activePath.value);
  }
};

const popoverWidth = computed(() => {
  if (props.block && defaultContainer.value) {
    return defaultContainer.value.offsetWidth + "px";
  }
  return "max-content";
});

// ============================ Document Click =============================
const documentClick = (e: Event) => {
  if (defaultContainer.value && !defaultContainer.value.contains(e.target as HTMLElement)) {
    onClose();
  }
};

onMounted(() => {
  document.addEventListener("click", documentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", documentClick);
});
</script>

<template>
  <ElPopover
    :class-name="[props.rootClassName]"
    trigger="click"
    :placement="isRTL ? 'top-end' : 'top-start'"
    :visible="mergedOpen"
    :stop-popper-mouse-event="false"
    :gpu-acceleration="false"
    :width="popoverWidth"
    effect="light"
    pure
    persistent
    @hide="onDropdownVisibleChange"
  >
    <template #reference>
      <div ref="defaultContainer" :class="[ns.b(), props.rootClassName, props.className, ns.b('wrapper')]" :style="props.style">
        <slot :onTrigger="onTrigger" :onKeyDown="onKeyDown" />
      </div>
    </template>
    <ElCascaderPanel ref="CascaderPanelRef" :class="ns.b('cascader-panel')" :options="itemList" :border="false" :model-value="activePath" @close="onDropdownVisibleChange(true)" />
  </ElPopover>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
