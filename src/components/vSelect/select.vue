<template>
	<div v-if='data && data.length || type == "switch"' style="float:left;">
		<!-- 标准下拉框 query :true 带查询 :false 不带查询 -->
		<div v-if='type == "select"' style="float:left;">
			<div class="clearfix j_div_select">
				<input type="text" @blur="hide_options" @focus="show_options" style="width:0;height:0;outline:none;opacity:0;border:none;padding:0;marging:0;">
				<span class="j_sp_select" :class="{'j_sp_select_dis':disable}" @click="get_focus">
					<i class="j_i_dropdown"></i>
					<span class="j_lb_selected" @click="get_focus2" v-if="selected !== null" :title="txt">{{txt}}</span>
				</span>
				<ul class="j_ul_options hide">
					<input v-if='query' placeholder="请输入过滤条件" type="text" class="j_ip_query" @focus='show_options2' @blur='hide_options2' @keyup="select_query">
					<li v-for="(option,key) in data_select" :class="{'j_li_selected': selected == option.id}" :title="option.name" @click="select_option(option)"><span class="j_sp_option">{{option.name}}</span></li>
				</ul>
			</div>
		</div>

		<!-- tab选项 -->
		<div v-if='type == "tab"'>
			<div class="clearfix j_div_tab">
				<ul class="j_ul_tab clearfix" :class="{'j_ul_show_little':show_little}">
					<li v-if="multiple" :class="{'selected':selected == 'all'}" @click="select_all">全选</li>
					<li v-if="multiple" style="background-color:#bbb;color:#fff;border:1px solid #bbb;" @click="select_reverse">反选</li>
					<li @click="select_tab(option)" @mouseover="hover_idx = option.id" @mouseout="hover_idx = null" v-for="option in data" :class="{'selected':selected.indexOf(option.id) !== -1}">
						{{option.name}}
						<span @click.stop="tab_cancel(option.id)" class="j_close" v-if="selected.indexOf(option.id) !== -1 && hover_idx == option.id">x</span>
					</li>
				</ul>
				<div class="j_div_more">
					<div class="j_btn_more" v-if="show_little" @click='show_little = !show_little'>更多</div>
					<div class="j_btn_more" v-if="!show_little" @click='show_little = !show_little'>收起</div>
				</div>
				<div v-if='selected.length' class="j_div_selected">
					<label title="点击清空已选" style="cursor:pointer;" @click="clear_all">已选：</label>
					<span v-for="option in data">
						<span class="j_sp_selected" @mouseover="hover_idx_sel = s" @mouseout="hover_idx_sel = null" v-for="s in selected" v-if="option.id == s">
							{{option.name}}
							<span v-if="hover_idx_sel == s" class="j_close" @click='tab_cancel(s)'>x</span>
						</span>
					</span>
					<span class="j_sp_selected" v-if="selected == 'all'">全部</span>
				</div>
			</div>
		</div>

		<!-- 复选框 -->
		<div v-if="type == 'checkbox'" class="j_div_checkbox">
			<label v-for="option in data" class="j_lb_ck" @mouseover="hover_idx = option.id" @mouseout="hover_idx = null" @click="select_ck(option)">
				<i class="j_i_ck j_ck_uncheck" :class="{'j_ck_checked_dis':disable && data_select.indexOf(option.id) !== -1,'j_ck_uncheck_dis':disable == 'all' && data_select.indexOf(option.id) === -1,'j_ck_checked':selected.indexOf(option.id) !== -1,'j_ck_hover':hover_idx == option.id}"></i>
				<span :class="{'j_sp_ck_dis':disable && data_select.indexOf(option.id) !== -1 || disable === 'all','j_sp_ck':hover_idx == option.id || selected.indexOf(option.id) !== -1}">{{option.name}}</span>
			</label>
		</div>

		<!-- 单选按钮 -->
		<div v-if="type == 'radio'" class="j_div_radio">
			<label v-for="option in data" class="j_lb_rd" @mouseover="hover_idx = option.id" @mouseout="hover_idx = null" @click="select_rd(option)">
				<i class="j_i_rd j_rd_uncheck" :class="{'j_rd_checked_dis':disable && selected == option.id,'j_rd_uncheck_dis':disable,'j_rd_checked':selected == option.id,'j_rd_hover':hover_idx == option.id}"></i>
				<span :class="{'j_sp_rd_dis':disable,'j_sp_rd':selected == option.id || hover_idx == option.id}">{{option.name}}</span>
			</label>
		</div>

		<!-- 自动补全 -->
		<div v-if="type == 'complete'" class="j_div_complete">
			<div class="j_div_inner" :style="{'cursor':disable?'not-allowed!important':''}">
				<div class="j_div_selected" @click="get_focus_comp">
					<span v-for='option in data_select'>
						<span v-if="option.id == s" class="j_sp_selected" v-for='s in selected'><span @click.stop="cancel_comp(option)" class="j_close" :style="{'cursor':disable?'not-allowed':''}">x</span>{{option.name}}</span>
					</span>
					<input :style="{'cursor':disable?'not-allowed!important':''}" :disabled="disable" type="text" v-model="compValue" class="j_input_comp" @focus="focus = true" @blur="hide_comp" @keydown="listen_comp">
				</div>
				<div class="div_options" v-if='selected.length < data.length' :class="{'hide':!focus}">
					<span @mouseover="clear_style" class="j_sp_option" @click='select_comp(option)' v-for="(option,key) in data" v-if="selected.indexOf(option.id) === -1 && (option.name.indexOf(compValue) !== -1 || !compValue)" :class="{'j_sp_option_hover':key === i}">
						<span class="j_sp_margin">{{option.name}}</span>
					</span>
				</div>
			</div>
		</div>

		<!-- 开关按钮 -->
		<div v-if="type == 'switch'" class="j_div_switch">
			<span class="switch" :style="{cursor:disable?'not-allowed':'pointer'}" :class="{'j_switch_selected':selected}" @click="selected_switch"><i class=" j_switch_normal" :class="{'j_switch_normal_active':selected}"></i></span>
		</div>

	</div>
</template>

<script>
	export default{
		name: 'myselect',
		data(){
			return{
				type: 'select',
				multiple: false,
				selected: null,
				data: null,//传入的数据

				query: false,//select 是否带query查询
				data_select: null,//select 复制传入的数据  //checkbox 用于复制传入已选的数据
				txt: null,//select 存放选中的文本

				hover_idx: null,//tab 用于展示取消按钮  //checkbox 用于改变复选框样式  //radio 用于改变单选按钮样式
				show_little: true,//tab 用于展示tab选项多少
				hover_idx_sel: null,//tab 用于取消已选按钮

				disable: false,// checkbox 用于确认是否不可选

				compValue: null,//complete 用于存放选中的文本信息
				focus: false,//complete 用于存放文本框状态
				i: null,//complete 用于模拟hover事件
			}
		},
		props:{
			select: {
				type: Object,
				default: null
			}
		},
		methods: {
			get_focus: function(event){
				/**	让select第一个文本框获取焦点 */
				event.target.parentNode.firstChild.focus();
			},
			get_focus2: function(event){
				/**	让select query文本框获取焦点 */
				event.target.parentNode.parentNode.firstChild.focus();
			},
			select_option: function(obj){
				/**	点击select选项触发 */
				if(this.disable)return;
				this.selected = obj.id;
				this.txt = obj.name;
				this.$emit('callback',this.selected);
			},
			show_options: function(event){
				/**	当select第一个文本框获取焦点时展示下拉列表选项 */
				 event.target.parentNode.lastChild.setAttribute('class','j_ul_options');
			},
			show_options2: function(event){
				/**	当select  query文本框获取焦点时展示下拉列表选项 */
				let e = event;
				setTimeout(function(){
					e.target.parentNode.parentNode.lastChild.setAttribute('class','j_ul_options');
				},150);
			},
			hide_options: function(event){
				/* 当select第一个文本框失去焦点时隐藏下拉列表选项 */
				let e = event;
				setTimeout(function(){
					e.target.parentNode.lastChild.setAttribute('class','j_ul_options hide');
				},150);
			},
			hide_options2: function(event){
				/* 当select query文本框失去焦点时隐藏下拉列表选项 */
				let e = event;
				setTimeout(function(){
					e.target.parentNode.parentNode.lastChild.setAttribute('class','j_ul_options hide');
				},150);
			},
			select_query: function(event){
				/* select下拉列表选项根据query文本框输入的值变化 */
				// let event = window.event || arguments.callee.caller.arguments[0];
				let str = event.target.value;
				this.data_select = [];
				for(let i = 0; i < this.data.length; i++){
					if(this.data[i].name.indexOf(str) !== -1){
						this.data_select.push(this.data[i]);
					}
				}
			},
			select_all: function(){
				/* tab 点全选选择所有和取消 */
				if(this.disable)return;
				if(this.selected != 'all')this.selected = 'all';
				else this.selected = [];
				this.$emit('callback',this.selected);
			},
			select_tab: function(obj){
				/* tab 选择单个选项 */
				if(this.disable)return;
				if(!this.multiple){
					this.selected.length = 0;
					this.selected.push(obj.id);
					this.$emit('callback',this.selected);
					return;
				}
				if(this.selected === 'all'){
					this.selected = [];
				}
				if(this.selected.indexOf(obj.id) === -1){
					this.selected.push(obj.id);
				}
				this.$emit('callback',this.selected);
			},
			tab_cancel: function(idx){
				/* tab 取消单个选项 */
				if(this.disable)return;
				if(this.selected.indexOf(idx) === -1){
					return;
				}
				else{				
					this.selected.splice(this.selected.indexOf(idx),1);
					this.$emit('callback',this.selected);
				}
			},
			select_reverse: function(){
				/* tab 反选当前选项 */
				if(this.disable)return;
				if(this.selected == 'all')this.selected = [];
				else if(this.selected.length == 0)this.selected = 'all';
				else{
					let arr = [];
					for(let i = 0; i < this.data.length; i++ ){
						if(this.selected.indexOf(this.data[i].id) === -1){
							arr.push(this.data[i].id);
						}
					}
					this.selected = arr;
				}
				this.$emit('callback',this.selected);
			},
			clear_all: function(){
				/* tab 清除所有选项 */
				if(this.disable)return;
				this.selected = [];
				this.$emit('callback',this.selected);
			},
			select_ck: function(obj){
				/* checkbox 点击选择某个选项 */
				if(this.disable == 'part' && this.data_select.indexOf(obj.id) !== -1){
					return;
				}
				if(this.disable == 'all'){
					return;
				}
				if(this.selected.indexOf(obj.id) !== -1){
					this.selected.splice(this.selected.indexOf(obj.id),1);
				}
				else{
					this.selected.push(obj.id);
				}
				this.$emit('callback',this.selected);
			},
			select_rd: function(obj){
				/* radio 点击选择某个选项 */
				if(this.disable)return;
				this.selected = obj.id;
				this.$emit('callback',this.selected);
			},
			select_comp: function(obj){
				/* complete 点击选择某个选项 */
				if(this.disable)return;
				this.compValue = null;
				this.selected.push(obj.id);
				this.$emit('callback',this.selected);
			},
			cancel_comp: function(obj){
				/* complete 取消某个选项 */
				if(this.disable)return;
				this.selected.splice(this.selected.indexOf(obj.id),1);
				this.$emit('callback',this.selected);
			},
			hide_comp: function(){
				/* complete 隐藏选项 */
				let t = this;
				setTimeout(function(){
					t.focus = false;
				},150);
			},
			get_focus_comp: function(event){
				/* complete 文本框获得焦点 */
				if(this.disable)return;
				let e = event;
				if(e.target.nodeName === 'INPUT' || e.target.nodeName === 'SPAN')return;
				setTimeout(function(){
					e.target.lastChild.focus();
				},150);
				this.i = 0;
				
			},
			listen_comp: function(event){ 
				/* complete js监听键盘事件，模拟上下键 */
				if(this.disable)return;
				let code = event.keyCode;
				if(code === 40){
					/* 向上键触发事件 */
					let nodes = event.target.parentNode.parentNode.lastChild.childNodes;
					let nodes_new = [];
					for(let i = 0; i < nodes.length; i++){
						if(nodes[i].nodeName === 'SPAN'){
							nodes_new.push(nodes[i]);
						}
					}
					if(this.i === null){this.i = 0;}
					else{
						if(this.i >= nodes.length -1 )return;
						this.i++;
					} 
					while(nodes[this.i] && nodes[this.i].nodeName !== 'SPAN'){
						this.i++;
					}
					if(this.i >= nodes.length -1 )this.i = nodes.length-1;
					return;
				}
				if(code === 38){
					/* 向下键触发事件 */
					let nodes = event.target.parentNode.parentNode.lastChild.childNodes;
					let nodes_new = [];
					for(let i = 0; i < nodes.length; i++){
						if(nodes[i].nodeName === 'SPAN'){
							nodes_new.push(nodes[i]);
						}
					}
					if(this.i <= 0 || this.i === null)return;
					this.i--;
					while(nodes[this.i] && nodes[this.i].nodeName !== 'SPAN'){
						this.i--
					}
					return;
				}
				if(code === 13){
					/* enter键触发事件 */
					let nodes = event.target.parentNode.parentNode.lastChild.childNodes;
					let nodes_new = [];
					for(let i = 0; i < nodes.length; i++){
						if(nodes[i].nodeName === 'SPAN'){
							nodes_new.push(nodes[i]);
						}
					}
					if(this.i >= nodes_new.length)this.i = nodes_new.length;
					if(this.i === null)return;
					for(let i = 0; i < nodes_new.length; i++){
						if(nodes_new[i].getAttribute('class') === "j_sp_option j_sp_option_hover"){
							nodes_new[i].click();
							break;
						}
					}
					this.i++;
					while(nodes[this.i] && nodes[this.i].nodeName !== 'SPAN'){
						this.i++;
					}
					return;
				}
			},
			clear_style: function(event){
				/* complete 清除选项hover样式 */
				this.i = 0;
				let nodes = event.target.parentNode.childNodes;
				for(let i = 0; i < nodes.length; i++){
					if(nodes[i].nodeName === 'SPAN' && nodes[i].childNodes){
						nodes[i].setAttribute('class','j_sp_option');
					}
				}
			},
			selected_switch: function(){
				/* switch 按钮 */
				if (this.disable) {return;}
				this.selected = !this.selected;
				this.$emit('callback',this.selected);
			}
		},
		mounted(){
					
		},
		beforeMount(){
			/* 在节点创建之前将传入的参数赋值给相应的变量 */
			if(this.select.data && this.select.data.length){
				for(let key in this.select){
					this.$data[key] = this.select[key];
				}
				/* 用于query 保存传入的初始值 */
				this.data_select = JSON.parse(JSON.stringify(this.data));
				if(this.type == 'checkbox'){
					/* 用于checkbox 当disable为part时，用于确定已选的参数不可被取消 */
					this.data_select = JSON.parse(JSON.stringify(this.selected));
				}
			}
			if(this.selected !== null){
				/* 初始化select选中的文本 */
				for(let i = 0; i < this.data.length; i++){
					if(this.selected == this.data[i].id){
						this.txt = this.data[i].name;
						break;
					}
				}
			}
			if(this.select.type == 'switch'){
				for(let key in this.select){
					this.$data[key] = this.select[key];
				}
			}
		}
	}
</script>

<style scoped>
	*{font-size:14px;font-family:'微软雅黑';}
	.hide{display:none;}

	.j_div_select{position:relative;max-width:200px;min-width:150px;height:28px;padding:0;color:#333;}
	.j_div_select .j_sp_select{width:90%;height:98%;line-height:28px;border:1px solid #dddddd;display:inline-block;border-radius:2px;cursor:pointer;position:relative;text-align:left;padding-left:4%;float:left;}
	.j_div_select .j_sp_select_dis{background-color:#f5f5f5!important;color:#bbb;cursor:not-allowed;}
	.j_div_select .j_i_dropdown{background:url(./img/select-triangle_down.png) no-repeat;display:inline-block;width:10px;height:6px;position:absolute;right:3%;top:45%;}
	.j_div_select .j_ul_options{position:absolute;padding:0;text-align:left;left:0;width:94%;background-color:#fff;z-index:100;border:1px solid #dddddd;margin:0;top:28px;overflow:auto;max-height:150px;}
	.j_div_select .j_ul_options li{list-style:none;margin:0;width:100%;height:25px;line-height:25px;cursor:pointer;}
	.j_div_select .j_ul_options li:hover{background-color:#F5F5F5;}
	.j_div_select .j_li_selected{background-color:#dddddd!important;color:#fff;}
	.j_div_select .j_sp_option{margin-left:4%;max-width:80%;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	.j_div_select .j_lb_selected{display:inline-block;max-width:75%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	.j_div_select .j_ip_query{width:92%;padding-left:4%;border:1px solid #3896fe;margin:2px;outline:none;height:25px;color:#999;font-size:12px;}

	.j_div_tab{color:#666;background-color:#f5f5f5;color:#333;}
	.j_div_tab .j_ul_tab{padding:10px 20px;width:80%;float:left;overflow:hidden;}
	.j_div_tab .j_ul_show_little{height:33px;}
	.j_div_tab .j_ul_tab li{list-style:none;float:left;padding:6px 15px;border:1px solid #bbbbbb;margin-left:20px;border-radius:3px;cursor:pointer;position:relative;margin-bottom:10px;}
	.j_div_tab .j_ul_tab li:hover{border:1px solid #3896f8;color:#3896f8;}
	.j_div_tab .j_ul_tab .selected{border:1px solid #3896f8;color:#fff!important;background-color:#3896f8;}
	.j_div_tab .j_close{display:inline-block;width:14px;height:14px;border-radius:50%;background-color:#FF0033;color:#fff;line-height:12px;position:absolute;text-align:center;top:-5px;right:-5px;user-select:none;}
	.j_div_tab .j_div_more{width:10%;float:left;}
	.j_div_tab .j_btn_more{width:60px;;height:31px;border:1px solid #bbbbbb;background-color:#bbbbbb;color:#fff;cursor:pointer;border-radius:3px;margin-top:25px;line-height:31px;text-align:center;}
	.j_div_tab .j_div_selected{width:100%;float:left;text-align:left;padding:0 0 10px 40px;}
	.j_div_tab .j_sp_selected{padding:5px 15px;background-color:#fff;border:1px solid #3896f8; border-radius:3px;cursor:pointer;margin: 0 20px 10px 0;display:inline-block;position:relative;}

	.j_div_checkbox{color:#666;user-select:none;}
	.j_div_checkbox .j_lb_ck{margin-right:15px;display:inline-block;position:relative;height:25px;line-height:25px;}
	.j_div_checkbox .j_sp_ck{color:#3896f8;cursor:pointer;}
	.j_div_checkbox .j_sp_ck_dis{color:#bbb!important;cursor:not-allowed;}
	.j_div_checkbox .j_i_ck{display:inline-block;width:14px;height:14px;position:relative;top:2px;cursor:pointer;}
	.j_div_checkbox .j_ck_uncheck{background:url(./img/checkbox_unchecked.png) no-repeat;cursor:pointer;}
	.j_div_checkbox .j_ck_hover{background:url(./img/checkbox_hover.png) no-repeat;cursor:pointer;}
	.j_div_checkbox .j_ck_checked{background:url(./img/checkbox_check.png) no-repeat;cursor:pointer;}
	.j_div_checkbox .j_ck_checked_dis{background:url(./img/checkbox_check_disabled.png) no-repeat;cursor:not-allowed;}
	.j_div_checkbox .j_ck_uncheck_dis{background:url(./img/checkbox_disabled.png) no-repeat;cursor:not-allowed;}

	.j_div_radio{color:#666;user-select:none;}
	.j_div_radio .j_lb_rd{margin-right:15px;display:inline-block;position:relative;height:25px;line-height:25px;}
	.j_div_radio .j_sp_rd{color:#3896f8;cursor:pointer;}
	.j_div_radio .j_sp_rd_dis{color:#bbb!important;cursor:not-allowed;}
	.j_div_radio .j_i_rd{display:inline-block;width:14px;height:14px;position:relative;top:2px;cursor:pointer;}
	.j_div_radio .j_rd_uncheck{background:url(./img/radio-unchecked.png) no-repeat;cursor:pointer;}
	.j_div_radio .j_rd_hover{background:url(./img/radio-hover.png) no-repeat;cursor:pointer;}
	.j_div_radio .j_rd_checked{background:url(./img/radio-check.png) no-repeat;cursor:pointer;}
	.j_div_radio .j_rd_checked_dis{background:url(./img/radio-disabled_check.png) no-repeat!important;cursor:not-allowed;}
	.j_div_radio .j_rd_uncheck_dis{background:url(./img/radio-disabled.png) no-repeat;cursor:not-allowed;}

	.j_div_complete{user-select:none;}
	.j_div_complete .j_div_inner{position:relative;width:300px;box-shadow:0 0 4px #ddd;}
	.j_div_complete .j_div_selected{border:1px solid #ddd;padding:10px;text-align:left;}
	.j_div_complete .j_sp_selected{padding:3px 5px 3px 18px;border:1px solid #F77825;background-color:#f9eae1;margin:0 5px 5px 0;position:relative;float:left;}
	.j_div_complete .j_close{position:relative;left:-10px;color:#bbb;cursor:pointer;}
	.j_div_complete .j_input_comp{border:none;outline:none;width:100px;background-color:#fff;}
	.j_div_complete .div_options{width:298px;border:1px solid #ddd;border-top:none;position:absolute;z-index:1000;background-color:#fff;max-height:150px;overflow:auto;}
	.j_div_complete .j_sp_option{display:block;height:28px;line-height:28px;text-align:left;cursor:pointer;}
	.j_div_complete .j_sp_option:hover{background-color:#ddd;}
	.j_div_complete .j_sp_option_hover{background-color:#ddd;}
	.j_div_complete .j_sp_margin{ margin-left:10px;}

	.j_div_switch{float:left;}
	.j_div_switch .switch{display:inline-block;width:80px;height:30px;background-color:#ddd;border-radius:30px;position:realtive;transition: background-color 0.5s;}
	.j_div_switch .j_switch_selected{background-color:#3896f8;}
	.j_div_switch .j_switch_normal{content:'';position:relative;display:inline-block;width:28px;height:28px;border-radius:30px;background-color:#fff;top:1px;left:1px;transition: left 0.5s;}
	.j_div_switch .j_switch_normal_active{left:51px!important;}

</style>