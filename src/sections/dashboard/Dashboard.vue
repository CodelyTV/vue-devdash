<script setup lang="ts">
import { computed, ref } from 'vue'
import Logo from '../../assets/logo.svg?component'
import styles from './Dashboard.module.css'
import GitHubRepositoryWidget from './GitHubRepositoryWidget.vue'
import { useGitHubRepositories } from './useGitHubRepositories'
import type { GitHubRepositoryRepository } from '@/domain/GitHubRepositoryRepository'
import { config } from '@/config'

const props = defineProps<{ repository: GitHubRepositoryRepository }>()

const gitHubRepositoryUrls = computed(() => config.widgets.map(widget => widget.repository_url))

const { repositoryData } = useGitHubRepositories(props.repository, gitHubRepositoryUrls.value)
</script>

<template>
  <header :class="styles.header">
    <section :class="styles.header__container">
      <Logo />
      <h1 :class="styles.app__brand">
        DevDash_
      </h1>
    </section>
  </header>

  <div v-if="repositoryData.length === 0" :class="styles.empty">
    <span>No widgets are configured.</span>
  </div>

  <section v-else :class="styles.container">
    <GitHubRepositoryWidget
      v-for="repo in repositoryData"
      :key="`${repo.id.organization}/${repo.id.name}`"
      :repository="repo"
    />
  </section>
</template>
