import Vue from 'vue'
import Router from 'vue-router'

import frame from '../frame/frame.vue'
import commonjs from '../frame/common/common.js'

import vPage from '../components/vPagination/pagination.js'
import page from '../business/page/page.vue'

import vDialog from '../components/VDialog/dialog.js'
import dialog from '../business/dialog/dialog.vue'

import vSelect from '../components/vSelect/select.js'
import select from '../business/select/select.vue'

import vCarousel from '../components/vCarousel/carousel.js'
import carousel from '../business/carousel/carousel.vue'

import vScore from '../components//vScore/score.js'
import score from '../business/score/score.vue'

import vTime from '../components/vTime/time.js'
import time from '../business/time/time.vue'

import getParam from '../business/commonFunction/param.vue'
import getDate from '../business/commonFunction/date.vue'

Vue.use(frame);
Vue.use(Router);
Vue.use(vPage);
Vue.use(vDialog);
Vue.use(vSelect);
Vue.use(vCarousel);
Vue.use(vScore);
Vue.use(vTime);

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
	    	path: '/getUrlParam',
	    	name: 'param',
	    	component: getParam
	    },
	    {
	    	path: 'getFormatDate',
	    	name: 'date',
	    	component: getDate
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
