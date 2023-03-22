import type { RepositoryId } from './GitHubRepository'
import type { GitHubRepositoryPullRequest } from './GitHubRepositoryPullRequest'

export interface GitHubRepositoryPullRequestRepository {
  search(repositoryId: RepositoryId): Promise<GitHubRepositoryPullRequest[]>
}
