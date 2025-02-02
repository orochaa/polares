import plugin from 'eslint-plugin-mist3rbru'

export default [
  plugin.configs.node,
  plugin.configs.vitest,
  {
    rules: {
      'vitest/assertion-type': 'off',
      'vitest/unbound-method': 'off',
    },
  },
  {
    files: ['**/index.ts'],
    rules: {
      '@stylistic/padding-line-between-statements': 'off',
    },
  },
]
