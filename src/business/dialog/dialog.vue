<template>
	<div>
		<button @click='show_loading'>loading</button>
		<button @click='show_alert'>alert</button>
		<button @click='show_confirm'>confirm</button>
		<button @click='show_tips'>tips</button>
		<button @click='show_prompt'>prompt</button>
		<button @click='show_ref'>ref</button>
		<my-dialog ref="Layer"></my-dialog>
		<div>
			<button @click='show_loading2'>loading2</button>
			<button @click='show_alert2'>alert2</button>
			<button @click='show_confirm2'>confirm2</button>
			<button @click='show_tips2'>tips2</button>
			<button @click='show_success'>success</button>
			<button @click='show_error'>error</button>
			<button @click='show_prompt2'>prompt2</button>
			<button @click='show_ref2'>ref2</button>
			<button @click='open'>open</button>
			<button @click='progress'>progress</button>
			<button @click='window'>window</button>
		</div>
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
				input_value: '',
				test: {
					input: 'hello a!'
				}
			}
		},
		methods: {
			show_loading2: function(){
				let id = this.$dialog.loading('hhhh',false,() => {
					console.log('this is loading')
				})
				// let aid = this.$dialog.alert('你叫XX吗？',() => {
				// 	console.log('alert yes')
				// })
				// let cid = this.$dialog.confirm('要转账100元吗？',() => {
				// 	console.log('确认转账')
				// },() => {
				// 	console.log('取消，不转账')
				// })
				// let mid = this.$dialog.msg('你已经成功了',8000,() => {
				// 	console.log('成功提示')
				// })
				// let pid = this.$dialog.prompt('你的名字','xxxx',(value) => {
				// 	console.log('你的输入是'+value)
				// },() => {
				// 	console.log('你已取消输入')
				// })
				// let sid = this.$dialog.success('成功',6000,() => {
				// 	console.log('成功')
				// })
				// let eid = this.$dialog.error('失败',6000,() => {
				// 	console.log('失败')
				// })
				setTimeout(() => {
					// this.$dialog.close(id)
					// this.$dialog.close(aid)
					// this.$dialog.close(cid)
					// this.$dialog.close(mid)
					// this.$dialog.close(pid)
					// this.$dialog.close(sid)
					// this.$dialog.close(eid)
					this.$dialog.closeAll()
					// this.$dialog.changeMsg(id,'aaaaaa')
				},3000)
			},
			show_alert2: function(){
				this.$dialog.alert('你叫XX吗？',() => {
					console.log('alert yes')
				})
			},
			show_confirm2: function(){
				this.$dialog.confirm('要转账100元吗？',() => {
					console.log('确认转账')
				},() => {
					console.log('取消，不转账')
				})
			},
			show_tips2: function(){
				this.$dialog.msg('你已经成功了',6000,() => {
					console.log('成功提示')
				})
			},
			show_success: function(){
				this.$dialog.success('成功',6000,() => {
					console.log('成功')
				})
			},
			show_error: function(){
				this.$dialog.error('失败',6000,() => {
					console.log('失败')
				})
			},
			show_prompt2: function(){
				this.$dialog.prompt('你的名字', 'xxxx',(value) => {
					console.log('你的输入是'+value)
				},() => {
					console.log('你已取消输入')
				})
			},
			show_ref2: function(){
				console.log(this.$dialog)
			},
			open: function(){
				this.$dialog.open({
					type: 'progress',
					msg: 'hello',	//提示信息，所有种类弹框均需要，选择传入（有默认值）
					timeout: 3000,	//当弹框为msg、success、error时，用于控制展示时长，选择传入
					value: 'hi',	//当弹框为prompt时，传入value用于初始化弹框值，选择传入
					clickClose: true,	//当弹框为loading时，出入true表示，加载对话框可以手动关闭，选择传入
					current: 10,
					total: 234,
					ensure: (value) => {
						//所有包含 `确认` 按钮，点击触发的回调，选择传入
						console.log('通过open打开'+ value)
					},
					cancel: () => {
						//所有包含 `取消` 按钮，点击触发的回调，选择传入
						console.log('你已经关闭通过open打开的弹窗')
					},
					callback: () => {
						//当弹框为loading、msg、success、error时，关闭弹窗，触发相应回调函数，选择传入
						console.log('这是回调函数啊')
					}
				})
			},
			progress: function(){
				let id = this.$dialog.progress('0','93M',false,() => {
					console.log('上传完毕')
				})
				let i = 0
				let interval = setInterval(() => {
					i++
					if(i > 3){
						clearInterval(interval)
						this.$dialog.close(id,() => {
							console.log('上传完毕')
						})
					}
					this.$dialog.changeProgress(id,i*27+'M','107M')
				},1000)
			},
			window: function(){
				// this.$dialog.window('../../../static/window.html',() => {
				// 	console.log('打开指定弹框')
				// })
				this.$dialog.window('../../../static/window.html',() => {
					console.log('打开指定弹框')
				})
			},
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