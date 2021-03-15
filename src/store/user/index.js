/* eslint-disable */
import Api from '@/util/api'
import ToolClass from '@/util/PublicMethod'

export default {
  namespaced: true,
  state: {
    UserInfo: null
  },
  mutations: {
    UpdateUserInfo (state, data) {
      state.UserInfo = { ...state.UserInfo, ...data.data }
    }
  },
  actions: {
    GetUserInfoByToken (context, payload) { //根据token获取用户信息
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.GetUserInfoByToken, context, code: 0, opt: payload, commit: 'UpdateUserInfo' })
      })
    }
  }
}
