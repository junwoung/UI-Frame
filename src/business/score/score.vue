<template>
	<div>
		<div class="div_score">
			<my-score :scoreObj="scoreObj" @callback="getScore"></my-score>
		</div>
		<div class="div_score">
			<my-score :scoreObj="scoreObj2"></my-score>
		</div>
		<div class="div_score">
			<my-score :scoreObj="scoreObj3"></my-score>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default{
		data(){
			return{
				scoreObj: {
					score: 5.7,
					disable: false,
					zero: true
				},
				scoreObj2: {
					score: 8.7,
					disable: false,
					zero: false
				},
				scoreObj3: {
					disable: true
				}
			}
		},
		methods: {
			getScore: function(s){
				Vue.prototype.Layer.tips('评分是： '+s,2);
			}
		},
		beforeCreate(){
			let value = window.util.getUrlParam('gender');
			// console.log(value);
		}
	}
</script>

<style scoped>
	.div_score{width:100%;height:50px;}
</style>