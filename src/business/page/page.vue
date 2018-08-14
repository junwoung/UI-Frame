<template>
	<div>
		<my-pagination  :page='page' v-on:turn_page='turn_page'></my-pagination>
		<my-pagination  :page='page2' v-on:turn_page='turn_page2'></my-pagination>
	</div>
</template>
<script>
	export default{
		name:'page',
		data(){
			return{
				page: {
					/*  total:总页数 （必填）
						current:当前页
						show_pages:中间展示分页数目
						size:列表每页展示条数
					  */
					total: 388,
					current: 2,
					show_pages: 6,
					size: 7
				},
				page2: {
					total: 100
				}
			}
		},
		methods:{
			turn_page:function(page,size){
				console.log(page,size);
			},
			turn_page2:function(page,size){
				console.log(page,size);
			}
		}
	}
</script>