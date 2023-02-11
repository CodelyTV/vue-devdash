<script setup lang="ts">
import { computed, ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import Unlock from '../../assets/icons/unlock.svg?component'
import Lock from '../../assets/icons/lock.svg?component'
import { useGitHubRepository } from './useGitHubRepository'
import styles from './GithubRepositoryDetail.module.css'
import PullRequests from './PullRequests.vue'
import type { GitHubRepositoryRepository } from '@/domain/GitHubRepositoryRepository'
import type { GitHubApiGitHubRepositoryPullRequestRepository } from '@/infrastructure/GitHubApiGitHubRepositoryPullRequestRepository'

const props = defineProps<{
  gitHubRepositoryRepository: GitHubRepositoryRepository
  gitHubRepositoryPullRequestRepository: GitHubApiGitHubRepositoryPullRequestRepository
  organization: string
  name: string
}>()

const repositoryId = computed(() => ({ organization: props.organization, name: props.name }))

const { repositoryData } = useGitHubRepository(props.gitHubRepositoryRepository, repositoryId.value)

const pullRequestsRef = ref(null)
const pullRequestsVisible = useElementVisibility(pullRequestsRef)
</script>

<template>
  <div v-if="!repositoryData">
    The repository does not exist.
  </div>

  <section v-else :class="styles['repository-detail']">
    <header :class="styles.header">
      <a :href="repositoryData.url" target="_blank" rel="noreferrer">
        <h2 :class="styles.header__title">
          {{ repositoryData.id.organization }}/{{ repositoryData.id.name }}
        </h2>
      </a>
      <Lock v-if="repositoryData.private" />
      <Unlock v-else />
    </header>

    <p>{{ repositoryData.description }}</p>

    <h3>Repository stats</h3>
    <table :class="styles.detail__table">
      <thead>
        <tr>
          <th>Stars</th>
          <th>Watchers</th>
          <th>Forks</th>
          <th>Issues</th>
          <th>Pull Requests</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{{ repositoryData.stars }}</td>
          <td>{{ repositoryData.watchers }}</td>
          <td>{{ repositoryData.forks }}</td>
          <td>{{ repositoryData.issues }}</td>
          <td>{{ repositoryData.pullRequests }}</td>
        </tr>
      </tbody>
    </table>

    <h3>Workflow runs status</h3>
    <template v-if="repositoryData.workflowRunsStatus">
      <p>
        ⏱️Last workflow run: {{ repositoryData.workflowRunsStatus[0].createdAt.toLocaleDateString("es-ES") }}
      </p>
      <table :class="styles.detail__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Conclusion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="run in repositoryData.workflowRunsStatus" :key="run.id">
            <td>{{ run.name }}</td>
            <td>
              <a :href="run.url" target="_blank" rel="noreferrer">
                {{ run.title }}
              </a>
            </td>
            <td>{{ run.createdAt.toLocaleDateString("es-ES") }}</td>
            <td>{{ run.status }}</td>
            <td>{{ run.conclusion }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <div v-else>
      <p>There are no workflow runs.</p>
    </div>

    <section ref="pullRequestsRef">
      <PullRequests v-if="pullRequestsVisible" :repository="gitHubRepositoryPullRequestRepository" :repository-id="repositoryId" />
    </section>
  </section>
</template>
