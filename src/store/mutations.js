import { CHANGE_LOADING, QUOTE_LIST_KEEP_ALIVE, START_CODE } from './mutation-type'
export default {
  [CHANGE_LOADING](state, payload) {
    state.isLoading = payload.isLoading
  },
  [QUOTE_LIST_KEEP_ALIVE](state, payload) {
    state.quoteListKeepAlive = payload.keepAlive
  },
  [START_CODE](state, payload) {
    state.startCode = payload.obj
  }
}
