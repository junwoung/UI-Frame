<template>
	<div>
		<p>axios</p>
	</div>
</template>
<script>
import Vue from 'vue'
	export default{
		data(){
			return{

			}
		},
		methods: {
			getData: function(){
				this.$axios({
					method: 'GET',
					url: 'http://localhost.com/yii/testdrive/index.php?r=user/view&id=1',
					dataType: 'jsonp'
				}).then(function(res){
					if(res.status == 200){
						Vue.prototype.Layer.tips('用户名： '+ res.data.username + ' ,密码： '+ res.data.password + ' 。');
						console.log(res.data);
					}
				}).catch(function(err){
					console.log(err);
				})
			}
		},
		mounted(){
			this.getData();
		}
	}
</script>
<style scoped>
	
</style>