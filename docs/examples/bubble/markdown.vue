<script setup lang="ts">
import { Bubble } from '@artmate/chat'
import markdownit from 'markdown-it'

const md = markdownit({ html: true })
const text = `
> Render as markdown content to show rich text!

Link: [Ant Design X](https://x.ant.design)
`.trim()

const msgRender = (text: string) => md.render(text)
</script>

<template>
  <Bubble
    :content="text"
    typing
    avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    :message-render="msgRender"
  />
</template>
