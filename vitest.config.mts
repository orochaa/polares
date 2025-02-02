import path from 'node:path'
import { defineConfig } from 'vitest/config'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  test: {
    globals: true,
    alias: {
      '@/tests': path.resolve('__tests__'),
      '@': path.resolve('src'),
    },
  },
})
