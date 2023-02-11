import { type Ref, ref, watchEffect } from 'vue'
import type { GitHubRepository } from '@/domain/GitHubRepository'
import type { GitHubRepositoryRepository } from '@/domain/GitHubRepositoryRepository'

export function useGitHubRepositories(
  repository: GitHubRepositoryRepository,
  repositoryUrls: string[],
): {
    repositoryData: Ref<GitHubRepository[]>
    isLoading: Ref<boolean>
  } {
  const repositoryData = ref<GitHubRepository[]>([])
  const isLoading = ref(false)

  watchEffect(() => {
    isLoading.value = true
    repository.search(repositoryUrls).then((data) => {
      repositoryData.value = data
      isLoading.value = false
    })
  })

  return {
    repositoryData,
    isLoading,
  }
}
