import { type Ref, ref } from 'vue'
import type { RepositoryWidget } from '@/domain/RepositoryWidget'
import { config } from '@/config'

const repositoryWidgets = ref<RepositoryWidget[]>([])

export function useRepositoryWidgets(): { repositoryWidgets: Ref<RepositoryWidget[]> } {
  repositoryWidgets.value = config.widgets.map(widget => ({ id: widget.id, repositoryUrl: widget.repository_url }))

  return {
    repositoryWidgets,
  }
}
