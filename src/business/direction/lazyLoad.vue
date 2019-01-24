<template>
	<div>
		<p>picture lazy load...</p>
		<div class="div_imgs">
			<div v-for="item in show_list">
				<p>
					<span class="name">{{item.name}}</span>
					<span class="id">{{item.id}}</span>
				</p>
				<img class="img" :data-src='item.pic' v-lazyLoad = "item.pic">
			</div>
		</div>
		<div @click='goTop' class="div_backTop">
			<span>Top</span>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'lazyLoad',
		data(){
			return{
				list:[],
				show_list:[],
				page: {
					current: 0,
					pageSize: 10
				},
				pics:[
				'http://cn-vmc-images.alicdn.com/vmac/10000000050E00005BA38442ADA7B299A900DAEC',
				'http://172.20.4.230//kkupload/48/482000/F482000/180213114556cTdp.png',
				'http://172.20.4.230//kkupload/48/482000/F482000/180213114637laoU.png',
				'http://172.20.4.230//kkupload/48/482000/F482000/1802131147022OQA.png'
				]
			}
		},
		methods: {
			init: function(){
				for(let i = 0; i < 100; i++){
					let num = Math.random()*4
					this.list.push({
						id: 'wj'+(i?i:''),
						name: 'wangjun'+num,
						pic: this.pics[Math.floor(num)]
					})
				}
				this.getData();
			},
			getData: function(){
				for(let i = 0; i < this.page.pageSize; i++){
					let index = this.page.current * this.page.pageSize + i;
					if(index > this.list.length -1){
						return;
					}
					this.show_list.push(this.list[index]);
				}
				this.page.current++;
			},
			goTop: function(){
				let scrollHeight = document.documentElement.scrollTop
				let i = 0, num = 30
				let height = scrollHeight/num
				let interval = setInterval(()=>{
					window.scrollBy(0,-height)
					i++
					if(i >= num){
						clearInterval(interval)
					}
				},16)
			}
		},
		mounted(){
			this.init()	
			let show_backTop = false;
			function scroll(){
				let div_imgs = document.querySelector('.div_imgs')
				let backTop = document.querySelector('.div_backTop')
				let rect = div_imgs.getBoundingClientRect()
				let windowHeight = window.innerHeight
				let scrollHeight = document.documentElement.scrollTop
				if(!show_backTop && scrollHeight > 5){
					backTop.style.visibility = 'visible'
					show_backTop = true
				}
				if(show_backTop && scrollHeight <= 5){
					backTop.style.visibility = 'hidden'
					show_backTop = false
				}
				if(rect.bottom < windowHeight){
					this.getData()
				}
			}
			window.addEventListener('scroll',scroll)
			window.onhashchange = function(a){
				let hash = a.oldURL.split('#/')[1];
				if(hash === 'lazyLoad'){
					window.onhashchange = null;
					window.removeEventListener('scroll',scroll);
				}
			}
		}
	}
</script>
<style scoped>
.div_imgs{text-align:center;}
.div_imgs .name{font-size:16px;color:#000;}
.div_imgs .id{font-size:14px;color:#ddd;}
.div_imgs .img{width:400px;height:200px;}
.div_backTop{width:50px;height:50px;border:1px solid #ddd;background-color:#fff;cursor:pointer;position:fixed;bottom:60px;right:50px;line-height:50px;text-align:center;visibility:hidden;transition: visibility 0.3s;}
</style>