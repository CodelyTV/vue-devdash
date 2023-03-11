import { RepositoryAlreadyExistsError } from '@/domain/RepositoryAlreadyExistsError'
import type { RepositoryWidget } from '@/domain/RepositoryWidget'
import type { RepositoryWidgetRepository } from '@/domain/RepositoryWidgetRepository'

export function useAddRepositoryWidget(repository: RepositoryWidgetRepository): {
  save: (widget: RepositoryWidget) => Promise<RepositoryAlreadyExistsError | void>
} {
  async function save(widget: RepositoryWidget): Promise<RepositoryAlreadyExistsError | void> {
    const widgets = await repository.search()
    const widgetAlreadyExists = widgets.some(w => w.repositoryUrl === widget.repositoryUrl)

    if (widgetAlreadyExists)
      return new RepositoryAlreadyExistsError(widget.repositoryUrl)

    await repository.save(widget)
  }

  return { save }
}
