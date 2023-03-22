<script setup lang="ts">
import Skeleton from '@/shared/components/Skeleton.vue'
import PullRequests from '@/assets/icons/git-pull-request.svg?component'
import IssueOpened from '@/assets/icons/issue-opened.svg?component'
import Forks from '@/assets/icons/repo-forked.svg?component'
import Start from '@/assets/icons/star.svg?component'
import Watchers from '@/assets/icons/watchers.svg?component'
</script>

<template>
  <article :class="$style.widget">
    <header :class="$style.widget__header" style="display: block; paddingTop: 1.15rem; paddingBottom: 1.15rem">
      <Skeleton base-color="#3CFF64" highlight-color="#D1FFDA" width="70%" />
    </header>
    <div :class="$style.widget__body">
      <p :style="{ marginTop: '1rem', marginBottom: '2rem' }">
        Last update <Skeleton inline width="20%" />
      </p>
      <p
        :class="$style.widget__description"
        :style="{ paddingBottom: '0.65rem' }"
      >
        <Skeleton height="45" />
      </p>
    </div>
    <footer :class="$style.widget__footer">
      <div :class="$style.widget__stat">
        <Start />
        <span>
          <Skeleton width="35" />
        </span>
      </div>
      <div :class="$style.widget__stat">
        <Watchers />
        <span>
          <Skeleton width="25" />
        </span>
      </div>
      <div :class="$style.widget__stat">
        <Forks />
        <span>
          <Skeleton width="15" />
        </span>
      </div>
      <div :class="$style.widget__stat">
        <IssueOpened />
        <span>
          <Skeleton width="15" />
        </span>
      </div>
      <div :class="$style.widget__stat">
        <PullRequests />
        <span>
          <Skeleton width="15" />
        </span>
      </div>
    </footer>
  </article>
</template>

<style module src="./RepositoryWidget.module.css" />
