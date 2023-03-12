import { afterEach, expect } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/vue'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
