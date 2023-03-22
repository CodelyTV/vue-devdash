import { DomainEvents } from '@/domain/DomainEvents'
import { RepositoryAlreadyExistsError } from '@/domain/RepositoryAlreadyExistsError'
import { RepositoryInvalidUrlError } from '@/domain/RepositoryInvalidUrlErrorr'
import type { RepositoryWidget } from '@/domain/RepositoryWidget'
import type { RepositoryWidgetRepository } from '@/domain/RepositoryWidgetRepository'

function isAValidRepositoryUrl(url: string): boolean {
  try {
    const newUrl = new URL(url)
    return (newUrl.protocol === 'http:' || newUrl.protocol === 'https:') && newUrl.host === 'github.com'
  }
  catch (error) {
    return false
  }
}

export function useAddRepositoryWidget(repository: RepositoryWidgetRepository): {
  save: (widget: RepositoryWidget) => Promise<RepositoryAlreadyExistsError | void>
} {
  async function save(widget: RepositoryWidget): Promise<RepositoryAlreadyExistsError | void> {
    const invalidUrl = !isAValidRepositoryUrl(widget.repositoryUrl)
    if (invalidUrl)
      return new RepositoryInvalidUrlError(widget.repositoryUrl)

    const widgets = await repository.search()
    const widgetAlreadyExists = widgets.some(w => w.repositoryUrl === widget.repositoryUrl)

    if (widgetAlreadyExists)
      return new RepositoryAlreadyExistsError(widget.repositoryUrl)

    await repository.save(widget)
    document.dispatchEvent(new CustomEvent(DomainEvents.repositoryWidgetAdded))
  }

  return { save }
}
