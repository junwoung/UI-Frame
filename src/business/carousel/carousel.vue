<template>
	<div>
		<div class="carousel_div">
			<my-carousel :carouselObj="carousel" @callback="select"></my-carousel>
		</div>
		<div class="carousel_div2">
			<my-carousel :carouselObj="carousel2" @callback="select"></my-carousel>
		</div>
		<div class="carousel_div3">
			<my-carousel :carouselObj="carousel3" @callback="select"></my-carousel>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				carousel: {
					click: true,
					time: 3,
					animate: 'left',
					data: [
						{id:1,name:'first',src:require('../../components/vCarousel/imgs/57887c143a9e1.jpg'),url:'www.baidu.com'},
						{id:2,name:'second',src:require('../../components/vCarousel/imgs/5a90d5cdb0a41.jpg'),url:'www.jingdong.com'},
						{id:3,name:'third',src:require('../../components/vCarousel/imgs/5aa8f037cea1b.jpg'),url:'www.alibaba.com'},
						{id:4,name:'fouth',src:require('../../components/vCarousel/imgs/ad1.jpg'),url:'www.tencent.com'},
						{id:5,name:'fifth',src:require('../../components/vCarousel/imgs/background_1.jpg'),url:'www.konka.com'}
					],
					banner_click: true
				},
				carousel2: {
					click: true,
					time: 4,
					animate: 'disappear',
					data: [
						{id:1,src:require('../../components/vCarousel/imgs/57887c143a9e1.jpg'),url:'www.baidu.com'},
						{id:2,src:require('../../components/vCarousel/imgs/5a90d5cdb0a41.jpg'),url:'www.jingdong.com'},
						{id:3,src:require('../../components/vCarousel/imgs/5aa8f037cea1b.jpg'),url:'www.alibaba.com'},
						{id:4,src:require('../../components/vCarousel/imgs/ad1.jpg'),url:'www.tencent.com'},
						{id:5,src:require('../../components/vCarousel/imgs/background_1.jpg'),url:'www.konka.com'}
					],
				},
				carousel3: {
					time: 5,
					animate: 'vertical',
					data: [
						{id:1,name:'first',src:require('../../components/vCarousel/imgs/57887c143a9e1.jpg'),url:'www.baidu.com'},
						{id:2,name:'second',src:require('../../components/vCarousel/imgs/5a90d5cdb0a41.jpg'),url:'www.jingdong.com'},
						{id:3,name:'third',src:require('../../components/vCarousel/imgs/5aa8f037cea1b.jpg'),url:'www.alibaba.com'},
						{id:4,name:'fouth',src:require('../../components/vCarousel/imgs/ad1.jpg'),url:'www.tencent.com'},
						{id:5,name:'fifth',src:require('../../components/vCarousel/imgs/background_1.jpg'),url:'www.konka.com'}
					],
					arrow: true,
					click: true
				}
			}
		},
		methods: {
			select: function(idx){
				// console.log(idx);
			}
		}
	}
</script>
<style scoped>
	.carousel_div{width: 300px;height: 150px;float: left;margin-top: 10px;}
	.carousel_div2{width: 200px;height: 150px;float: left;margin-top: 10px;margin-left:30px;}
	.carousel_div3{width: 250px;height: 150px;float: left;margin-top: 10px;margin-left:30px;}
</style>