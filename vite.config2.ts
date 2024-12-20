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
    // 添加以下配置
    minify: false, // 暂时关闭压缩，看看是否解决问题
    rollupOptions: {
      external: ["vue", "element-plus", "@element-plus/icons-vue"],
      input: "./packages/index.ts",
      output: [
        {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) {
              return "index.css";
            }
            return assetInfo.name as string;
          },
          dir: "dist/es",
          entryFileNames: "[name].js",
          format: "es",
          // 添加以下配置
          inlineDynamicImports: false,
          manualChunks: undefined,
          preserveModules: true,
          preserveModulesRoot: "packages",
          exports: "named"
        },
        {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) {
              return "index.css";
            }
            return assetInfo.name as string;
          },
          dir: "dist/cjs",
          entryFileNames: "[name].js",
          format: "cjs",
          // 添加以下配置
          inlineDynamicImports: false,
          manualChunks: undefined,
          preserveModules: true,
          preserveModulesRoot: "packages",
          exports: "named"
        },
      ],
    },
    // sourcemap: true, // 开启sourcemap方便调试
  },
  plugins: [
    vue(),
    dts({
      entryRoot: "./packages",
      outDir: ["dist/es/types", "dist/cjs/types"],
    }),
  ],
});
