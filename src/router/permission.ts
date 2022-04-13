import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import type { Router } from 'vue-router'
import { loadAsyncRoutes, loadAsyncRoutesStatus } from './index'
import { Title } from '@/setting'
import { token } from '@/composables'

NProgress.configure({
  showSpinner: false,
}) // NProgress Configuration

export default (router: Router) => {
  router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()

    if (token.value) {
      if (loadAsyncRoutesStatus.value) {
        /**
           * 正常进入
           */
        next()
      } else {
        /**
         * 有登录状态，但没有加载异步路由
         */
        loadAsyncRoutes()
        /**
         * 加载新的路由后 需要从之前的to中解构
         */
        next({
          path: to.path,
          query: to.query,
        })
      }
    } else {
      if (to.name === 'login') {
        /**
         * 准备登录
         */
        next()
      } else {
        /**
           * 跳转到登录
           */
        next({
          name: 'login',
          query: {
            redirect: to.fullPath,
          },
        })
      }
    }
    const pageTitle = (to.meta?.title ? `${to.meta?.title}-` : '') + Title
    useTitle(pageTitle)
  })

  router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })

  return router
}
