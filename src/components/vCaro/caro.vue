<template>
	<div class="j-div-template">
		<div class="j-div-caro" v-if="caroObj && caroObj.data && caroObj.data.length">
			<!-- <div class="j-div-caro-imgs" v-for='(item,idx) in caroObj.data' :class="{'j-caro-div-current': index == idx,'j-caro-div-prev': (index == idx+1) || (index == 0 && idx == caroObj.data.length-1)}"> -->
			<div class="j-div-caro-imgs" v-for='(item,idx) in caroObj.data' :class="setClass(idx)">
				<img class="j-caro-img" :src='item.src'>
			</div>
			<div class="j-div-caro-mask">
				<span @click='setIndex(idx)' :class="{'current-index': index == idx}" v-for='(item,idx) in caroObj.data'></span>
			</div>
			<div class="j-div-caro-left j-div-caro-dire"><</div>
			<div class="j-div-caro-right j-div-caro-dire">></div>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'caro',
		props: {
			caroObj: {
				type: Object,
				default: null
			}
		},
		data(){
			return{
				index: 0,
				intervalIdx: null,
				timeoutIdx: null,
				indexFlag: true,
				indexPrev: -1,
				indexInit: -1
			}
		},
		methods: {
			init: function(){
				this.begainCaro()
			},
			begainCaro: function(){
				clearTimeout(this.timeoutIdx)
				this.intervalIdx = setInterval(() => {
					this.indexFlag = true
					let init = this.index
					this.indexPrev = this.index
					if(this.index < this.caroObj.data.length-1){
						this.index++
					}
					else{
						this.index = 0
					}
					this.timeoutIdx = setTimeout(() => {
						this.indexInit = init
						this.indexPrev = -1
					},600)
				},3000)
			},
			setClass: function(idx){
				return {
					'j-caro-div-current': this.index === idx,
					'j-caro-div-prev': this.indexPrev === idx,
					'j-caro-div-init': this.indexInit === idx && this.index !== idx
				}
			},
			setIndex: function(idx){				
				this.indexFlag = false
				this.indexPrev = this.index
				clearTimeout(this.timeoutIdx)
				this.timeoutIdx = setTimeout(() => {
					this.indexInit = this.indexPrev
					this.indexPrev = -1
				},600)
				clearInterval(this.intervalIdx)
				this.index = idx
				this.begainCaro()	
			}
		},
		mounted(){
			this.init()
		}
	}
</script>
<style scoped>
	.j-div-template{height:100%;}
	.j-div-caro{width:auto;height:100%;position:relative;overflow:hidden;}
	.j-div-caro-imgs{overflow:hidden;float:left;width:100%;transition:transform 0.6s ease-in-out;margin-left:100%;position:absolute;}
	.j-caro-div-current{width:100%;height:100%;transform:translate3d(-100%,0,0)!important;}
	.j-caro-div-current>img{height:100%;width:100%;}
	.j-caro-div-prev{width:100%;height:100%;transform:translate3d(-200%,0,0);}
	.j-caro-div-init{transform:translate3d(0,0,0)!important;width:100%;height:100%;}
	.j-caro-div-prev>img{height:100%;width:100%;}
	.j-div-caro>div>img{float:left;}
	.j-caro-img{width:0;height:0;}
	.j-div-caro-mask{position:absolute;bottom:10px;left:0;right:0;display:flex;align-items:center;justify-content:center;}
	.j-div-caro-mask>span{display:inline-block;width:45px;height:4px;background-color:#fff;margin:2px;cursor:pointer;}
	.j-div-caro-mask .current-index{background-color: #ed1c24;}
	.j-div-caro-dire{position:absolute;height:100%;cursor:pointer;opacity:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:28px;}
	.j-div-caro-dire:hover{opacity:1;}
	.j-div-caro-left{left:0;width:10%;background: linear-gradient(to right,rgba(0,0,0,.7),rgba(0,0,0,0));}
	.j-div-caro-right{right:0;width:10%;background: linear-gradient(to left,rgba(0,0,0,.7),rgba(0,0,0,0));}
	
</style>