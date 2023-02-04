import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/sections/layout/Layout.vue'
import Dashboard from '@/sections/dashboard/Dashboard.vue'
import { config } from '@/config'
import { GitHubApiGitHubRepositoryRepository } from '@/infrastructure/GitHubApiGitHubRepositoryRepository'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Dashboard,
          name: 'dashboard',
          props: () => {
            const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token)
            return {
              repository,
            }
          },
        },
        {
          path: '/repository/:organization/:name',
          name: 'repository',
          component: () => import('@/sections/repositoryDetail/GithubRepositoryDetail.vue'),
          props: (route) => {
            const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token)
            return {
              repository,
              organization: route.params.organization,
              name: route.params.name,
            }
          },
        },
      ],
    },
  ],
})

export default router
