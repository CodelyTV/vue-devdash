<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'
import { RouterLink } from 'vue-router'
import router from '~/src/router'

const props = defineProps<{
  propagate?: boolean
}>()

const error = ref()
const vm = ref()
const info = ref()

onErrorCaptured((_error, _instance, _info) => {
  console.error(_error)

  error.value = _error
  vm.value = _instance
  info.value = _info

  return props.propagate
})

function resetError() {
  error.value = null
  vm.value = null
  info.value = null
}

function navigate() {
  resetError()
  router.replace('/')
}
</script>

<template>
  <slot
    v-if="error"
    name="error"
    :err="error"
    :vm="vm"
    :info="info"
  >
    <h2>Something went wrong</h2>

    <RouterLink v-slot="{ href }" to="/" custom>
      <a
        class="wb-header-flyout__logo"
        :href="href"
        @click.prevent="navigate"
      >
        Go back to the home page
      </a>
    </RouterLink>
  </slot>

  <slot v-else />
</template>
