import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import permission from './permission'

export const loadAsyncRoutesStatus = ref(false) // 异步路由加载状态
const constantRoutes: RouteRecordRaw[] = [] // 公用路由
const asyncRoutes: RouteRecordRaw[] = [] // 异步路由 登录后

routes.forEach((route) => {
  if (route.meta && route.meta.public) {
    constantRoutes.push(route)
  } else {
    asyncRoutes.push(route)
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

/**
 * 加载异步路由
 */
export function loadAsyncRoutes() {
  asyncRoutes.forEach((route) => {
    router.addRoute(route)
  })
  router.options.routes = routes
  loadAsyncRoutesStatus.value = true
}

/**
 * 重置路由
 */
export function resetRouter() {
  router.resolve = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes,
  }).resolve
  loadAsyncRoutesStatus.value = false
}

export default permission(router)
