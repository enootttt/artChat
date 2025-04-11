import antfu from '@antfu/eslint-config'

export default antfu({
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  vue: {
    'vue/block-order': [
      'error',
      {
        // 块顺序
        order: ['script', 'template', 'style'],
      },
    ],
  },
  typescript: true,
  stylistic: {
    indent: 2, // 缩进
    semi: false, // 语句分号
    quotes: 'single', // 单引号
  },
  rules: {
    'new-cap': ['off', { newIsCap: true, capIsNew: false }],
    'no-console': 'off', // 忽略console
    'regexp/no-super-linear-backtracking': 'off', // 忽略正则表达式的超线性回溯
    'no-unmodified-loop-condition': 'off', // 忽略循环条件未修改
    'style/operator-linebreak': 'off', // 忽略换行
  },
  ignores: [
    '**/dist/**',
    '**/node_modules/**',
    '**/build/**',
    '**/lib/**',
    '**/es/**',
    '**/types/**',
    '**/public/**',
    '**/vite.config.ts',
    '**/eslint.config.js',
  ],
})
