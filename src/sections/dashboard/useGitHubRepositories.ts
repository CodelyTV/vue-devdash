import { type Ref, ref, watchEffect } from 'vue'
import type { GitHubRepository } from '../../domain/GitHubRepository'
import type { GitHubRepositoryRepository } from '../../domain/GitHubRepositoryRepository'

export function useGitHubRepositories(
  repository: GitHubRepositoryRepository,
  repositoryUrls: string[],
): {
    repositoryData: Ref<GitHubRepository[]>
  } {
  const repositoryData = ref<GitHubRepository[]>([])

  watchEffect(() => {
    repository.search(repositoryUrls).then((data) => {
      repositoryData.value = data
    })
  })

  return { repositoryData }
}
