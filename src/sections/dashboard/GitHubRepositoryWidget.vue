<script setup lang="ts">
import styles from './GitHubRepositoryWidget.module.css'
import Check from '@/assets/icons/check.svg?component'
import Error from '@/assets/icons/error.svg?component'
import PullRequests from '@/assets/icons/git-pull-request.svg?component'
import IssueOpened from '@/assets/icons/issue-opened.svg?component'
import Lock from '@/assets/icons/lock.svg?component'
import Forks from '@/assets/icons/repo-forked.svg?component'
import Start from '@/assets/icons/star.svg?component'
import Unlock from '@/assets/icons/unlock.svg?component'
import Watchers from '@/assets/icons/watchers.svg?component'
import type { GitHubRepository } from '@/domain/GitHubRepository'

const props = defineProps<{ repository: GitHubRepository; loading?: boolean }>()

function isoToReadableDate(lastUpdateDate: Date): string {
  const currentDate = new Date()
  const diffTime = currentDate.getTime() - lastUpdateDate.getTime()
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24))

  if (diffDays === 0)
    return 'today'

  if (diffDays > 30)
    return 'more than a month ago'

  return `${diffDays} days ago`
}
</script>

<template>
  <article :class="styles.widget">
    <header :class="styles.widget__header">
      <h2 :class="styles.widget__title">
        <RouterLink
          :to="{ name: 'repository', params: { organization: props.repository.id.organization, name: props.repository.id.name } }"
          :title="`${props.repository.id.organization}/${props.repository.id.name}`"
        >
          {{ props.repository.id.organization }}/{{ props.repository.id.name }}
        </RouterLink>
      </h2>
      <Lock v-if="props.repository.private" />
      <Unlock v-else />
    </header>

    <div :class="styles.widget__body">
      <div :class="styles.widget__status">
        <p>Last update {{ isoToReadableDate(props.repository.updatedAt) }}</p>
        <template v-if="props.repository.hasWorkflows">
          <Check v-if="props.repository.isLastWorkflowSuccess" />
          <Error v-else />
        </template>
      </div>
      <p :class="styles.widget__description">
        {{ props.repository.description }}
      </p>
    </div>

    <footer :class="styles.widget__footer">
      <div :class="styles.widget__stat">
        <Start />
        <span>{{ props.repository.stars }}</span>
      </div>
      <div :class="styles.widget__stat">
        <Watchers />
        <span>{{ props.repository.watchers }}</span>
      </div>
      <div :class="styles.widget__stat">
        <Forks />
        <span>{{ props.repository.forks }}</span>
      </div>
      <div :class="styles.widget__stat">
        <IssueOpened />
        <span>{{ props.repository.issues }}</span>
      </div>
      <div :class="styles.widget__stat">
        <PullRequests />
        <span>{{ props.repository.pullRequests }}</span>
      </div>
    </footer>
  </article>
</template>
