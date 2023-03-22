<script setup lang="ts">
import styles from './Loader.module.css'
</script>

<template>
  <div :class="styles.loader__container">
    <div :class="styles['lds-ellipsis']">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>
