<script setup lang="ts">
import { useGitHubRepositoryPullRequests } from './useGitHubRepositoryPullRequests'
import type { RepositoryId } from '@/domain/GitHubRepository'
import type { GitHubRepositoryPullRequestRepository } from '@/domain/GitHubRepositoryPullRequestRepository'
import Loader from '@/shared/components/Loader.vue'

const props = defineProps<{ repository: GitHubRepositoryPullRequestRepository; repositoryId: RepositoryId }>()

const { isLoading, pullRequests } = useGitHubRepositoryPullRequests(props.repository, props.repositoryId)
</script>

<template>
  <h3>Pull requests</h3>
  <table :class="$style.detail__table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="!isLoading">
        <tr v-for="pullRequest in pullRequests" :key="pullRequest.id">
          <td>
            <a target="_blank" :href="pullRequest.url" rel="noreferrer">
              {{ pullRequest.title }}
            </a>
          </td>
          <td>{{ pullRequest.createdAt.toLocaleDateString("es-ES") }}</td>
        </tr>
      </template>
    </tbody>
  </table>

  <Loader v-if="isLoading" />
</template>

<style module src="./GithubRepositoryDetail.module.css" />
