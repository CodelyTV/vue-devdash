import { type Ref, onBeforeMount, onUnmounted, ref } from 'vue'
import type { RepositoryWidget } from '@/domain/RepositoryWidget'
import type { RepositoryWidgetRepository } from '@/domain/RepositoryWidgetRepository'
import { config } from '@/config'
import { DomainEvents } from '@/domain/DomainEvents'

const repositoryWidgets = ref<RepositoryWidget[]>([])

export function useRepositoryWidgets(repositoryWidgetRepository: RepositoryWidgetRepository): { repositoryWidgets: Ref<RepositoryWidget[]> } {
  onBeforeMount(async () => {
    let widgets = await repositoryWidgetRepository.search() || []

    if (widgets.length === 0)
      widgets = config.widgets.map(widget => ({ id: widget.id, repositoryUrl: widget.repository_url }))

    repositoryWidgets.value = widgets
  })

  async function reloadRepositoryWidgets() {
    repositoryWidgets.value = await repositoryWidgetRepository.search()
  }

  document.addEventListener(DomainEvents.repositoryWidgetAdded, reloadRepositoryWidgets)

  onUnmounted(() => {
    document.removeEventListener(DomainEvents.repositoryWidgetAdded, reloadRepositoryWidgets)
  })

  return {
    repositoryWidgets,
  }
}
