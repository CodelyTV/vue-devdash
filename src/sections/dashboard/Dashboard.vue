<script setup lang="ts">
import { computed } from 'vue'
import styles from './Dashboard.module.css'
import GitHubRepositoryWidget from './GitHubRepositoryWidget.vue'
import { useGitHubRepositories } from './useGitHubRepositories'
import WidgetsSkeleton from './WidgetsSkeleton.vue'
import type { GitHubRepositoryRepository } from '@/domain/GitHubRepositoryRepository'
import { config } from '@/config'

const props = defineProps<{ repository: GitHubRepositoryRepository }>()

const gitHubRepositoryUrls = computed(() => config.widgets.map(widget => widget.repository_url))

const { repositoryData, isLoading } = useGitHubRepositories(props.repository, gitHubRepositoryUrls.value)
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
  </section>
</template>
