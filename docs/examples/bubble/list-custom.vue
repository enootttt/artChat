<script setup lang="ts">
import { h } from "vue";
import { BubbleList, Prompts, FileList } from "@artmate/chat";
import type { BubbleListProps, PromptProps, fileListProps } from "@artmate/chat";

const promptItems: PromptProps[] = [
  {
    key: "6",
    description: "How to rest effectively after long hours of work?",
  },
  {
    key: "7",
    description: "What are the secrets to maintaining a positive mindset?",
  },
  {
    key: "8",
    description: "How to stay calm under immense pressure?",
  },
];

const fileItems: any = [
  {
    uid: '1',
    name: "excel-file.xlsx",
    size: 111111,
    description: "Checking the data",
  },
  {
    uid: '2',
    name: "word-file.docx",
    size: 222222,
    status: "uploading",
    percent: 23,
  },
];

const items: BubbleListProps["items"] = [
  // Normal
  {
    key: 0,
    role: "ai",
    avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    content: "Normal message",
  },

  // ReactNode
  {
    key: 1,
    role: "ai",
    avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    content: "ReactNode message",
  },

  // Role: suggestion
  {
    key: 2,
    role: "suggestion",
    variant: "borderless",
    avatar: "123",
    styles: {
      avatar: {
        visibility: "hidden",
      },
    },
    messageRender: () => h(Prompts, { items: promptItems, vertical: true }),
  },
  // Role: file
  {
    key: 3,
    role: "file",
    variant: "borderless",
    avatar: "123",
    styles: {
      avatar: {
        visibility: "hidden",
      },
    },
    messageRender: () =>
      h(FileList, {
        items: fileItems,
        listStyle: {
          flexDirection: "column",
          padding: "0px",
        },
        disabled: true,
        onRemove: () => {},
        upload: {}
      }),
  },
];
</script>

<template>
  <BubbleList :items="items" />
</template>

<style lang="scss" scoped></style>
