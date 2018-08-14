<template>
	<div>
		<button @click='show_loading'>loading</button>
		<button @click='show_alert'>alert</button>
		<button @click='show_confirm'>confirm</button>
		<button @click='show_tips'>tips</button>
		<button @click='show_prompt'>prompt</button>
		<button @click='show_ref'>ref</button>
		<my-dialog ref="Layer"></my-dialog>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				dialogObj: null,
				page: {
					/*  total:总页数 （必填）
						current:当前页
						show_pages:中间展示分页数目
						size:列表每页展示条数
					  */
					type: Object,
					default: null
				},
				input_value: ''
			}
		},
		methods: {
			show_ref: function(){
				console.log(this.$refs);
			},
			show_loading: function(){ 
				let t = this;
				let layer = this.$refs.Layer;
				layer.loading('加载中');
				setTimeout(function(){
					layer.hideAll();
				},4000);
				// layer.open({
				// 	type: 'confirm',
				// 	msg: '请确认是否删除？',
				// 	title: '请确认',
				// 	yes(){
				// 		console.log('ensure');
				// 		t.page.total = 100;
				// 		t.page.current = 1;
				// 		setTimeout(function(){
				// 			layer.open({
				// 				type: 'msg',
				// 				msg: '删除成功',
				// 			});
				// 		},10);
						
				// 	},
				// 	no(){
				// 		console.log('cancel');
				// 		setTimeout(function(){
				// 			layer.open({
				// 				type: 'alert',
				// 				title: 'ttt',
				// 				msg: '确认取消？'
				// 			});
				// 		},10);
				// 	},
				// 	callback(){
				// 		console.log('callback');
				// 		t.page.total = 10;
				// 		setTimeout(function(){
				// 			layer.open({
				// 				type: 'msg',
				// 				msg: '取消成功'
				// 			});
				// 		},10);
				// 	}
				// });l
			},
			show_tips: function(){
				let layer = this.$refs.Layer;
				layer.tips('恭喜恭喜！');
			},
			show_confirm: function(){
				let layer = this.$refs.Layer;
				layer.confirm('请确认是否删除？',function(){console.log('confirm yes')},function(){console.log('confirm no')});
			},
			show_alert: function(){
				let layer = this.$refs.Layer;
				layer.alert('危险预警',function(){console.log('alert')});
			},
			show_prompt: function(){
				let layer = this.$refs.Layer;
				let value = '原始值';
				layer.prompt('请输入一个值',value,function(){
					value = this.prompt_value;
					setTimeout(function(){
						layer.tips(value);
					},10)
					
					console.log(value);
				},function(){console.log(value)});
			},
			turn_page:function(page,size){
				console.log(page,size);
			}
		},
		mounted(){
			this.page = {
				total: 388,
				current: 2,
				show_pages: 6,
				size: 7
			};		
		}
	}
</script>