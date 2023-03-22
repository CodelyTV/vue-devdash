<script setup lang="ts">
import { SkeletonTheme } from '@antoniogiroz/vue-skeleton'
import WidgetSkeleton from './RepositoryWidgetSkeleton.vue'

const props = defineProps<{
  numberOfWidgets: number
}>()
</script>

<template>
  <SkeletonTheme base-color="#1A2233" highlight-color="#535966">
    <WidgetSkeleton v-for="i in props.numberOfWidgets" :key="i" />
  </SkeletonTheme>
</template>
