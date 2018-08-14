(function(){
	function getUrlParam(){
		/**
		1、判断url参数个数，为空则直接返回空；
		2、判断传入的参数是否为空，
				为空：判断url参数个数，个数为1，则返回参数值；个数不为1，则返回空；
				不为空：判断url参数个数，
						个数为1，且对应参数无参数名只有参数值，则直接返回参数值；如果对应参数包含参数名则比对参数名，一致则返回参数值，否则返回空
						个数不为1，则遍历参数数组，寻找与参数名对应的参数值，找到则返回相应的参数值，否则返回空
		*/
		let str = '';
		let url = location.href;
		let param_str = url.split('?')[1];
		if(!param_str)return;
		let key_value = param_str.split('&');
		let arg = arguments;
		if(!arg || arg.length === 0){
			if(key_value.length === 1){
				if(key_value[0].indexOf('=') === -1){
					return key_value[0];
				}
				else{
					return key_value[0].split('=')[1];
				}
			}
			return;
		}
		else{
			str =arguments[0].toString();
		}
		if(!key_value || key_value.length <= 0)return;
		else{
			if(key_value.length == 1){
				if(key_value[0].indexOf('=') === -1){
					return key_value[0];
				}
				else if(key_value[0].split('=').length == 2){
					if(key_value[0].split('=')[0] == str){
						return key_value[0].split('=')[1];
					}
					else{
						return;
					}
				}				
			}			
			else{
				for(let i = 0; i < key_value.length; i++){
					let param = key_value[i].split('=');
					if(param[0] == str){
						return param[1];
					}
				}
				return;
			}
		}
	}

	function getFormatDate(){
		/*
			1、参数1代表传进来的日期格式，可以是日期对象，也可以是日期的value数值
			2、参数2代表最终返回结果，year、month、day、hour、minute、second 分表表示精确到对应位，week表示输出星期几
			3、参数1不传表示默认当前日期；参数2不传默认输出精确到秒
		*/
		let arg = arguments[0];
		let str = arguments[1];
		let date = null;
		let weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
		if(!arg){
			date = new Date();
		}
		else{
			if(typeof arg === 'object'){
				date = arg;
			}
			else{
				date = new Date(arg);
			}
		}
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = date.getHours();
		let minute = date.getMinutes();
		let second = date.getSeconds();
		let week = date.getDay();
		month = month > 9 ? month : ('0'+month);
		day = day > 9 ? day : ('0'+day);
		hour = hour > 9 ? hour : ('0'+hour);
		minute = minute > 9 ? minute : ('0'+minute);
		second = second > 9 ? second : ('0'+second);
		switch(str){
			case 'year': return year;
			case 'month': return year+'-'+month;
			case 'day': return year+'-'+month+'-'+day;
			case 'hour': return year+'-'+month+'-'+day+' '+hour;
			case 'minute': return year+'-'+month+'-'+day+' '+hour+':'+minute;
			case 'second': return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
			case 'week': return weeks[week];
			default: return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
		}
	}

	function setLocal(key,value,expire){
		let key_timestamp = key + 'TimeStamp';
		let now_timestamp = (new Date()).valueOf();
		let time = expire ? (now_timestamp + expire*24*60*60*1000) : (now_timestamp + 24*60*60*1000);
		window.localStorage[key] = value;
		window.localStorage[key_timestamp] = time;
	}
	function removeLocal(key){
		window.localStorage.removeItem(key);
		window.localStorage.removeItem(key+'TimeStamp');
	}
	function getLocal(key){
		let now_timestamp = (new Date()).valueOf();
		let key_timestamp = window.localStorage[key+'TimeStamp'];
		if(now_timestamp > key_timestamp){
			removeLocal(key);
			return undefined;
		}
		else{
			return window.localStorage[key];
		}
	}

	window.util = {
		'getUrlParam': getUrlParam,
		'getFormatDate': getFormatDate,
		'setLocal': setLocal,
		'getLocal': getLocal,
		'removeLocal': removeLocal
	};
	console.log(window.util);
})();