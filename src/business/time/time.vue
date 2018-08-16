<template>
	<div>
		<div class="div_container">
			<my-time :timeObj="time1" @callback="selectTime1"></my-time>
		</div>
		<div class="div_container">
			<my-time :timeObj="time2" @callback="selectTime2"></my-time>
		</div>
		<div style="width:100%;height:800px;border:1px solid #ddd;"></div>
		<div class="div_container">
			<my-time :timeObj="time2" @callback="selectTime2"></my-time>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'mytime',
		data(){
			return {
				time1: {
					disable: false,	
					selected: '2018-08-19',
					max: null,
					min: '2018-08-16',
					formate: 'second'		
				},
				time2: {
					disable: true,
					selected: '2018-09-04',
					min: null,
					max: ''
				}
			}
		},
		methods: {
			selectTime1: function(t){
				this.time1.selected = t;
				this.time2.min = t;
				console.log(t);
			},
			selectTime2: function(t){
				this.time2.selected = t;
				this.time1.max = t;
			}
		},
		mounted() {
			this.time2.min = this.time1.selected;
			this.time1.max = this.time2.selected;
		}
	}
</script>
<style scoped>
	.div_container{width: 200px;height: 50px;}
</style>