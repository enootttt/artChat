<script setup lang="ts">
import { ref, watch, onWatcherCleanup } from "vue";
import { ElSpace, ElButton, ElIcon, ElMessage } from "element-plus";
import { Promotion } from "@element-plus/icons-vue";
import { Sender } from "@artmate/chat";
import StopLoading from "./loading.vue";

const loading = ref(false);
const value = ref("");

// Mock send message
watch(loading, () => {
  if (loading.value) {
    const timer = setTimeout(() => {
      loading.value = false;
      ElMessage.success("Send message successfully!");
    }, 3000);
    onWatcherCleanup(() => {
      clearTimeout(timer);
    });
  }
});

const submit = () => {
  if (!loading.value) {
    value.value = "";
    loading.value = true
    ElMessage.info('Send message!');
  } else {
    loading.value = false
    ElMessage.error('Cancel sending!');
  }
}
</script>

<template>
  <ElSpace style="width: 100%;" direction="vertical" fill>
    <Sender v-model="value">
      <template #actions>
        <ElButton circle type="primary" :disabled="!value && !loading" @click="submit">
          <ElIcon color="white" v-if="!loading">
            <Promotion />
          </ElIcon>
          <ElIcon color="white" size="32" v-else>
            <StopLoading />
          </ElIcon>
        </ElButton>
      </template>
    </Sender>
  
    <Sender model-value="Force as loading" readOnly>
      <template #actions>
        <ElButton circle type="primary">
          <ElIcon color="white" size="32">
            <StopLoading />
          </ElIcon>
        </ElButton>
      </template>
    </Sender>

    <Sender model-value="Set to disabled" disabled>
      <template #actions>
        <ElButton circle type="primary" disabled>
          <ElIcon color="white">
            <Promotion />
          </ElIcon>
        </ElButton>
      </template>
    </Sender>
  </ElSpace>
</template>

<style lang="scss" scoped></style>
