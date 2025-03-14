<script setup lang="ts">
import { ref, computed } from "vue";
import { ElSpace, ElButton, ElIcon, ElAvatar } from "element-plus";
import { Promotion } from "@element-plus/icons-vue";
import { BubbleList, Sender, useArtAgent, useArtChat } from "@artmate/chat";
import type { BubbleListProps } from "@artmate/chat";

const roles: BubbleListProps["roles"] = {
  ai: {
    placement: "start",
    typing: { step: 5, interval: 20 },
  },
  local: {
    placement: "end",
  },
};

const content = ref("");
const senderLoading = ref(false);

// Agent for request
const [agent] = useArtAgent({
  request: async ({ message }, { onUpdate, onSuccess }) => {
    senderLoading.value = true;
    const fullContent = `Streaming output instead of Bubble typing effect. You typed: ${message}`;
    let currentContent = "";
    const id = setInterval(() => {
      currentContent = fullContent.slice(0, currentContent.length + 2);
      onUpdate(currentContent);

      if (currentContent === fullContent) {
        senderLoading.value = false;
        clearInterval(id);
        onSuccess(fullContent);
      }
    }, 100);
  },
});

// Chat messages
const { onRequest, messages } = useArtChat({
  agent,
});

const messageList = computed(() => {
  return messages.value.map(({ id, message, status }) => ({
    key: id,
    role: status === "local" ? "local" : "ai",
    content: message,
  }));
});

const submit = () => {
  onRequest(content.value);
  content.value = "";
};
</script>

<template>
  <ElSpace direction="vertical" style="width: 100%" fill>
    <BubbleList :roles="roles" :style="{ maxHeight: '300px' }" :items="messageList">
      <template #avatar="{ info }">
        <ElAvatar>
          {{ info.role === "ai" ? "AI" : "You" }}
        </ElAvatar>
      </template>
    </BubbleList>
    <Sender v-model="content" :loading="senderLoading">
      <template #actions>
        <ElButton circle type="primary" :disabled="senderLoading || !content" @click="submit">
          <ElIcon color="white">
            <Promotion />
          </ElIcon>
        </ElButton>
      </template>
    </Sender>
  </ElSpace>
</template>
