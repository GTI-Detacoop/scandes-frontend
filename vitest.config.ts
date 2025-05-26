import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov', 'cobertura', 'json-summary'],
        reportsDirectory: './coverage',
        include: ['src/**/*.{js,ts,jsx,tsx,vue}'],
        exclude: [
          'src/**/*.{spec,test}.{js,ts,jsx,tsx}',
          'src/**/__tests__/**',
          'src/**/*.d.ts',
          'coverage/**',
          'dist/**',
          '**/[.]**',
          'packages/*/test?(s)/**',
          '**/virtual:*',
          '**/__mocks__/*',
          '**/node_modules/**',
          'e2e/**'
        ],
        all: true,
        clean: true,
        cleanOnRerun: true
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
