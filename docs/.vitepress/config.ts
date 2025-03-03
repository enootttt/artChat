import { defineConfig } from "vitepress";
import path from "node:path";

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
      noExternal: ['element-plus', '@element-plus/icons-vue'], // 避免打包为 CommonJS
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
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*k0oYSZQMoBwAAAAAAAAAAAAADgCCAQ/original',
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
    ],

    socialLinks: [{ icon: "gitee", link: "https://gitee.com/asd1232rq3123/artmate-chat" }],
  },
});
