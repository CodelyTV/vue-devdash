<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Logo from '@/assets/logo.svg?component'
import ErrorBoundary from '@/shared/components/ErrorBoundary.vue'
</script>

<template>
  <header :class="$style.header">
    <section :class="$style.header__container">
      <div :class="$style.brand__container">
        <Logo />
        <h1 :class="$style.app__brand">
          <RouterLink to="/">
            DevDash_
          </RouterLink>
        </h1>
      </div>
      <RouterLink to="/settings">
        <span>⚙️</span>
      </RouterLink>
    </section>
  </header>

  <ErrorBoundary>
    <RouterView />
  </ErrorBoundary>
</template>

<style module src="./Layout.module.css" />
