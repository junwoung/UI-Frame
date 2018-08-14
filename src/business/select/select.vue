<template>
	<div>
		<div style="margin-top:20px;float:left;width:100%;" class="clerafix">
			<my-select :select="compObj" @callback="pick10"></my-select>
		</div>
		<div style="margin-top:20px;float:left;width:100%;" class="clearfix">
			<my-select :select="selectObj" @callback="pick"></my-select>
			<my-select :select="selectObj2" @callback="pick2"></my-select>
		</div>
		<div style="margin-top:20px;float:left;width:100%;" class="clerafix">
			<my-select :select="selectObj2" @callback="pick2"></my-select>
		</div>
		<div style="margin-top:20px;width:100%;float:left;" class="clerafix">
				<my-select :select="selectTab1" @callback="pick3"></my-select>
		</div>
		<div style="margin-top:20px;float:left;" class="clerafix">
			<div style="width:70%;float:left;">
				<my-select :select="selectTab2" @callback="pick4"></my-select>
			</div>
		</div>
		<div style="margin-top:20px;float:left;width:100%;" class="clerafix">
			<my-select :select="selectCk" @callback="pick5"></my-select>
		</div>
		<div style="margin-top:20px;float:left;width:100%;" class="clerafix">
			<my-select :select="selectCk2" @callback="pick6"></my-select>
		</div>
		<div style="margin-top:20px;float:left;width:100%;" class="clerafix">
			<my-select :select="selectCk3" @callback="pick7"></my-select>
		</div>
		<div style="margin-top:20px;float:left;width:100%;" class="clerafix">
			<my-select :select="selectRd" @callback="pick8"></my-select>
		</div>
		<div style="margin-top:20px;float:left;width:100%;" class="clerafix">
			<my-select :select="selectRd2" @callback="pick9"></my-select>
		</div>
		<div style="margin-top:20px;float:left;width:100%;" class="clerafix">
			<my-select :select="selectSwitch" @callback="pick11"></my-select>
		</div>
	
	</div>
</template>

<script>
	export default{
		data(){
			return {
				txt: 'select',
				selectObj:{
					type: 'select',
					query: false,
					data: [
						{id:1,name:'zdj'},
						{id:2,name:'wj'},
						{id:3,name:'zyh'},
						{id:4,name:'yjy'},
						{id:5,name:'ypc'}
					],
					selected: 5
				},
				selectObj2:{
					type: 'select',
					disable: false,
					query: true,
					data: [
						{id:1,name:'zdj'},
						{id:2,name:'wj'},
						{id:3,name:'zyh'},
						{id:4,name:'yjy'},
						{id:6,name:'zdj2'},
						{id:7,name:'wj2'},
						{id:8,name:'zyh2'},
						{id:9,name:'yjy2'},
						{id:5,name:'ypc'}
					],
					selected: 2
				},
				selectTab1:{
					type: 'tab',
					multiple: true,
					data: [
						{id:1,name:'zdj'},
						{id:2,name:'wj'},
						{id:3,name:'zyh'},
						{id:4,name:'yjy'},
						{id:6,name:'zdj2'},
						{id:7,name:'wj2'},
						{id:8,name:'zyh2'},
						{id:9,name:'yjy2'},
						{id:5,name:'ypc'}
					],
					selected: [3,5]
				},
				selectTab2:{
					type: 'tab',
					multiple: false,
					data: [
						{id:1,name:'zdj'},
						{id:2,name:'wj'},
						{id:3,name:'zyh'},
						{id:4,name:'yjy'},
						{id:6,name:'zdj2'},
						{id:7,name:'wj2'},
						{id:8,name:'zyh2'},
						{id:9,name:'yjy2'},
						{id:5,name:'ypc'}
					],
					selected: [5]
				},
				selectCk:{
					type: 'checkbox',
					data: [
						{id:1,name:'zdj'},
						{id:2,name:'wj'},
						{id:3,name:'zyh'},
						{id:4,name:'yjy'},
						{id:6,name:'zdj2'},
						{id:7,name:'wj2'},
						{id:8,name:'zyh2'},
						{id:9,name:'yjy2'},
						{id:5,name:'ypc'}
					],
					selected: [4,7]
				},
				selectCk2:{
					type: 'checkbox',
					disable: 'part',
					data: [
						{id:1,name:'zdj'},
						{id:2,name:'wj'},
						{id:3,name:'zyh'},
						{id:4,name:'yjy'},
						{id:6,name:'zdj2'},
						{id:7,name:'wj2'},
						{id:8,name:'zyh2'},
						{id:9,name:'yjy2'},
						{id:5,name:'ypc'}
					],
					selected: [4,7]
				},
				selectCk3:{
					type: 'checkbox',
					disable: 'all',
					data: [
						{id:1,name:'zdj'},
						{id:2,name:'wj'},
						{id:3,name:'zyh'},
						{id:4,name:'yjy'},
						{id:6,name:'zdj2'},
						{id:7,name:'wj2'},
						{id:8,name:'zyh2'},
						{id:9,name:'yjy2'},
						{id:5,name:'ypc'}
					],
					selected: [4,7]
				},
				selectRd:{
					type: 'radio',
					data: [
						{id:1,name:'zdj'},
						{id:2,name:'wj'},
						{id:3,name:'zyh'},
						{id:4,name:'yjy'},
						{id:6,name:'zdj2'},
						{id:7,name:'wj2'},
						{id:8,name:'zyh2'},
						{id:9,name:'yjy2'},
						{id:5,name:'ypc'}
					],
					selected: 4
				},
				selectRd2:{
					type: 'radio',
					disable: true,
					data: [
						{id:1,name:'zdj'},
						{id:2,name:'wj'},
						{id:3,name:'zyh'},
						{id:4,name:'yjy'},
						{id:6,name:'zdj2'},
						{id:7,name:'wj2'},
						{id:8,name:'zyh2'},
						{id:9,name:'yjy2'},
						{id:5,name:'ypc'}
					],
					selected: 4
				},
				compObj:{
					type: 'complete',
					disable: false,
					data: [
						{id:1,name:'zdj'},
						{id:2,name:'wj'},
						{id:3,name:'zyh'},
						{id:4,name:'yjy'},
						{id:6,name:'zdj2'},
						{id:7,name:'王俊'},
						{id:8,name:'zyh2'},
						{id:9,name:'yjy2'},
						{id:5,name:'ypc'}
					],
					selected: [7,8,9,5,4]
				},
				selectSwitch: {
					type: 'switch',
					disable: false,
					selected: true
				}
			}
		},
		methods: {
			pick: function(selected){
				console.log(selected);
			},
			pick2: function(selected){
				console.log(selected);
			},
			pick3: function(selected){
				console.log(selected);
			},
			pick4: function(selected){
				console.log(selected);
			},
			pick5: function(selected){
				console.log(selected);
			},
			pick6: function(selected){
				console.log(selected);
			},
			pick7: function(selected){
				console.log(selected);
			},
			pick8: function(selected){
				console.log(selected);
			},
			pick9: function(selected){
				console.log(selected);
			},
			pick10: function(selected){
				console.log(selected);
			},
			pick11: function(selected){
				console.log(selected);
			}
		}
	}
</script>

<style scope>
.div_tt div{float:left;}
</style>