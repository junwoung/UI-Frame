<template>
	<div id="frame_nav" class="frame_nav">
		<ul class="ul_nav">
			<li class="li_first" :class="{'li_parent':d.sons && !show_son(d.sons),'li_parent_active':d.sons && show_son(d.sons),'li_active':d.url == current_url}"  v-for="d in data">
				<a @click.stop='turn_route(d.sons[0].url)' v-if="d.sons" class="a_first" :href="'!#/'+d.sons[0].url">
					<span>{{d.name}}</span>
					<li class="li_second" v-for="s in d.sons" v-show="show_son(d.sons)" :class="{'li_active':show_son(s)}">
						<a @click.stop='turn_route(s.url)' :href="s.url?('!#/'+s.url):''" class="a_second" :class="{'nav_active':show_son(s)}">
							<span class="sp_name">{{s.name}}</span>
						</a>
					</li>
				</a>
				<a @click.stop='turn_route(d.url)' v-if="!d.sons" class="a_first" :href="d.url?('!#/'+d.url):''" :class="{'nav_active':d.url == current_url}">{{d.name}}</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name: 'mynav',
		data(){
			return{
				data: [
					{
						name: '插件',
						sons: [
							{name: '选择',url: 'select'},
							{name: '分页',url: 'pagination',sons: [{name: '详情',url: 'pageDetail'}]},
							{name: '轮播',url: 'carousel'},
							{name: '评分',url: 'score'},
							{name: '时间',url: 'time'},
							{name: '文件上传',url: 'upload'}
						]
					},
					{
						name: '弹窗',
						url: 'dialog'
					},
					{
						name: '方法',
						sons: [
							{name: '获取url参数',url: 'getUrlParam'},
							{name: '获取格式化时间',url: 'getFormatDate'},
							{name: 'axios',url: 'axios'},
							{name: 'echarts',url: 'echarts'}
						]
					},
					{
						name: '指令',
						sons: [
							{name: '数值控制',url: 'numCtrl'},
							{name: '图片懒加载',url: 'lazyLoad'}
						]
					}
				],
				current_url: ''
			}
		},
		methods: {
			show_son: function(arr){
				if(arr instanceof Array){
					for(let i = 0; i < arr.length; i++){
						if(arr[i].url === this.current_url){
							return true;
						}
						if(arr[i].sons){
							for(let j = 0; j < arr[i].sons.length; j++){
								if(arr[i].sons[j].url === this.current_url){
									return true;
								}
							}
						}
					}
					return false;
				}
				else{
					if(arr.url === this.current_url){
						return true;
					}
					if(arr.sons){
						for(let i = 0; i < arr.sons.length; i++){
							if(arr.sons[i].url === this.current_url){
								return true;
							}
						}
					}
					return false;
				}
				
			},
			turn_route: function(url){
				this.current_url = url;
			}
		},
		mounted(){
			let url = location.href;
			this.current_url = url.split('#/')[1].split('?')[0];
		},
		watch: {
			$route(to,from){
			    let url = location.href;
				this.current_url = url.split('#/')[1].split('?')[0];
			}
		}
	}
</script>

<style scope>
	.frame_nav{width:220px;background-color:#222D43;font-size:14px;font-family:'微软雅黑';float:left;position:relative;z-index:200;overflow:hidden;height:auto;position:absolute;bottom:0;top:0;}
	.frame_nav .ul_nav{padding:0;margin:40px 0px 0 0px;}
	.frame_nav .ul_nav li{list-style:none;float:left;}
	.frame_nav .li_first{width:100%;min-height:40px;color:rgba(108,125,163,0.8);position:relative;cursor:pointer;line-height:40px;border-left:4px solid #222D43;}
	.frame_nav .li_second{width:100%;height:40px;border-left:4px solid #222D43;position:relative;left:-34px;;}
	.frame_nav a{text-decoration:none;color:rgba(108,125,163,0.8);width:100%;display:inline-block;}
	.frame_nav .a_first{margin-left:30px;font-size:16px!important;}
	.frame_nav .a_second{font-size:14px;}
	.frame_nav .sp_name{margin-left:60px;}
	.frame_nav .li_parent:after{content:'';position:absolute;width:0;height:0;border-top:5px solid rgba(108,125,163,0.8);border-left:5px solid transparent;border-right:5px solid transparent;right:30px;top:18px;}
	.frame_nav .li_parent_active:after{content:'';position:absolute;width:0;height:0;border-bottom:5px solid rgba(108,125,163,0.8);border-left:5px solid transparent;border-right:5px solid transparent;right:30px;top:18px;}
	.frame_nav .nav_active{color:#fff;}
	.frame_nav .li_active{background-color:#162035;border-left:4px solid #3896f8;}
</style>