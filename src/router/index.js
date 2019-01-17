import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import echarts from 'echarts'

import frame from '../frame/frame.vue'
import commonjs from '../frame/common/common.js'

import vPage from '../components/vPagination/pagination.js'
import page from '../business/page/page.vue'

import vDialog from '../components/VDialog/dialog.js'
import dialog from '../business/dialog/dialog.vue'

import newDialog from '../components/dialog/dialog.js'

import vSelect from '../components/vSelect/select.js'
import select from '../business/select/select.vue'

import vCarousel from '../components/vCarousel/carousel.js'
import carousel from '../business/carousel/carousel.vue'

import vCaro from '../components/vCaro/caro.js'

import vScore from '../components//vScore/score.js'
import score from '../business/score/score.vue'

import vTime from '../components/vTime/time.js'
import time from '../business/time/time.vue'

import vUpload from '../components/vUpload/upload.js'
import upload from '../business/upload/upload.vue'

import getParam from '../business/commonFunction/param.vue'
import getDate from '../business/commonFunction/date.vue'
import useAxios from '../business/commonFunction/axios.vue'
import useEcharts from '../business/echarts/echarts.vue'

import numCtrl from '../business/direction/numCtrl.vue'
import lazyLoading from '../business/direction/lazyLoad.vue'
import lazyLoad from '../directive/lazyLoad.js'

import pageDetail from '../business/page/detail.vue'
import styleComp from '../business/style/style.vue'

Vue.use(frame)
Vue.use(Router)
Vue.use(vPage)
Vue.use(vDialog)
Vue.use(vSelect)
Vue.use(vCarousel)
Vue.use(vCaro)
Vue.use(vScore)
Vue.use(vTime)
Vue.use(vUpload)
Vue.use(lazyLoad)

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$dialog = newDialog

export default new Router({
  routes: [
    {
      path: '/',
      component: frame,
      children: [
      	{
	    	path: '/pagination',
	    	name: 'page',
	    	component: page
	    },
	    {
	    	path: '/dialog',
	    	name: 'dialog',
	    	component: dialog
	    },
	    {
	    	path: '/select',
	    	name: 'select',
	    	component: select
	    },
	    {
	    	path: '/carousel',
	    	name: 'carousel',
	    	component: carousel
	    },
	    {
	    	path: '/score',
	    	name: 'score',
	    	component: score
	    },
	    {
	    	path: '/time',
	    	name: 'time',
	    	component: time
	    },
	    {
	    	path: '/upload',
	    	component: upload
	    },
	    {
	    	path: '/getUrlParam',
	    	name: 'param',
	    	component: getParam
	    },
	    {
	    	path: '/getFormatDate',
	    	name: 'date',
	    	component: getDate
	    },
	    {
	    	path: '/axios',
	    	component: useAxios
	    },
	    {
	    	path: '/numCtrl',
	    	component: numCtrl
	    },
	    {
	    	path: '/lazyLoad',
	    	component: lazyLoading
	    },
	    {
	    	path: '/pageDetail',
	    	component: pageDetail
	    },
	    {
	    	path: '/echarts',
	    	component: useEcharts
	    },
	    {
	    	path: '/style',
	    	component: styleComp
	    },
	    {
	    	path: '*',
	    	redirect: '/select'
	    }
      ]
    },
    {
    	path: '*',
    	redirect: '/'
    }
  ]
})
