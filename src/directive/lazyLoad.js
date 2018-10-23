export default(Vue,options = {})=>{
	if(!Array.prototype.remove){
		/**
		 * 在数组原型链上定义删除指定节点方法
		 **/
		Array.prototype.remove = function(item){
			if(!this.length) return;
			var index = this.indexOf(item);
			if(index > -1){
				this.splice(index,1);
				return this;
			}
		}
	}
	var init = {
		default: 'https://gw.alicdn.com/tps/i1/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png'
	};
	var listenList = [];//需要遍历的节点数组；判断图片是否加载过的数组
	const isCanShow = (item) => {
		/** 判断节点是否在可视范围内 **/
		var ele = item.ele;
		var src = item.src;
		var top = ele.getBoundingClientRect().top;
		var bottom = ele.getBoundingClientRect().bottom;
		if(top  < window.innerHeight && bottom > 0){
			/**
			 * 兼容ie写法，否则可直接省去创建image步骤，直接ele.src = src;
			 */
			var image = new Image();
			image.src = src;
			image.onload = function(){
				ele.src = src;
				listenList.remove(item);
			}
			return true;
		}
		else{
			return false;
		}
	};
	function loopList(){
		/**
		 * 遍历绑定该指令的节点
		 * 判断是否节点是否在可视区域内：是，展示并从数组中删除（提高效率）；否：不展示
		 **/
		var length = listenList.length;
		for(let i = 0; i< length; i++){
			isCanShow(listenList[i]);
		}
	}
	const onListenScroll = () =>{
		/** 
		 * 如果直接定义function，会造成绑定多个事件到scroll事件上 
		 * 解决方法：1、借用函数名looList或其它，会覆盖之前绑定的同名函数
		 * 2、可以直接window.onscroll = function(){...};也会覆盖之前的函数
		 **/
		window.addEventListener('scroll',loopList)
	}

	const addListener = (ele,binding) =>{
		/** 指令绑定和节点更新时触发 **/
		var item = {
			ele: ele,
			src: binding.value
		}
		ele.src = init.default;
		if(isCanShow(item)){
			return
		}
		listenList.push(item);
		onListenScroll();
	}
	Vue.directive('lazyLoad',{
		inserted:addListener,
		updated:addListener
	})

}