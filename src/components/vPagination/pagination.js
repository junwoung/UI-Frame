import Vue from 'vue';
import pagination from './pagination.vue'

const vPagination = {
	install : function(Vue){
		Vue.component('my-pagination',pagination);
	}
};

export default vPagination;