import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { GitHubApiGitHubRepositoryPullRequestRepository } from '../infrastructure/GitHubApiGitHubRepositoryPullRequestRepository'
import Layout from '@/sections/layout/Layout.vue'
import Dashboard from '@/sections/dashboard/Dashboard.vue'
import Settings from '@/sections/settings/Settings.vue'
import { GitHubApiGitHubRepositoryRepository } from '@/infrastructure/GitHubApiGitHubRepositoryRepository'
import { LocalStorageRepositoryWidgetRepository } from '@/infrastructure/LocalStorageRepositoryWidgetRepository'
import { LocalStorageGitHubAccessTokenRepository } from '@/infrastructure/LocalStorageGithubAccessTokenRepository'
import { useSearchGithubAccessToken } from '@/sections/settings/useSearchGithubAccessToken'

const ghAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository()
const ghAccessTokenSearcher = useSearchGithubAccessToken(ghAccessTokenRepository)
const ghAccessToken = ghAccessTokenSearcher.search()
const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(ghAccessToken)
const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository()
const gitHubRepositoryPullRequestRepository = new GitHubApiGitHubRepositoryPullRequestRepository(ghAccessToken)

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
            return {
              gitHubRepositoryRepository,
              repositoryWidgetRepository,
            }
          },
        },
        {
          path: 'repository/:organization/:name',
          name: 'repository',
          component: () => import('@/sections/repositoryDetail/GithubRepositoryDetail.vue'),
          props: (route) => {
            return {
              gitHubRepositoryRepository,
              gitHubRepositoryPullRequestRepository,
              organization: route.params.organization,
              name: route.params.name,
            }
          },
        },
        {
          path: 'settings',
          component: Settings,
          name: 'settings',
          props: () => {
            return {
              repository: ghAccessTokenRepository,
            }
          },
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  if (to.name === 'settings')
    return

  if (!ghAccessToken)
    return '/settings'
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
