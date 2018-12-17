/**
 * @date: 2018-12-11
 * @author wangjun8@konka.com
 * 原生js封装各类弹框应用
 */
 import css from './dialog.css'
 import temp from './html.js'
//存储各信息提示框定时器对象，避免因为定时器回调函数触发两次bug
let timeouts = {}
const dialog = {
	open: (obj) => {
		//通过传入对象参数，判断指定type，打开相应弹窗
		if(obj && typeof obj === 'object' && obj.type){
			let [msg,value,ensure,cancel,timeout,func,clickClose,current,total] = [obj.msg,obj.value,obj.ensure,obj.cancel,obj.timeout,obj.callback,obj.clickClose,obj.current,obj.total]
			switch(obj.type){
				case 'alert': {
					return dialog.alert(msg,ensure)
					break
				};
				case 'confirm': {
					return dialog.confirm(msg,ensure,cancel)
					break
				};
				case 'prompt': {
					return dialog.prompt(msg,value,ensure,cancel)
					break
				};
				case 'loading': {
					return dialog.loading(msg,clickClose,func)
					break
				};
				case 'msg': {
					return dialog.msg(msg,timeout,func)
					break
				};
				case 'success': {
					return dialog.success(msg,timeout,func)
					break
				};
				case 'error': {
					return dialog.error(msg,timeout,func)
					break
				};
				case 'progress': {
					return dialog.progress(current,total,clickClose,func)
				};
				default: dialog.alert('请传入合法的type，type可以为【alert、confirm、prompt、loading、msg、success、error、progress】之一')
			}
		}
	},
	close: (id,func,event) => {
		// 关闭单个对话框
		let flag = true
		let className = event ? event.target.className : ''
		if(className === 'j-dialog-modal' || className === 'j-dialog-close' || className.indexOf('j-dialog-msg') !== -1)flag = false
		if(event === undefined)flag = false
		if(flag)return
		if(!id)return
		common.removeBind(id)
		if(id.indexOf('msg') === -1){
			common.createTransition(id,0)
		}
		else{
			common.createTransitionForMsg(id)
		}
		setTimeout(() => {
			let dom = document.querySelector('#'+id)
			let doms = ''
			if(dom)doms = dom.parentNode.children
			for(let i = 0,len = doms.length; i < len; i++){
				if(doms[i].nodeName === 'DIV' && doms[i].id === id){
					dom.parentNode.removeChild(doms[i])
					break
				}
			}
			// 加载对话框、提示、成功提示、失败提示可以出发相应回调
			if(id.indexOf('loading') !== -1 || id.indexOf('msg') !== -1 || id.indexOf('success') !== -1 || id.indexOf('error') !== -1 || id.indexOf('progress') !== -1){
				func && func()
				//如果是主动触发关闭弹框，则取消之前绑定的定时器，以免重复调用
				if(timeouts[id]){
					clearTimeout(timeouts[id])
				}
			}
		},300)		
	},
	closeAll: () => {
		//关闭所有对话框
		let dom = document.querySelector('.j-dialog')
		let parent = dom.parentNode
		let doms = dom.parentNode.children
		for(let i = 0,len = doms.length; i < len; i++){
			if(doms[i] && doms[i].nodeName === 'DIV' && doms[i].className === 'j-dialog'){
				parent.removeChild(doms[i])
				i--	//因为doms是引用类型（伪数组NodeList），每移除一个元素长度都会-1
			}
		}
	},
	alert: (msg,func) => {
		//打开警告对话框
		let id = common.create('alert',msg)
		common.bindClose(id)
		common.bindAlertEnsure(id,func)
		return id
	},
	confirm: (msg,ensure,cancel) => {
		//打开确认对话框
		let id = common.create('confirm',msg,ensure,cancel)
		common.bindClose(id)
		common.bindBtnGroup(id,ensure,cancel,'confirm')
		return id
	},
	prompt: (msg,value,ensure,cancel) => {
		//打开输入对话框
		let id = common.createPrompt(msg,value,ensure,cancel)
		common.bindClose(id)
		common.bindBtnGroup(id,ensure,cancel,'prompt')
		return id
	},
	loading: (msg,autoClose = false,func) => {
		//打开加载对话框
		let id = common.create('loading',msg)
		if(autoClose){
			common.bindClose(id,func)
		}
		return id
	},
	msg: (msg,timeout = 3000,func) => {
		//打开普通信息提示对话框
		let id = common.createTips('msg',msg)
		common.bindClose(id,func)
		let tid = setTimeout(() => {
			common.innerClose(id,func)
		},timeout)
		timeouts[id] = tid
		return id
	},
	success: (msg,timeout = 3000,func) => {
		//打开成功提示对话框
		let id = common.createTips('success',msg)
		common.bindClose(id,func)
		let tid = setTimeout(() => {
			common.innerClose(id,func)
		},timeout)
		timeouts[id] = tid
		return id
	},
	error: (msg,timeout = 3000,func) => {
		//打开失败提示对话框
		let id = common.createTips('error',msg)
		common.bindClose(id,func)
		let tid = setTimeout(() => {
			common.innerClose(id,func)
		},timeout)
		timeouts[id] = tid
		return id
	},
	progress: (current,total,clickClose,func) => {
		let id = common.create('progress',current,total,func)
		if(clickClose){
			common.bindClose(id,func)
		}
		return id
	},
	changeMsg: (id,msg) => {
		//切换弹框显示的提示信息
		let selector = `#${id} .j-dialog-body-msg`
		let dom = document.querySelector(selector)
		if(dom){
			dom.innerHTML = msg
		}
	},
	changeProgress: (id,current,total) => {
		let c = parseFloat(current),t = parseFloat(total)
		if(c > t) c = t
		let span = `#${id} .j-dialog-progress span`
		span = document.querySelector(span)
		let progress = `#${id} .j-dialog-progress .j-progress-current`
		progress = document.querySelector(progress)
		let msg = '当前进度未知'
		let percent = 0
		if(current && total){
			percent = ((c/t)*100).toFixed(2) + '%'
			msg = '当前进度： ' + current + ' / ' + total + ' ，完成度： ' + percent
		}
		if(span)span.innerText = msg
		if(progress) progress.style.width = percent
	}
}

const common = {
	innerClose: (id,func) => {
		//内部调用关闭对话框方法
		if(id.indexOf('msg') === -1){
			common.createTransition(id,0)
		}
		else{
			common.createTransitionForMsg(id)
		}
		setTimeout(() => {
			common.removeBind(id)
			let dom = document.querySelector('#'+id)
			let doms = ''
			if(dom) doms = dom.parentNode.children
			for(let i = 0,len = doms.length; i < len; i++){
				if(doms[i].nodeName === 'DIV' && doms[i].id === id){
					dom.parentNode.removeChild(doms[i])
					break
				}
			}
			if(id.indexOf('loading') !== -1 || id.indexOf('msg') !== -1 || id.indexOf('success') !== -1 || id.indexOf('error') !== -1 ){
				func && func()
			}
		},300)		
	},
	bindClose: (id,func) => {
		//给对话框绑定关闭事件
		let dom  = document.querySelector('#'+id)
		dom.onclick = (event) => {
			dialog.close(id,func,event)		
		}
		let selector = `#${id} .j-dialog-header span`
		let btnClose = document.querySelector(selector)
		if(btnClose){
			btnClose.onclick = (event) => {
				dialog.close(id,func,event)
			}
		}
	},
	removeBind: (id) => {
		//移除元素节点之前，先移除事件监听，避免造成内存泄露
		let dom  = document.querySelector('#'+id)
		if(dom) dom.onclick = null
		let selector = `#${id} .j-dialog-header span`
		let btnClose = document.querySelector(selector)
		if(btnClose){
			btnClose.onclick = null
		}
	},
	removeBindSeletor: (selector) => {
		//移除点击监听事件，传参selector
		let select = document.querySelector(selector)
		if(select){
			select.onclick = null
		}
	},
	removeBindBtnGroup: (id,type) => {
		//移除点击按钮绑定事件，主要针对confirm、prompt拥有两个按钮弹框
		let eSelector = `#${id} .j-${type}-ensure`,cSelector = `#${id} .j-${type}-cancel`
		let eBtn = document.querySelector(eSelector)
		let cBtn = document.querySelector(cSelector)
		if(eBtn){
			eBtn.onclick = null
		}
		if(cBtn){
			cBtn.onclick = null
		}
	},
	bindAlertEnsure: (id,func) => {
		//给alert弹框确定按钮添加绑定事件
		let selector = `#${id} .j-alert-ensure`
		let btn = document.querySelector(selector)
		if(btn){
			btn.onclick = () => {
				func && func()
				common.removeBindSeletor(selector)
				common.innerClose(id,func)
			}
		}
	},
	bindBtnGroup: (id,ensure,cancel,type) => {
		//给confirm、prompt弹框按钮组添加绑定事件
		let eSelector = `#${id} .j-${type}-ensure`,cSelector = `#${id} .j-${type}-cancel`
		let eBtn = document.querySelector(eSelector)
		let cBtn = document.querySelector(cSelector)
		if(eBtn){
			eBtn.onclick = () => {
				let value = ''
				if(type === 'prompt'){
					let sel = `#${id} input`
					let input = document.querySelector(sel)
					if(input)value = input.value
				}
				ensure && ensure(value)
				common.removeBindBtnGroup(id,type)
				common.innerClose(id,() => {})
			}
		}
		if(cBtn){
			cBtn.onclick = () => {
				cancel && cancel()
				common.removeBindBtnGroup(id,type)
				common.innerClose(id,() => {})
			}
		}
	},
	createModal: () => {
		//创建模态框
		let modal = document.createElement('div')
		modal.innerHTML = temp.modal
		modal.className = 'j-dialog'
		return modal
	},
	create: (type,msg,ensure) => {
		//创建指定对话框
		let id = type + common.getRandom()
		let modal = common.createModal()
		modal.setAttribute('id',id)
		modal.children[0].innerHTML = temp[type](msg,ensure)
		document.body.appendChild(modal)
		common.createTransition(id,1)
		return id
	},
	createTips: (type,msg) => {
		//创建指定信息提示对话框
		let id = type + common.getRandom()
		let dialog = document.createElement('div')
		dialog.innerHTML = temp[type](msg)
		dialog.className = 'j-dialog'
		dialog.setAttribute('id',id)
		document.body.appendChild(dialog)
		common.createTransition(id,1)
		return id
	},
	createPrompt: (msg,value,ensure,cancel) => {
		//创建输入对话框
		let id = 'prompt' + common.getRandom()
		let modal = common.createModal()
		modal.setAttribute('id',id)
		modal.children[0].innerHTML = temp.prompt(msg,value)
		document.body.appendChild(modal)
		let input = `#${id} input`
		input = document.querySelector(input)
		if(input){
			input.focus()
		}	
		common.createTransition(id,1)	
		return id
	},
	createTransition: (id,num) => {
		//打开、关闭弹框添加动画效果
		let dom = document.querySelector(`#${id} .j-dialog-container`)
		if(dom){
			setTimeout(() => {
				//因为节点渲染需要一定时间，故transition动画需要在一定延时才会生效
				dom.style.transform = `scale(${num})`
			},10)			
		}
	},
	createTransitionForMsg: (id) => {
		//同上，主要针对普通信息提示对话框
		let dom = document.querySelector(`#${id} .j-dialog-msg`)
		if(dom){
			setTimeout(() => {
				//因为节点渲染需要一定时间，故transition动画需要在一定延时才会生效
				dom.style.top = `25%`
				dom.style.opacity = `0`
			},10)			
		}
	},
	getRandom: () => {
		//获取随机数，结合弹框类型，生成唯一id（大概率事件），用于元素选取和删除节点
		return Math.round(Math.random()*10000)
	}
}

export default dialog