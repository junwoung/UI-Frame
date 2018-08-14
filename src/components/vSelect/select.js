import Vue from 'vue';
import vSelect from './select.vue';

const select = {
	install : function(){
		Vue.component('my-select',vSelect);
	}
};

export default select;