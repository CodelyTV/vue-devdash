import { describe, expect, test } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { renderWithRouter, screen } from '~/tests'
import type { GitHubRepositoryRepository } from '@/domain/GitHubRepositoryRepository'
import Dashboard from '@/sections/dashboard/Dashboard.vue'
import { GitHubRepositoryMother } from '~/tests/GitHubRepositoryMother'
import type { RepositoryWidgetRepository } from '@/domain/RepositoryWidgetRepository'

const mockRepository = mock<GitHubRepositoryRepository>()
const mockRepositoryWidget = mock<RepositoryWidgetRepository>()

describe('Dashboard section', () => {
  test('should show all widgets', async () => {
    const gitHubRepository = GitHubRepositoryMother.create()
    mockRepository.search.mockResolvedValue([gitHubRepository])

    renderWithRouter(Dashboard, {
      props: {
        gitHubRepositoryRepository: mockRepository,
        repositoryWidgetRepository: mockRepositoryWidget,
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

    renderWithRouter(Dashboard, {
      props: {
        gitHubRepositoryRepository: mockRepository,
        repositoryWidgetRepository: mockRepositoryWidget,
      },
    })

    const noResults = await screen.findByText(/No widgets are configured./i)

    expect(noResults).toBeInTheDocument()
  })

  test('should show last modified date in human readable format', async () => {
    const gitHubRepository = GitHubRepositoryMother.create({ updatedAt: new Date() })

    mockRepository.search.mockResolvedValue([gitHubRepository])

    renderWithRouter(Dashboard, {
      props: {
        gitHubRepositoryRepository: mockRepository,
        repositoryWidgetRepository: mockRepositoryWidget,
      },
    })

    const modificationDate = await screen.findByText(/today/i)

    expect(modificationDate).toBeInTheDocument()
  })
})
