import { describe, expect, test } from 'vitest'
import { mock } from 'vitest-mock-extended'
import AddRepositoryWidgetForm from '@/sections/dashboard/repositoryWidget/AddRepositoryWidgetForm.vue'
import type { RepositoryWidget } from '@/domain/RepositoryWidget'
import { render, screen } from '~/tests'
import type { LocalStorageRepositoryWidgetRepository } from '@/infrastructure/LocalStorageRepositoryWidgetRepository'

const mockRepository = mock<LocalStorageRepositoryWidgetRepository>()

describe('AddRepositoryWidgetForm', () => {
  test('should show the widget form when add button is clicked', async () => {
    const { user } = render(AddRepositoryWidgetForm, {
      props: {
        repository: mockRepository,
      },
    })

    const addButton = screen.getByRole('button', {
      name: /add repository/i,
    })
    await user.click(addButton)

    const url = screen.getByLabelText(/repository url/i)
    expect(url).toBeInTheDocument()
  })

  test('should save new widget when form is submitted', async () => {
    mockRepository.search.mockResolvedValue([])

    const newWidget: RepositoryWidget = {
      id: 'newWidgetId',
      repositoryUrl: 'https://github.com/CodelyTV/DevDash',
    }

    const { user } = render(AddRepositoryWidgetForm, {
      props: {
        repository: mockRepository,
      },
    })

    const addButton = screen.getByRole('button', {
      name: /add repository/i,
    })
    await user.click(addButton)

    const id = screen.getByLabelText(/id/i)
    await user.type(id, newWidget.id)

    const url = screen.getByLabelText(/repository url/i)
    await user.type(url, newWidget.repositoryUrl)

    const submitButton = screen.getByRole('button', {
      name: /Add/,
    })
    await user.click(submitButton)

    const addAnotherRepositoryFormButton = screen.getByRole('button', {
      name: /add repository/i,
    })

    expect(addAnotherRepositoryFormButton).toBeInTheDocument()
    expect(mockRepository.save).toHaveBeenCalledWith(newWidget)
  })

  test('should show an error when repository already exists in Dashboard', async () => {
    const existingWidget: RepositoryWidget = {
      id: 'existingWidgetId',
      repositoryUrl: 'https://github.com/CodelyTV/DevDash',
    }

    mockRepository.search.mockResolvedValue([existingWidget])

    const newWidgetWithSameUrl: RepositoryWidget = {
      id: 'newWidgetId',
      repositoryUrl: 'https://github.com/CodelyTV/DevDash',
    }

    const { user } = render(AddRepositoryWidgetForm, {
      props: {
        repository: mockRepository,
      },
    })

    const addButton = await screen.findByRole('button', {
      name: /add repository/i,
    })
    await user.click(addButton)

    const id = screen.getByLabelText(/id/i)
    await user.type(id, newWidgetWithSameUrl.id)

    const url = screen.getByLabelText(/repository url/i)
    await user.type(url, newWidgetWithSameUrl.repositoryUrl)

    const submitButton = await screen.findByRole('button', {
      name: /Add/,
    })
    await user.click(submitButton)

    const errorMessage = await screen.findByRole('alert', {
      description: /repository already exists/i,
    })

    expect(errorMessage).toBeInTheDocument()
    expect(mockRepository.save).not.toHaveBeenCalledWith(newWidgetWithSameUrl)
  })
})
