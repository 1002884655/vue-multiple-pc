import Vue from 'vue'
import App from './app.vue'

// 引入main.js
import '../main'

// 引入store
import store from '../../store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
