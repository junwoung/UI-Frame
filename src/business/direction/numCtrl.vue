<template>
	<div>
		<input type="text" v-focus v-model='model1' v-update>
		<button @click='getValue'>get value</button>
	</div>
</template>
<script>
export default{
	data(){
		return{
			model1: null
		}
	},
	directives: {
		focus: {
			inserted: function(el){
				console.log(el);
				el.focus();
			}
		},
		update: {
			update: function(el,binding,vnode){
				// let direcs = vnode.data.directives;
				// for(let i = 0,len = direcs.length; i < len; i++){
				// 	if(direcs[i].name === 'model'){
				// 		direcs[i].value = el.value;
				// 		break;
				// 	}
				// }
				// if(el.value === null || el.value === '')return;
				// el.value = parseFloat(el.value);
				// if(el.value == 'NaN')el.value = '';
				el.onkeydown = function(e){
					// let code = e.keyCode;
					// if(code>=48 && code<=57 || code==8 || code>=96 && code<=105 || code==9 || code==17 || code==67 || code==86 || code==46 || code==190 || code == 109 || code == 110 || code == 189){
			  //           e.returnValue = true;
			  //       }
			  //       else {
			  //           e.returnValue = false;
			  //       }
					// let pattern = new RegExp('[0-9\-\.]*$','g');
					// console.log(pattern.exec(el.value))
					// el.value = el.value.exec(/^[0-9]*$/g,'');
					if(el.value === '-' || el.value === null || el.value === '')return;
					else{
						let arr = el.value;
						let index = arr.indexOf('.');
						if(index > 0 && index == arr.lastIndexOf('.') && index == arr.length-1)return;
						el.value = parseFloat(el.value);
						if(el.value == 'NaN')el.value = '';
					}
				}
				el.onblur = function(){
					if(el.value === '-' || el.value === null || el.value === '')return;
					el.value = parseFloat(el.value);
					if(el.value == 'NaN')el.value = '';
					console.log(el.value)
				}
			}
		}
	},
	methods: {
		getValue: function(){
			console.log(this.model1);
		}
	}
}
</script>
<style scoped>

</style>