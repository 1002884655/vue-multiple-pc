/* eslint-disable */
import Axios from 'axios'
const ToolClass = {
  Axios ({ success = () => { }, error = () => { }, api = { method: 'post', url: null }, context = null, opt = null, urlParams = null, code = 0, commit = null, hasOpt = false }) {
    Axios({
      method: api.method,
      url: api.url + `${urlParams === null ? '' : `/${urlParams}`}`,
      ...opt
    }).then((res) => {
      if (res.data.code - 0 === code - 0) {
        if (commit !== null) {
          let CommitData = { data: res.data.data }
          if (hasOpt) {
            CommitData.AxiosOpt = { ...opt }
          }
          context.commit(commit, { ...CommitData })
        }
        success(res)
      } else {
        error(res)
      }
    }).catch((res) => {
      error(res)
    })
  },
  ReturnViews (num) {
    num = `${(num - 0).toFixed(0)}`
    if (num.length <= 3) {
      return `${num}`
    } else if (num.length > 3 && num.length < 7) {
      return `${num.substring(0, num.length - 3)}.${num.substring(num.length - 3, num.length - 2)}K`
    } else if (num.length >= 7 && num.length < 10) {
      return `${num.substring(0, num.length - 6)}.${num.substring(num.length - 6, num.length - 5)}M`
    } else if (num.length >= 10) {
      return `${num.substring(0, num.length - 9)}.${num.substring(num.length - 9, num.length - 8)}B`
    }
  },
  ChangeUrlParams (Arr, DeleteAll = false) {
    if (DeleteAll) { // 只保留目标参数
      window.history.pushState({}, 0, window.location.href.split('?')[0])
    }
    Arr.map((item) => {
      window.history.pushState(null, null, this.ChangeUrlArg(window.location.href, item.name, item.value))
    })
  },
  CheckEmail (target) { // 校验邮箱格式
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return reg.test(target)
  },
  GetUrlParams (name) { // 获取url参数
    let query = window.location.search.substring(1)
    let vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=')
      if (pair[0] == name) { return pair[1] }
    }
    return false
  },
  FilterTimer (originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    return `${y}-${m}-${d}`
  },
  DateFormatYear (date = null, format = 'YY:MM:DD hh:mm:ss') {
    if (date !== null) {
      date = new Date(date)
      let YY = date.getFullYear()
      let MM = date.getMonth() + 1
      let DD = date.getDate()
      let hh = date.getHours()
      let mm = date.getMinutes()
      let ss = date.getSeconds()
      if (format === 'YY:MM:DD') {
        return `${YY}-${MM > 9 ? MM : `0${MM}`}-${DD > 9 ? DD : `0${DD}`}`
      }
      if (format === 'hh:mm:ss') {
        return `${hh > 9 ? hh : `0${hh}`}:${mm > 9 ? mm : `0${mm}`}:${ss > 9 ? ss : `0${ss}`}`
      }
      return `${YY}-${MM > 9 ? MM : `0${MM}`}-${DD > 9 ? DD : `0${DD}`} ${hh > 9 ? hh : `0${hh}`}:${mm > 9 ? mm : `0${mm}`}:${ss > 9 ? ss : `0${ss}`}`
    } else {
      return ''
    }
  },
  DateFormat (timestamp) { // 格式化时间
    if (timestamp) {
      let mm = Math.floor(timestamp / (1000 * 60))
      let ss = Math.floor(timestamp % (1000 * 60) / 1000)
      return `${mm > 9 ? mm : '0' + mm}:${ss > 9 ? ss : '0' + ss}`
    }
  },
  CheckUrl (url) { // 校验url
    let reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
    return reg.test(url)
  },
  ChangeUrlArg (url, arg, val) { // 替换url参数
    let pattern = arg + '=([^&]*)'
    let replaceText = arg + '=' + val
    if (url.match(pattern)) {
      let tmp = '/(' + arg + '=)([^&]*)/gi'
      tmp = url.replace(eval(tmp), replaceText)
      return tmp
    } else {
      if (url.match('[\?]')) {
        return url + '&' + replaceText
      } else {
        return url + '?' + replaceText
      }
    }
  }
}

export default ToolClass
