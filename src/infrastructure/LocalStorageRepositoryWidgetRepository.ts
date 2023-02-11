import type { RepositoryWidget } from '../domain/RepositoryWidget'
import type { RepositoryWidgetRepository } from '../domain/RepositoryWidgetRepository'

export class LocalStorageRepositoryWidgetRepository implements RepositoryWidgetRepository {
  async save(widget: RepositoryWidget): Promise<void> {
    await Promise.resolve()
  }
}
