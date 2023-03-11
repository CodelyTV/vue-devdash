export type RepositoryInvalidUrlReason = 'invalid' | 'already-exists'

export class RepositoryInvalidUrlError extends Error {
  constructor(url: string) {
    super(`The ${url} is not a valid GitHub repository url`)
  }
}
