<template>
	<div class="j_div_carousel" v-if="data.length">
		<!-- 左右轮播 -->
		<div class="j_div_imgs" @mouseover="show_arrow = true" @mouseout="show_arrow = false" v-if='animate == "left"'>
			<div class="j_div_img_show" :style="{left:left}">
				<img class="j_carousel_img" @click="turn_page(d.url)" v-for="d in data" :src="d.src" width="100%" height="100%">
			</div>
			<div class="j_div_radios" v-if="banner">
				<span :title="a.name" @click='select(key)' class="j_sp_radio" :class="{'j_sp_radio_selected':key == index}" v-for="(a,key) in data"></span>
			</div>
			<div class="j_div_arrow" v-if="arrow && show_arrow">
				<span @click="turn_img(-1)" class="j_left_arrow" v-if='index > 0'><</span>
				<span @click="turn_img(1)" class="j_right_arrow" v-if='index < data.length-1'>></span>
			</div>
		</div>

		<!-- 渐隐渐现 -->
		<div class="j_div_imgs" @mouseover="show_arrow = true" @mouseout="show_arrow = false" v-if='animate == "disappear"'>
			<img class="j_carousel_img j_dis_img" @click="turn_page(d.url)" v-for="(d,key) in data" :src="d.src" width="100%" height="100%" :style="{opacity: key == index ? 1:0}">
			<div class="j_div_radios" v-if="banner">
				<span :title="a.name" @click='select(key)' class="j_sp_radio" :class="{'j_sp_radio_selected':key == index}" v-for="(a,key) in data"></span>
			</div>
			<div class="j_div_arrow" v-if="arrow && show_arrow">
				<span @click="turn_img(-1)" class="j_left_arrow" v-if='index > 0'><</span>
				<span @click="turn_img(1)" class="j_right_arrow" v-if='index < data.length-1'>></span>
			</div>
		</div>

		<!-- 上下轮播 -->
		<div class="j_div_imgs2" @mouseover="show_arrow = true" @mouseout="show_arrow = false" v-if='animate == "vertical"'>
			<div class="j_div_img_show" style="transition: top 0.5s;" :style="{top:(-height*index)+'px'}">
				<img class="j_carousel_img" @click="turn_page(d.url)" v-for="d in data" :src="d.src" width="100%" height="100%">
			</div>
			<div class="j_div_radios" v-if="banner">
				<span :title="a.name" @click='select(key)' class="j_sp_radio" :class="{'j_sp_radio_selected':key == index}" v-for="(a,key) in data"></span>
			</div>
			<div class="j_div_arrow" v-if="arrow && show_arrow">
				<span @click="turn_img(-1)" class="j_left_arrow" v-if='index > 0'><</span>
				<span @click="turn_img(1)" class="j_right_arrow" v-if='index < data.length-1'>></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'mycarousel',
		data(){
			return{
				data: null,//轮播图片对象数组
				animate: 'left',//轮播动画选择 left disappear vertical
				click: true,//图片是否支持点击跳转
				banner: true,//是否显示底banner
				banner_click: true,//banner圆点是否支持点击
				arrow: true,//是否显示左右切换箭头
				left: 0,//animate 为left 时候，用于计算style left值
				index: 0,// 记录当前轮播到的图片的数组索引，非id
				t_out: null,//记录定时任务，当有人为切换播放顺序时，为了避免播放混乱，即清除原定时任务，再重新开始
				time: 3,//图片切换间隔时长
				show_arrow: false,//记录左右切换箭头是否显示
				width: 200,//记录轮播图的宽度
				height: 150//记录轮播图的高度

			}
		},
		props: {
			carouselObj: {
				type: Object,
				default: null
			}
		},
		methods: {
			start_carousel: function(){
				/* 定时轮播任务 */
				let t = this;
				this.t_out = setTimeout(function(){
					setTimeout(function(){
						if(t.index > t.data.length-2){
							t.index = 0;
						}
						else{
							t.index++;
						}
						if(t.animate === 'left'){
							t.left = -t.index*t.width + 'px';
						}
						else if(t.animate === 'vertical'){

						}
						t.start_carousel();
					})		
				},t.time*1000);
			},
			select: function(index){
				/* 人为选择轮播索引 */
				if(!this.banner_click)return;
				this.index = index;
				this.left = -index*this.width + 'px';
				clearTimeout(this.t_out);	
				this.start_carousel();		
			},
			turn_img: function(num){
				/* 切换左右箭头 */
				this.index = this.index + num;
				this.left = -this.index*this.width + 'px';
				clearTimeout(this.t_out);	
				this.start_carousel();
			},
			turn_page: function(url){
				/* 点击图片，触发跳转事件 */
				if(!this.click)return;
				window.open("//"+url);
			}
		},
		mounted(){
			this.start_carousel();
			this.width = this.$el.offsetWidth-2;
			this.height = this.$el.offsetHeight -2 ;
		},
		beforeMount(){
			/* 将传入对象的各属性赋值给轮播数据 */
			if(this.carouselObj){
				for(let key in this.carouselObj){
					this.$data[key] = this.carouselObj[key];
				}
			}
		},
		watch: {
			/* 当轮播对象 在切换图片的时候需要有返回函数时返回 */
			'index': function(){
				this.$emit('callback',this.index);
			}
		}
	}
</script>

<style scoped>
	.j_div_carousel{width: 100%;height: 100%;border: 1px solid #ddd;}
	.j_div_imgs{width:100%;height:100%;position:relative;overflow:hidden;white-space:nowrap;}
	.j_div_imgs2{width:100%;height:100%;position:relative;overflow:hidden;line-height:0;}
	.j_div_img_show{width:100%;height:100%;position:absolute;left:0;transition:left 0.5s;}
	.j_div_radios{position:absolute;bottom:0;left:0;background:#000;opacity:0.5;height:30px;width:100%;text-align:center;line-height:30px;}
	.j_sp_radio{display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#666;margin-left:5px;cursor:pointer;position:relative;}
	.j_sp_radio_selected{background-color:#fff;width:9px;height:9px;}
	.j_div_arrow{position:absolute;top:40%;left:0;width:100%;height:0;}
	.j_left_arrow{width:25px;height:25px;border-radius:50%;background-color:#000;color:#fff;display:inline-block;text-align:center;opacity:0.3;cursor:pointer;float:left;margin-left:5px;line-height:22px;}
	.j_right_arrow{width:25px;height:25px;border-radius:50%;background-color:#000;color:#fff;display:inline-block;text-align:center;opacity:0.3;cursor:pointer;float:right;margin-right:5px;line-height:22px;}
	.j_carousel_img{cursor:pointer;margin:0;}

	.j_dis_img{position:absolute;top:0;left:0;opacity:0;transition:opacity 1s;}
</style>