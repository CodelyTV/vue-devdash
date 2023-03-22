<script setup lang="ts">
import WidgetSkeleton from './WidgetSkeleton.vue'
import SkeletonTheme from '@/shared/components/SkeletonTheme.vue'

const props = defineProps<{
  numberOfWidgets: number
}>()
</script>

<template>
  <SkeletonTheme base-color="#1A2233" highlight-color="#535966">
    <WidgetSkeleton v-for="i in props.numberOfWidgets" :key="i" />
  </SkeletonTheme>
</template>
