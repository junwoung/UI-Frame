<template>
	<div class="content">
		<div class="form-control clearfix">
			<label class="label label-medium label-require">按钮</label>
			<div class="form-items">
				<button class="btn btn-default btn-medium" @click='showClassName'>普通</button>
				<button class="btn btn-default btn-small" @click='showClassName'>小尺寸</button>
				<button class="btn btn-default btn-large" @click='showClassName'>大尺寸</button>
				<span class="tips" style="float:right;margin-top:8px;">{{cname}}</span>
				<label class="label label-medium label-justify" style="float:right;">引用的样式名</label>
			</div>
		</div>
		<div class="form-control clearfix">
			<label class="label label-medium label-require">按钮不同样式</label>
			<div class="form-items">
				<button class="btn btn-green btn-medium" @click='showClassName'>引导</button>
				<button class="btn btn-danger btn-medium" @click='showClassName'>危险</button>
				<button class="btn btn-disable btn-medium" @click='showClassName'>禁用</button>
				<button class="btn btn-minor btn-medium" @click='showClassName'>透明</button>
			</div>
		</div>
		<div class="form-control clearfix">
			<label class="label label-medium label-require">a标签</label>
			<div class="form-items" style="margin-top: 5px;">
				<a class="a a-link" @click='showClassName'>普通链接</a>
				<a class="a a-hover" @click='showClassName'>悬浮链接</a>
				<a class="a a-disable" @click='showClassName'>禁用链接</a>
			</div>
		</div>
		<div class="form-control clearfix">
			<label class="label label-medium label-require">标签</label>
			<div class="form-items">
				<label class="label label-medium" @click='showClassName'>普通标签左对齐</label>
				<label style="margin-left: 30px;" class="label label-require label-nocolon" @click='showClassName'>必须标签右对齐(不带冒号)</label>
				<label style="margin-left: 30px;" class="label label-require label-long label-justify" @click='showClassName'>标签两端对齐</label>
				<label style="margin-left: 30px;" class="label label-require label-long label-justify" @click='showClassName'>两端对齐</label>
			</div>
		</div>
		<div class="form-control clearfix">
			<label class="label label-medium label-require">提示</label>
			<div class="form-items" style="margin-top: 5px;">
				<span class="tips" @click='showClassName'>普通提示</span>
				<span class="tips tips-error" @click='showClassName'>错误提示</span>
				<span class="tips tips-success" @click='showClassName'>成功提示</span>
			</div>
		</div>
		<div class="form-control clearfix">
			<label class="label label-medium label-require">文本框</label>
			<div class="form-items div-inputs">
				<input type="text" class="input" placeholder="普通文本框" @click='showClassName'>
				<input type="text" class="input input-error" placeholder="警告文本框" @click='showClassName'>
				<input type="text" class="input input-disable" disabled placeholder="禁用文本框" @click='showClassName'>
				<div class="div-input" @click='showClassName'>
					<input type="text" class="input input-user" placeholder="用户文本框">
				</div>
				<div class="div-input input-active" @click='showClassName'>
					<input type="password" class="input input-password" placeholder="密码文本框">
				</div>
				<div class="div-input input-error" @click='showClassName'>
					<input type="text" class="input input-search" placeholder="搜索文本框">
				</div>
				<div class="div-input input-disable" @click='showClassName'>
					<input type="text" class="input input-email" disabled placeholder="邮箱文本框">
				</div>
				<div class="div-input" @click='showClassName'>
					<input type="number" class="input input-num" placeholder="数值文本框">
				</div>			
			</div>
		</div>
		<div class="form-control clearfix">
			<label class="label label-medium label-require">文本域</label>
			<div class="form-items">
				<textarea class="textarea textarea-noresize" placeholder="普通文本域(不可拖动)" @click='showClassName'></textarea>
				<textarea class="textarea textarea-error" placeholder="错误文本域(可拖动）" @click='showClassName'></textarea>
				<textarea class="textarea textarea-disable textarea-noresize" placeholder="禁用文本域(不可拖动)" disabled @click='showClassName'></textarea>
			</div>
		</div>
		<div class="form-control clearfix">
			<label class="label label-medium label-require">radio</label>
			<div class="form-items">
				<label class="rd">普通状态</label>
				<label class="rd rd-checked">选中状态</label>
				<label class="rd rd-disable">禁用未选中</label>
				<label class="rd rd-checked-disable">禁用选中</label>
			</div>
		</div>
		<div class="form-control clearfix">
			<label class="label label-medium label-require">checkbox</label>
			<div class="form-items">
				<label class="ck">普通状态</label>
				<label class="ck ck-checked">选中状态</label>
				<label class="ck ck-disable">禁用未选中</label>
				<label class="ck ck-checked-disable">禁用选中</label>
			</div>
		</div>
		<div class="form-control clearfix">
			<label class="label label-medium label-require">shift</label>
			<label class="shift" :class='{"shift-checked": switchFlag}' @click="switchBtn"></label>
			<label class="shift shift-checked"></label>
			<label class="shift shift-disable"></label>
		</div>
		<div class="form-control clearfix">
			<label class="label label-medium label-require">表格</label>
			<div class="form-items">
				<table class="table" cellpadding="0" cellspacing="0" @click='showClassName'>
					<thead class="thead" @click='showClassName'>
						<th v-for='item in table.header'>{{item}}</th>
					</thead>
					<tbody class="tbody" @click='showClassName'>
						<tr v-if='!table.data.length' class="tbody-null">
							<td :colspan="table.header.length"></td>
						</tr>
						<tr v-if='table.data.length' v-for='item in table.data'>
							<td>{{item.name}}</td>
							<td>{{item.age}}</td>
							<td>{{item.gender}}</td>
							<td><a class="a a-hover">查看</a></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	
	</div>
</template>
<script>
	export default{
		data(){
			return{
				table: {
					header: ['姓名','年龄','性别','操作'],
					data: [
						{name:'www',age:'22',gender:'male'},
						{name:'aaa',age:'33',gender:'female'},
						{name:'vvv',age:'44',gender:'female'},
						{name:'bbb',age:'55',gender:'male'},
						{name:'jjj',age:'55',gender:'male'}
					]
				},
				cname: '',
				switchFlag: false
			}
		},
		methods: {
			showClassName: function(e){
				e = e || window.event
				let target = e.target
				this.cname = target.className
				console.log(target)
			},
			switchBtn: function(){
				this.switchFlag = !this.switchFlag
			}
		}
	}
</script>
<style scoped>
.div-inputs>input,.div-inputs>div{margin-bottom:20px;}
.shift{height:30px;width:80px;}
.shift:before{height:28px;width:28px;}
.shift-checked:before{left:51px;}
</style>