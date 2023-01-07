<script setup lang="ts">
import Dashboard from './sections/dashboard/Dashboard.vue'
import { config } from './config'
import { GitHubApiGitHubRepositoryRepository } from './infrastructure/GitHubApiGitHubRepositoryRepository'

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token)
</script>

<template>
  <Dashboard :repository="repository" />
</template>
