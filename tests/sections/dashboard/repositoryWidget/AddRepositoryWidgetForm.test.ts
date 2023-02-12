import { describe, expect, test } from 'vitest'
import { mock } from 'vitest-mock-extended'
import type { LocalStorageRepositoryWidgetRepository } from '@/infrastructure/LocalStorageRepositoryWidgetRepository'
import AddRepositoryWidgetFormVue from '@/sections/dashboard/repositoryWidget/AddRepositoryWidgetForm.vue'
import type { RepositoryWidget } from '@/domain/RepositoryWidget'
import { render, screen } from '~/tests'

const mockRepository = mock<LocalStorageRepositoryWidgetRepository>()

describe('AddRepositoryWidgetForm', () => {
  test('should show the widget form when add button is clicked', async () => {
    const { user } = render(AddRepositoryWidgetFormVue, {
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
    const newWidget: RepositoryWidget = {
      id: 'newWidgetId',
      repositoryUrl: 'https://github.com/CodelyTV/DevDash',
    }

    const { user } = render(AddRepositoryWidgetFormVue, {
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
})
