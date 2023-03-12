import type { GitHubAccessTokenRepository } from '../../domain/GitHubAccessTokenRepository'

export function useSaveSettings(repository: GitHubAccessTokenRepository): {
  save: (token: string) => void
} {
  function save(token: string): void {
    repository.save(token)
  }

  return { save }
}
