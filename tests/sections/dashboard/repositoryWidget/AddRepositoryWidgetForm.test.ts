import { describe, expect, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'
import AddRepositoryWidgetForm from '@/sections/dashboard/repositoryWidget/AddRepositoryWidgetForm.vue'
import type { RepositoryWidget } from '@/domain/RepositoryWidget'
import { render, screen } from '~/tests'
import type { LocalStorageRepositoryWidgetRepository } from '@/infrastructure/LocalStorageRepositoryWidgetRepository'
import { DomainEvents } from '@/domain/DomainEvents'

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

  test('should save a new widget when form is submitted', async () => {
    const dispatchEventSpy = vi.spyOn(document, 'dispatchEvent')
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

    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(CustomEvent))
    expect(dispatchEventSpy.mock.calls[0][0].type).toEqual(DomainEvents.repositoryWidgetAdded)
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
      description: new RegExp(`The repository with url ${newWidgetWithSameUrl.repositoryUrl} already exists`, 'i'),
    })

    expect(errorMessage).toBeInTheDocument()
    expect(mockRepository.save).not.toHaveBeenCalled()
  })

  test('should show an error when the url is invalid', async () => {
    mockRepository.search.mockResolvedValue([])

    const newWidget: RepositoryWidget = {
      id: 'newWidgetId',
      repositoryUrl: 'invalidUrl',
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
    await user.type(id, newWidget.id)

    const url = screen.getByLabelText(/repository url/i)
    await user.type(url, newWidget.repositoryUrl)

    const submitButton = await screen.findByRole('button', {
      name: /Add/,
    })
    await user.click(submitButton)

    const errorMessage = await screen.findByRole('alert', {
      description: new RegExp(`The ${newWidget.repositoryUrl} is not a valid GitHub repository url`, 'i'),
    })

    expect(errorMessage).toBeInTheDocument()
    expect(mockRepository.save).not.toHaveBeenCalled()
  })

  test('should show an error when the url has not a GitHub host name', async () => {
    mockRepository.search.mockResolvedValue([])

    const newWidget: RepositoryWidget = {
      id: 'newWidgetId',
      repositoryUrl: 'https://bitbucket.org/CodelyTV/DevDash',
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
    await user.type(id, newWidget.id)

    const url = screen.getByLabelText(/repository url/i)
    await user.type(url, newWidget.repositoryUrl)

    const submitButton = await screen.findByRole('button', {
      name: /Add/,
    })
    await user.click(submitButton)

    const errorMessage = await screen.findByRole('alert', {
      description: new RegExp(`The ${newWidget.repositoryUrl} is not a valid GitHub repository url`, 'i'),
    })

    expect(errorMessage).toBeInTheDocument()
    expect(mockRepository.save).not.toHaveBeenCalled()
  })

  test('should save a new widget after fix form errors', async () => {
    mockRepository.search.mockResolvedValue([])

    const invalidUrl = 'https://bitbucket.org/CodelyTV/DevDash'

    const newWidget: RepositoryWidget = {
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
    await user.type(id, newWidget.id)

    const url = screen.getByLabelText(/repository url/i)
    await user.type(url, invalidUrl)

    const submitButton = await screen.findByRole('button', {
      name: /Add/,
    })
    await user.click(submitButton)

    const errorMessage = await screen.findByRole('alert', {
      description: new RegExp(`The ${invalidUrl} is not a valid GitHub repository url`, 'i'),
    })

    expect(errorMessage).toBeInTheDocument()
    expect(mockRepository.save).not.toHaveBeenCalled()

    await user.clear(url)
    await user.type(url, newWidget.repositoryUrl)
    await user.click(submitButton)

    expect(errorMessage).not.toBeInTheDocument()
    expect(mockRepository.save).toHaveBeenCalledWith(newWidget)
  })
})
