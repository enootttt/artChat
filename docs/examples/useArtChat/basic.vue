<script setup lang="ts">
import { useArtChat } from '@artmate/chat'
import { ref } from 'vue'

const inputText = ref('')

const { messages, setMessages } = useArtChat({
  initialMessages: [
    {
      id: '1',
      type: 'text',
      content: '你好,我是AI助手',
      sender: 'assistant',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=assistant'
    }
  ]
})

const handleSend = () => {
  if (!inputText.value) return

  // 添加用户消息
  setMessages([
    ...messages.value,
    {
      id: String(Date.now()),
      type: 'text', 
      content: inputText.value,
      sender: 'user',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
    }
  ])

  // 模拟AI回复
  setTimeout(() => {
    setMessages([
      ...messages.value,
      {
        id: String(Date.now()),
        type: 'text',
        content: '收到你的消息了!',
        sender: 'assistant',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=assistant'
      }
    ])
  }, 500)

  inputText.value = ''
}
</script>

<template>
  <div class="chat-container">
    <!-- 消息列表 -->
    <div class="messages">
      <div v-for="msg in messages" :key="msg.id" class="message" :class="msg.sender">
        <img :src="msg.avatar" class="avatar" :alt="msg.sender" />
        <div class="content">{{ msg.content }}</div>
      </div>
    </div>

    <!-- 发送消息区域 -->
    <div class="input-area">
      <input 
        v-model="inputText"
        type="text" 
        placeholder="请输入消息"
        @keyup.enter="handleSend"
      />
      <button @click="handleSend">发送</button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  padding: 20px;
}

.messages {
  min-height: 300px;
  border: 1px solid #eee;
  margin-bottom: 20px;
  padding: 10px;
}

.message {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  gap: 8px;
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
}

.content {
  padding: 8px 12px;
  border-radius: 8px;
  max-width: 70%;
}

.user .content {
  background: #1890ff;
  color: white;
}

.assistant .content {
  background: #f0f0f0;
  color: #333;
}

.input-area {
  display: flex;
  gap: 10px;
}

.input-area input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input-area button {
  padding: 8px 16px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-area button:hover {
  background: #40a9ff;
}
</style>
