<template>
	<div>
		<div class="div_charts">
			{{name}}
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			name: 'wangjun'
		}
	},
	methods: {
		draw(){
			let chart = this.$echarts.init(document.querySelector('.div_charts'));
			chart.setOption({
				title: {text: '在Vue中使用echarts'},
				tooltip: {},
				xAxis: {
					data: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: [5,20,36,10,10,20]
				}]
			});
		}
	},
	mounted(){
		console.log(this.$echarts);
		this.draw();
	}
}


</script>
<style scoped>
.div_charts{height: 200px;}
</style>