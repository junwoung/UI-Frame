<template>
	<transition name='fade'>
		<div v-if="type">
			<div class="j_d_modal" :class="{'j_d_modal_white': type == 'loading'}" v-if='type != "msg"' @click="hide"></div>
			<!-- 确认对话框 -->
			<div class="j_diy_dialog_window clearfix" ref="MyWindow" id="j_diy_dialog_window" style="opacity:0" v-if='type == "confirm"'>
				<div class="j_head_div clearfix">
					<span class="j_sp_title">{{title}}</span>
					<span class="j_sp_close" @click="hide">X</span>
				</div>
				<div class="j_body_div clearfix">
					<span>{{msg}}</span>
				</div>
				<div class="j_btn_group clearfix">
					<button class="btn j_btn-ensure" @click='ensure'>确认</button>
					<button class="btn j_btn-cancel" @click='cancel'>取消</button>
				</div>
			</div>
			<!-- 提示信息对话框 -->
			<div class="j_msg_body_init clearfix" ref="MyWindow" id="j_diy_dialog_window" v-if='type == "msg"' @click="hide">
				<span>{{msg}}</span>
			</div>
			<!-- 警告对话框 -->
			<div class="j_diy_dialog_window clearfix" ref="MyWindow" id="j_diy_dialog_window" style="opacity:0" v-if='type == "alert"'>
				<div class="j_head_div clearfix">
					<span class="j_sp_title">{{title}}</span>
					<span class="j_sp_close" @click="hide">X</span>
				</div>
				<div class="j_body_div clearfix">
					<div class="j_alert_img_div clearfix"><div class="j_alert_img">!</div></div>
					<div class="j_alert_msg_div clearfix">
						<span class="j_alert_msg">{{msg}}</span>
					</div>
				</div>
				<div class="j_btn_group clearfix">
					<button class="btn j_btn-ensure" @click='alert_ensure' style="float:right;margin-right:20px;">确认</button>
				</div>
			</div>
			<!-- 加载对话框 -->
			<div class="j_loading_body clearfix" ref="MyWindow" id="j_diy_dialog_window" style="opacity:0" v-if='type == "loading"'>
				<div class="loading"></div>
				<span class="j_loading_msg">{{msg}}</span>
			</div>
			<!-- prompt对话框 -->
			<div class="j_diy_dialog_window clearfix" ref="MyWindow" id="j_diy_dialog_window" style="opacity:0" v-if='type == "prompt"'>
				<div class="j_head_div clearfix">
					<span class="j_sp_title">{{msg}}</span>
					<span class="j_sp_close" @click="hide">X</span>
				</div>
				<div class="j_body_div clearfix">
					<!-- <label class="j_input_title">{{msg}}</label> -->
					<input type="text" id="j_diy_dialog_window_input" v-model='prompt_value' class="input" :class="{'j_input_focus':focus}" :focus='focus = true'>
				</div>
				<div class="j_btn_group clearfix">
					<button class="btn j_btn-ensure" @click='ensure'>确认</button>
					<button class="btn j_btn-cancel" @click='cancel'>取消</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		data(){
			return {
				type: '',//对话框类型
				title: '提示信息',//对话框title
				msg: '',//对话框提示信息
				timing: 3,//msg对话框存在时间
				time_out: null,//用于取消msg对话框定时任务
				no: '',//confirm回调函数（取消）
				yes: '',//confirm回调函数（确定）
				callback: '',//alert回调函数
				prompt_value:'',//prompt输入框值
				focus: false
			}
		},
		props:{
			dialog:{
				type:Object,
				default:null
			}
		},
		methods: {
			open: function(obj){
				/* open 传入 type 打开对应对话框 */
				let t = this;
				if(obj){
					for(let key in obj){
						this.$data[key] = obj[key];
					}
					if(this.type == 'msg'){
						t.timing = t.timing || 3;
						setTimeout(function(){
							let win = document.getElementById('j_diy_dialog_window');
							setTimeout(function(){
								win.setAttribute('class','j_msg_body clearfix');
								t.setPosition();
								t.time_out = setTimeout(function(){
									t.hide();
								},t.timing*1000);
							},10);	
						},100);
						
					}
					else{
						setTimeout(function(){
							t.setPosition();
						},10);
					}
					if(this.type == 'loading'){
						this.msg = this.msg || 'loading';
					}
				}
			},
			hide: function(){
				/* 隐藏对话框 */
				if(this.type == 'loading'){
					return;
				}
				this.type = false;
				clearTimeout(this.time_out);
			},
			hideAll: function(){
				/* 隐藏所有对话框 */
				clearTimeout(this.time_out);
				this.type = false;
			},
			setPosition: function(){
				/* 调整对话框在窗口的位置 */
				let b_width = window.innerWidth;
				let b_height = window.innerHeight;
				let win = document.getElementById('j_diy_dialog_window');
				let offset_w = (b_width - win.offsetWidth-100)/2;
				let style_txt = 'left:' + offset_w + 'px;';
				if(win.offsetHeight < b_height){
					style_txt += 'top:' + (b_height - win.offsetHeight-200)/2 +'px';
				}
				win.setAttribute('style',style_txt);
			},
			ensure: function(){
				/* confirm 确定按钮 */
				this.yes && this.yes();
				this.hide();
			},
			cancel: function(){
				/* confirm 取消按钮 */
				this.no && this.no();
				this.hide();
			},
			alert_ensure: function(){
				/* alert 确定按钮 */
				this.callback && this.callback();
				this.hide();
			},
			tips: function(str,timing){
				if(this.type) this.hideAll();
				let t = this;
				/* msg 纯提示对话框 */
				setTimeout(function(){
					t.type = 'msg';
					t.msg = str || '请输入提示信息';
					t.timing = timing || 3;
					setTimeout(function(){
						let win = document.getElementById('j_diy_dialog_window');
						setTimeout(function(){
							win.setAttribute('class','j_msg_body clearfix');
							t.setPosition();
							t.time_out = setTimeout(function(){
								t.hide();
							},t.timing*1000);
						},10);	
					},100);
				},10);
				
			},
			confirm: function(){
				/* confirm 确认对话框 */
				if(this.type) this.hideAll();
				let t = this;
				let args = arguments;
				setTimeout(function(){
					t.type = 'confirm';
					if(args[0]){
						t.msg = args[0];
					}
					else{
						t.msg = '确认要干什么？';
					}
					if(args[1]){
						t.yes = args[1];
					}
					if(args[2]){
						t.no = args[2];
					}
					setTimeout(function(){
						t.setPosition();
					},10);
				},10);
				
			},
			alert: function(){
				/* alert 警告对话框 */
				if(this.type) this.hideAll();
				let t = this;
				let args = arguments;
				setTimeout(function(){
					t.type = 'alert';
					if(args[0]){
						t.msg = args[0];
					}
					else{
						t.msg = '请确认什么？';
					}
					if(args[1]){
						t.callback = args[1];
					}			
					setTimeout(function(){
						t.setPosition();
					},10);
				},10);
				
			},
			loading: function(str){
				/* loading 加载对话框 */
				if(this.type) this.hideAll();
				let t = this;
				setTimeout(function(){
					t.type = 'loading';
					t.msg = str || 'loading';
					setTimeout(function(){
						t.setPosition();
					},10);
				},10);
				
			},
			prompt: function(){
				/* prompt 输入对话框 */
				if(this.type) this.hideAll();
				let t = this;
				let args = arguments;
				setTimeout(function(){
					t.type = 'prompt';
					if(args[0]){
						t.msg = args[0];
					}
					else{
						t.msg = '请输入标题';
					}
					if(args[1]){
						t.prompt_value = args[1];
					}
					if(args[2]){
						t.yes = args[2];
					}
					if(args[3]){
						t.no = args[3];
					}
					setTimeout(function(){
						t.setPosition();
						document.getElementById('j_diy_dialog_window_input').focus();
					},10);
				},10);				
			}
		},
		mounted() {
			let t = this;
			window.onresize = function(){
				if(document.getElementById('j_diy_dialog_window')){
					t.setPosition();
				}
				/* 当窗口大小改变 改变对话框的位置 */				
			}
		}
	}
</script>

<style scoped>
	.hide{display:none;}
	.j_d_modal{position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 100000;background-color: #000;opacity: 0.5;font-size:14px;}
	.j_diy_dialog_window{position: fixed;top: 30%;left: 0;max-width: 500px;min-width: 250px;min-height: 50px;background-color: #fff;z-index: 110000;border-radius: 3px;box-shadow:3px 3px 5px #666;color:#666;text-align:center; }
	.j_head_div{padding:5px;border-bottom:1px solid #dddddd;font-size:12px;}
	.j_body_div{padding:10px 10px 30px 10px;;text-align:center;}
	.j_sp_title{float:left;margin-right:20px;}
	.j_sp_close{float:right;cursor:pointer;}
	.j_sp_close:hover{color:#3896fe;}
	.j_btn_group{text-align:center;padding-bottom:10px;}
	.btn{cursor:pointer;width:60px;height:25px;border-radius:2px;outline:none;}
	.j_btn-ensure{color:#fff;background-color:#3896fe;border:1px solid #3896fe;margin-right:10px;}
	.j_btn-ensure:hover{background-color:#428bca;border:1px solid #428bca;}
	.j_btn-cancel{color:#666;background-color:#dddddd;border:1px solid #dddddd;}
	.j_btn-cancel:hover{background-color:#bbbbbb;border:1px solid #bbbbbb;}

	.j_msg_body_init{width:0;height:0;opacity:0;top:50%;left:50%;over-flow:hidden; transition: width 1s;position:fixed;}
	.j_msg_body{padding:15px 40px;background-color:#000;color:#fff;opacity:0.6;border-radius:5px;cursor:pointer;max-width:300px;position:fixed;z-index: 110000;text-align:center;}

	.j_alert_img_div{width:60px;float:left;height:100%;}
	.j_alert_img{content:'!';position:relative;width:32px;height:32px;background-color:#D80000;display:inline-block;z-index:120000;color:white;line-height:32px;font-size:20px;font-weight:600;border-radius:50%;text-align:center;margin-top:10px;}
	.j_alert_msg_div{width:70%;float:left;height:100%;text-align:left;padding-top:14px;}
	.j_alert_msg{margin-top:10px;}

	.j_loading_body{padding:20px;background-color:#333;opacity:0.7;position:fixed;z-index:110000;color:#fff;border-radius:15px;min-width:80px;text-align:center;}
	.loading{width:100%;height:32px;display:block;background:url('./img/loading.gif') no-repeat center;margin-left:10xp;text-align:center;margin-bottom:10px;}
	.j_loading_msg{white-space:wrapped;}
	.j_d_modal_white{background-color:transparent!important;}

	.input{outline:none;border:1px solid #dddddd;height:30px;padding:0 10px;width:60%;border-radius:5px;}
	.j_input_focus,.input:hover{border:1px solid #3896f3!important;}
	.j_input_title{display:inline-block;height:32px;line-height:32px;margin-right:10px;}
	.j_input_title:after{content:'：';position:relative;}
</style>