import type { RepositoryWidget } from '../domain/RepositoryWidget'
import type { RepositoryWidgetRepository } from '../domain/RepositoryWidgetRepository'

export class LocalStorageRepositoryWidgetRepository implements RepositoryWidgetRepository {
  async search(): Promise<RepositoryWidget[]> {
    return Promise.resolve([])
  }

  async save(widget: RepositoryWidget): Promise<void> {
    await Promise.resolve()
  }
}
