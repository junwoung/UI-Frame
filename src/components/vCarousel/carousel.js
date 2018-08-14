import Vue from 'vue'
import vCarousel from './carousel.vue'

const carousel = {
	name: 'mycarousel',
	install: function(){
		Vue.component('my-carousel',vCarousel)
	}
};
export default carousel;