import { config } from '@/config'
import type { GitHubAccessTokenRepository } from '@/domain/GitHubAccessTokenRepository'

export function useSearchGithubAccessToken(repository: GitHubAccessTokenRepository): {
  search: () => string
} {
  function search(): string {
    const token = repository.search()

    return token || config.github_access_token
  }

  return { search }
}
