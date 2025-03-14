import { defineConfig } from "vitepress";
import path from "node:path";
import { mdPlugin } from './config/plugins'
import { MarkdownTransform } from './plugins/markdown-transform';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ArtChat",
  description: "Ant Design X For Vue (Element Plus)",
  vite: {
    resolve: {
      alias: [
        {
          find: /^@artmate\/chat$/,
          replacement: path.resolve(__dirname, "../../packages"),
        },
      ],
    },
    ssr: {
      noExternal: ["element-plus", "@element-plus/icons-vue"], // 避免打包为 CommonJS
    },
    build: {
      rollupOptions: {
        output: {
          globals: {
            "art-chat": "ArtChat",
          },
        },
      },
    },
    plugins: [
      MarkdownTransform() as any
    ]
  },
  markdown: {
    config: (md) => mdPlugin(md),
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*k0oYSZQMoBwAAAAAAAAAAAAADgCCAQ/original",
    nav: [
      { text: "组件", link: "/component/overview" },
      {
        text: "更多",
        items: [
          { text: "Ant Design X of React", link: "https://x.ant.design/index-cn" },
          { text: "Ant Design X of Vue", link: "https://antd-design-x-vue.netlify.app" },
        ],
      },
    ],

    sidebar: [
      {
        text: "总览",
        link: "/component/overview",
      },
      {
        text: "通用",
        items: [
          { text: "Bubble 对话气泡框", link: "/component/bubble" },
          { text: "Conversations 管理对话", link: "/component/conversations" }
        ],
      },
      {
        text: "唤醒",
        items: [
          { text: "Welcome 欢迎页", link: "/component/welcome" },
          { text: "Prompts 提示集", link: "/component/prompts" },
        ],
      },
      {
        text: "表达",
        items: [
          { text: "Sender 输入框", link: "/component/sender" },
        ],
      },
      {
        text: "确认",
        items: [
          { text: "ThoughtChain 思维链", link: "/component/thought-chain" },
        ],
      },
      {
        text: "工具",
        items: [
          { text: "useArtAgent 模型调度", link: "/component/useArtAgent" },
          { text: "useArtChat 管理聊天状态", link: "/component/useArtChat" },
        ],
      },
    ],

    socialLinks: [{ icon: "gitee", link: "https://gitee.com/asd1232rq3123/artmate-chat" }],
  },
});
