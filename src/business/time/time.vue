<template>
	<div>
		<div class="div_container">
			<my-time :timeObj="time1"></my-time>
		</div>
		<div class="div_container">
			<my-time :timeObj="time2"></my-time>
		</div>
		<div style="width:100%;height:600px;border:1px solid #ddd;">
			<button @click='getTime'>get Time</button>
		</div>
		<div class="div_container">
			<my-time :timeObj="time3"></my-time>
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
					selected: 'today',
					min: '2018-09-18',
					formate: 'second'	
				},
				time2: {
					disable: false,
					selected: '2018-09-29',
					min: null,
					max: '2018-10-01'
				},
				time3:{

				}
			}
		},
		methods: {
			getTime: function(){
				console.log('time1:' + this.time1.selected);
				console.log('time2:' + this.time2.selected);
				console.log('time3:' + this.time3.selected);
			}
		},
		mounted() {
			this.time2.min = this.time1.selected;
			this.time1.max = this.time2.selected;
		},
		watch: {
			'time1.selected': function(){
				this.time2.min = this.time1.selected;
			},
			'time2.selected': function(){
				this.time1.max = this.time2.selected;
			}
		}
	}
</script>
<style scoped>
	.div_container{width: 200px;height: 50px;}
</style>