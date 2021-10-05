import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'auth'},
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'auth'},
      component: () => import('./views/Register.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Categories.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/History.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Record.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Planning.vue')
    },
    {
      path: '/history/detail-record',
      name: 'detail record',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/DetailRecord.vue')
    }
  ]
})

router.beforeEach((to, _from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(route => route.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router