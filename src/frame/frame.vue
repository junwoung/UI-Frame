<template>
	<div class="">
		<f-header></f-header>
		<div class="frame_body clearfix" id="frame_body">
			<f-nav></f-nav>
			<div class="frame_container_div" id="frame_container_div">
				<div class="clearfix" style="margin:0 20px;">
					<router-view></router-view>
				</div>
				<div class="frame_footer clearfix">
					<span>@copyright wangjun自定义组件库</span>
				</div>
			</div>
		</div>
		<my-dialog ref="Layer"></my-dialog>
	</div>
</template>

<script>
import Vue from 'vue'
import fHeader from './header/header.vue'
import fNav from './nav/nav.vue'
import router from '../router/index.js'
import dialog from '../components/VDialog/dialog.js'

Vue.use(dialog)


export default{
	name: 'myframe',
	data(){
		return{

		}
	},
	components: {
		'f-header': fHeader,
		'f-nav': fNav
	},
	mounted(){
		// let header = document.getElementById('frame_header');
		let nav = document.getElementById('frame_nav');
		setTimeout(function(){
			let fbody = document.getElementById('frame_body');
			let b_height = fbody.offsetHeight;
			nav.setAttribute('style','height:'+b_height+'px');
		},100);
		Vue.prototype.Layer = this.$refs.Layer;
	},
	beforeMount(){

	}
}
</script>

<style>
	.frame_body{min-height:889px;background-color:#f5f5f5;position:relative;top:0;float:left;width:100%;min-width:1200px;height:auto;}
	.frame_container_div{margin-left:240px;margin-top:40px;margin-right:20px;position:relative;left:0px;min-height:769px;background-color:#fff;height:100%;padding:0;}
	.frame_container{margin:40px 15px 10px 0;background-color:#fff;min-width:990px;position:relative;left:240px;padding:0;height:auto;}
	.frame_footer{height:0;text-align:center;color:#bbb;float:left;position:relative;bottom:30px;width:100%;}
	.frame_page_div{margin:20px;}
</style>