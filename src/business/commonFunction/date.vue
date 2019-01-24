<template>
	<div>
		<button @click="getDate1" class="btn btn-default">获取当前时间，精确到秒</button>
		<button @click="getDate2" class="btn btn-default">获取一个月前时间，精确到天</button>
		<button @click="getDate3" class="btn btn-default">获取一年后时间，精确到小时</button>
		<button @click="getDate4" class="btn btn-default">获取两天后时间，精确到星期</button>
		<p>{{txt}}</p>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				txt:null,
				date_val: null
			}
		},
		methods: {
			getDate1: function(){
				this.txt = window.util.getFormatDate();
			},
			getDate2: function(){
				let d = this.date_val - 30*24*60*60*1000;
				this.txt = window.util.getFormatDate(d,'day');
			},
			getDate3: function(){
				let d = this.date_val + 365*24*60*60*1000;
				this.txt = window.util.getFormatDate(d,'hour');
			},
			getDate4: function(){
				let d = this.date_val + 2*24*60*60*1000;
				this.txt = window.util.getFormatDate(d,'week');
			}
		},
		mounted(){
			var date = new Date();
			this.date_val = date.valueOf();
		}
	}
</script>