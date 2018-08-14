<template>
	<div class="j_pagination_div clearfix" v-if="isShow">
		<ul class="ul">
			<li @click="toPage(1)" :class="{disabled:current <= 1}">首页</li>
			<li @click="toPage(current-1)" :class="{disabled:current <= 1}"><</li>
			<li :class="{selected:current == p}" v-for="p in pages" @click="toPage(p)">{{p}}</li>
			<li @click="toPage(current+1)" :class="{disabled:current >= total_page}">></li>
			<li @click="toPage(total_page)" :class="{disabled:current >= total_page}">尾页</li>
		</ul>
		<div class="j_select_div">
			<input type="text" style="width: 0;height: 0;border: none;" v-on:focus="show" v-on:blur="hide">
			<span class="j_selected_span" @click="showList($event)">{{selected_num}}条</span>
			<div class="j_pagenum_list" :class="{hide:!onSelect}">
				<span :class="{selected:pagenum == selected_num}" v-for="pagenum in j_pagenum_list" @click="selectNum(pagenum)">{{pagenum}}条</span>
			</div>
		</div>
		<div class="j_turn_div">
			<span class="j_turn_span">跳至</span>
			<input type="text" v-model="input_num" class="j_turn_input" v-on:keydown="listen($event)" v-on:blur="toPage(input_num)">
			<span class="j_turn_total">/{{total_page}}页,共{{total}}条</span>
			<span class="j_turn_btn">跳转</span>
			<span class="total"></span>
		</div>
	</div>
</template>


<script>
	export default{
		name : 'pagination',
		data(){
			return{
				isShow:false,//是否显示分页插件
				total:0,//总条数
				pages:[1],//分页列表
				current:1,//当前页
				selected_num:20,//选择的分页大小
				j_pagenum_list:[10,20,50,100],//默认分页大小选择列表
				onSelect:false,//判断是否处于选择分页大小，控制隐藏选择列表
				input_num:null,//页码输入框
				total_page:0,//总页数
				show_pages:5,//中间展示页码条数
			}
		},
		props:{
			page:{
				type:Object,
				default:null
			}
		},
		methods:{
			init:function(){
				/* 初始化分页插件 */
				var t = this;
				if(this.page){
					if(this.page.total){
						this.isShow = true;
						this.total = this.page.total;
					}
					if(this.page.current){
						this.current = this.page.current;
					}
					if(this.page.size && this.page.size > 0){
						if(this.j_pagenum_list.indexOf(this.page.size) == -1){
							this.j_pagenum_list.push(this.page.size);
						}
						this.selected_num = this.page.size;
					}
					if(this.page.show_pages){
						if(this.page.show_pages > 10){
							this.show_pages = 10;
						}
						else if(this.page.show_pages < 3){
							this.show_pages = 3;
						}
						else
							this.show_pages = this.page.show_pages;
					}
				}
				this.total_page = Math.ceil(this.total/this.selected_num);
				if(this.current > this.total_page){
					this.current = 1;
				}
				this.calculatePages();
			},
			show:function(){
				var t = this;
				setTimeout(function(){
					t.onSelect = true;
				},100);
			},
			hide:function(){
				var t = this;
				setTimeout(function(){
					t.onSelect = false;
				},150);
			},
			showList:function(e){
				/* 显示分页大小选项 */
				e.target.parentNode.firstChild.focus();
			},
			selectNum:function(num){
				/* 选择分页大小 */
				this.selected_num = num;
				this.total_page = Math.ceil(this.total/this.selected_num);
				this.current = 1;
				this.input_num = 1;
				this.calculatePages();
				this.$emit('turn_page',this.current,this.selected_num);
			},
			calculatePages:function(){
				/* 计算分页显示数 */
				this.pages = [];
				if(this.total_page <= this.show_pages){
					for(var i = 1; i <= this.total_page; i++){
						this.pages.push(i);
					}
				}
				if(this.total_page > this.show_pages){
					var start = 0,end = 0;
					if(this.current <= this.show_pages - Math.floor(this.show_pages/2)){
						start = 1;
						end = this.show_pages;
					}
					else if(this.current >= this.total_page - Math.floor(this.show_pages/2)){
						start = this.total_page - this.show_pages +1;
						end = this.total_page;
					}
					else{
						if(Math.ceil(this.show_pages/2) !== Math.floor(this.show_pages/2)){
							start = this.current - Math.floor(this.show_pages/2);
							end = this.current + Math.floor(this.show_pages/2);
						}
						else{
							start = this.current - Math.floor(this.show_pages/2)+1;
							end = this.current + Math.floor(this.show_pages/2);
						}
					}
					for(var i = start; i <= end; i++){
						this.pages.push(i);
					}

				}
			},
			toPage:function(num){
				/* 跳转到指定页 */
				num = parseInt(num);
				if(num > 0 && num <= this.total_page && num != this.current){
					this.current = num;
					this.calculatePages();
					this.input_num = num;
					this.$emit('turn_page',this.current,this.selected_num);
				}
				else{
					this.input_num = this.current;
				}
			},
			listen:function(e){
				/* 监听文本框输入事件，enter跳转和只让输入数字 */
				var code = event.keyCode;
		        if(code>=48 && code<=57 || code==8 || code>=96 && code<=105 || code==13){
		            event.returnValue = true;
		        }
		        else {
		            event.returnValue = false;
		        }
		        if(code == 13){
		        	this.toPage(parseInt(this.input_num));
		        }
		    }
		},
		mounted(){
			this.init();
		},
		watch: {
			'page.total': function(){
				/* 监听数据变化重新初始化分页插件 */
				this.init();
			}
		}
	}
</script>



<style scoped>
	.j_pagination_div{font-size: 14px;font-family: '微软雅黑';user-select: none;float:left;}
	.j_pagination_div .hide{display: none;}
	.j_pagination_div .ul{float: left;margin: 0;padding: 0;}
	.j_pagination_div .ul li{list-style: none;float: left;margin-right: 12px;border: 1px solid #dddddd;max-width: 60px;min-width: 45px;height: 30px;line-height: 30px;text-align: center;border-radius: 3px;cursor: pointer;}
	.j_pagination_div .ul li.selected{background-color: #3896fe;color: #ffffff!important;border: 1px solid #3896fe;}
	.j_pagination_div .ul li:hover{color: #3896fe;border: 1px solid #3896fe;}
	.j_pagination_div .j_select_div{position: relative;float: left;}
	.j_pagination_div .j_selected_span{text-align:left;display: inline-block;width: 60px;height: 30px;border: 1px solid #dddddd;padding-left: 10px;line-height: 30px;border-radius: 3px;background: url(down.png) no-repeat 50px 10px;cursor: pointer;}
	.j_pagination_div .j_pagenum_list{position: absolute;border-radius:3px;border: 1px solid #dddddd; width: 70px;top: 35px;left: 5px;background-color: #ffffff;z-index: 10;}
	.j_pagination_div .j_pagenum_list span{display: block;width: 100%;text-align: center;height: 25px;line-height: 25px;cursor: pointer;}
	.j_pagination_div .j_pagenum_list .selected{color: #3896fe;}
	.j_pagination_div .j_turn_div{float: left;margin-left: 15px;}
	.j_pagination_div .j_turn_input{width: 50px;height: 28px;border: 1px solid #dddddd;text-align: center;border-radius: 3px;position: relative;top: -1px;}
	.j_pagination_div .j_turn_btn{display: inline-block;width: 50px;height: 30px;border-radius: 3px;background-color: #ffffff;border: 1px solid #dddddd;margin-left: 15px;text-align: center;line-height: 30px;cursor: pointer;}
	.j_pagination_div .j_turn_btn:hover{background-color: #3896fe;color: #ffffff;border: 1px solid #3896fe;}
	.j_pagination_div .j_turn_span{display: inline-block;width: 50px;height: 30px;border: 1px solid #ffffff;border-radius: 3px;line-height: 30px;text-align: center;}
	.j_pagination_div .j_turn_total{display: inline-block;height: 30px;border: 1px solid #ffffff;border-radius: 3px;line-height: 30px;text-align: center;}
	.j_pagination_div .ul li.disabled{color: #666666!important;border: 1px solid #dddddd!important;background-color: #ffffff!important;cursor: not-allowed!important;}
	.clearfix:after{display:block;visibility:hidden;clear:both;height:0;content:'.';}
	.clearfix{zoom:1;}

</style>