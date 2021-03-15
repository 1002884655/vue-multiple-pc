
// 用户相关
const prefix = process.env.NODE_ENV === 'production' ? '/api' : '/api'
const UserApi = {
  GetUserInfoByToken: { // 根据token获取用户信息
    url: `${prefix}/account/getAccountInfo`,
    method: `post`
  }
}
export default UserApi