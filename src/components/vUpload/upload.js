import Vue from 'vue'
import vUpload from './upload.vue'

const upload = {
	name: 'myupload',
	install: function(){
		Vue.component('my-upload',vUpload);
	}
};

export default upload;