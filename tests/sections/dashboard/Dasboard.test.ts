import { describe, expect, test } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { render, screen } from '@testing-library/vue'
import type { GitHubRepositoryRepository } from '../../../src/domain/GitHubRepositoryRepository'
import Dashboard from '../../../src/sections/dashboard/Dashboard.vue'
import { GitHubRepositoryMother } from '../../GitHubRepositoryMother'

const mockRepository = mock<GitHubRepositoryRepository>()

describe('Dashboard section', () => {
  test('should show all widgets', async () => {
    const gitHubRepository = GitHubRepositoryMother.create()
    mockRepository.search.mockResolvedValue([gitHubRepository])

    render(Dashboard, {
      props: {
        repository: mockRepository,
      },
    })

    const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`
    const firstWidgetHeader = await screen.findByRole('heading', {
      name: new RegExp(firstWidgetTitle, 'i'),
    })

    expect(firstWidgetHeader).toBeInTheDocument()
  })

  test('should show not results message when there are no widgets', async () => {
    mockRepository.search.mockResolvedValue([])

    render(Dashboard, {
      props: {
        repository: mockRepository,
      },
    })

    const noResults = await screen.findByText(/No widgets are configured./i)

    expect(noResults).toBeInTheDocument()
  })

  test('should show last modified date in human readable format', async () => {
    const gitHubRepository = GitHubRepositoryMother.create({ updatedAt: new Date() })

    mockRepository.search.mockResolvedValue([gitHubRepository])

    render(Dashboard, {
      props: {
        repository: mockRepository,
      },
    })

    const modificationDate = await screen.findByText(/today/i)

    expect(modificationDate).toBeInTheDocument()
  })
})
