/**
 * @date 2018-12-11
 * @author wangjun8@konka.com
 * 定义各类弹窗需要调用的模板文件
 */

 var template = {
 	modal: `<div class='j-dialog-modal'></div>`,
 	loading: (msg = '加载中...') => {
 		let str = `<div class='j-dialog-loading j-dialog-container'><span class='j-dialog-body-msg'>${msg}<span></div>`
 		return str
 	},
 	alert: (msg = '请输入确认内容！') => {
 		let str = `<div class='j-dialog-alert j-dialog-container'>
			 			<div class='j-dialog-header'><span class='j-dialog-tip'>警告</span><span class='j-dialog-close'>X</span></div>
			 			<div class='j-dialog-body j-dialog-alert-body'><span class='j-dialog-body-msg'>${msg}<span></div>
			 			<div class='j-dialog-footer'><button class='j-alert-ensure j-ensure j-btn'>确认</button></div>
			 		</div>`
 		return str
 	},
 	confirm: (msg = '是否确认？') => {
 		let str = `<div class='j-dialog-confirm j-dialog-container'>
			 			<div class='j-dialog-header'><span class='j-dialog-tip'>请确认</span><span class='j-dialog-close'>X</span></div>
			 			<div class='j-dialog-body'><span class='j-dialog-body-msg'>${msg}<span></div>
			 			<div class='j-dialog-footer'><button class='j-confirm-ensure j-ensure j-btn'>确认</button><button class='j-confirm-cancel j-btn'>取消</button></div>
			 		</div>`
 		return str
 	},
 	msg: (msg = '操作成功') => {
 		let str = `<div class='j-dialog-msg j-dialog-container'><span class='j-dialog-body-msg'>${msg}<span></div>`
 		return str
 	},
 	success: (msg = '操作成功') => {
 		let str = `<div class='j-dialog-msg j-dialog-container j-dialog-success'><span class='j-dialog-body-msg'>${msg}<span></div>`
 		return str
 	},
 	error: (msg = '操作失败') => {
 		let str = `<div class='j-dialog-msg j-dialog-container j-dialog-error'><span class='j-dialog-body-msg'>${msg}<span></div>`
 		return str
 	},
 	prompt: (msg = '请输入',value = '') => {
 		if(msg.indexOf(':') === -1 && msg.indexOf('：') == -1) msg += ':'
 		let str = `<div class='j-dialog-prompt j-dialog-container'>
			 			<div class='j-dialog-header'><span class='j-dialog-tip'>请输入</span><span class='j-dialog-close'>X</span></div>
			 			<div class='j-dialog-body'><label><span class='j-dialog-body-msg'>${msg}<span></label><input type='text' value='${value}'></div>
			 			<div class='j-dialog-footer'><button class='j-prompt-ensure j-ensure j-btn'>确认</button><button class='j-prompt-cancel j-btn'>取消</button></div>
			 		</div>`
		return str
 	},
 	progress: (current,total) => {
 		let c = parseFloat(current),t = parseFloat(total),msg = '当前进度未知'
 		if(c > t) c = t
 		let percent = ((c/t)*100).toFixed(2) + '%'
 		if(current && total)msg = '当前进度： ' + current + ' / ' + total + ' ，完成度： ' + percent
 		let str = `<div class='j-dialog-progress j-dialog-container'>
 						<div class='j-progress-background'></div>
 						<div class='j-progress-current' style='width:${percent}'></div>
 						<span>${msg}</span>
 				   </div>`
 		return str
 	},
 	window: (html = '') => {
 		let str = `<div class='j-dialog-confirm j-dialog-container'>
 						<div class='j-dialog-header'><span class='j-dialog-tip'>警告</span><span class='j-dialog-close'>X</span></div>
 						${html}
 				   <div>`
 		return str
 	}
 }

 export default template