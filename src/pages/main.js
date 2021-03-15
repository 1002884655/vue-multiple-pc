/* eslint-disable */

import Vue from 'vue'

import '@/assets/css/reset.scss'

// 引入IE兼容promise脚本
import 'es6-promise/auto'

// 引入项目通用（顶层）方法对象
import ToolClass from '@/util/PublicMethod'
Vue.prototype.ToolClass = ToolClass