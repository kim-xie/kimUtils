//var jQuery = require('./js/jquery-1.11.2.min.js');
//;(function($){

	//require('./skin/kimUtils.css');

	//字符串去前后空格
	if(!String.prototype.trim){
		String.prototype.trim = function(){
			return  this.replace(/(^\s*)|(\s*$)/g,"");
		};
	};
	
	//字符串全部替换
	String.prototype.replaceAll = function(str,target){
		return this.replace(new RegExp(str,"ig"),target);
	};

	//空判断
	function isEmpty(val) {
		val = $.trim(val);
		if (val == null){
			return true;
		}
		if (val == undefined || val == 'undefined'){
			return true;
		}
		if (val == ""){
			return true;
		}
		if (val.length == 0){
			return true;
		}
		if (!/[^(^\s*)|(\s*$)]/.test(val)){
			return true;
		}
		return false;
	}
	
	//非空判断
	function isNotEmpty(val) {
		return !isEmpty(val);
	}

	//禁事件冒泡
	function stopBubble(e) {
		// 事件兼容
		e = e || window.event || arguments.callee.caller.arguments[0]; 
		if (e && e.stopPropagation){
			e.stopPropagation();
		}else{
			window.event.cancelBubble = true;
		}
	};

	//禁浏览器默认行为
	function stopDefault( e ) {
		e = e || window.event || arguments.callee.caller.arguments[0]; 
		if(e && e.preventDefault){
			e.preventDefault();
		}else{
			window.event.returnValue = false;
		}
		return false;
	}

	//浏览器回退
	function goback(){
		window.history.back();
	}

	//JS获取父路径
	function getParentPath(){
		var ParentPath = document.scripts;
		ParentPath = ParentPath[ParentPath.length-1].src.substring(0,ParentPath[ParentPath.length-1].src.lastIndexOf("/")+1);
		return ParentPath;
	}

	//js动态加载
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
	};

	//数组比较 返回新增和删除的元素
	function compareArray(arr1,arr2){
		var temp = []; 
		var temparrayRemoved = [];
		var temparrayAdd = [];
		for (var i = 0; i < arr2.length; i++) {
			temp[arr2[i]] = true;
		};
		for (var i = 0; i < arr1.length; i++) {
			if (!temp[arr1[i]]) {
				temparrayRemoved.push(arr1[i]); 
			} else {
				delete temp[arr1[i]]; 
			};
		};
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
	var positionUtil = {
		position : function($dom,amark){
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
		positionParent : function($dom,$parent,atop){
			var parentWidth = $parent.width();
			var parentHeight= $parent.height();
			var width = $dom.width();
			var height = $dom.height();
			var left = (parentWidth - width)/2;
			var top = (parentHeight - height)/2;
			$dom.css({left:left,top:top-(atop||0)});
			return this;
		},
		resize : function($dom){
			var $this = this;
			$(window).resize(function(){
				$this.position($dom);
			});
		},
		animates:function($dom,mark,callback){
			switch(mark){
				case "fadeOut":$dom.toggleClass(animateOut()).fadeOut("slow",function(){$(this).remove();if(callback)callback();});break;
				case "slideUp":$dom.toggleClass(animateOut()).slideUp("slow",function(){$(this).remove();if(callback)callback();});break;
				case "fadeIn":$dom.toggleClass(animateOut()).fadeIn("slow",function(){if(callback)callback();});break;
				case "slideDown":$dom.toggleClass(animateOut()).slideDown("slow",function(){if(callback)callback();});break;
				case "left":$dom.toggleClass(animateOut()).animate({left:0},300,function(){$(this).remove();if(callback)callback();});break;
				case "top":$dom.toggleClass(animateOut()).animate({top:0},300,function(){$(this).remove();if(callback)callback();});break;
			}
		},
		getRandomColor : function(){
		  return '#'+Math.floor(Math.random()*16777215).toString(16);
		}
	};

	//加载动画
	dynamicLoading.css("skin/kimUtils.css");

	//入动画
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

	//出动画
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
	 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
	 * Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
	 * Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
	 * Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
	 * Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
	 * Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	 */
	Date.prototype.format = function(fmt) {
		var o = {
			"Y+" : this.getFullYear(),
			"M+" : this.getMonth() + 1,// 月份
			"d+" : this.getDate(),// 日
			"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,// 小时
			"H+" : this.getHours(),// 小时
			"m+" : this.getMinutes(),// 分
			"s+" : this.getSeconds(),// 秒
			"q+" : Math.floor((this.getMonth() + 3) / 3),// 季度
			"S" : this.getMilliseconds()// 毫秒
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
			fmt = fmt.replace(RegExp.$1,((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f": "/u5468"): "")+ week[this.getDay() + ""]);
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
	 * @param {Object}  num 比如:1对应一 11：十一 101:一百零一
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
	    if (a.length > 1) // 加上小数部分(如果有小数部分)
	    {
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

	function getScrollHeight() {
		return Math.max(getClientHeight(), document.body.scrollHeight,
				document.documentElement.scrollHeight);
	}

	function getScrollTop() {
		var scrollTop = 0;
		if (document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if (document.body) {
			scrollTop = document.body.scrollTop;
		}
		return scrollTop;
	}

	//文件大小转换为MB GB KB格式
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

	/*获取文件后缀*/
	function getExt(fileName) {
		if (isNotEmpty(fileName) && fileName.lastIndexOf(".") == -1){return fileName;}
		var pos = fileName.lastIndexOf(".") + 1;
		return fileName.substring(pos, fileName.length).toLowerCase();
	}

	/* 获取文件名  */
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

	//身份证
	function isIdCard(val){
		var idCard = /^[1-9]d{5}(19d{2}|[2-9]d{3})((0d)|(1[0-2]))(([0|1|2]d)|3[0-1])(d{4}|d{3}X)$/i;
		if(idCard.test(val)){
			return true;
		}
	}
	//邮箱
	function isEmail(val){
		var email = /^\w+\@[A-Za-z0-9]+\.[A-Za-z]{2,4}$/i;
		if(email.test(val)){
			return true;
		}
	}
	//电话
	function isPhone(val){
		var phone = /^1[3458]{1}[0-9]{9}$/;
		if(phone.test(val)){
			return true;
		}
	}

	//随机数范围
	function randomRange(start,end){
		return Math.floor(Math.random()*(end-start+1))+start;
	};
	//随机数
	function randomNum(num){
		return Math.floor(Math.random()*(num+1));
	};
	//随机色
	function randomColor(){
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);
		return "rgb("+r+","+g+","+b+")";
	};
	//16进制随机色
	function randomColor16(){
		var r = Math.random(255).toString(16);
		var g = Math.random(255).toString(16);
		var b = Math.random(255).toString(16);
		if(r.length<2)r = "0"+r;
		if(g.length<2)g = "0"+g;
		if(b.length<2)b = "0"+b;
		return "#"+r+g+b;
	};

	//获取dom索引
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

	//获取样式
	function getStyle(dom,attr){
		return window.getComputedStyle ? window.getComputedStyle(dom,false)[attr]:dom.currentStyle[attr];
	};

	//混入
	function mixin(obj,obj2){
		for(var k in obj2){
			if(obj2.hasOwnProperty(k)){
				obj[k] = obj2[k];
			}
		}
		return obj;
	};

	//简单混入
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

	//获取鼠标位置
	function getXY(e){
		var ev = e || window.event || arguments.callee.caller.arguments[0];
		var x=0,y=0;
		if(ev.pageX){
			x = ev.pageX;
			y = ev.pageY;
		}else{
			var sleft = 0,stop = 0;
			//ie678---
			if(document.documentElement){
				stop =document.documentElement.scrollTop;
				sleft = document.documentElement.scrollLeft;
			}else{
			//ie9+ 
				stop = document.body.scrollTop;
				sleft = document.body.scrollLeft;
			}
			x = ev.clientX + sleft;
			y = ev.clientY + stop;
		}
		return {x:x,y:y};
	};

	//json对象转字符串
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

	/*禁止窗口选中*/
	function forbiddenSelect() {
		$(document).bind("selectstart", function() {
			return false;
		});
		document.onselectstart = new Function("event.returnValue=false;");
		$("*").css({
			"-moz-user-select" : "none"
		});
	}

	/* 自动选中  */
	function autoSelect() {
		$(document).bind("selectstart", function() {
			return true;
		});
		document.onselectstart = new Function("event.returnValue=true;");
		$("*").css({
			"-moz-user-select" : ""
		});
	};

	//下一个dom元素
	function next(obj){
		return obj.nextSibling.nodeType == 1 ? obj.nextSibling : next(obj.nextSibling);
	};
	//上一个dom元素
	function pre(obj){
		return obj.previousSibling.nodeType == 1 ? obj.previousSibling : pre(obj.previousSibling);
	};
	//第一个dom元素
	function first(obj){
		return obj.firstChild.nodeType == 1 ? obj.firstChild : next(obj.firstChild);
	};
	//最后一个dom元素
	function last(obj){
		return obj.lastChild.nodeType == 1 ? obj.lastChild : pre(obj.lastChild);
	};

	/*ͨ获取domclassName*/
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
	dateUtil = {
	 /*转换日期*/
	 transferDate : function(date){
		if(typeof date =="string"){
			return new Date(date.replace(/-/ig,"/").replace("T"," "));
		}else{
			return date;
		}
	 },
	 /*格式化日期*/
	 toString : function(date,pattern){
		var d = this.transferDate(date);
		return d.format(pattern);
	 },
	 /*获取两个时间相减的时间*/
	 Date : function(date1,date2){
		var dateTime = this.numMillSecond(date1,date2);
		return new Date(dateTime).format("yyyy-MM-dd");
	 },
	 //获取两个时间相减的年份
	 Datsyear : function(date1,date2){
		 var dateTime = this.numYear(date1,date2);
		 return  dateTime;
	 },
	 //获取两个时间相减的月份
	 datsmonth : function(date1,date2){
		 var dateTime = this.numMonth(date2,date1);
		 return  dateTime;
	 },
	 //间隔年份
	 numYear : function(date1,date2){
		var times = this.numDay(date1,date2);
		return  Math.floor(times/365);
	 },
	 //间隔月份
	 numMonth : function(date1,date2){
		var times = this.numDay(date1,date2);
		return  Math.floor(times/30);
	 },
	 //间隔天数
	 numDay : function(date1,date2){
		var times = this.numSecond(date1,date2);
		var hour = this.obj().hour;
		var mills = this.obj().mills;
		return Math.ceil(times/(mills * hour));
	 },
	 //间隔时
	 numHour : function(date1,date2){
		return Math.floor(this.numMillSecond(date1,date2)/(1000*60*60));
	 },
	 //间隔分
	 numMinute : function(date1,date2){
		return Math.floor(this.numMillSecond(date1,date2)/(1000*60));
	 },
	 //间隔秒数
	 numSecond : function(date1,date2){
		 return Math.floor(this.numMillSecond(date1,date2) / 1000);
	 },
	 //间隔毫秒
	 numMillSecond : function(date1,date2){
		var stimes = this.getTime(this.transferDate(date1));
		var etimes = this.getTime(this.transferDate(date2));
		return etimes - stimes;
	 },
	 obj : function(){
		return {hour:24,second:60,mills:3600,format:"yyyy-MM-dd",dateFormat:"yyyy-MM-dd HH:mm:ss"};
	 },
	/*某个日期加上多少毫秒*/
	 plusMillisSeconds : function(date,millisSeconds){
		var dateTime = this.getTime(date);
		var mintimes = millisSeconds;
		var rdate = dateTime*1 + mintimes*1;
		return this.format(new Date(rdate));
	 },
	 /*某个日期加上多少秒*/
	 plusSeconds : function(date,seconds){
		var dateTime = this.getTime(date);
		var mintimes = seconds*1000;
		var rdate = dateTime*1 + mintimes*1;
		return this.format(new Date(rdate));
	 },
	  /*某个日期加上多少分钟*/
	 plusMinutes : function(date,minutes){
		var dateTime = this.getTime(date);
		var mintimes = minutes*60*1000;
		var rdate = dateTime*1 + mintimes*1;
		return this.format(new Date(rdate));
	 },
	  /*某个日期加上小时数*/
	 plusHours : function(date,hours){
		var dateTime = this.getTime(date);
		var mintimes = hours*60*60*1000;
		var rdate = dateTime + mintimes;
		return this.format(new Date(rdate));
	 },
	 /*某个日期加上天数*/
	 plusDays : function(date,days){
		var dateTime = this.getTime(date);
		var mintimes = days*60*60*1000*24;
		var rdate = dateTime*1 + mintimes*1;
		return this.format(new Date(rdate));
	 },
	 /*某个日期加上多少个月,这里是按照一个月30天来计算天数的*/
	 plusMonths : function(date,months){
		var dateTime = this.getTime(date);
		var mintimes = months*30*60*60*1000*24;
		var rdate = dateTime + mintimes*1;
		return this.format(new Date(rdate));
	 },
	 /*某个日期加上多少个年,这里是按照一个月365天来计算天数的，如果loop为true则按闰年计算*/
	 plusYears : function(date,years,isLoop){
		var dateTime = this.getTime(date);
		var day = 365;
		if(isLoop)day =366;
		var mintimes = years*day*60*60*1000*24;
		var rdate = dateTime + mintimes;
		return this.format(new Date(rdate));
	 },
	 /*某个日期加上某个日期，这样的操作视乎没什么意义*/
	 plusDate : function(date1,date2){
		var dateTime = this.getTime(date1);
		var dateTime2 = this.getTime(date2);;
		var rdate = dateTime + dateTime2;
		return this.format(new Date(rdate));
	 },
	 /*某个日期减去多少毫秒秒*/
	 minusMillisSeconds : function(date,millisSeconds){
		var dateTime = this.getTime(date);
		var mintimes = millisSeconds*1;
		var rdate = dateTime - mintimes;
		return this.format(new Date(rdate));
	 },
	 /*某个日期减去多少秒*/
	 minusSeconds : function(date,seconds){
		var dateTime = this.getTime(date);
		var mintimes = seconds*1000;
		var rdate = dateTime - mintimes;
		return this.format(new Date(rdate));
	 },
	  /*某个日期减去多少分钟*/
	 minusMinutes : function(date,minutes){
		var dateTime = this.getTime(date);
		var mintimes = minutes*60*1000;
		var rdate = dateTime - mintimes;
		return this.format(new Date(rdate));
	 },
	  /*某个日期减去小时数*/
	 minusHours : function(date,hours){
		var dateTime = this.getTime(date);
		var mintimes = hours*60*60*1000;
		var rdate = dateTime - mintimes;
		return this.format(new Date(rdate));
	 },
	 /*某个日期减去天数*/
	 minusDays : function(date,days){
		var dateTime = this.getTime(date);
		var mintimes = days*60*60*1000*24;
		var rdate = dateTime - mintimes;
		return this.format(new Date(rdate));
	 },
	 /*某个日期减去多少个月,这里是按照一个月30天来计算天数的*/
	 minusMonths : function(date,months){
		var dateTime = this.getTime(date);
		var mintimes = months*30*60*60*1000*24;
		var rdate = dateTime - mintimes;
		return this.format(new Date(rdate));
	 },
	 /*某个日期减去多少个年,这里是按照一个月365天来计算天数的*/
	 minusYears : function(date,years,isLoop){
		var dateTime = this.getTime(date);
		var day = 365;
		if(isLoop)day =366;
		var mintimes = years*day*60*60*1000*24;
		var rdate = dateTime - mintimes;
		return this.format(new Date(rdate));
	 },
	 /*某个日期减去某个日期，这样的操作视乎没什么意义*/
	 minusDate : function(date1,date2){
		var dateTime = this.getTime(date1);
		var dateTime2 = this.getTime(date2);;
		var rdate = dateTime - dateTime2;
		return this.format(new Date(rdate));
	 },
	 /*获取一个月有多少天*/
	 getMonthOfDay :function(date1){
		var currentMonth = this.getFirstDayOfMonth(date1);
		var nextMonth = this.getNextDayOfMonth(date1);
		return this.numDay(currentMonth,nextMonth);
	 },
	 /*获取一年又多少天*/
	 getYearOfDay : function(date){
		var firstDayYear = this.getFirstDayOfYear(date);
		var lastDayYear = this.getLastDayOfYear(date);
		return Math.ceil(this.numDay(firstDayYear,lastDayYear));
	 },
	 /*某个日期是当年中的第几天*/
	 getDayOfYear : function(date1){
		return Math.ceil(this.numDay(this.getFirstDayOfYear(date1),date1));	
	 },
	 /*某个日期是在当月中的第几天*/
	  getDayOfMonth : function(date1){
		return Math.ceil(this.numDay(this.getFirstDayOfMonth(date1),date1));	
	 },
	 /*获取某个日期在这一年的第几周*/
	 getDayOfYearWeek : function(date){
		var numdays = this.getDayOfYear(date);
		return Math.ceil(numdays / 7);
	 },
	  /*某个日期是在当月中的星期几*/
	  getDayOfWeek : function(date1){
		return this.getWeek(date1);
	 },
	 /*获取在当前日期中的时间*/
	 getHourOfDay : function(date){
		 return this.getHour(date);
	 },
	 eq : function(date1,date2){
		 var stime = this.getTime(this.transferDate(date1));
		 var etime = this.getTime(this.transferDate(date2));
		 return stime == etime ? true :false; 
	 },
	 /*某个日期是否晚于某个日期*/
	 after : function(date1,date2){
		 var stime = this.getTime(this.transferDate(date1));
		 var etime = this.getTime(this.transferDate(date2));
		 return  stime < etime ? true :false; 
	 },
	 /*某个日期是否早于某个日期*/
	 before : function(date1,date2){
		 var stime = this.getTime(this.transferDate(date1));
		 var etime = this.getTime(this.transferDate(date2));
		 return  stime > etime ? true :false; 
	 },
	 /*获取某年的第一天*/
	 getFirstDayOfYear : function(date){
		var year = this.getYear(date);
		var dateString = year+"-01-01 00:00:00";
		return dateString;
	 },
	  /*获取某年的最后一天*/
	 getLastDayOfYear : function(date){
		var year = this.getYear(date);
		var dateString = year+"-12-01 00:00:00";
		var endDay = this.getMonthOfDay(dateString);
		return year+"-12-"+endDay+" 23:59:59";
	 },
	  /*获取某月的第一天*/
	 getFirstDayOfMonth: function(date){
		var year = this.getYear(date);
		var month = this.getMonth(date);
		var dateString = year +"-"+month+"-01 00:00:00";
		return dateString;
	 },
	 /*获取某月最后一天*/
	 getLastDayOfMonth : function(date){
		var endDay = this.getMonthOfDay(date);
		var year = this.getYear(date);
		var month = this.getMonth(date);
		return year +"-"+month+"-"+endDay+" 23:59:59";
	 },
	 /*一天的开始时间*/
	 getFirstOfDay : function(date){
		 var year = this.getYear(date);
		 var month = this.getMonth(date);
		 var day = this.getDay(date);
		 return year+"-"+month+"-"+day+" 00:00:00";
	 },
	 /*一天的结束时间*/
	 getLastOfDay : function(date){
		 var year = this.getYear(date);
		 var month = this.getMonth(date);
		 var day = this.getDay(date);
		 return year+"-"+month+"-"+day+" 23:59:59";
	 },
	 /*获取下个月的第一天*/
	 getNextDayOfMonth: function(date){
		var year = this.getYear(date);
		var month = this.getMonth(date);
		month = month * 1 +1;
		if(month>12){
			year = year+1;
			month = month - 12;
		}
		month = month>9 ? month : "0"+month;
		var dateString = year +"-"+month+"-01 00:00:00";
		return dateString;
	 },
	 getFirstOfWeek : function(date1){
		 var week = this.getWeek(date1);
		 var date = this.minusDays(date1,week);
		 var year = this.getYear(date);
		 var month = this.getMonth(date);
		 var day = this.getDay(date);
		 return year+"-"+month+"-"+day+" 00:00:00";
	 },
	 getLastOfWeek : function(date1){
		 var week = 6-this.getWeek(date1);
		 var date = this.minusDays(date1,week);
		 var year = this.getYear(date);
		 var month = this.getMonth(date);
		 var day = this.getDay(date);
		 return year+"-"+month+"-"+day+" 23:59:59";
	 },
	 //获取当前时间
	 getNow : function(){
		return new Date();	
	 },
	 format : function(date){
		return this.getYear(date)+"-"+this.getMonth(date)+"-"+this.getDay(date)+" "+this.getHour(date)+":"+this.getMinute(date)+":"+this.getSecond(date);
	 },
	 getDate :function(){
		 return this.getNow();
	 },
	 /*年*/
	 getYear:function(date){
		 return this.transferDate(date).getFullYear();
	 },
	 /*月*/
	 getMonth:function(date){
		 var month = this.transferDate(date).getMonth()+1;
		 return month>9 ? month : "0"+month;
	 },
	 /*日*/
	 getDay:function(date){
		 var day = this.transferDate(date).getDate();
		 return day >9 ? day : "0"+day;
	 },
	 /*获取今天星期几,如果为0代表星期日*/
	 getWeek : function(date){
		 return this.transferDate(date).getDay();
	 },
	 /*时*/
	 getHour : function(date){
		 var hour = this.transferDate(date).getHours();
		 return hour >9 ? hour : "0"+hour;
	 },
	 /*12小时制时*/
	 getHour12 : function(date){
		 var hour = this.transferDate(date).getHours();
		 return hour%12 == 0 ? 12 : hour % 12;
	 },
	 /*分*/
	 getMinute : function(date){
		 var minutes = this.transferDate(date).getMinutes();
		 return minutes >9 ? minutes : "0"+minutes;
	 },
	 /*秒*/
	 getSecond : function(date){
		var seconds = this.transferDate(date).getSeconds();
		return seconds >9 ? seconds : "0"+seconds;
	 },
	 /*毫秒*/
	 getMillisecond : function(date){
		return this.transferDate(date).getMilliseconds();
	 },
	 /*获取今天在当年是第几季度*/
	 getPeriod : function(date){
		var month = this.getMonth(date)*1;
		return  Math.floor((month+3)/3);
	 },
	 /*type*/
	 nowWeekChinies : function(date,type){
		var nowWeek = this.getWeek(this.transferDate(date));
		if(!type){
			type = "星期";
		}
		var day = type;
		switch (nowWeek){
			case 0:day+="日";break;
			  break;
			case 1:day+="一";break;
			  break;
			case 2:day+="二";break;
			  break;
			case 3:day+="三";break;
			  break;
			case 4:day+="四";break;
			  break;
			case 5:day+="五";break;
			  break;
			case 6:day+="六";break;
		 }
		 return day;
	 },
	 getMessage : function(date){
		 var now = this.transferDate(date)||new Date();
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
	 getDayOrNight : function(date){
		 var now = this.transferDate(date)||new Date();
		 var hour = now.getHours() ;
		 if(hour < 19 && hour > 6){return "day";} else {return "night";} 
	 },
	 /*返回 1970 年 1 月 1 日至今的毫秒数。*/
	 getTime : function(date){
		 return this.transferDate(date).getTime();
	 }
	};
	
	/*cookie*/
	cookieUtil = {
		setCookie : function(name, value,time,option){
		    var str=name+'='+escape(value); 
		    var date = new Date();
		    date.setTime(date.getTime()+this.getCookieTime(time)); 
		    str += "; expires=" + date.toGMTString();
		    if(option){ 
		        if(option.path) str+='; path='+option.path; 
		        if(option.domain) str+='; domain='+option.domain; 
		        if(option.secure) str+='; true'; 
		    } 
		    document.cookie=str; 
		},
		getCookie : function(name){
			var arr = document.cookie.split('; '); 
		    if(arr.length==0) return ''; 
		    for(var i=0; i <arr.length; i++){ 
		        tmp = arr[i].split('='); 
		        if(tmp[0]==name) return unescape(tmp[1]); 
		    } 
		    return ''; 
		},
		delCookie : function(name){
			$.tmCookie.setCookie(name,'',-1); 
			var date=new Date();
	        date.setTime(date.getTime()-10000);
			document.cookie=name+"=; expires="+date.toGMTString()+"; path=/";
		},
		getCookieTime : function(time){
		   if(time<=0)return time;
		   var str1=time.substring(1,time.length)*1;
		   var str2=time.substring(0,1);
		   if (str2=="s"){
		        return str1*1000;
		   }
		   else if (str2=="m"){
		       return str1*60*1000;
		   }
		   else if (str2=="h"){
			   return str1*60*60*1000;
		   }
		   else if (str2=="d"){
		       return str1*24*60*60*1000;
		   }
		}
	};

	/*手机*/
	function is_cellphoneNum(str){
	    var regExp = /^(\+86)?(13|18|15)\d{9}(?!\d)$/;
	    return regExp.test(str);
	}

	 /*邮件格式*/ 
	function is_email(str){ 
	    var regExp = /^([\w\.])+@\w+\.([\w\.])+$/;
	    return regExp.test(str);
	}
	
	//字符震动效果
	function shakeCharacter(id){
		var boxDom = document.getElementById(id);
		if(!boxDom)return;
		var text = boxDom.innerText||boxDom.textContent;
		var html = "";
		for(var i=0;i<text.length;i++){
			html += "<span>"+text.charAt(i)+"</span>";
		}
		boxDom.innerHTML = html;
		var arr = [];
		var spanDoms = boxDom.children;
		for(var i=0;i<spanDoms.length;i++){
			spanDoms[i].style.left = spanDoms[i].offsetLeft+"px";
			spanDoms[i].style.top = spanDoms[i].offsetTop+"px";
			arr.push({left:spanDoms[i].offsetLeft,top:spanDoms[i].offsetTop});
		}
		for(var i=0;i<spanDoms.length;i++){
			spanDoms[i].style.position = "absolute";
			spanDoms[i].style.left = "-100px";
		}
		function right(){
			var index = 1; 
			var speed = 0;
			var timer = null;
			timer = setInterval(function(){
					if(index==(arr.length+1)){
						clearInterval(timer);
						index = 0;
						left();
						//down();
					}else{
						speed = (arr[arr.length-index].left - spanDoms[arr.length-index].offsetLeft)*0.752; 
						speed = speed > 0  ? Math.ceil(speed) : Math.floor(speed);
						spanDoms[arr.length-index].style.left = spanDoms[arr.length-index].offsetLeft + speed+"px";
						if(speed == 0){
							index++;
						}
					}
			},30);
		}
		function left(){
			var index = 0; 
			var speed = 10;
			var timer = null;
			timer = setInterval(function(){
				if(index==arr.length){
					clearInterval(timer);
					index = 1;
					right();
				}else{
					var icur = (spanDoms[index].offsetLeft - speed);
					speed *= 1.015;
					spanDoms[index].style.left = icur+"px"; 
					if(icur<=0){
						spanDoms[index].style.left = "-100px"; 
						index++;
					}
				}
			},30);
		}
		function down(){
			var index = 0; 
			var speed = 10;
			var timer = null;
			timer = setInterval(function(){
				if(index==arr.length){
					clearInterval(timer);
					index = 1;
				}else{
					var icur = spanDoms[index].offsetTop -speed;
					speed +=1;
					spanDoms[index].style.top = icur+"px"; 
					if(icur<=-1000){
						index++;
					}
				}
			},30);
		}
		right();
	}

	function numberKey($this, e) {
	    var range = $this.attr("range");
	    var val = $this.val();
	    if (isNotEmpty(range)) {
	        var ranges = range.split("_");
	        var max = ranges[1] * 1,
	        min = ranges[0] * 1;
	        if (val <= min) $this.val(min);
	        if (val >= max) $this.val(max);
	    }
	    var d = $this.attr("def");
	    if(isEmpty(val)){
	    	$this.val(d);
	    }
	    if (!e) e = window.event;
	    var code = e.keyCode | e.which | e.charCode;
	    if (code >= 48 && code <= 57 || code >= 96 && code <= 105 || code == 9) return true; // 数字
	    switch (code) {
	    case 8:
	        // 退格
	    case 37:
	    case 38:
	    case 39:
	    case 40:
	        // 方向键
	    case 13:
	        // 回车
	    case 46:
	        // 删除
	    case 45:
	    case 110:
	        return true;
	    }
	    return false;
	};

	/* 获取浏览器的版本 */
	function getBroswerVersion() {
	    var Sys = {};
	    var ua = navigator.userAgent.toLowerCase();
	    if (ua) {
	        window.ActiveXObject ? Sys.version = "ie_" + ua.match(/msie ([\d]+)/)[1] : document.getBoxObjectFor ? Sys.version = "firefox_" + ua.match(/firefox\/([\d.]+)/)[1] : window.MessageEvent && !document.getBoxObjectFor ? Sys.version = "chrome": window.opera ? Sys.version = "opera_" + ua.match(/opera.([\d.]+)/)[1] : window.openDatabase ? Sys.version = ua.match(/version\/([\d.]+)/)[1] : 0;
	    }
	    return Sys;
	}

	/*自定义封装ajax*/
	var ajaxUtil= {
		request : function(options,dataJson){
			var opts = $.extend({},{type:"post",limit:true,timer:null,before:function(){
			},error:function(){
				
			},callback:function(data){
				
			}},options);
			var _url = opts.url;
			if(isEmpty(_url)){
				_url = basePath+"/"+opts.model+"/"+opts.method;
			}
			if(isNotEmpty(opts.params)){
				_url+="&"+opts.params;
			}
			
			clearTimeout(opts.timer);
			opts.timer = setTimeout(function(){
				ajaxUtil.ajaxMain(opts,_url,dataJson);
			},200);
		},
		ajaxMain: function(opts,_url,dataJson){
			$.ajax({
				type: opts.type || "post",
				data : dataJson,
				url : _url,
				beforeSend:function(){opts.before();},
				error:function(){
					loading("抱歉！因为操作不能够及时响应，请稍后在试...",1);
					opts.error();
					clearTimeout(opts.timer);
				},
				success:function(data){
					clearTimeout(opts.timer);
					if(data=="logout"){
						tzLogin.login();
					}else if(data=="nopermission"){
						loading("非常抱歉,您没有权限...",4);
					}else{
						if(opts.callback)opts.callback(data);
					}
				}
			});
		}
	};
	
	//获取iddom对象
	function dom(id){
		return document.getElementById(id);
	};

	//在后面追加
	function appendAfter(oParent,obj1,obj2){
		if(obj2==last(oParent)){
			return oParent.appendChild(obj1);
		}else{
			return oParent.insertBefore(obj1,next(obj2));
		}
	};

	//遍历
	function kimeach(doms,callback){
		var domArr = Array.prototype.slice.call(doms);
		domArr.forEach(function(obj,index){
			if(callback)callback.call(obj,index);
		});
	};

	function getSelectHtml(win){ 
		  if (win.getSelection) { 
			 var range=win.getSelection().getRangeAt(0); 
			 var container = win.document.createElement('div'); 
			 container.appendChild(range.cloneContents()); 
			 return container.innerHTML; 
		  }else if (win.document.getSelection) { 
			 var range=win.getSelection().getRangeAt(0); 
			 var container = win.document.createElement('div'); 
			 container.appendChild(range.cloneContents()); 
			 return container.innerHTML; 
		  } else if (win.document.selection) { 
			  return win.document.selection.createRange().htmlText; 
		  } 
	} 

	(function() {
	    var lastTime = 0;
	    var vendors = ['webkit', 'moz'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
	                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
	    }
	    if (!window.requestAnimationFrame) {
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
	            var id = window.setTimeout(function() {
	                callback(currTime + timeToCall);
	            }, timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	    }
	    if (!window.cancelAnimationFrame) {
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	    }
	}());

	/*时间运动版本动画*/
	(function(win){
		//t:时间变量
		//b:起始值
		//c:要变化的总量 target - b;
		//d:总时长
		/*
		Linear：无缓动效果
		Quadratic：二次方的缓动（t^2）
		Cubic：三次方的缓动（t^3）
		Quartic：四次方的缓动（t^4）
		Quintic：五次方的缓动（t^5）
		Sinusoidal：正弦曲线的缓动（sin(t)）
		Exponential：指数曲线的缓动（2^t）
		Circular：圆形曲线的缓动（sqrt(1-t^2)）
		Elastic：指数衰减的正弦曲线缓动
		超过范围的三次方缓动（(s+1)*t^3 – s*t^2）
		指数衰减的反弹缓动
		每个效果都分三个缓动方式，分别是（可采用后面的邪恶记忆法帮助记忆）：
		easeIn：从0开始加速的缓动，想象OOXX进去，探路要花时间，因此肯定是先慢后快的；
		easeOut：减速到0的缓动，想象OOXX出来，肯定定先快后慢的，以防掉出来；
		easeInOut：前半段从0开始加速，后半段减速到0的缓动，想象OOXX进进出出，先慢后快然后再慢。
		*/
		var Tween = {
			linear: function (t, b, c, d) {
				return c * t / d + b;
			},
			quadIn: function (t, b, c, d) {

				return c * (t /= d) * t + b;
			},
			quadOut: function (t, b, c, d) {

				return -c * (t /= d) * (t - 2) + b;
			},
			quadInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) {
					return c / 2 * t * t + b;
				}
				return -c / 2 * ((--t) * (t - 2) - 1) + b;
			},
			cubicIn: function (t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			cubicOut: function (t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			cubicInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) {
					return c / 2 * t * t * t + b;
				}
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			},
			// Copy of cubic
			easeIn: function (t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeOut: function (t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) {
					return c / 2 * t * t * t + b;
				}
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			},
			// End copy
			quartIn: function (t, b, c, d) {
				return c * (t /= d) * t * t * t + b;
			},
			quartOut: function (t, b, c, d) {
				return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			},
			quartInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) {
					return c / 2 * t * t * t * t + b;
				}
				return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
			},
			quintIn: function (t, b, c, d) {
				return c * (t /= d) * t * t * t * t + b;
			},
			quintOut: function (t, b, c, d) {
				return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			},
			quintInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) {
					return c / 2 * t * t * t * t * t + b;
				}
				return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
			},
			sineIn: function (t, b, c, d) {
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			},
			sineOut: function (t, b, c, d) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
			},
			sineInOut: function (t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			},
			expoIn: function (t, b, c, d) {
				return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
			},
			expoOut: function (t, b, c, d) {
				return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
			},
			expoInOut: function (t, b, c, d) {
				if (t === 0) { return b; }
				if (t === d) { return b + c; }
				if ((t /= d / 2) < 1) {
					return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				}
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			},
			circIn: function (t, b, c, d) {
				return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			},
			circOut: function (t, b, c, d) {
				return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
			},
			circInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) {
					return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				}
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			},
			bounceIn: function (t, b, c, d) {
				return c - this.bounceOut(d - t, 0, c, d) + b;
			},
			bounceOut: function (t, b, c, d) {
				if ((t /= d) < (1 / 2.75)) {
					return c * (7.5625 * t * t) + b;
				} else
				if (t < (2 / 2.75)) {
					return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
				} else
				if (t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
				} else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
				}
			},
			bounceInOut: function (t, b, c, d) {
				if (t < d / 2) {
					return this.bounceIn(t * 2, 0, c, d) * 0.5 + b;
				}
				return this.bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
			},
			elasticIn: function (t, b, c, d, a, p) {
				if (t === 0) { return b; }
				if ((t /= d) === 1) {
					return b + c;
				}
				if (!p) {
					p = d * 0.3;
				}
				if (!a) {
					a = 1;
				}
				var s = 0;
				if (a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			},
			elasticOut: function (t, b, c, d, a, p) {
				if (t === 0) {
					return b;
				}
				if ((t /= d) === 1) {
					return b + c;
				}
				if (!p) {
					p = d * 0.3;
				}
				if (!a) {
					a = 1;
				}
				var s = 0;
				if (a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
			},
			elasticInOut: function (t, b, c, d, a, p) {
				if (t === 0) {
					return b;
				}
				if ((t /= d / 2) === 2) {
					return b + c;
				}
				if (!p) {
					p = d * (0.3 * 1.5);
				}
				if (!a) {
					a = 1;
				}
				var s = 0;
				if (a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				if (t < 1) {
					return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				}
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
			}
		};
		//时间版本
		function animate(dom,json){
			var args = arguments;
			var times = typeof args[2]!="number"?400:args[2];
			var fx = typeof args[2]=="string"?args[2]:(typeof args[3]!="string" ?"linear":args[3]);
			var fn = typeof args[args.length-1]!="function"?null:args[args.length-1];
			//目标初始值 
			var target = {};
			for(var attr in json){
				if(attr.toLowerCase()=="opacity"){
					target[attr] = Math.round(getStyle(dom,attr))||1;//获取初始值
				}else{
					target[attr] = parseInt(getStyle(dom,attr)) || 0;//获取初始值
				}
			};
			var btime = new Date;
			if(dom.timer)clearInterval(dom.timer);	
			dom.timer = setInterval(function(){
				var t = (new Date - btime)/times;
				if(t>=1){
					if(dom.timer)clearInterval(dom.timer);
					for(var attr in json){
						if(attr.toLowerCase()=="opacity"){
							dom.style.opacity = json[attr];
							dom.style.filter = "alpha(opacity="+(json[attr]*100)+")";
						}else{
							dom.style[attr] = json[attr]+"px";
						}
					}
					if(fn)fn.call(dom,json);
				}else{
					for(var attr in json){
						var b = target[attr];//起始值
						var c = json[attr]-b;
						var d = times;
						var value = Tween[fx](t*times,b,c,d);
						if(attr.toLowerCase()=="opacity"){
							dom.style.opacity = (value / 100)*100;//0.666678
							dom.style.filter = "alpha(opacity="+value+")";
						}else{
							dom.style[attr] = value+"px";
						}
					}
				}
			},17);
		};
		win.kekeAnimate = animate; 
	})(window);
	
	(function () {
		//定义一些默认参数
		var _options = {
			ZH: {
				dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
				shortDayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
				monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
				shortMonthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
			},
			US: {
				dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				shortDayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				shortMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			}
		}
		//定义一些api
		var date_format_api = {

			/**
			 * 格式化时间
			 * @param date
			 * @param fmt
			 * @returns {*}
			 */
			format: function (date, fmt) {
				var o = {
					'M+': date.getMonth() + 1, //月份
					'd+': date.getDate(), //日
					'h+': date.getHours(), //小时
					'm+': date.getMinutes(), //分
					's+': date.getSeconds(), //秒
					'q+': Math.floor((date.getMonth() + 3) / 3), //季度
					'S': date.getMilliseconds() //毫秒
				};
				if(!this.isNotEmpty(fmt)){
					fmt = 'yyyy-MM-dd hh:mm:ss';
				}
				if (/(y+)/.test(fmt)) {
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
				}
				for (var k in o) {
					if (new RegExp('(' + k + ')').test(fmt)) {
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
					}
				}
				return fmt;
			},

			formatToDate: function (dateStr) {
				if(this.isNotEmpty(dateStr) ){
					return new Date(Date.parse(dateStr.replace(/-/g,   "/")));
				}
				return '';
			},

			/**
			 * 得到一天的开始 date类型
			 * @param date
			 */
			getDateStart: function (date) {
				var fmt = 'yyyy-MM-dd';
				var dateStartStr = this.getDateStartStr(date, fmt);
				var startTime = new Date(Date.parse(dateStartStr));
				return startTime;
			},

			/**
			 * 得到一天的开始 str 类型
			 * @param date
			 */
			getDateStartStr: function (date, fmt) {
				if (typeof fmt == 'undefined') {
					fmt = 'yyyy-MM-dd';
				}
				var dateStr = this.format(date, fmt);
				dateStr += ' 00:00:00';
				return dateStr;
			},

			/**
			 * 得到一天的结束 date类型
			 * @param date
			 */
			getDateEnd: function (date) {
				var fmt = 'yyyy-MM-dd';
				var dateEndStr = this.getDateEndStr(date, fmt);
				var endTime = new Date(Date.parse(dateEndStr));
				return endTime;
			},

			/**
			 * 得到一天的结束 str 类型
			 * @param date
			 */
			getDateEndStr: function (date, fmt) {
				if (typeof fmt == 'undefined') {
					fmt = 'yyyy-MM-dd';
				}
				var endStr = this.format(date, fmt);
				endStr += ' 23:59:59';
				return endStr;
			},

			/**
			 * 两个时间比较大小
			 * @param d1
			 * @param d2
			 */
			compareDate: function (d1, d2) {
				if (d1 && d2) {
					if (d1.getTime() > d2.getTime()) {
						return 1;
					} else if (d1.getTime() == d2.getTime()) {
						return 0;
					} else if (d1.getTime() < d2.getTime()) {
						return -1;
					}
				}
			},
			/**
			 * 得到星期几, 支持中英
			 * @param date
			 * @param type
			 * @returns {string}
			 */
			getWeek: function (date, type) {
				if (date) {
					if (!this.isNotEmpty(type)) {
						type = 0;
					}
					var index = date.getDay();
					var dateStr = '';
					switch (type) {
						case this.WEEKTYPE.ZH_DAYNAME:
							dateStr = _options.ZH.dayNames[index];
							break;
						case this.WEEKTYPE.ZH_SDAYNAME:
							dateStr = _options.ZH.shortDayNames[index];
							break;
						case this.WEEKTYPE.US_DAYNAME:
							dateStr = _options.US.dayNames[index];
							break;
						case this.WEEKTYPE.US_SDAYNAME:
							dateStr = _options.US.shortDayNames[index];
							break;
					}
					return dateStr;
				}
			},
			/**
			 * 是否为闰年
			 * @param date
			 * @returns {boolean}
			 */
			isLeapYear: function (date) {
				if (date instanceof Date) {
					return (0 == date.getYear() % 4 && (( date.getYear() % 100 != 0) || (date.getYear() % 400 == 0)));
				}
				console.warn('argument format is wrong');
				return false;
			},

			/**
			 * 字符串是否为正确的时间格式，支持 - /
			 * @param dateStr
			 * @returns {boolean}
			 */
			isValidDate: function (dateStr) {
				if (this.isNotEmpty(dateStr)) {
					var r= dateStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
					if(r==null){
						return false;
					}
					var d=new Date(r[1],r[3]-1,r[4]);
					var num = (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
					return (num!=0);
				}
			},

			/**
			 * 增加天数
			 * @param date
			 * @param dayNum
			 */
			addDay: function (date, dayNum) {
				if(this.isNotEmpty(date) && this.isNotEmpty(dayNum) && date instanceof Date && typeof dayNum == 'number'){
					date.setDate(date.getDate() + dayNum);
				}else{
					console.warn('date or dayNum format wrong');
				}
				return date;
			},
			addDayStr: function (dateStr, dayNum) {
				var date ='';
				if(this.isNotEmpty(dateStr) && this.isNotEmpty(dayNum) && typeof dayNum == 'number'){
					date = this.formatToDate(dateStr);
					date.setDate(date.getDate() + dayNum);
				}else{
					console.warn('dateStr or dayNum format wrong');
				}
				return date;
			},

			/**
			 * 增加月份
			 * @param date
			 * @param dayNum
			 */
			addMonth: function (date, monthNum) {
				if(this.isNotEmpty(date) && this.isNotEmpty(monthNum) && date instanceof Date && typeof monthNum == 'number'){
					date.setMonth(date.getMonth() + monthNum);
				}else{
					console.warn('date or monthNum format wrong');
				}
				return date;
			},
			addMonthStr: function (dateStr, monthNum) {
				var date ='';
				if(this.isNotEmpty(dateStr) && this.isNotEmpty(monthNum) && typeof monthNum == 'number'){
					date = this.formatToDate(dateStr);
					date.setMonth(date.getMonth() + monthNum);
				}else{
					console.warn('date or monthNum format wrong');
				}
				return date;
			},
			/**
			 * 增加年份
			 * @param date
			 * @param dayNum
			 */
			addYear: function (date, yearNum) {
				if(this.isNotEmpty(date) && this.isNotEmpty(yearNum) && date instanceof Date && typeof yearNum == 'number'){
					date.setYear(date.getFullYear() + yearNum);
				}else{
					console.warn('date or yearNum format wrong');
				}
				return date;
			},
			addYearStr: function (dateStr, yearNum) {
				var date = '';
				if(this.isNotEmpty(dateStr) && this.isNotEmpty(yearNum) && typeof yearNum == 'number'){
					date = this.formatToDate(dateStr);
					date.setYear(date.getFullYear() + yearNum);
				}else{
					console.warn('date or yearNum format wrong');
				}
				return date;
			},

			/**
			 * 是否为空
			 * @param str
			 * @returns {boolean}
			 */
			isNotEmpty: function (str) {
				if (str != '' && str != null && typeof str != 'undefined') {
					return true;
				}
				console.warn('argument format is wrong');
				return false;
			},

			//定义内部常量
			WEEKTYPE: {
				ZH_DAYNAME: 0,
				ZH_SDAYNAME: 1,
				US_DAYNAME: 2,
				US_SDAYNAME: 3,
			}
		}
		//这里确定了插件的名称
		this.DateFormat = date_format_api;
	})();
	
	//根据数字判断所属范围例如：1.3 --》 1~2 unit=单位
	function getNumRange(num,unit){
		var rangeNum = "";
		var newStr = num;
		if(!isNaN(num)){
			newStr = num.toString();
		}
		if(newStr.indexOf(".")!=-1){
			var left = newStr.split(".")[0];
			rangeNum = left + "~" + (parseInt(left) + 1);
		}else{
			rangeNum = num;
		}
		return rangeNum + unit;
	}
	
	var KimCmpFactory = function(type,callback){
		if(this instanceof KimCmpFactory){
			var obj = new this[type](callback);
			return this;
		}else{
			return new KimCmpFactory(type,callback);
		}
	};

	KimCmpFactory.arr = [];
	KimCmpFactory.prototype = {
		clock:function(callback){
			$("body").append("<div id='kim_clockbox' class='ke_drag kim_clockbox'><span class='clock_overy'></span>"+
			"	 <span id='clocktime' class='mr5'></span>"+
			"	    <div id='clockbox'>"+
			"	       	<div class='clock'>"+
			"				<div class='hclock'>"+
			"					<span class='hms'><img onerror='' class='hour' draggable='false' src= '"+basePath +"/resources/imgs/clock/clock_hour.png'/></span>"+
			"					<span class='hms'><img onerror='' class='minute' draggable='false' src='"+basePath +"/resources/imgs/clock/clock_min.png'/></span>"+
			"					<span class='hms'><img onerror='' class='second' draggable='false' src='"+basePath +"/resources/imgs/clock/clock_sec.png'/></span>"+
			"					<img draggable='false' onerror='' draggable='false' src='"+basePath +"/resources/imgs/clock/clock.png'/>"+
			"				</div>"+
			"			</div>"+
			"	     </div>"+
			"	</div>"+
			"</div>");

			var hourDom = domClass("clockbox","hour")[0];
			var minuteDom = domClass("clockbox","minute")[0];
			var secDom = domClass("clockbox","second")[0];
			function init(){
				var date = new Date();
				var sec = date.getSeconds();
				var min = date.getMinutes();
				var hour = date.getHours();
				secDom.style.transform = "rotate("+(sec * 6)+"deg)";
				minuteDom.style.transform = "rotate("+(min * 6)+"deg)";
				hourDom.style.transform = "rotate("+(hour * 30)+"deg)";
				var h = hour <10 ? "0"+hour:hour;
				var m = min <10 ? "0"+min:min;
				var s = sec <10 ? "0"+sec:sec;
				var mk = "AM";
				if(h>12 && h<18)mk="PM";
				if(h>=18)mk="NG";
				if(callback)callback.call(date,h,m,s,mk);
			}
			init();
			setInterval(function(){
				init();
			},1000);
			return this;
		},
	};

	var KimCommon = {
		drag:function(dragDom){
			var prevX = 0;
			var prevY = 0;
			var iSpeedX = 0;
			var iSpeedY = 0;
			var timer = null;
			dragDom.addEventListener("mousedown",function(e){
				var pos = getXY(e);
				var x =pos.x - dragDom.offsetLeft;
				var y =pos.y - dragDom.offsetTop;
				prevX =pos.x;
				prevY =pos.y;
				document.onmousemove = function(e){
					var p = getXY(e);
					dragDom.style.left = p.x - x + 'px';
					dragDom.style.top = p.y - y + 'px';
					iSpeedX = p.x - prevX;
					iSpeedY = p.y - prevY;
					prevX = p.x;
					prevY = p.y;
				};
				dragDom.onmouseleave = document.onmouseup = function(){
					document.onmousemove = null;
					document.onmouseup = null;
					startMove();
				};
				return false;
			});
			function startMove(){
				clearInterval(timer);
				timer = setInterval(function(){
					iSpeedY += 3;
					var L = dragDom.offsetLeft + iSpeedX;
					var T = dragDom.offsetTop + iSpeedY;
					if(T>document.documentElement.clientHeight - dragDom.offsetHeight){
						T = document.documentElement.clientHeight - dragDom.offsetHeight;
						iSpeedY *= -1;
						iSpeedY *= 0.75;
						iSpeedX *= 0.75;
					}else if(T<0){
						T = 0;
						iSpeedY *= -1;
						iSpeedY *= 0.75;
					}
					if(L>document.documentElement.clientWidth - dragDom.offsetWidth){
						L = document.documentElement.clientWidth - dragDom.offsetWidth;
						iSpeedX *= -1;
						iSpeedX *= 0.75;
					}else if(L<0){
						L = 0;
						iSpeedX *= -1;
						iSpeedX *= 0.75;
					}
					dragDom.style.left = L + 'px';
					dragDom.style.top = T + 'px';
					if(Math.abs(Math.floor(iSpeedY))==2 && Math.abs(Math.floor(iSpeedX))==0 )clearInterval(timer);
				},30);
			}
		}
	};
	
	//摄像头工具类
	var videoUtil = {
		ele: $("#video"),
		//老版本调用摄像头兼容性
		getMedia: function(){
			var getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMeddia || navigator.msGetUserMedia;
			return getMedia;
		},
		//初始化摄像头
		init: function(){
			var $this = this;
			// 使用新方法打开摄像头
		    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		         navigator.mediaDevices.getUserMedia({
		             video: true,
		             audio: false
		         }).then(function(stream) {
		             mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
		             $this.ele.attr("src", (window.URL || window.webkitURL).createObjectURL(stream));
		             $this.ele.play();
		         },function(err) {
		             console.log(err);
		         });
		     // 使用旧方法打开摄像头
		     }else if (navigator.getMedia) {
		         navigator.getMedia({
		             video: true
		         }, function(stream) {
		             mediaStreamTrack = stream.getTracks()[0];
		             $this.ele.attr("src", (window.URL || window.webkitURL).createObjectURL(stream));
		             $this.ele.play();
		         },function(err) {
		             console.log(err);
		         });
		     };
		},
		//截取图像
		drawImage: function(){
			canvas.getContext('2d').drawImage(this.ele, 0, 0, 200, 150);
		},
		//关闭摄像头
		closeVideo: function(){
			 mediaStreamTrack && mediaStreamTrack.stop();
		},
		//上传截图
		uploadImg: function(){
			
		}
	};
	
	//展示提示框信息
	function showTip(animate,icon,color,message,time){
		$("#tip").css("display","block");
		$("#tip").removeClass().addClass("animated "+ animate);
		$("#tip").empty().append(  "<div class='tip_conts'>"+
								   "	<i class='iconfont "+icon+"' style='color:"+color+"'></i>"+
								   "	<span class='tip_txt'>"+message+"</span>"+
								   "</div>");
		setTimeout(function(){ $("#tip").fadeOut(); },time);
	};
	
	
	//})(jQuery);
