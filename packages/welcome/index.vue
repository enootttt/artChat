<script setup lang="ts">
import { ref, computed } from 'vue';
import type { WelcomeProps, WelcomeEmits } from './interface';
import { useNamespace } from '../hooks/useNamespace';

defineOptions({
    name: 'Welcome',
});

const props = withDefaults(defineProps<WelcomeProps>(), {
    variant: 'filled'
});

const emit = defineEmits<WelcomeEmits>();

const ns = useNamespace('welcome');

const welcomeText = ref('欢迎使用 ChatUI,这是一个基于 Vue3 的聊天界面组件库。');

const mergedCls = computed(() => [
    props.rootClassName,
    {
        [ns.b('filled')]: props.variant === 'filled',
        [ns.b('borderless')]: props.variant === 'borderless'
    }
]);

console.log(ns);

</script>

<template>
    <!-- 欢迎页面容器 -->
    <div :class="[ns.b(), mergedCls]">
        <div :class="ns.b('content')">
            <!-- 左侧图标区域 -->
            <div :class="ns.b('left')">
                <div v-if="$slots.icon || icon" :class="[ns.b('icon'), classNames?.icon]" :style="styles?.icon"
                    @click="emit('click-icon')">
                    <slot name="icon">
                        <img v-if="typeof icon === 'string'" :src="icon" alt="欢迎图标" />
                        <template v-else>{{ icon }}</template>
                    </slot>
                </div>
            </div>

            <!-- 右侧内容区域 -->
            <div :class="ns.b('right')">


                <!-- 标题区域 -->
                <div v-if="$slots.title || title" :class="[ns.b('title'), classNames?.title]" :style="styles?.title"
                    @click="emit('click-title')">
                    <slot name="title">{{ title }}</slot>
                </div>


                <!-- 描述区域 -->
                <div :class="[ns.b('description'), classNames?.description]" :style="styles?.description">
                    <slot name="description">
                        {{ description || welcomeText }}
                    </slot>
                </div>
                <!-- 右上角操作区域 -->
                <div v-if="$slots.extra || extra" :class="[ns.b('extra'), classNames?.extra]" :style="styles?.extra"
                    @click="emit('start')">
                    <slot name="extra">{{ extra }}</slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "./index.scss";
</style>
