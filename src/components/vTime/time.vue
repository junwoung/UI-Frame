<template>
	<div class="j_div_time">
		<div class="j_div_time_mask" v-if="onSelect" @click='hide'></div>
		<input class="j_ip_time" type="text" v-model="selected" placeholder="请选择时间" readonly @click='show'>
		<div class="j_div_time_select_hide" :class="{'j_div_time_select':(onSelect && !position_top),'j_div_time_select_top':(onSelect &&  position_top)}">
			<div class="j_div_time_head">
				<div v-if='onSelectType !== "time"'>
					<span @click="operate_year(-1)" class="sp_left"><<</span>
					<span v-if='onSelectType == "day"' @click="operate_month(-1)" class="sp_left"><</span>
					<span @click='set_operate("year")' class="sp_year">{{s_year}}年</span>
					<span @click='set_operate("month")' class="sp_month">{{s_month}}月</span>
					<span @click="operate_year(1)" class="sp_right">>></span>
					<span v-if='onSelectType == "day"' @click="operate_month(1)" class="sp_right">></span>
				</div>
				<div v-if='onSelectType === "time"'>
					<span>选择时间</span>
				</div>
			</div>
			<div class="j_div_time_body" v-if="onSelectType == 'day'">
				<div class="j_div_time_nav">
					<span v-for='n in nav'>{{n}}</span>
				</div>
				<div class="j_div_time_date">
					<span @click='select_date(d,$event)'  :class="{'span_today':d.timestamp == today,'span_disable': (min ? (d.timestamp < min):false) || (max ? (d.timestamp > max):false) || disable,'span_selected':d.timestamp == select_day,'span_current_month':d.current}" v-for='d in date'>{{d.date}}</span>
				</div>
			</div>
			<div class="j_div_time_body_month" v-if='onSelectType == "month"'>
				<span @click="select_month(key+1)" :class="{'span_selected':(key+1) == s_month}" v-for="(m,key) in nav_month">{{m}}</span>
			</div>
			<div class="j_div_time_body_year" v-if='onSelectType == "year"'>
				<span @click="select_year(y)" :class="{'span_selected':y == s_year}" v-for="y in nav_year">{{y}}年</span>
			</div>
			<div class="j_div_time_body_detail" v-if='onSelectType == "time"'>
				<div class="title">
					<span>时</span>
					<span>分</span>
					<span>秒</span>
				</div>
				<div class="detail" style="border-right:none;">
					<div class="div_detail_container">
						<span @click="select_hour(h)" :class="{'span_selected': s_hour == h}" v-for='h in nav_hour'>{{h}}</span>
					</div>
				</div>
				<div class="detail" style="border-right:none;">
					<div class="div_detail_container">
						<span @click="select_minute(m)" :class="{'span_selected': s_minute == m}" v-for='m in nav_minute'>{{m}}</span>
					</div>
				</div>
				<div class="detail">
					<div class="div_detail_container">
						<span @click="select_second(s)" :class="{'span_selected': s_second == s}" v-for='s in nav_second'>{{s}}</span>
					</div>
				</div>
			</div>
			<div class="j_div_time_footer">
				<span class="sp_sure" @click="ensure">确定</span>
				<span class="sp_now" :class="{'sp_disable':disable}" @click="now_date()">现在</span>
				<span class="sp_clear" :class="{'sp_disable':disable}" @click="clear_date">清空</span>
				<span @click="select_detail" class="sp_detail" :class="{'sp_disable':disable || (formate != 'hour' && formate != 'minute' && formate != 'second')}">
					<label v-if='onSelectType !== "time"' style="cursor:inherit;">选择时分秒</label>
					<label v-if='onSelectType === "time"' style="cursor:inherit;color:#3896f8;">返回日期</label>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name: 'mytime',
	data(){
		return{
			today: null,//存储今天日期时间戳 精确到天 格式：yyyy-mm-dd
			select_day: null,//暂存选中的日期
			onSelect: false,//记录日期控件的状态，激活or关闭
			onSelectType: 'day',//存放日期控件当前选择的状态，值：day、year、month、time
			s_year: null,//存放选中的年份
			s_month: null,//存放选中的月份
			s_day: null,//存放选中的日期
			s_hour: null,//存放选中的小时
			s_minute: null,//存放选中的分钟
			s_second: null,//存放选中的秒数
			nav: ['日','一','二','三','四','五','六'],//存放展示的星期
			nav_month: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],//存放展示的月份
			nav_year: null,//存放展示的年份
			nav_minute: [],//存放展示的分钟
			nav_hour: [],//存放展示的小时
			nav_second: [],//存放展示的秒
			date: null,//存放展示的日期
			days: 0,//当前月有多少天
			position_top: false,

			disable: false,//是否禁用
			min: '',//日期可选最小日期
			max: null,//日期可选最大日期
			selected: "",//存放完整的选择日期
			formate: 'day'//日期精确到指定，day、hour、minute、second
		}
	},
	props: {
		timeObj: {
			type: Object,
			default: null
		}
	},
	methods: {
		init: function(){
			/*
			 *初始化today
			 *初始化 年月日时分秒
			 *初始化 展示日期面板
			 */
			 for(let key in this.timeObj){
				this.$data[key] = this.timeObj[key];
			}
			if(!this.timeObj.selected){this.timeObj.selected = ''}
			if(this.min){
				if(typeof this.min == "string") this.min = (new Date(this.min)).valueOf();
			}
		
			if(this.max){
				if(typeof this.max == "string") this.max = (new Date(this.max)).valueOf();
			}
			let date = new Date();
			let today_str = date.getFullYear()+ '-' +(date.getMonth() > 8 ?(date.getMonth()+1):('0'+(date.getMonth()+1)))+ '-' +(date.getDate() > 9 ?date.getDate():('0'+date.getDate()));
			this.today = (new Date(today_str)).valueOf();
			if(this.selected){
				switch (this.selected){
					case 'today': this.now_date();break;
					case 'yesterday': 
						let yesterday = (new Date()).valueOf() - 1000*24*3600;
						this.now_date(yesterday);
						break;
					case 'tomorrow': 
						let tomorrow = (new Date()).valueOf() + 1000*24*3600;
						this.now_date(tomorrow);
						break;
					default:
						date = new Date(this.selected);
				}				
			}
			if(this.selected === undefined){
				date = new Date();
			}
			let year = date.getFullYear();
			let month = date.getMonth()+1;
			month = month > 9 ? month : ('0'+month);
			let day = date.getDate();
			day = day > 9 ? day : ('0'+day);
			let hour = date.getHours();
			hour = hour > 9 ? hour : ('0'+hour);
			let minute = date.getMinutes();
			minute = minute > 9 ? minute : ('0'+minute);
			let second = date.getSeconds();
			second = second > 9 ? second : ('0'+second);
			this.s_hour = hour;
			this.s_minute = minute;
			this.s_second = second;
			this.s_year = year;
			this.s_month = month;
			this.s_day = day;
			let date_str = this.s_year + '-' + this.s_month + '-' + this.s_day;
			
			this.select_day = (new Date(date_str)).valueOf();
			this.getDays();
			this.setTimeDetail();
		},
		setTimeDetail: function(){
			/** 初始化 时分秒 面板 */
			this.nav_hour = [],this.nav_minute = [],this.nav_second = [];
			for(let i = 0; i < 24; i++){
				i = i > 9 ? i : ('0'+i);
				this.nav_hour.push(i.toString());
			}
			for(let i = 0; i < 60; i++){
				i = i > 9 ? i : ('0'+i);
				this.nav_minute.push(i.toString());
				this.nav_second.push(i.toString());
			}
		},
		getDays: function(){
			/**  获取展示日期面板 */
			let date = [];
			let days = null;
			let date_first = this.s_year + '-' + this.s_month + '-01';
			date_first = (new Date(date_first)).valueOf();
			let week = (new Date(date_first)).getDay() || 7;
			if(this.s_month == '01' || this.s_month == '03' || this.s_month == '05' || this.s_month == '07' || this.s_month == '08' || this.s_month == '10' || this.s_month == '12'){
				days = 31;
			}
			else if(this.s_month == '04' || this.s_month == '06' || this.s_month == '09' || this.s_month == '11'){
				days = 30;
			}
			else{
				if(parseInt(this.s_year)%4 == 0 && parseInt(this.s_year)%100 != 0){
					days = 29;
				}
				else if (parseInt(this.s_year)%400 == 0) {
					days = 29;
				}
				else{
					days = 28;
				}
			}
			this.days = days;
			for(let i = week; i > 0 ; i--){
				date.push({
					timestamp: date_first - i*24*60*60*1000,
					date: (new Date(date_first - i*24*60*60*1000)).getDate() 
				})
			}
			for(let i = 0; i < days; i++){
				date.push({
					timestamp: date_first + i*24*60*60*1000,
					date: (new Date(date_first + i*24*60*60*1000)).getDate(),
					current: true
				})
			}
			let dis = 42 - date.length;
			let date_last = date[date.length-1].timestamp;
			for(let i = 1; i <= dis; i++){
				date.push({
					timestamp: date_last + i*24*60*60*1000,
					date: (new Date(date_last + i*24*60*60*1000)).getDate() 
				})
			}
			this.date = JSON.parse(JSON.stringify(date));
		},
		show: function(){
			//展示控件
			this.set_position();
			this.init();
			this.onSelect = true;
			
		},
		hide: function(){
			//隐藏控件
			this.onSelect = false;
		},
		select_date: function(d,event){
			//点击日期触发
			if(this.disable)return;
			if(this.min && this.min > d.timestamp || this.max && this.max < d.timestamp)return;
			this.switch_date(d);
			if(this.formate != 'hour' && this.formate != 'minute' && this.formate != 'second' ){
				let className = event.target.getAttribute('class');
				if(className){
					this.ensure();
				}
			}
		},
		switch_date: function(d){
			//切换日期
			let date = new Date(d.timestamp)
			this.s_year = date.getFullYear();
			let month = date.getMonth()+1;
			this.s_month = month > 9 ? month : ('0'+month);
			let day = date.getDate();
			day = day > 9 ? day : ('0'+day);
			this.s_day = day;
			if(!this.disable && (!this.min || d.timestamp >= this.min) && (!this.max || this.max >= d.timestamp))this.select_day = d.timestamp;
		},
		operate_month: function(n){
			//切换月份 左右箭头
			if(n > 0){
				this.switch_date(this.date[this.date.length-1]);
			}
			else{
				this.switch_date(this.date[0]);
			}
		},
		operate_year: function(n){
			//切换年份 左右箭头
			if(this.onSelectType !== 'year'){
				this.s_year = parseInt(this.s_year) + n;
			}
			else{
				if(n > 0){
					let last = this.nav_year[this.nav_year.length-1];
					this.nav_year = [];
					for(let i = 1;i <= 15; i++){
						this.nav_year.push(last+i);
					}
				}
				else{
					let first = this.nav_year[0];
					this.nav_year = [];
					for(let i = 15; i >= 1; i-- ){
						this.nav_year.push(first-i);
					}
				}	
			}
		},
		set_operate: function(str){
			//点击控件头部 年份、月份 切换到对应的年份月份面板
			this.onSelectType = str;
			if(str == 'year'){
				this.nav_year = [];
				for(let i = this.s_year - 7; i <= this.s_year + 7; i++){
					this.nav_year.push(i);
				}
			}
		},
		select_month: function(n){
			//选择月份触发
			n = n > 9 ? n : ('0'+n);
			this.s_month = n;
			this.onSelectType = 'day';
		},
		select_year: function(n){
			//选择年份触发
			this.s_year = n;
			this.onSelectType = 'day';
		},
		select_detail: function(){
			//日期面板与具体时间面板相互切换
			if(this.disable)return;
			if(this.formate != 'second' && this.formate != 'minute' && this.formate != 'hour')return;
			if(this.onSelectType != 'time')this.onSelectType = 'time';
			else this.onSelectType = 'day';
			
		},
		select_hour: function(h){
			//选择小时
			this.s_hour = h;
		},
		select_minute: function(m){
			//选择分钟
			this.s_minute = m;
		},
		select_second: function(s){
			//选择秒钟
			this.s_second = s;
		},
		ensure: function(){
			//确定按钮触发
			if(this.disable){this.onSelect = false;return;}
			let flag = this.check_available();
			if(typeof flag != 'boolean'){
				this.selected = flag;
			}	
		},
		now_date: function(arg){
			//点击现在按钮触发
			if(this.disable)return;
			let date = arg ? new Date(arg) : new Date();
			let year = date.getFullYear();
			let month = date.getMonth()+1;
			month = month > 9 ? month : ('0'+month);
			let day = date.getDate();
			day = day > 9 ? day : ('0'+day);
			let date_str = year + '-' + month + '-' + day;
			// if(this.min && (new Date(date_str)).valueOf() < this.min || this.max && (new Date(date_str)).valueOf() > this.max)return;
			this.s_year = year;
			this.s_month = month;
			this.s_day = day;
			let hour = date.getHours();
			hour = hour > 9 ? hour : ('0'+hour);
			let minute = date.getMinutes();
			minute = minute > 9 ? minute : ('0'+minute);
			let second = date.getSeconds();
			second = second > 9 ? second : ('0'+second);
			this.s_hour = hour;
			this.s_minute = minute;
			this.s_second = second;

			this.select_day = (new Date(date_str)).valueOf();
			this.selected = this.out_put();
		},
		out_put: function(){
			//输出日期，触发回调函数
			let date = null;
			if(this.formate == 'second'){
				date = this.s_year + '-' + this.s_month + '-' + this.s_day + ' ' + this.s_hour + ':' + this.s_minute + ':' + this.s_second;
			}
			else if(this.formate == 'minute'){
				date = this.s_year + '-' + this.s_month + '-' + this.s_day + ' ' + this.s_hour + ':' + this.s_minute;
			}
			else if(this.formate == 'hour'){
				date = this.s_year + '-' + this.s_month + '-' + this.s_day + ' ' + this.s_hour;
			}
			else{
				date = this.s_year + '-' + this.s_month + '-' + this.s_day;
			}
			this.onSelect = false;
			return date;
		},
		clear_date: function(){
			//清空日期
			if(this.disable)return;
			this.selected = null;
			this.onSelect = false;
		},
		set_position: function(){
			//设置控件出现的位置，当控件位于浏览器底端时，控件将出现在文本框上方位置
			let clientH = document.documentElement.clientHeight || document.body.clientHeight;
			let domB = this.$el.getBoundingClientRect().bottom;
			let offset = clientH - domB;
			if (offset < 320) {this.position_top = true;}
		},
		check_available: function(){
			/**
			 *点击确定按钮 检查有效性
			 **/
			 let date = this.out_put(),flag = null,flag1 = null;
			 let short_date = date.split(' ')[0];
			 if( (this.max && (new Date(date)).valueOf() > (new Date(this.max)).valueOf()) || (this.min && (new Date(date)).valueOf() < (new Date(this.min)).valueOf()) ){
			 	flag = false;
			 }
			 else
			 	flag = date;
			 if(this.max && (new Date(short_date)).valueOf() == this.max){
			 	flag = short_date + (date.split(' ')[1]?(' '+date.split(' ')[1]):'');
			 }
			 return flag;
		}
	},
	mounted(){
		this.init();
	},
	watch: {
		's_month': function(){
			this.getDays();
		},
		's_year': function(){
			this.getDays();
		},
		'timeObj.min': function(){
			this.init();
		},
		'timeObj.max': function(){
			this.init()
		},
		'selected': function(val){
			this.timeObj.selected = val;
		}
	}
}
</script>
<style scoped>
.j_div_time{font-size:14px;font-family:'微软雅黑';position:relative;user-select:none;}
.j_div_time_mask{position:fixed;top:0;left:0;background-color:#fff;opacity:0;width:100%;height:100%;z-index:1000;}

.j_ip_time{width:95%;outline:none;height: 28px;padding:0;border:1px solid #bbb;padding-left:5%;color:#555;}
.j_ip_hide{width:0;height:0;border:none;opacity:0;margin:0;padding:0;clear:both;float:left;position:absolute;top:0;left:0;}
.j_div_time_select{width:270px!important;position:absolute;height:auto!important;top:32px!important;box-shadow: 0 0 5px #ccc;background-color:#fff;z-index:20000;}
.j_div_time_select_top{width:270px!important;position:absolute;height:auto!important;box-shadow: 0 0 5px #ccc;background-color:#fff;z-index:20000;top:-325px!important;}
.j_div_time_select_hide{width:0;height:0;overflow:hidden;top:50px;transition:top 0.3s;}
.j_div_time_head{width:100%;background-color:#5896f8;height:40px;color:#fff;text-align:center;}
.j_div_time_head span{display:inline-block;height:30px;line-height:30px;margin-top:5px;cursor:pointer;}
.j_div_time_head .sp_left{float:left;margin-left:10px;}
.j_div_time_head .sp_right{float:right;margin-right:10px;}
.j_div_time_head .sp_year{margin-right:5px;}

.j_div_time_body,.j_div_time_body_month,.j_div_time_body_year,.j_div_time_body_detail{padding: 5px 5px 5px 5px;height:223px;}
.j_div_time_nav{color:#111;margin-top:10px;}
.j_div_time_nav span{display:inline-block;height:30px;line-height:30px;text-align:center;width:14.28%;}

.j_div_time_date{color:#d2d2d2;margin-top:3px;}
.j_div_time_date span{display:inline-block;height:30px;line-height:30px;text-align:center;width:14.28%;transition:background-color 0.3s,color 0.3s;}
.j_div_time_date span:hover{background-color:#ddd;cursor:pointer;color:#666;}
.j_div_time_date .span_disable{background-color:#fff!important;color:#d2d2d2!important;cursor:not-allowed!important;}
.j_div_time_date .span_current_month{color:#666;}
.j_div_time_date .span_today{color:#3896f8;background-color:#ddd;}
.j_div_time_date .span_selected{color:#fff!important;background-color:#3896f8!important;}

.j_div_time_body_month span{display:inline-block;width:33.3%;height:25%;line-height:53px;text-align:center;cursor:pointer;color:#666;}
.j_div_time_body_month span:hover{background-color:#ddd;}
.j_div_time_body_month .span_selected{background-color:#3896f8!important;color:#fff;}

.j_div_time_body_year span{display:inline-block;width:33.3%;height:20%;line-height:44.5px;text-align:center;color:#666;cursor:pointer;}
.j_div_time_body_year span:hover{background-color:#ddd;}
.j_div_time_body_year .span_selected{background-color:#3896f8!important;color:#fff;}

.j_div_time_body_detail{color:#666;}
.j_div_time_body_detail .title span{display:inline-block;width:32.2%;height:17%;line-height:38.5px;text-align:center;}
.j_div_time_body_detail .detail{width:32.8%;border:1px solid #ddd;float:left;height:80%;overflow:hidden;}
.j_div_time_body_detail .detail:hover{overflow-y:auto;}
.j_div_time_body_detail .detail span{width:100%;display:inline-block;height:30px;line-height:30px;text-align:center;cursor:pointer;}
.j_div_time_body_detail .detail span:hover{background-color:#ddd;}
.j_div_time_body_detail .div_detail_container{position:relative;}
.j_div_time_body_detail .span_selected{background-color:#3896f8!important;color:#fff;}

.j_div_time_footer{color:#666;height:35px;padding-top:10px;border-top:1px solid #ddd;}
.j_div_time_footer span{display:inline-block;height:24px;line-height:24px;text-align:center;width:46px;float:right;border:1px solid #ddd;cursor:pointer;}
.j_div_time_footer .sp_sure{margin-right:10px;}
.j_div_time_footer .sp_now{border-left:none;border-right:none;}
.j_div_time_footer .sp_detail{width:auto;border:none;margin-right:35px;}
.j_div_time_footer .sp_detail:hover{color:#3896f8;}
.j_div_time_footer .sp_disable{cursor:not-allowed!important;color:#d2d2d2!important;}
</style>