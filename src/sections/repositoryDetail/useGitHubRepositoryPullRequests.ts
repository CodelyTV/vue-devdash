import { type Ref, ref, watchEffect } from 'vue'
import type { RepositoryId } from '@/domain/GitHubRepository'
import type { GitHubRepositoryPullRequest } from '@/domain/GitHubRepositoryPullRequest'
import type { GitHubRepositoryPullRequestRepository } from '@/domain/GitHubRepositoryPullRequestRepository'

export function useGitHubRepositoryPullRequests(
  repository: GitHubRepositoryPullRequestRepository,
  repositoryId: RepositoryId,
): {
    isLoading: Ref<boolean>
    pullRequests: Ref<GitHubRepositoryPullRequest[] | undefined>
  } {
  const isLoading = ref(true)
  const pullRequests = ref<GitHubRepositoryPullRequest[]>()

  watchEffect(() => {
    isLoading.value = true
    repository.search(repositoryId).then((data) => {
      pullRequests.value = data
      isLoading.value = false
    })
  })

  return { isLoading, pullRequests }
}
