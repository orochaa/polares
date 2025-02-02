import plugin from 'eslint-plugin-mist3rbru'

export default [
  plugin.configs.node,
  plugin.configs.vitest,
  {
    files: ['**/index.ts'],
    rules: {
      '@stylistic/padding-line-between-statements': 'off',
    },
  },
]
