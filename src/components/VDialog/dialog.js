import Vue from 'vue';
import vDialog from './dialog.vue';

const dialog = {
	install : function(){
		Vue.component('my-dialog',vDialog);
	}
};

export default dialog;