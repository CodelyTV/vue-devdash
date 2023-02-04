<script setup lang="ts">
import { RouterView } from 'vue-router'
import Logo from '../../assets/logo.svg?component'
import styles from './Layout.module.css'
import ErrorBoundary from '~/src/shared/components/ErrorBoundary.vue'
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

  <ErrorBoundary>
    <RouterView />
  </ErrorBoundary>
</template>
