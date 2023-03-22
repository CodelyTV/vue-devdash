<script setup lang="ts">
import { ref } from 'vue'
import styles from './AddRepositoryWidgetForm.module.css'
import { useAddRepositoryWidget } from './useAddRepositoryWidget'
import Add from '@/assets/icons/add.svg?component'
import type { RepositoryWidgetRepository } from '@/domain/RepositoryWidgetRepository'

interface FormData {
  id: string
  repositoryUrl: string
}

type FormEvent<T> = Event & {
  target: { elements: { [key in keyof T]: { value: T[key]; checked: T[key] } } }
}

const props = defineProps<{ repository: RepositoryWidgetRepository }>()

const isFormActive = ref(false)
const hasAlreadyExistsError = ref(false)

const { save } = useAddRepositoryWidget(props.repository)

async function submitForm(event: Event) {
  const { id, repositoryUrl } = (event as FormEvent<FormData>).target.elements
  const error = await save({ id: id.value, repositoryUrl: repositoryUrl.value })
  hasAlreadyExistsError.value = !!error
  isFormActive.value = false
}
</script>

<template>
  <article :class="styles.add_widget">
    <div :class="styles.container">
      <form v-if="isFormActive || hasAlreadyExistsError" :class="styles.form" @submit.prevent="submitForm">
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

        <p v-if="hasAlreadyExistsError" role="alert" aria-describedby="duplicated-error">
          <span id="duplicated-error">The repository already exists</span>
        </p>
      </form>

      <button v-else :class="styles.add_button" @click="isFormActive = true">
        <Add />
        <p>Add repository</p>
      </button>
    </div>
  </article>
</template>
