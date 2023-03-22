<script setup lang="ts">
import { ref } from 'vue'
import { useAddRepositoryWidget } from './useAddRepositoryWidget'
import Add from '@/assets/icons/add.svg?component'
import type { RepositoryWidgetRepository } from '@/domain/RepositoryWidgetRepository'
import type { FormEvent } from '@/domain/FormEvent'

interface FormData {
  id: string
  repositoryUrl: string
}

const props = defineProps<{ repository: RepositoryWidgetRepository }>()

const isFormActive = ref(false)
const hasError = ref(false)
const errorMessage = ref<string>('')

const { save } = useAddRepositoryWidget(props.repository)

async function submitForm(event: Event) {
  const { id, repositoryUrl } = (event as FormEvent<FormData>).target.elements
  const error = await save({ id: id.value, repositoryUrl: repositoryUrl.value })
  hasError.value = !!error
  errorMessage.value = error ? error.message : ''
  isFormActive.value = false
}
</script>

<template>
  <article :class="$style.add_widget">
    <div :class="$style.container">
      <form v-if="isFormActive || hasError" :class="$style.form" @submit.prevent="submitForm">
        <div>
          <label for="id">Id</label>
          <input id="id" type="text">
        </div>
        <div>
          <label for="repositoryUrl">Repository URL</label>
          <input id="repositoryUrl" type="text">
        </div>
        <div>
          <button>Add</button>
        </div>

        <p v-if="hasError" role="alert" aria-describedby="form-error">
          <span id="form-error">{{ errorMessage }}</span>
        </p>
      </form>

      <button v-else role="button" :class="$style.add_button" @click="isFormActive = true">
        <Add />
        <p>Add repository</p>
      </button>
    </div>
  </article>
</template>

<style module src="./AddRepositoryWidgetForm.module.css" />
