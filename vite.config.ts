import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "./packages/index.ts",
      fileName: (format) => `artmate-chat.${format}.js`,
      name: "ArtmateChat",
    },
    minify: false,
    rollupOptions: {
      external: ["vue", "element-plus", "@element-plus/icons-vue"],
      input: "./packages/index.ts",
      output: [
        // 完整引入的构建产物
        {
          format: "es",
          dir: "dist/full",
          entryFileNames: "index.js",
          preserveModules: false,
          exports: "named",
        },
        // 按需引入的构建产物
        {
          format: "es",
          dir: "dist/es",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "packages",
          exports: "named",
        },
        {
          format: "cjs",
          dir: "dist/cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "packages",
          exports: "named",
        },
      ],
    },
  },
  plugins: [
    vue(),
    dts({
      entryRoot: "./packages",
      outDir: ["dist/es/types", "dist/cjs/types", "dist/full/types"],
    }),
  ],
});
