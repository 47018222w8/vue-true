import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/state'
import { CHANGE_LOADING } from '../store/mutation-type'
Vue.use(Router)
const home = r => require.ensure([], () => r(require('@/page/home')), 'home')
const login = r => require.ensure([], () => r(require('@/page/login')), 'login')
const codeList = r => require.ensure([], () => r(require('@/page/code-list')), 'codeList')
const code = r => require.ensure([], () => r(require('@/page/code')), 'code')
const codeInfo = r => require.ensure([], () => r(require('@/page/code-info')), 'codeInfo')
const company = r => require.ensure([], () => r(require('@/page/company')), 'company')
const part = r => require.ensure([], () => r(require('@/page/part')), 'part')
const partA = r => require.ensure([], () => r(require('@/page/part-a')), 'partA')
const map = r => require.ensure([], () => r(require('@/page/map')), 'map')
const router = new Router({
  routes: [{
    path: '',
    name: 'home',
    component: home,
    meta: { showTabbar: true }
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/codeList',
    name: 'codeList',
    component: codeList
  }, {
    path: '/code',
    name: 'code',
    component: code
  }, {
    path: '/codeInfo',
    name: 'codeInfo',
    component: codeInfo
  }, {
    path: '/company',
    name: 'company',
    component: company
  }, {
    path: '/part',
    name: 'part',
    component: part
  }, {
    path: '/partA',
    name: 'partA',
    component: partA
  }, {
    path: '/map',
    name: 'map',
    component: map
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
