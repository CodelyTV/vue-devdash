import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { GitHubApiGitHubRepositoryPullRequestRepository } from '../infrastructure/GitHubApiGitHubRepositoryPullRequestRepository'
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
            const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(config.github_access_token)
            const gitHubRepositoryPullRequestRepository = new GitHubApiGitHubRepositoryPullRequestRepository(config.github_access_token)
            return {
              gitHubRepositoryRepository,
              gitHubRepositoryPullRequestRepository,
              organization: route.params.organization,
              name: route.params.name,
            }
          },
        },
      ],
    },
  ],
})

router.beforeResolve((to, _from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
