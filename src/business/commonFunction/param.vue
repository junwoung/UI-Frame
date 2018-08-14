<template>
	<div>
		<button @click='change'>改变当前地址</button>
		<button @click="getUrlParam">获取参数</button>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default{
		data(){
			return{
				Layer: null
			}
		},
		methods: {
			change: function(){
				let url = location.href;
				if(url.indexOf('?') !== -1) return;
				url += "?id=1001&name=王俊&age=24&gender=male";
				location.href = url;
			},
			getUrlParam: function(){
				let t = this;
				this.Layer.prompt('请输入获取参数名称','',function(){
					var valu = this.prompt_value;
					var res = decodeURI(window.util.getUrlParam(valu));
					if(res != 'undefined'){
						t.Layer.tips('参数 '+valu+' 的值是 '+res);					
					}
					else{
						t.Layer.confirm('没有对应的参数',function(){
							console.log(valu);
							t.Layer.alert(valu);
						},function(){
							t.Layer.loading();
							setTimeout(function(){
								t.Layer.hideAll();
							},3000);
						});
					}
				})
			} 
		},
		mounted(){
			let t = this;
			setTimeout(function(){
				t.Layer = Vue.prototype.Layer;
			},100)
			
		}
	}
</script>