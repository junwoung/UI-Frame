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
					url: '../../../static/users.json',
					dataType: 'jsonp'
				}).then(function(res){
					if(res.status == 200){
						Vue.prototype.Layer.tips('success');
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