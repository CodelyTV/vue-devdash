<script setup lang="ts">
import { computed } from 'vue'
import styles from './Dashboard.module.css'
import GitHubRepositoryWidget from './gitHubRepositoryWidget/GitHubRepositoryWidget.vue'
import { useGitHubRepositories } from './gitHubRepositoryWidget/useGitHubRepositories'
import WidgetsSkeleton from './repositoryWidget/RepositoryWidgetsSkeleton.vue'
import AddRepositoryWidgetForm from './repositoryWidget/AddRepositoryWidgetForm.vue'
import type { GitHubRepositoryRepository } from '@/domain/GitHubRepositoryRepository'
import { config } from '@/config'
import type { RepositoryWidgetRepository } from '@/domain/RepositoryWidgetRepository'

const props = defineProps<{
  gitHubRepositoryRepository: GitHubRepositoryRepository
  repositoryWidgetRepository: RepositoryWidgetRepository
}>()

const gitHubRepositoryUrls = computed(() => config.widgets.map(widget => widget.repository_url))

const { repositoryData, isLoading } = useGitHubRepositories(props.gitHubRepositoryRepository, gitHubRepositoryUrls.value)
</script>

<template>
  <section v-if="isLoading" :class="styles.container">
    <WidgetsSkeleton :number-of-widgets="gitHubRepositoryUrls.length" />
  </section>

  <div v-if="!isLoading && repositoryData.length === 0" :class="styles.empty">
    <span>No widgets are configured.</span>
  </div>

  <section v-else :class="styles.container">
    <GitHubRepositoryWidget
      v-for="repo in repositoryData"
      :key="`${repo.id.organization}/${repo.id.name}`"
      :loading="isLoading"
      :repository="repo"
    />

    <AddRepositoryWidgetForm :repository="repositoryWidgetRepository" />
  </section>
</template>
