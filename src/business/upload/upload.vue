<template>
	<div>
		<div>
			<my-upload :uploadObj="upload1" @callback="getData"></my-upload>
		</div>
		<div>
			<my-upload :uploadObj="upload2" @callback="getData"></my-upload>
		</div>
		<div>
			<my-upload :uploadObj="upload3" @callback="getData"></my-upload>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			upload1: {
				multiple: true,
				type: 'image',
				size: 3,
				width: 1920,
				height: 1080,
				strict: true
			},
			upload2: {
				size: 3,
				format: ['xsls','pdf','ppt','word','txt']
			},
			upload3: {
				multiple: true,
				type: 'video'
			}
		}
	},
	methods: {
		getData: function(file){
			console.log(file);
		}
	}
}
</script>

<style scoped>

</style>