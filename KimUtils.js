(funcion(){

	//支持trim()方法
	if(!String.prototype.trim){
		String.prototype.trim = function(){
			return  this.replace(/(^\s*)|(\s*$)/g,"");  
		};
	};
	//replaceAll(newStr,oldStr)
	String.prototype.replaceAll = function(str,target){
		return this.replace(new RegExp(str,"ig"),target);
	};

	//空判断
	function isEmpty(val) {
		val = $.trim(val);
		if (val == null)
			return true;
		if (val == undefined || val == 'undefined')
			return true;
		if (val == "")
			return true;
		if (val.length == 0)
			return true;
		if (!/[^(^\s*)|(\s*$)]/.test(val))
			return true;
		return false;
	}
	//非空判断
	function isNotEmpty(val) {
		return !isEmpty(val);
	}

	//阻止事件冒泡
	function stopBubble(e) {
		// 如果提供了事件对象，则这是一个非IE浏览器
		e = e || window.event || arguments.callee.caller.arguments[0]; //兼容firefox

		if (e && e.stopPropagation){
			// 因此它支持W3C的stopPropagation()方法
			e.stopPropagation();
		}else{
			// 否则，我们需要使用IE的方式来取消事件冒泡
			window.event.cancelBubble = true;
		}
	};

	//阻止浏览器的默认行为 
	function stopDefault( e ) { 
		// 如果提供了事件对象，则这是一个非IE浏览器
		e = e || window.event || arguments.callee.caller.arguments[0]; //兼容firefox
		if(e && e.preventDefault){
			//阻止默认浏览器动作(W3C) 
			e.preventDefault(); 
		}else{ 
			//IE中阻止函数器默认动作的方式 
			window.event.returnValue = false; 
		}
		return false; 
	}

	//返回上一步操作
	function goback(){
		window.history.back();
	}

	//JS获取自身所在文件的目录路径
	function getParentPath(){
		var ParentPath = document.scripts;
		ParentPath = ParentPath[ParentPath.length-1].src.substring(0,ParentPath[ParentPath.length-1].src.lastIndexOf("/")+1);
		return ParentPath;
	}
	
	//js动态加载js、css文件
	var dynamicLoading = {
		css: function(path){
			var path = this.getParentPath() + path;
			if(!path || path.length === 0){
				throw new Error('argument "path" is required !');
			}
			var head = document.getElementsByTagName('head')[0];
			var link = document.createElement('link');
			link.href = path;
			link.rel = 'stylesheet';
			link.type = 'text/css';
			head.appendChild(link);
		},
		js: function(path){
			var path = this.getParentPath() + path;
			if(!path || path.length === 0){
				throw new Error('argument "path" is required !');
			}
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.src = path;
			script.type = 'text/javascript';
			head.appendChild(script);
		},
		getParentPath:function(){
			var ParentPath = document.scripts;
			ParentPath = ParentPath[ParentPath.length-1].src.substring(0,ParentPath[ParentPath.length-1].src.lastIndexOf("/")+1);
			return ParentPath;
		}
	}
	
	//两个数组比较返回数组的增量及删量
	function compareArray(arr1,arr2){
		var temp = []; //临时数组1  
		var temparrayRemoved = [];//临时数组2 - 记录被删除的元素
		var temparrayAdd = [];//临时数组3 - 记录新增的元素

		for (var i = 0; i < arr2.length; i++) {  
			temp[arr2[i]] = true;//把数组B的值当成临时数组1的键并赋值为真  
		};  
		for (var i = 0; i < arr1.length; i++) {  
			if (!temp[arr1[i]]) {  
				temparrayRemoved.push(arr1[i]); // 获取删除的元素
			} else {
				delete temp[arr1[i]]; // 删除相同的元素
			} ;  
		};  
		// 查找添加的元素
		for(var i in temp){
			temparrayAdd.push(i);
		} 
		var Arrjson = {
			addArr:temparrayAdd,
			removedArr:temparrayRemoved
		}
		return Arrjson;
	}

	//定位工具
	var kimUtil = {
		_position : function($dom,amark){//居中定位
			var windowWidth = $(window).width();
			var windowHeight= $(window).height();
			var width = $dom.width();
			var height = $dom.height();
			var left = (windowWidth - width)/2;
			var top = (windowHeight - height)/2;
			if(!amark)$dom.css("top",top).animate({left:left});
			if(amark==0)$dom.animate({left:left,"top":top});
			if(amark==1)$dom.css("left",left).animate({"top":top});
			if(amark==2)$dom.css({left:left,"top":top});
			return this;
		},

		_positionParent : function($dom,$parent,atop){//相对父元素居中定位
			var parentWidth = $parent.width();
			var parentHeight= $parent.height();
			var width = $dom.width();
			var height = $dom.height();
			var left = (parentWidth - width)/2;
			var top = (parentHeight - height)/2;
			$dom.css({left:left,top:top-(atop||0)});
			return this;
		},

		resize : function($dom){//窗体响应式
			var $this = this;
			$(window).resize(function(){
				$this._position($dom);	
			});
		},

		animates:function($dom,mark,callback){//动画需要引入animate.css
			switch(mark){
				case "fadeOut":$dom.toggleClass(animateOut()).fadeOut("slow",function(){$(this).remove();if(callback)callback();});break;
				case "slideUp":$dom.toggleClass(animateOut()).slideUp("slow",function(){$(this).remove();if(callback)callback();});break;
				case "fadeIn":$dom.toggleClass(animateOut()).fadeIn("slow",function(){if(callback)callback();});break;
				case "slideDown":$dom.toggleClass(animateOut()).slideDown("slow",function(){if(callback)callback();});break;
				case "left":$dom.toggleClass(animateOut()).animate({left:0},300,function(){$(this).remove();if(callback)callback();});break;
				case "top":$dom.toggleClass(animateOut()).animate({top:0},300,function(){$(this).remove();if(callback)callback();});break;
			}
		},

		getRandomColor : function(){//获取十六进制随机色
		  return '#'+Math.floor(Math.random()*16777215).toString(16);
		}
	};

	//加载样式
	dynamicLoading.css("skin/kimUtils.css");

	//移入动画若index为空默认为随机动画
	function animateIn(index){
		var animateIn = [];
		animateIn.push("animated bounce");//0
		animateIn.push("animated tada");//1
		animateIn.push("animated swing");//2
		animateIn.push("animated wobble");//3
		animateIn.push("animated flip");//4
		animateIn.push("animated flipInX");//5
		animateIn.push("animated flipInY");//6
		animateIn.push("animated fadeIn");//7
		animateIn.push("animated fadeInUp");//8
		animateIn.push("animated fadeInDown");//9
		animateIn.push("animated fadeInLeft");//10
		animateIn.push("animated fadeInRight");//11
		animateIn.push("animated fadeInUpBig");//12
		animateIn.push("animated fadeInDownBig");//13
		animateIn.push("animated fadeInLeftBig");//14
		animateIn.push("animated fadeInRightBig");//15
		animateIn.push("animated bounceIn");//16
		animateIn.push("animated bounceInUp");//17
		animateIn.push("animated bounceInDown");//18
		animateIn.push("animated bounceInLeft");//19
		animateIn.push("animated bounceInRight");//20
		animateIn.push("animated rotateIn");//21
		animateIn.push("animated rotateInUpLeft");//22
		animateIn.push("animated rotateInDownLeft");//23
		animateIn.push("animated rotateInUpRight");//24
		animateIn.push("animated rotateInDownRight");//25
		animateIn.push("animated rollIn");//26
		if(!index){
			var len = animateIn.length;
			var r = Math.floor(Math.random()*(len-1)+1);
			return animateIn[r];
		}else{
			return animateIn[index];
		}
	}

	//移除动画若index为空默认为随机动画
	function animateOut(index){
		var animateOut = [];
		animateOut.push("animated flipOutX");//0
		animateOut.push("animated flipOutY");//1
		animateOut.push("animated fadeOut");//2
		animateOut.push("animated fadeOutUp");//3
		animateOut.push("animated fadeOutDown");//4
		animateOut.push("animated fadeOutLeft");//5
		animateOut.push("animated fadeOutRight");//6
		animateOut.push("animated fadeOutUpBig");//7
		animateOut.push("animated fadeOutDownBig");//8
		animateOut.push("animated fadeOutLeftBig");//9
		animateOut.push("animated fadeOutRightBig");//10
		animateOut.push("animated bounceOut");//11
		animateOut.push("animated bounceOutUp");//12
		animateOut.push("animated bounceOutDown");//13
		animateOut.push("animated bounceOutLeft");//14
		animateOut.push("animated bounceOutRight");//15
		animateOut.push("animated rotateOut");//16
		animateOut.push("animated rotateOutUpLeft");//17
		animateOut.push("animated rotateOutDownLeft");//18
		animateOut.push("animated rotateOutDownRight");//19
		animateOut.push("animated rollOut");//21
		animateOut.push("animated hinge");//20
		if(!index){
			var len = animateOut.length;
			var r = Math.floor(Math.random()*(len-1)+1);
			return animateOut[r];
		}else{
			return animateOut[index];
		}
	}

	/**
	 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
	 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	 * eg: (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	 * eg: (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 
	 * eg: (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 
	 * eg: (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 
	 * eg: (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	 */
	Date.prototype.format = function(fmt) {
		var o = {
			"Y+" : this.getFullYear(),
			"M+" : this.getMonth() + 1,
			// 月份
			"d+" : this.getDate(),
			// 日
			"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
			// 小时
			"H+" : this.getHours(),
			// 小时
			"m+" : this.getMinutes(),
			// 分
			"s+" : this.getSeconds(),
			// 秒
			"q+" : Math.floor((this.getMonth() + 3) / 3),
			// 季度
			"S" : this.getMilliseconds()
		// 毫秒
		};
		var week = {
			"0" : "/u65e5",
			"1" : "/u4e00",
			"2" : "/u4e8c",
			"3" : "/u4e09",
			"4" : "/u56db",
			"5" : "/u4e94",
			"6" : "/u516d"
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		if (/(E+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1,((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f": "/u5468"): "") + week[this.getDay() + ""]);
		}
		for ( var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	};

	/**
	 * 将数字转换成对应的中文 将阿拉伯数字翻译成中文的大写数字
	 * @param {Object}
	 * num 比如:1对应一 11：十一 101:一百零一
	 * @return {TypeName}
	 */
	function NumberToChinese(num) {
		var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
		var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
		var a = ("" + num).replace(/(^0*)/g, "").split("."),
		k = 0,
		re = "";
		for (var i = a[0].length - 1; i >= 0; i--) {
			switch (k) {
				case 0:
					re = BB[7] + re;
					break;
				case 4:
					if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0])) re = BB[4] + re;
					break;
				case 8:
					re = BB[5] + re;
					BB[7] = BB[5];
					k = 0;
					break;
			}
			if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
			if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
			k++;
		}

		if (a.length > 1){ // 加上小数部分(如果有小数部分)
			re += BB[6];
			for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
		}
		if (re == '一十') re = "十";
		if (re.match(/^一/) && re.length == 3) re = re.replace("一", "");
		return re;
	};


	/**
	 * 获取窗体可见度高度
	 * @returns
	 */
	function getClientHeight() {
		var clientHeight = 0;
		if (document.body.clientHeight && document.documentElement.clientHeight) {
			clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight
					: document.documentElement.clientHeight;
		} else {
			clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight
					: document.documentElement.clientHeight;
		}
		return clientHeight;
	}

	/**
	 * 获取窗体可见度宽度
	 * @returns
	 */
	function getClientWidth() {
		var clientWidth = 0;
		if (document.body.clientWidth && document.documentElement.clientWidth) {
			clientWidth = (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth
					: document.documentElement.clientWidth;
		} else {
			clientWidth = (document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth
					: document.documentElement.clientWidth;
		}
		return clientWidth;
	}
	//获取最大高度 getClientHeight + 滚动条高度
	function getScrollHeight() {
		return Math.max(getClientHeight(), document.body.scrollHeight,
				document.documentElement.scrollHeight);
	}
	//滚动条距离顶部的高度
	function getScrollTop() {
		var scrollTop = 0;
		if (document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if (document.body) {
			scrollTop = document.body.scrollTop;
		}
		return scrollTop;
	}

	/* 文件大小转换为MB GB KB格式 */
	function countFileSize(size) {
		var fsize = parseFloat(size, 2);
		var fileSizeString;
		if (fsize < 1024) {
			fileSizeString = fsize.toFixed(2) + "B";
		} else if (fsize < 1048576) {
			fileSizeString = (fsize / 1024).toFixed(2) + "KB";
		} else if (fsize < 1073741824) {
			fileSizeString = (fsize / 1024 / 1024).toFixed(2) + "MB";
		} else if (fsize < 1024 * 1024 * 1024) {
			fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(2) + "GB";
		} else {
			fileSizeString = "0B";
		}
		return fileSizeString;
	};

	/* 获取文件后缀 */
	function getExt(fileName) {
		if (isNotEmpty(fileName) && fileName.lastIndexOf(".") == -1){return fileName;}
		var pos = fileName.lastIndexOf(".") + 1;
		return fileName.substring(pos, fileName.length).toLowerCase();
	}

	/* 获取文件名称 */
	function getFileName(fileName) {
		var pos = fileName.lastIndexOf("/") + 1;
		if (pos == -1) {
			return fileName;
		} else {
			return fileName.substring(pos, fileName.length);
		}
	}

	//获取几秒钟以前 startTime==== Date
	function getTimeFormat(startTime) {
		var startTimeMills = startTime.getTime();
		var endTimeMills = new Date().getTime();
		var diff = parseInt((endTimeMills - startTimeMills) / 1000);//秒
		var day_diff = parseInt(Math.floor(diff / 86400));//天
		var buffer = Array();
		if (day_diff < 0) {
			return "[error],时间越界...";
		} else {
			if (day_diff == 0 && diff < 60) {
				if (diff <= 0)
					diff = 1;
				buffer.push(diff + "秒前");
			} else if (day_diff == 0 && diff < 120) {
				buffer.push("1 分钟前");
			} else if (day_diff == 0 && diff < 3600) {
				buffer.push(Math.round(Math.floor(diff / 60)) + "分钟前");
			} else if (day_diff == 0 && diff < 7200) {
				buffer.push("1小时前");
			} else if (day_diff == 0 && diff < 86400) {
				buffer.push(Math.round(Math.floor(diff / 3600)) + "小时前");
			} else if (day_diff == 1) {
				buffer.push("1天前");
			} else if (day_diff < 7) {
				buffer.push(day_diff + "天前");
			} else if (day_diff < 30) {
				buffer.push(Math.round(Math.floor(day_diff / 7)) + " 星期前");
			} else if (day_diff >= 30 && day_diff <= 179) {
				buffer.push(Math.round(Math.floor(day_diff / 30)) + "月前");
			} else if (day_diff >= 180 && day_diff < 365) {
				buffer.push("半年前");
			} else if (day_diff >= 365) {
				buffer.push(Math.round(Math.floor(day_diff / 30 / 12)) + "年前");
			}
		}
		return buffer.toString();
	};

	//身份证判断
	function isIdCard(val){
		var idCard = /^[1-9]d{5}(19d{2}|[2-9]d{3})((0d)|(1[0-2]))(([0|1|2]d)|3[0-1])(d{4}|d{3}X)$/i;
		if(idCard.test(val)){
			return true;
		}
	} 
	//邮箱判断
	function isEmail(val){
		var email = /^\w+\@[A-Za-z0-9]+\.[A-Za-z]{2,4}$/i;
		if(email.test(val)){
			return true;
		}
	} 

	//电话判断
	function isPhone(val){
		var phone = /^1[3458]{1}[0-9]{9}$/;
		if(phone.test(val)){
			return true;
		}
	} 

	//范围随机数
	function randomRange(start,end){
		return Math.floor(Math.random()*(end-start+1))+start;
	};
	//随机数
	function randomNum(num){
		return Math.floor(Math.random()*(num+1));
	};
	//rgb随机色
	function randomColor(){
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);
		return "rgb("+r+","+g+","+b+")";//IE7不支出rgb
	};
	//十六进制随机色
	function randomColor16(){
		//0-255	
		var r = Math.random(255).toString(16);
		var g = Math.random(255).toString(16);
		var b = Math.random(255).toString(16);
		//255的数字转换成十六进制
		if(r.length<2)r = "0"+r;
		if(g.length<2)g = "0"+g;
		if(b.length<2)b = "0"+b;
		return "#"+r+g+b;
	};

	//获取对象数组下标
	function getIndex(dom){
		var index = -1;
		var domArr = Array.prototype.slice.call(dom.parentElement.children);
		domArr.forEach(function(obj,i){
			if(obj==dom){
				index = i;
				return false;
			}
		});
		return index;
	};

	//获取css中的样式的值，跟浏览器兼容无关
	function getStyle(dom,attr){
		return window.getComputedStyle ? window.getComputedStyle(dom,false)[attr]:dom.currentStyle[attr];
	};

	//简单混入--对象继承
	function mixin(obj,obj2){
		for(var k in obj2){
			if(obj2.hasOwnProperty(k)){
				obj[k] = obj2[k];
			}
		}
		return obj;
	};

	//多对象混入
	function mix(target,source){
		var arr = [];
		var args = arr.slice.call(arguments);
		
		var i = 1;
		if(args.length==1){
			return target;
		};
		while((source = args[i++])){
			for(var key in source){
				if(source.hasOwnProperty(key)){
					target[key] = source[key];
				}
			}
		}
		return target;
	};

	//获取鼠标的位置。兼容ie678
	function getXY(e){
		var ev = e || window.event || arguments.callee.caller.arguments[0]; //兼容firefox
		var x=0,y=0;
		if(ev.pageX){
			x = ev.pageX;
			y = ev.pageY;
		}else{
			//拿到scrollTop 和scrollLeft
			var sleft = 0,stop = 0;
			//ie678---
			if(document.documentElement){
				stop =document.documentElement.scrollTop;
				sleft = document.documentElement.scrollLeft;
			}else{
			//ie9+ 谷歌 
				stop = document.body.scrollTop;
				sleft = document.body.scrollLeft;
			}	
			x = ev.clientX + sleft;
			y = ev.clientY + stop;
		}
		return {x:x,y:y};
	};
	
	//对象转字符串
	function jsonToString(obj) {
		var THIS = this;
		switch (typeof (obj)) {
			case 'string':
				return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
			case 'array':
				return '[' + obj.map(THIS.jsonToString).join(',') + ']';
			case 'object':
				if (obj instanceof Array) {
					var strArr = [];
					var len = obj.length;
					for (var i = 0; i < len; i++) {
						strArr.push(THIS.jsonToString(obj[i]));
					}
					return '[' + strArr.join(',') + ']';
				} else if (obj == null) {
					return 'null';

				} else {
					var string = [];
					for ( var property in obj)
						string.push(THIS.jsonToString(property) + ':'
								+ THIS.jsonToString(obj[property]));
					return '{' + string.join(',') + '}';
				}
			case 'number':
				return obj;
			case false:
				return obj;
		}
	}

	/* 禁止窗体选中 */
	function forbiddenSelect() {
		$(document).bind("selectstart", function() {
			return false;
		});
		document.onselectstart = new Function("event.returnValue=false;");
		$("*").css({
			"-moz-user-select" : "none"
		});
	}

	/* 窗体允许选中 */
	function autoSelect() {
		$(document).bind("selectstart", function() {
			return true;
		});
		document.onselectstart = new Function("event.returnValue=true;");
		$("*").css({
			"-moz-user-select" : ""
		});
	};
	
	//dom对象
	function next(obj){
		return obj.nextSibling.nodeType == 1 ? obj.nextSibling : next(obj.nextSibling);
	};

	function pre(obj){
		return obj.previousSibling.nodeType == 1 ? obj.previousSibling : pre(obj.previousSibling);
	};

	function first(obj){
		return obj.firstChild.nodeType == 1 ? obj.firstChild : next(obj.firstChild);
	};

	function last(obj){
		return obj.lastChild.nodeType == 1 ? obj.lastChild : pre(obj.lastChild);
	};

	/*通过className获取dom元素进行过滤*/
	function domClass(dompid,sClass){
		var pdom = (typeof dompid==="string"?dom(dompid):dompid);
		var aEle = pdom.getElementsByTagName('*');
		var arrs = [];
		for(var i=0;i<aEle.length;i++){
			if(aEle[i].className.indexOf(sClass)!=-1){
				arrs.push(aEle[i]);
			}
		}
		return arrs;
	};

	//加密
	function encryption(str,k){
		var string = "";
		for (var i = 0; i < str.length; i++) {
			var c= str.charCodeAt(i);
			if(c>=97 && c<=122){
				c += k%26;
				if(c<97){
					c+=26;
				}
				if(c>122){
					c-=26;
				}
			}else if(c>=65 && c<=90){
				c+=k%26;
				if(c<65){
					c+=26;
				}
				if(c>122){
					c-=26;
				}
			}
			string+=String.fromCharCode(c);
		}
		return string;
	}

	//解密
	function dencryption(str,n){
		var string = "";
		var k = parseInt("-"+n);
		for (var i = 0; i < str.length; i++) {
			var c= str.charCodeAt(i);
			if(c>=97 && c<=122){
				c += k%26;
				if(c<97){
					c+=26;
				}
				if(c>122){
					c-=26;
				}
			}else if(c>=65 && c<=90){
				c+=k%26;
				if(c<65){
					c+=26;
				}
				if(c>122){
					c-=26;
				}
			}
			string+=String.fromCharCode(c);
		}
		return string;
	};

	
	/*日期工具类*/
	$.tmDate = {
	 /*转换日期*/
	 _transferDate : function(date){
		if(typeof date =="string"){
			return new Date(date.replace(/-/ig,"/").replace("T"," "));
		}else{
			return date;
		}
	 },
	  /*格式化日期*/
	 _toString : function(date,pattern){
		var d = this._transferDate(date);
		return d.format(pattern);
	 },

	 /*获取两个时间相减的时间*/
	 _Date : function(date1,date2){
		var dateTime = this._numMillSecond(date1,date2);
		return new Date(dateTime).format("yyyy-MM-dd");
	 },
	 //获取两个时间相减的年份
	 _Datsyear : function(date1,date2){
		 var dateTime = this._numYear(date1,date2);
		 return  dateTime;
	 },
	//获取两个时间相减的月份
	 _datsmonth : function(date1,date2){
		 var dateTime = this._numMonth(date2,date1);
		 return  dateTime;
	 },

	 //间隔年份
	 _numYear : function(date1,date2){
		var times = this._numDay(date1,date2);
		return  Math.floor(times/365);
	 },

	  //间隔月份
	 _numMonth : function(date1,date2){
		var times = this._numDay(date1,date2);
		return  Math.floor(times/30);
	 },

	 //间隔天数
	 _numDay : function(date1,date2){
		var times = this._numSecond(date1,date2);
		var hour = this._var().hour;
		var mills = this._var().mills;
		return Math.ceil(times/(mills * hour));
	 },

	//间隔时
	 _numHour : function(date1,date2){
		return Math.floor(this._numMillSecond(date1,date2)/(1000*60*60));
	 },

	 //间隔分
	 _numMinute : function(date1,date2){
		return Math.floor(this._numMillSecond(date1,date2)/(1000*60));
	 },

	 //间隔秒数
	 _numSecond : function(date1,date2){
		 return Math.floor(this._numMillSecond(date1,date2) / 1000);
	 },

	  //间隔毫秒
	 _numMillSecond : function(date1,date2){
		var stimes = this._getTime(this._transferDate(date1));
		var etimes = this._getTime(this._transferDate(date2));
		return etimes - stimes;
	 },

	 _var : function(){
		return {hour:24,second:60,mills:3600,format:"yyyy-MM-dd",dateFormat:"yyyy-MM-dd HH:mm:ss"};
	 },

	/*某个日期加上多少毫秒*/
	 _plusMillisSeconds : function(date,millisSeconds){
		var dateTime = this._getTime(date);
		var mintimes = millisSeconds;
		var rdate = dateTime*1 + mintimes*1;
		return this._format(new Date(rdate));
	 },
	 /*某个日期加上多少秒*/
	 _plusSeconds : function(date,seconds){
		var dateTime = this._getTime(date);
		var mintimes = seconds*1000;
		var rdate = dateTime*1 + mintimes*1;
		return this._format(new Date(rdate));
	 },
	  /*某个日期加上多少分钟*/
	 _plusMinutes : function(date,minutes){
		var dateTime = this._getTime(date);
		var mintimes = minutes*60*1000;
		var rdate = dateTime*1 + mintimes*1;
		return this._format(new Date(rdate));
	 },
	  /*某个日期加上小时数*/
	 _plusHours : function(date,hours){
		var dateTime = this._getTime(date);
		var mintimes = hours*60*60*1000;
		var rdate = dateTime + mintimes;
		return this._format(new Date(rdate));
	 },
	 /*某个日期加上天数*/
	 _plusDays : function(date,days){
		var dateTime = this._getTime(date);
		var mintimes = days*60*60*1000*24;
		var rdate = dateTime*1 + mintimes*1;
		return this._format(new Date(rdate));
	 },

	 /*某个日期加上多少个月,这里是按照一个月30天来计算天数的*/
	 _plusMonths : function(date,months){
		var dateTime = this._getTime(date);
		var mintimes = months*30*60*60*1000*24;
		var rdate = dateTime + mintimes*1;
		return this._format(new Date(rdate));
	 },

	 /*某个日期加上多少个年,这里是按照一个月365天来计算天数的，如果loop为true则按闰年计算*/
	 _plusYears : function(date,years,isLoop){
		var dateTime = this._getTime(date);
		var day = 365;
		if(isLoop)day =366;
		var mintimes = years*day*60*60*1000*24;
		var rdate = dateTime + mintimes;
		return this._format(new Date(rdate));
	 },

	 /*某个日期加上某个日期，这样的操作视乎没什么意义*/
	 _plusDate : function(date1,date2){
		var dateTime = this._getTime(date1);
		var dateTime2 = this._getTime(date2);;
		var rdate = dateTime + dateTime2;
		return this._format(new Date(rdate));
	 },

	 /*某个日期减去多少毫秒秒*/
	 _minusMillisSeconds : function(date,millisSeconds){
		var dateTime = this._getTime(date);
		var mintimes = millisSeconds*1;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },
	 /*某个日期减去多少秒*/
	 _minusSeconds : function(date,seconds){
		var dateTime = this._getTime(date);
		var mintimes = seconds*1000;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },
	  /*某个日期减去多少分钟*/
	 _minusMinutes : function(date,minutes){
		var dateTime = this._getTime(date);
		var mintimes = minutes*60*1000;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },
	  /*某个日期减去小时数*/
	 _minusHours : function(date,hours){
		var dateTime = this._getTime(date);
		var mintimes = hours*60*60*1000;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },
	 /*某个日期减去天数*/
	 _minusDays : function(date,days){
		var dateTime = this._getTime(date);
		var mintimes = days*60*60*1000*24;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },

	 /*某个日期减去多少个月,这里是按照一个月30天来计算天数的*/
	 _minusMonths : function(date,months){
		var dateTime = this._getTime(date);
		var mintimes = months*30*60*60*1000*24;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },

	 /*某个日期减去多少个年,这里是按照一个月365天来计算天数的*/
	 _minusYears : function(date,years,isLoop){
		var dateTime = this._getTime(date);
		var day = 365;
		if(isLoop)day =366;
		var mintimes = years*day*60*60*1000*24;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },

	 /*某个日期减去某个日期，这样的操作视乎没什么意义*/
	 _minusDate : function(date1,date2){
		var dateTime = this._getTime(date1);
		var dateTime2 = this._getTime(date2);;
		var rdate = dateTime - dateTime2;
		return this._format(new Date(rdate));
	 },

	 /*获取一个月有多少天*/
	 _getMonthOfDay :function(date1){
		var currentMonth = this._getFirstDayOfMonth(date1);
		var nextMonth = this._getNextDayOfMonth(date1);
		return this._numDay(currentMonth,nextMonth);
	 },

	 /*获取一年又多少天*/
	 _getYearOfDay : function(date){
		var firstDayYear = this._getFirstDayOfYear(date);
		var lastDayYear = this._getLastDayOfYear(date);
		return Math.ceil(this._numDay(firstDayYear,lastDayYear));
	 },

	 /*某个日期是当年中的第几天*/
	 _getDayOfYear : function(date1){
		return Math.ceil(this._numDay(this._getFirstDayOfYear(date1),date1));	
	 },

	 /*某个日期是在当月中的第几天*/
	  _getDayOfMonth : function(date1){
		return Math.ceil(this._numDay(this._getFirstDayOfMonth(date1),date1));	
	 },

	 /*获取某个日期在这一年的第几周*/
	 _getDayOfYearWeek : function(date){
		var numdays = this._getDayOfYear(date);
		return Math.ceil(numdays / 7);
	 },

	  /*某个日期是在当月中的星期几*/
	  _getDayOfWeek : function(date1){
		return this._getWeek(date1);
	 },

	 /*获取在当前日期中的时间*/
	 _getHourOfDay : function(date){
		 return this._getHour(date);
	 },
	 _eq : function(date1,date2){
		 var stime = this._getTime(this._transferDate(date1));
		 var etime = this._getTime(this._transferDate(date2));
		 return stime == etime ? true :false; 
	 },
	 /*某个日期是否晚于某个日期*/
	 _after : function(date1,date2){
		 var stime = this._getTime(this._transferDate(date1));
		 var etime = this._getTime(this._transferDate(date2));
		 return  stime < etime ? true :false; 
	 },

	  /*某个日期是否早于某个日期*/
	 _before : function(date1,date2){
		 var stime = this._getTime(this._transferDate(date1));
		 var etime = this._getTime(this._transferDate(date2));
		 return  stime > etime ? true :false; 
	 },
	 
	 /*获取某年的第一天*/
	 _getFirstDayOfYear : function(date){
		var year = this._getYear(date);
		var dateString = year+"-01-01 00:00:00";
		return dateString;
	 },

	  /*获取某年的最后一天*/
	 _getLastDayOfYear : function(date){
		var year = this._getYear(date);
		var dateString = year+"-12-01 00:00:00";
		var endDay = this._getMonthOfDay(dateString);
		return year+"-12-"+endDay+" 23:59:59";
	 },

	  /*获取某月的第一天*/
	 _getFirstDayOfMonth: function(date){
		var year = this._getYear(date);
		var month = this._getMonth(date);
		var dateString = year +"-"+month+"-01 00:00:00";
		return dateString;
	 },

	 /*获取某月最后一天*/
	 _getLastDayOfMonth : function(date){
		var endDay = this._getMonthOfDay(date);
		var year = this._getYear(date);
		var month = this._getMonth(date);
		return year +"-"+month+"-"+endDay+" 23:59:59";
	 },
	 /*一天的开始时间*/
	 _getFirstOfDay : function(date){
		 var year = this._getYear(date);
		 var month = this._getMonth(date);
		 var day = this._getDay(date);
		 return year+"-"+month+"-"+day+" 00:00:00";
	 },

	 /*一天的结束时间*/
	 _getLastOfDay : function(date){
		 var year = this._getYear(date);
		 var month = this._getMonth(date);
		 var day = this._getDay(date);
		 return year+"-"+month+"-"+day+" 23:59:59";
	 },
	 
	 /*获取下个月的第一天*/
	 _getNextDayOfMonth: function(date){
		var year = this._getYear(date);
		var month = this._getMonth(date);
		month = month * 1 +1;
		if(month>12){
			year = year+1;
			month = month - 12;
		}
		month = month>9 ? month : "0"+month;
		var dateString = year +"-"+month+"-01 00:00:00";
		return dateString;
	 },

	 _getFirstOfWeek : function(date1){
		 var week = this._getWeek(date1);
		 var date = this._minusDays(date1,week);
		 var year = this._getYear(date);
		 var month = this._getMonth(date);
		 var day = this._getDay(date);
		 return year+"-"+month+"-"+day+" 00:00:00";
	 },
	 
	 _getLastOfWeek : function(date1){
		 var week = 6-this._getWeek(date1);
		 var date = this._minusDays(date1,week);
		 var year = this._getYear(date);
		 var month = this._getMonth(date);
		 var day = this._getDay(date);
		 return year+"-"+month+"-"+day+" 23:59:59";
	 },
	 
	 _getNow : function(){
		return new Date();	
	 },
	 _format : function(date){
		return this._getYear(date)+"-"+this._getMonth(date)+"-"+this._getDay(date)+" "+this._getHour(date)+":"+this._getMinute(date)+":"+this._getSecond(date);
	 },
	 _getDate :function(){
		 return this._getNow();
	 },
	 /*年*/
	 _getYear:function(date){
		 return this._transferDate(date).getFullYear();
	 },

	 /*月*/
	 _getMonth:function(date){
		 var month = this._transferDate(date).getMonth()+1;
		 return month>9 ? month : "0"+month;
	 },

	 /*日*/
	 _getDay:function(date){
		 var day = this._transferDate(date).getDate();
		 return day >9 ? day : "0"+day;
	 },

	  /*获取今天星期几,如果为0代表星期日*/
	 _getWeek : function(date){
		 return this._transferDate(date).getDay();
	 },

	 /*时*/
	 _getHour : function(date){
		 var hour = this._transferDate(date).getHours();
		 return hour >9 ? hour : "0"+hour;
	 },

	 /*12小时制时*/
	 _getHour12 : function(date){
		 var hour = this._transferDate(date).getHours();
		 return hour%12 == 0 ? 12 : hour % 12;
	 },

	 /*分*/
	 _getMinute : function(date){
		 var minutes = this._transferDate(date).getMinutes();
		 return minutes >9 ? minutes : "0"+minutes;
	 },

	 /*秒*/
	 _getSecond : function(date){
		var seconds = this._transferDate(date).getSeconds();
		return seconds >9 ? seconds : "0"+seconds;
	 },

	 /*毫秒*/
	 _getMillisecond : function(date){
		return this._transferDate(date).getMilliseconds();
	 },

	 /*获取今天在当年是第几季度*/
	 _getPeriod : function(date){
		var month = this._getMonth(date)*1;
		return  Math.floor((month+3)/3);
	 },

	 /*星期*/
	 _nowWeekChinies : function(date){
		var nowWeek = this._getWeek(date);
		var day = "";
		switch (nowWeek){
			case 0:day="日";break;
			  break;
			case 1:day="一";break;
			  break;
			case 2:day="二";break;
			  break;
			case 3:day="三";break;
			  break;
			case 4:day="四";break;
			  break;
			case 5:day="五";break;
			  break;
			case 6:day="六";break;
		 }
		 return day;
	 },
	 _getMessage : function(date){
		 var now = date||new Date();
		 var hour = now.getHours() ;
		 if(hour < 6){return "凌晨好！";} 
		 else if (hour < 9){return "早上好！";} 
		 else if (hour < 12){return "上午好！";} 
		 else if (hour < 14){return "中午好！";} 
		 else if (hour < 17){return "下午好！";} 
		 else if (hour < 19){return "傍晚好！";} 
		 else if (hour < 22){return "晚上好！";} 
		 else {return "夜里好！";} 
	 },
	 /*返回 1970 年 1 月 1 日至今的毫秒数。*/
	 _getTime : function(date){
		 return this._transferDate(date).getTime();
	 }
	};
	/*date end*/

})();