import Vue from 'vue'
import vScore from './score.vue'

const score = {
	name: 'myscore',
	install: function(){
		Vue.component('my-score',vScore);
	}
};

export default score;