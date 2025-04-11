<script setup lang="ts">
import { Bubble } from '@artmate/chat'
import { ElButton, ElSpace } from 'element-plus'
import { ref } from 'vue'

const text = `
**GPT-Vis**, Components for GPTs, generative AI, and LLM projects. Not only UI Components. [more...](https://github.com/antvis/GPT-Vis) \n\n

Here’s a visualization of Haidilao's food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\`\`\`vis-chart
{
  "type": "line",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}],
  "axisXTitle": "year",
  "axisYTitle": "sale"
}
\`\`\`
`

function RenderMarkdown(content: string) {
  // The @antv/gpt-vis is only support React
  // return h(GPTVis, null, content);
  return content
}

const rerenderKey = ref(0)
</script>

<template>
  <ElSpace direction="vertical" alignment="align-start">
    <div class="btns">
      <ElButton type="primary" @click="rerenderKey += 1">Re-Render</ElButton>
    </div>
    <Bubble
      :key="rerenderKey"
      :typing="{ step: 20, interval: 150 }"
      :content="text"
      :message-render="RenderMarkdown"
      avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      variant="outlined"
    />
  </ElSpace>
</template>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
