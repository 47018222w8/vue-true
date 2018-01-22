import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex)
const state = {
  // url跳转等待图标
  isLoading: false,
  // 缓存列表
  quoteListKeepAlive: true,
  // 启用条码列表
  startCode: {step: 0}

}
export default new Vuex.Store({
  state,
  mutations
})
