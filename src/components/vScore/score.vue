<template>
	<div>
		<div class="j_div_score">
			<div class="j_div_gray" :style="{cursor:disable ? '':'pointer'}">
				<span v-for="i in arr" @click="setScore(i)" class="j_score_gray"></span>
				<span class="j_sp_score" v-if="gold_width > 0">{{score}} 分</span>
			</div>
			<div class="j_div_gold" :style="{width:gold_width+'px'}">
				<span :style="{cursor:disable ? '':'pointer'}" v-for="a in arr" @click="setScore(a)" class="j_score_gold"></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'myscore',
		data(){
			return{
				total: 5,
				arr: null,
				gold_width: 0,
				zero: false,
				score: 2,
				disable: false
			}
		},
		props:{
			scoreObj: {
				type: Object,
				default: null
			}
		},
		mounted(){
			if(this.arr === null)this.arr = [];
			for(let i = 1; i <= this.total; i++){
				this.arr.push(i);
			}
			if(this.score < 0)this.score = 0;
			if(this.score > 10)this.score = 10;
			this.gold_width = 22 * (this.score/2) + Math.floor(this.score/2)*5;
		},
		methods: {
			setScore: function(i){
				if(this.disable) return;
				if(this.gold_width == 27 && i == 1 && this.zero){
					this.gold_width = 0;
					this.score = 0;
				}
				else{
					this.gold_width = 27*i;
					this.score = i * 2;
				}
			}
		},
		beforeMount(){
			if(this.scoreObj){
				for(let key in this.scoreObj){
					this.$data[key] = this.scoreObj[key];
				}
			}
		},
		watch: {
			'score': function(){
				this.$emit('callback',this.score);
			}
		}
	}
</script>

<style scoped>
	.j_div_score{font-size: 14px;font-family: '微软雅黑';position:relative;user-select:none;}
	.j_score_gray{background:url(imgs/gray.png) no-repeat;display: inline-block;width: 22px;height: 20px;margin-right:5px;}
	.j_score_gold{background:url(imgs/gold.png) no-repeat;display: inline-block;width: 22px;height: 20px;margin-right:5px;}
	.j_div_gray,.j_div_gold{float:left;position:absolute;top:0;left:0;height:20px;white-space:nowrap;}
	.j_div_gold{overflow:hidden;transition:width 0.5s;}
	.j_sp_score{display:inline-block;height:20px;line-height:20px;position:relative;top:-4px;color:#666;margin-left:10px;}
</style>