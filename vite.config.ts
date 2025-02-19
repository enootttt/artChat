import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import type { OutputOptions } from 'rollup'

// rollup 公共配置
const rollupOutputBase: OutputOptions = {
  assetFileNames: (assetInfo) => {
    if (assetInfo.name?.endsWith('.css')) {
      return 'index.css';
    }
    return assetInfo.name as string;
  },
  entryFileNames: '[name].js',
  inlineDynamicImports: false,
  manualChunks: undefined,
  preserveModules: true,
  preserveModulesRoot: 'packages',
  exports: 'named'
}

export default defineConfig(() => {
  return {
    build: {
      cssCodeSplit: false,
      lib: {
        entry: './packages/index.ts',
        fileName: (format) => `artmate-chat.${format}.js`,
        name: 'ArtmateChat',
      },
      rollupOptions: {
        external: ['vue', 'element-plus', '@element-plus/icons-vue'],
        output: [
          {
            ...rollupOutputBase,
            dir: 'dist/es',
            format: 'es',
          },
          {
            ...rollupOutputBase,
            dir: 'dist/cjs',
            format: 'cjs',
          },
        ],
      },
    },
    plugins: [
      vue(),
      dts({
        entryRoot: "./packages",
        outDir: ['dist/typings'],
      }),
    ],
  };
});
