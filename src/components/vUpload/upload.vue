<template>
	<div class="j_div_upload clearfix">
		<input type="file" class="j_ip_hide" @change="getSelect">
		<div class="j_div_imgs">
			<div class="j_imgs_div">
				<div v-for="(img,index) in imgs" class="j_div_item">
					<img :src="img.icon?img.icon:img.base64" class="j_img_item">
					<span :title="img.name">{{img.name}}</span>
					<i class="j_i_close" @click="deleteItem(index)"></i>
				</div>
			</div>
			<div class="j_div_add" @click="select"></div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
	export default{
		name: 'myupload',
		data(){
			return {
				imgs: [],//存放选中的文件对象
				multiple: false,//标志是否支持多文件上传
				type: '',//文件的大致类型。目前最好传入image或者video
				size: null,//允许文件的字节大小
				format: [],//允许文件的具体后缀
				width: null,//图片的宽度
				height: null,//图片的高度
				strict: false,//图片长宽是否严格限制在标注尺寸
				icon: require('./img/file.png')
			}
		},
		props: {
			uploadObj: {
				type: Object,
				default: null
			}
		},
		methods: {
			select: function(){
				/** 触发文件上传操作 */
				this.$el.firstChild.click();
			},
			getSelect: function(event){
				/** 获取文件对象并进行处理和控制 */
				if(!event.target.files || !event.target.files[0])return;
				let _this = this;
				let file = event.target.files[0];
				if(this.type && file.type.indexOf(this.type) === -1){
					this.Layer.alert('上传文件类型错误，应该上传 '+this.type+' 类型');
					return;
				}
				if(this.format && this.format.length){
					let file_type = file.name.split('.').pop(1).toLowerCase();
					if(this.format.indexOf(file_type) === -1){
						this.Layer.alert('上传文件后缀与指定后缀类型不符( '+this.format.join(',')+' )');
						return;
					}
				}
				if(this.size && file.size > this.size * 1024 * 1024){
					this.Layer.alert('文件超过'+this.size+'M限制');
					return;
				}
				let reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(evt){
					if(file.type.indexOf('image') !== -1){
						let image = new Image();
						image.src = evt.target.result;
						image.onload = function(){
							let w = image.width;
							let h = image.height;
							if(_this.strict){
								if(_this.width && _this.height && (w != _this.width || h != _this.height)){
									_this.Layer.alert('图片的宽高不符合要求，宽必须为：'+_this.width+'，高必须为：'+_this.height);
									return;
								}
							}
							else{
								if(_this.width && _this.height && (w > _this.width || h > _this.height)){
									_this.Layer.alert('图片的宽高不符合要求，宽不能大于：'+_this.width+'，高不能大于：'+_this.height);
									return;
								}
							}
							if(_this.multiple){
								_this.imgs.push({
									name: file.name,
									date: file.lastModified,
									base64: evt.target.result,
									file: file
								});
							}
							else{
								_this.imgs = [{
									name: file.name,
									date: file.lastModified,
									base64: evt.target.result,
									file: file
								}];
							}
						}
					}
					else{
						let file_tail = file.type.split('.').pop();
						switch(file_tail){
							case 'sheet': _this.icon = require('./img/excel.png');break;
							case 'document': _this.icon = require('./img/word.png');break;
							case 'presentation': _this.icon = require('./img/ppt.png');break;
							default: _this.icon = require('./img/file.png');
						}
						if(file.type.indexOf('pdf') !== -1)_this.icon = require('./img/pdf.png');
						if(file.type.indexOf('video') !== -1)_this.icon = require('./img/video.png');
						if(file.type === 'text/plain')_this.icon = require('./img/txt.png');
						if(file.type === 'text/html')_this.icon = require('./img/html.png');
						if(!file.type && file.name.split('.').pop() == 'rar')_this.icon = require('./img/rar.png');
						if(_this.multiple){
							_this.imgs.push({
								name: file.name,
								date: file.lastModified,
								base64: evt.target.result,
								file: file,
								icon: _this.icon
							});
						}
						else{
							_this.imgs = [{
								name: file.name,
								date: file.lastModified,
								base64: evt.target.result,
								file: file,
								icon: _this.icon
							}];
						}
					}
				}
				setTimeout(function(){
					event.target.files = null;
				},500);
			},
			deleteItem: function(idx){
				/** 删除已选的文件 */
				this.imgs.splice(idx,1);
			}
		},
		beforeMount(){
			for(let i in this.uploadObj){
				if(i !== 'imgs'){
					this.$data[i] = this.uploadObj[i];
				}
			}
			console.log(this.uploadObj);
		},
		watch: {
			'imgs': function(){
				let files = {base64: [],files: []};
				this.imgs.forEach(function(item){
					files.base64.push(item.base64);
					files.files.push(item.file);
				});
				this.$emit('callback',files);
			}
		}
	}
</script>
<style scoped>
	*{padding: 0;margin: 0;}
	.j_div_upload{margin-bottom:10px;}
	.j_ip_hide{width: 0;height: 0;opacity: 0;overflow: hidden;border:none;outline: none;margin: 0;padding: 0;}
	.j_div_add{width: 80px;height: 80px;background:url(img/add-pic.png) no-repeat;background-size: 80px 80px;margin: 0;float: left;cursor: pointer;}
	.j_imgs_div,.j_div_imgs{float:left;}
	.j_div_item{width:80px;height:100px;float:left;margin-right:10px;text-align:center;position:relative;}
	.j_img_item{width:80px;height:80px;background-color:#ddd;}
	.j_div_item span{color:#bbb;font-size:12px;float:left;display:inline-block;width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
	.j_i_close{background:url(img/close.png) no-repeat;display:inline-block;width:16px;height:16px;position:absolute;top:-5px;right:-5px;cursor:pointer;}
</style>