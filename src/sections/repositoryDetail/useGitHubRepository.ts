import { type Ref, ref, watchEffect } from 'vue'
import type { GitHubRepository, RepositoryId } from '@/domain/GitHubRepository'
import type { GitHubRepositoryRepository } from '@/domain/GitHubRepositoryRepository'

export function useGitHubRepository(
  repository: GitHubRepositoryRepository,
  repositoryId: RepositoryId,
): {
    repositoryData: Ref<GitHubRepository | undefined>
  } {
  const repositoryData = ref<GitHubRepository>()

  watchEffect(() => {
    repository.byId(repositoryId).then((data) => {
      repositoryData.value = data
    })
  })

  return { repositoryData }
}
