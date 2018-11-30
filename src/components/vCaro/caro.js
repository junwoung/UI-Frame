import Vue from 'vue'
import Caro from './caro.vue'

const caro = {
	name: 'caro',
	install: () => {
		Vue.component('my-caro',Caro)
	}
}

export default caro