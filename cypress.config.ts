import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:4173',
    specPattern: 'tests/e2e/tests/**/*.test.{js,jsx,ts,tsx}',
    screenshotOnRunFailure: false,
    video: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    supportFile: 'tests/e2e/support/e2e.ts',
  },
})
