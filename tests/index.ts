import type { RenderOptions } from '@testing-library/vue'
import { render as tlRender } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import router from '@/router'

export * from '@testing-library/vue'

export const render = (testComponent: unknown, options: RenderOptions = {}) => {
  return tlRender(testComponent, {
    ...options,
    global: {
      plugins: [
        router,
      ],
      stubs: { RouterLink: RouterLinkStub },
    },
  })
}
