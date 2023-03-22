<script setup lang="ts">
import { computed } from 'vue'
import styles from './Dashboard.module.css'
import { useGitHubRepositories } from './gitHubRepositoryWidget/useGitHubRepositories'
import WidgetsSkeleton from './repositoryWidget/RepositoryWidgetsSkeleton.vue'
import AddRepositoryWidgetForm from './repositoryWidget/AddRepositoryWidgetForm.vue'
import { useRepositoryWidgets } from './useRepositoryWidgets'
import GitHubRepositoryWidget from './gitHubRepositoryWidget/GitHubRepositoryWidget.vue'
import type { GitHubRepositoryRepository } from '@/domain/GitHubRepositoryRepository'
import type { RepositoryWidgetRepository } from '@/domain/RepositoryWidgetRepository'

const props = defineProps<{
  gitHubRepositoryRepository: GitHubRepositoryRepository
  repositoryWidgetRepository: RepositoryWidgetRepository
}>()

const { repositoryWidgets } = useRepositoryWidgets()
const gitHubRepositoryUrls = computed(() => repositoryWidgets.value.map(widget => widget.repositoryUrl))

const { repositoryData, isLoading } = useGitHubRepositories(props.gitHubRepositoryRepository, gitHubRepositoryUrls.value)
</script>

<template>
  <section :class="styles.container">
    <WidgetsSkeleton v-if="isLoading" :number-of-widgets="gitHubRepositoryUrls.length" />

    <template v-else>
      <GitHubRepositoryWidget
        v-for="repo in repositoryData"
        :key="`${repo.id.organization}/${repo.id.name}`"
        :loading="isLoading"
        :repository="repo"
      />
    </template>

    <AddRepositoryWidgetForm :repository="repositoryWidgetRepository" />
  </section>

  <div v-if="!isLoading && repositoryData.length === 0" :class="styles.empty">
    <span>No widgets are configured.</span>
  </div>
</template>
