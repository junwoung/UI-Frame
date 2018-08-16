import Vue from 'vue'
import vTime from './time.vue'

const time = {
	name: 'mytime',
	install: function(){
		Vue.component('my-time',vTime);
	}
};

export default time;