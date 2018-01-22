import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/state'
import { JWT_HEADER } from '../components/constant'
import { CHANGE_LOADING } from '../store/mutation-type'
Vue.use(Router)
const home = r => require.ensure([], () => r(require('@/page/home')), 'home')
const login = r => require.ensure([], () => r(require('@/page/login')), 'login')
const codeList = r => require.ensure([], () => r(require('@/page/code-list')), 'codeList')
const codeA = r => require.ensure([], () => r(require('@/page/code-a')), 'codeA')
const codeB = r => require.ensure([], () => r(require('@/page/code-b')), 'codeB')
const codeC = r => require.ensure([], () => r(require('@/page/code-c')), 'codeC')
const codeD = r => require.ensure([], () => r(require('@/page/code-d')), 'codeD')
const codeE = r => require.ensure([], () => r(require('@/page/code-e')), 'codeE')
const codeInfo = r => require.ensure([], () => r(require('@/page/code-info')), 'codeInfo')
const map = r => require.ensure([], () => r(require('@/page/map')), 'map')
const error = r => require.ensure([], () => r(require('@/page/error')), 'error')
const preview = r => require.ensure([], () => r(require('@/page/preview')), 'preview')
const router = new Router({
  routes: [{
    path: '',
    name: 'home',
    component: home,
    meta: { showTabbar: true }
  }, {
    path: '/login',
    name: 'login',
    component: login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem(JWT_HEADER)) {
        next('/')
      } else {
        next()
      }
    }
  }, {
    path: '/codeList',
    name: 'codeList',
    component: codeList
  }, {
    path: '/codeInfo',
    name: 'codeInfo',
    component: codeInfo
  }, {
    path: '/codeA',
    name: 'codeA',
    component: codeA
  }, {
    path: '/codeB',
    name: 'codeB',
    component: codeB,
    beforeEnter: (to, from, next) => {
      if (store.state.startCode.step > 0) {
        next()
      } else {
        next('/')
      }
    }
  }, {
    path: '/codeC',
    name: 'codeC',
    component: codeC,
    beforeEnter: (to, from, next) => {
      if (store.state.startCode.step > 1) {
        next()
      } else {
        next('/')
      }
    }
  }, {
    path: '/codeD',
    name: 'codeD',
    component: codeD,
    beforeEnter: (to, from, next) => {
      if (store.state.startCode.step > 2) {
        next()
      } else {
        next('/')
      }
    }
  }, {
    path: '/codeE',
    name: 'codeE',
    component: codeE,
    beforeEnter: (to, from, next) => {
      if (store.state.startCode.step > 3) {
        next()
      } else {
        next('/')
      }
    }
  }, {
    path: '/preview',
    name: 'preview',
    component: preview,
    beforeEnter: (to, from, next) => {
      if (store.state.startCode.step > 0) {
        next()
      } else {
        next('/')
      }
    }
  }, {
    path: '/map',
    name: 'map',
    component: map
  }, {
    path: '/error',
    name: 'error',
    component: error
  }]
})
router.beforeEach(function (to, from, next) {
  store.commit(CHANGE_LOADING, { isLoading: true })
  next()
})
router.afterEach(function (to) {
  store.commit(CHANGE_LOADING, { isLoading: false })
})
export default router
