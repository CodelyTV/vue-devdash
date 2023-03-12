<script setup lang="ts">
import type { FormEvent } from '../../domain/FormEvent'
import styles from './Settings.module.css'
import { useSaveSettings } from './useSaveSettings'
import type { GitHubAccessTokenRepository } from '@/domain/GitHubAccessTokenRepository'

interface FormFields {
  ghAccessToken: string
}

const props = defineProps<{ repository: GitHubAccessTokenRepository }>()

const { save } = useSaveSettings(props.repository)

async function submitForm(event: Event) {
  const { ghAccessToken } = (event as FormEvent<FormFields>).target.elements
  save(ghAccessToken.value)

  window.location.href = '/'
}
</script>

<template>
  <section :class="styles.settings">
    <h2>Settings</h2>
    <p>
      ⚙️ Here you can configure your GitHub Access Token, so that <i>DevDash_</i> gets the data from the repositories.
    </p>
    <p>
      You can get more info on how to obtain the token
      <a
        target="_blank"
        href="https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
        rel="noreferrer"
      >
        here
      </a>
    </p>

    <form :class="styles.form" @submit.prevent="submitForm">
      <label for="ghAccessToken">GitHub Access Token</label>
      <input id="ghAccessToken" name="ghAccessToken" type="text">

      <input type="submit" value="Save">
    </form>
  </section>
</template>
