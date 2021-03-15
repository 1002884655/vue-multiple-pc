import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    SysPageConfig: {}
  },
  mutations: {
    SetSysPageConfig (state, data) { // 设置主页面元素框架配置
      state.SysPageConfig = { ...state.SysPageConfig, ...data }
    }
  }
})

export const modules = {
  user: () => require('./user/index').default
}

Object.keys(modules).forEach(modKey => {
  const modNS = modKey.split('/')
  const getMod = modules[modKey]
  store.registerModule(...modNS, getMod())
})

export default store
