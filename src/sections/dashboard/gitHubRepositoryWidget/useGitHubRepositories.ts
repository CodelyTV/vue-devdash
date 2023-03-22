import { type Ref, ref, watch } from 'vue'
import { type MaybeComputedRef, resolveUnref } from '@vueuse/core'
import type { GitHubRepository } from '@/domain/GitHubRepository'
import type { GitHubRepositoryRepository } from '@/domain/GitHubRepositoryRepository'

export function useGitHubRepositories(
  repository: GitHubRepositoryRepository,
  repositoryUrls: MaybeComputedRef<string[]>,
): {
    repositoryData: Ref<GitHubRepository[]>
    isLoading: Ref<boolean>
  } {
  const repositoryData = ref<GitHubRepository[]>([])
  const isLoading = ref(false)

  watch(repositoryUrls, () => {
    isLoading.value = true
    repository.search(resolveUnref(repositoryUrls)).then((data) => {
      repositoryData.value = data
      isLoading.value = false
    })
  })

  return {
    repositoryData,
    isLoading,
  }
}
