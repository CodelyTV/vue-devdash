import type { RenderOptions, RenderResult } from '@testing-library/vue'
import { render as tlRender } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import UserEvent from '@testing-library/user-event'
import router from '@/router'

interface RenderOptionsWithUser { user: typeof UserEvent }

export * from '@testing-library/vue'

export function render(testComponent: unknown, options: RenderOptions = {}): RenderOptionsWithUser {
  return {
    user: UserEvent.setup() as unknown as typeof UserEvent,
    ...tlRender(testComponent, options),
  }
}

export function renderWithRouter(testComponent: unknown, options: RenderOptions = {}): RenderResult {
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
