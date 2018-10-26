<template>
	<div class="">
		<my-dialog ref="Layer"></my-dialog>
		<f-header></f-header>
		<div class="frame_body " id="frame_body">
			<f-nav></f-nav>
			<div class="frame_container_div">
				<div class="clearfix frame_container" v-if='routerFlag'>
					<router-view></router-view>
				</div>
			</div>
			<div class="frame_footer">
				<span>@copyright wangjun自定义组件库</span>
			</div>
		</div>	
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
			routerFlag: false
		}
	},
	components: {
		'f-header': fHeader,
		'f-nav': fNav
	},
	mounted(){	
		Vue.prototype.Layer = this.$refs.Layer;	
		this.routerFlag = true;
	},
	beforeMount(){
		
	}
}
</script>

<style>
	.frame_body{min-height:878px;background-color:#f5f5f5;position:relative;top:0;float:left;width:100%;min-width:1200px;height:auto;}
	.frame_container_div{margin-left:240px;margin-top:40px;margin-right:20px;position:relative;min-height:769px;background-color:#fff;padding:0;overflow:hidden;height:auto;}
	.frame_container{margin:0 20px;padding:20px 0;}
	.frame_footer{color:#bbb;bottom:20px;margin-left:240px;height:50px;line-height:50px;text-align:center;}
	.frame_page_div{margin:20px;}
</style>