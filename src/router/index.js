import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    redirect: { name: 'main' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// TODO универсальная проверка на логин
// router.beforeEach(async (to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   const currentUser = await store.dispatch('auth/checkAuth')
//   // if (!store.state.permittedRoute) next(false)
//   if (requiresAuth && !currentUser) next({ name: 'login' })
//   else next()
//   // next()
// })
export default router
