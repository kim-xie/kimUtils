//var jQuery = require('./js/jquery-1.11.2.min.js');
//;(function($){

	//require('./skin/kimUtils.css');

	//֧��trim()����
	if(!String.prototype.trim){
		String.prototype.trim = function(){
			return  this.replace(/(^\s*)|(\s*$)/g,"");
		};
	};
	//replaceAll(newStr,oldStr)
	String.prototype.replaceAll = function(str,target){
		return this.replace(new RegExp(str,"ig"),target);
	};

	//���ж�
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
	//�ǿ��ж�
	function isNotEmpty(val) {
		return !isEmpty(val);
	}

	//��ֹ�¼�ð��
	function stopBubble(e) {
		// ����ṩ���¼�����������һ����IE�����
		e = e || window.event || arguments.callee.caller.arguments[0]; //����firefox

		if (e && e.stopPropagation){
			// �����֧��W3C��stopPropagation()����
			e.stopPropagation();
		}else{
			// ����������Ҫʹ��IE�ķ�ʽ��ȡ���¼�ð��
			window.event.cancelBubble = true;
		}
	};

	//��ֹ�������Ĭ����Ϊ
	function stopDefault( e ) {
		// ����ṩ���¼�����������һ����IE�����
		e = e || window.event || arguments.callee.caller.arguments[0]; //����firefox
		if(e && e.preventDefault){
			//��ֹĬ�����������(W3C)
			e.preventDefault();
		}else{
			//IE����ֹ������Ĭ�϶����ķ�ʽ
			window.event.returnValue = false;
		}
		return false;
	}

	//������һ������
	function goback(){
		window.history.back();
	}

	//JS��ȡ���������ļ���Ŀ¼·��
	function getParentPath(){
		var ParentPath = document.scripts;
		ParentPath = ParentPath[ParentPath.length-1].src.substring(0,ParentPath[ParentPath.length-1].src.lastIndexOf("/")+1);
		return ParentPath;
	}

	//js��̬����js��css�ļ�
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

	//��������ȽϷ��������������ɾ��
	function compareArray(arr1,arr2){
		var temp = []; //��ʱ����1
		var temparrayRemoved = [];//��ʱ����2 - ��¼��ɾ���Ԫ��
		var temparrayAdd = [];//��ʱ����3 - ��¼������Ԫ��

		for (var i = 0; i < arr2.length; i++) {
			temp[arr2[i]] = true;//������B��ֵ������ʱ����1�ļ�ֵΪ��
		};
		for (var i = 0; i < arr1.length; i++) {
			if (!temp[arr1[i]]) {
				temparrayRemoved.push(arr1[i]); // ��ȡɾ���Ԫ��
			} else {
				delete temp[arr1[i]]; // ɾ����ͬ��Ԫ��
			} ;
		};
		// ������ӵ�Ԫ��
		for(var i in temp){
			temparrayAdd.push(i);
		}
		var Arrjson = {
			addArr:temparrayAdd,
			removedArr:temparrayRemoved
		}
		return Arrjson;
	}

	//��λ����
	var kimUtil = {
		position : function($dom,amark){//���ж�λ
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

		positionParent : function($dom,$parent,atop){//��Ը�Ԫ�ؾ��ж�λ
			var parentWidth = $parent.width();
			var parentHeight= $parent.height();
			var width = $dom.width();
			var height = $dom.height();
			var left = (parentWidth - width)/2;
			var top = (parentHeight - height)/2;
			$dom.css({left:left,top:top-(atop||0)});
			return this;
		},

		resize : function($dom){//������Ӧʽ
			var $this = this;
			$(window).resize(function(){
				$this.position($dom);
			});
		},

		animates:function($dom,mark,callback){//������Ҫ����animate.css
			switch(mark){
				case "fadeOut":$dom.toggleClass(animateOut()).fadeOut("slow",function(){$(this).remove();if(callback)callback();});break;
				case "slideUp":$dom.toggleClass(animateOut()).slideUp("slow",function(){$(this).remove();if(callback)callback();});break;
				case "fadeIn":$dom.toggleClass(animateOut()).fadeIn("slow",function(){if(callback)callback();});break;
				case "slideDown":$dom.toggleClass(animateOut()).slideDown("slow",function(){if(callback)callback();});break;
				case "left":$dom.toggleClass(animateOut()).animate({left:0},300,function(){$(this).remove();if(callback)callback();});break;
				case "top":$dom.toggleClass(animateOut()).animate({top:0},300,function(){$(this).remove();if(callback)callback();});break;
			}
		},

		getRandomColor : function(){//��ȡʮ��������ɫ
		  return '#'+Math.floor(Math.random()*16777215).toString(16);
		}
	};

	//������ʽ
	dynamicLoading.css("skin/kimUtils.css");

	//���붯����indexΪ��Ĭ��Ϊ���
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

	//�Ƴ���indexΪ��Ĭ��Ϊ���
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
	 * ��Date����չ���� Date ת��Ϊָ����ʽ��String ��(M)����(d)��12Сʱ(h)��24Сʱ(H)����(m)����(s)����(E)������(q)
	 * ������ 1-2 ��ռλ�� ��(y)������ 1-4 ��ռλ�����(S)ֻ���� 1 ��ռλ��(�� 1-3 λ������)
	 * eg: (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	 * eg: (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 �� 20:09:04
	 * eg: (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 �ܶ� 08:09:04
	 * eg: (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 ���ڶ� 08:09:04
	 * eg: (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	 */
	Date.prototype.format = function(fmt) {
		var o = {
			"Y+" : this.getFullYear(),
			"M+" : this.getMonth() + 1,
			// �·�
			"d+" : this.getDate(),
			// ��
			"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
			// Сʱ
			"H+" : this.getHours(),
			// Сʱ
			"m+" : this.getMinutes(),
			// ��
			"s+" : this.getSeconds(),
			// ��
			"q+" : Math.floor((this.getMonth() + 3) / 3),
			// ����
			"S" : this.getMilliseconds()
		// ����
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
	 * ������ת���ɶ�Ӧ������ �����������ַ�������ĵĴ�д����
	 * @param {Object}
	 * num ����:1��Ӧһ 11��ʮһ 101:һ����һ
	 * @return {TypeName}
	 */
	function NumberToChinese(num) {
		var AA = new Array("��", "һ", "��", "��", "��", "��", "��", "��", "��", "��", "ʮ");
		var BB = new Array("", "ʮ", "��", "Ǫ", "�f", "�|", "��", "");
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

		if (a.length > 1){ // ����С���(�����С���)
			re += BB[6];
			for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
		}
		if (re == 'һʮ') re = "ʮ";
		if (re.match(/^һ/) && re.length == 3) re = re.replace("һ", "");
		return re;
	};


	/**
	 * ��ȡ����ɼ�ȸ߶�
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
	 * ��ȡ����ɼ�ȿ��
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
	//��ȡ���߶� getClientHeight + �������߶�
	function getScrollHeight() {
		return Math.max(getClientHeight(), document.body.scrollHeight,
				document.documentElement.scrollHeight);
	}
	//���������붥���ĸ߶�
	function getScrollTop() {
		var scrollTop = 0;
		if (document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if (document.body) {
			scrollTop = document.body.scrollTop;
		}
		return scrollTop;
	}

	/* �ļ���Сת��ΪMB GB KB��ʽ */
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

	/* ��ȡ�ļ���׺ */
	function getExt(fileName) {
		if (isNotEmpty(fileName) && fileName.lastIndexOf(".") == -1){return fileName;}
		var pos = fileName.lastIndexOf(".") + 1;
		return fileName.substring(pos, fileName.length).toLowerCase();
	}

	/* ��ȡ�ļ���� */
	function getFileName(fileName) {
		var pos = fileName.lastIndexOf("/") + 1;
		if (pos == -1) {
			return fileName;
		} else {
			return fileName.substring(pos, fileName.length);
		}
	}

	//��ȡ��������ǰ startTime==== Date
	function getTimeFormat(startTime) {
		var startTimeMills = startTime.getTime();
		var endTimeMills = new Date().getTime();
		var diff = parseInt((endTimeMills - startTimeMills) / 1000);//��
		var day_diff = parseInt(Math.floor(diff / 86400));//��
		var buffer = Array();
		if (day_diff < 0) {
			return "[error],ʱ��Խ��...";
		} else {
			if (day_diff == 0 && diff < 60) {
				if (diff <= 0)
					diff = 1;
				buffer.push(diff + "��ǰ");
			} else if (day_diff == 0 && diff < 120) {
				buffer.push("1 ����ǰ");
			} else if (day_diff == 0 && diff < 3600) {
				buffer.push(Math.round(Math.floor(diff / 60)) + "����ǰ");
			} else if (day_diff == 0 && diff < 7200) {
				buffer.push("1Сʱǰ");
			} else if (day_diff == 0 && diff < 86400) {
				buffer.push(Math.round(Math.floor(diff / 3600)) + "Сʱǰ");
			} else if (day_diff == 1) {
				buffer.push("1��ǰ");
			} else if (day_diff < 7) {
				buffer.push(day_diff + "��ǰ");
			} else if (day_diff < 30) {
				buffer.push(Math.round(Math.floor(day_diff / 7)) + " ����ǰ");
			} else if (day_diff >= 30 && day_diff <= 179) {
				buffer.push(Math.round(Math.floor(day_diff / 30)) + "��ǰ");
			} else if (day_diff >= 180 && day_diff < 365) {
				buffer.push("����ǰ");
			} else if (day_diff >= 365) {
				buffer.push(Math.round(Math.floor(day_diff / 30 / 12)) + "��ǰ");
			}
		}
		return buffer.toString();
	};

	//���֤�ж�
	function isIdCard(val){
		var idCard = /^[1-9]d{5}(19d{2}|[2-9]d{3})((0d)|(1[0-2]))(([0|1|2]d)|3[0-1])(d{4}|d{3}X)$/i;
		if(idCard.test(val)){
			return true;
		}
	}
	//�����ж�
	function isEmail(val){
		var email = /^\w+\@[A-Za-z0-9]+\.[A-Za-z]{2,4}$/i;
		if(email.test(val)){
			return true;
		}
	}

	//�绰�ж�
	function isPhone(val){
		var phone = /^1[3458]{1}[0-9]{9}$/;
		if(phone.test(val)){
			return true;
		}
	}

	//��Χ�����
	function randomRange(start,end){
		return Math.floor(Math.random()*(end-start+1))+start;
	};
	//�����
	function randomNum(num){
		return Math.floor(Math.random()*(num+1));
	};
	//rgb���ɫ
	function randomColor(){
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);
		return "rgb("+r+","+g+","+b+")";//IE7��֧��rgb
	};
	//ʮ��������ɫ
	function randomColor16(){
		//0-255
		var r = Math.random(255).toString(16);
		var g = Math.random(255).toString(16);
		var b = Math.random(255).toString(16);
		//255������ת����ʮ�����
		if(r.length<2)r = "0"+r;
		if(g.length<2)g = "0"+g;
		if(b.length<2)b = "0"+b;
		return "#"+r+g+b;
	};

	//��ȡ���������±�
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

	//��ȡcss�е���ʽ��ֵ��������������޹�
	function getStyle(dom,attr){
		return window.getComputedStyle ? window.getComputedStyle(dom,false)[attr]:dom.currentStyle[attr];
	};

	//�򵥻���--����̳�
	function mixin(obj,obj2){
		for(var k in obj2){
			if(obj2.hasOwnProperty(k)){
				obj[k] = obj2[k];
			}
		}
		return obj;
	};

	//��������
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

	//��ȡ����λ�á�����ie678
	function getXY(e){
		var ev = e || window.event || arguments.callee.caller.arguments[0]; //����firefox
		var x=0,y=0;
		if(ev.pageX){
			x = ev.pageX;
			y = ev.pageY;
		}else{
			//�õ�scrollTop ��scrollLeft
			var sleft = 0,stop = 0;
			//ie678---
			if(document.documentElement){
				stop =document.documentElement.scrollTop;
				sleft = document.documentElement.scrollLeft;
			}else{
			//ie9+ �ȸ�
				stop = document.body.scrollTop;
				sleft = document.body.scrollLeft;
			}
			x = ev.clientX + sleft;
			y = ev.clientY + stop;
		}
		return {x:x,y:y};
	};

	//����ת�ַ�
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

	/* ��ֹ����ѡ�� */
	function forbiddenSelect() {
		$(document).bind("selectstart", function() {
			return false;
		});
		document.onselectstart = new Function("event.returnValue=false;");
		$("*").css({
			"-moz-user-select" : "none"
		});
	}

	/* ��������ѡ�� */
	function autoSelect() {
		$(document).bind("selectstart", function() {
			return true;
		});
		document.onselectstart = new Function("event.returnValue=true;");
		$("*").css({
			"-moz-user-select" : ""
		});
	};

	//dom����
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

	/*ͨ��className��ȡdomԪ�ؽ��й���*/
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

	//����
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

	//����
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


	/*���ڹ�����*/
var tmDate = {
	 /*ת������*/
	 _transferDate : function(date){
		if(typeof date =="string"){
			return new Date(date.replace(/-/ig,"/").replace("T"," "));
		}else{
			return date;
		}
	 },
	  /*��ʽ������*/
	 _toString : function(date,pattern){
		var d = this._transferDate(date);
		return d.format(pattern);
	 },

	 /*��ȡ����ʱ�������ʱ��*/
	 _Date : function(date1,date2){
		var dateTime = this._numMillSecond(date1,date2);
		return new Date(dateTime).format("yyyy-MM-dd");
	 },
	 //��ȡ����ʱ����������
	 _Datsyear : function(date1,date2){
		 var dateTime = this._numYear(date1,date2);
		 return  dateTime;
	 },
	//��ȡ����ʱ��������·�
	 _datsmonth : function(date1,date2){
		 var dateTime = this._numMonth(date2,date1);
		 return  dateTime;
	 },

	 //������
	 _numYear : function(date1,date2){
		var times = this._numDay(date1,date2);
		return  Math.floor(times/365);
	 },

	  //����·�
	 _numMonth : function(date1,date2){
		var times = this._numDay(date1,date2);
		return  Math.floor(times/30);
	 },

	 //�������
	 _numDay : function(date1,date2){
		var times = this._numSecond(date1,date2);
		var hour = this._var().hour;
		var mills = this._var().mills;
		return Math.ceil(times/(mills * hour));
	 },

	//���ʱ
	 _numHour : function(date1,date2){
		return Math.floor(this._numMillSecond(date1,date2)/(1000*60*60));
	 },

	 //�����
	 _numMinute : function(date1,date2){
		return Math.floor(this._numMillSecond(date1,date2)/(1000*60));
	 },

	 //�������
	 _numSecond : function(date1,date2){
		 return Math.floor(this._numMillSecond(date1,date2) / 1000);
	 },

	  //�������
	 _numMillSecond : function(date1,date2){
		var stimes = this._getTime(this._transferDate(date1));
		var etimes = this._getTime(this._transferDate(date2));
		return etimes - stimes;
	 },

	 _var : function(){
		return {hour:24,second:60,mills:3600,format:"yyyy-MM-dd",dateFormat:"yyyy-MM-dd HH:mm:ss"};
	 },

	/*ĳ�����ڼ��϶��ٺ���*/
	 _plusMillisSeconds : function(date,millisSeconds){
		var dateTime = this._getTime(date);
		var mintimes = millisSeconds;
		var rdate = dateTime*1 + mintimes*1;
		return this._format(new Date(rdate));
	 },
	 /*ĳ�����ڼ��϶�����*/
	 _plusSeconds : function(date,seconds){
		var dateTime = this._getTime(date);
		var mintimes = seconds*1000;
		var rdate = dateTime*1 + mintimes*1;
		return this._format(new Date(rdate));
	 },
	  /*ĳ�����ڼ��϶��ٷ���*/
	 _plusMinutes : function(date,minutes){
		var dateTime = this._getTime(date);
		var mintimes = minutes*60*1000;
		var rdate = dateTime*1 + mintimes*1;
		return this._format(new Date(rdate));
	 },
	  /*ĳ�����ڼ���Сʱ��*/
	 _plusHours : function(date,hours){
		var dateTime = this._getTime(date);
		var mintimes = hours*60*60*1000;
		var rdate = dateTime + mintimes;
		return this._format(new Date(rdate));
	 },
	 /*ĳ�����ڼ�������*/
	 _plusDays : function(date,days){
		var dateTime = this._getTime(date);
		var mintimes = days*60*60*1000*24;
		var rdate = dateTime*1 + mintimes*1;
		return this._format(new Date(rdate));
	 },

	 /*ĳ�����ڼ��϶��ٸ���,�����ǰ���һ����30�������������*/
	 _plusMonths : function(date,months){
		var dateTime = this._getTime(date);
		var mintimes = months*30*60*60*1000*24;
		var rdate = dateTime + mintimes*1;
		return this._format(new Date(rdate));
	 },

	 /*ĳ�����ڼ��϶��ٸ���,�����ǰ���һ����365������������ģ����loopΪtrue���������*/
	 _plusYears : function(date,years,isLoop){
		var dateTime = this._getTime(date);
		var day = 365;
		if(isLoop)day =366;
		var mintimes = years*day*60*60*1000*24;
		var rdate = dateTime + mintimes;
		return this._format(new Date(rdate));
	 },

	 /*ĳ�����ڼ���ĳ�����ڣ�����Ĳ����Ӻ�ûʲô����*/
	 _plusDate : function(date1,date2){
		var dateTime = this._getTime(date1);
		var dateTime2 = this._getTime(date2);;
		var rdate = dateTime + dateTime2;
		return this._format(new Date(rdate));
	 },

	 /*ĳ�����ڼ�ȥ���ٺ�����*/
	 _minusMillisSeconds : function(date,millisSeconds){
		var dateTime = this._getTime(date);
		var mintimes = millisSeconds*1;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },
	 /*ĳ�����ڼ�ȥ������*/
	 _minusSeconds : function(date,seconds){
		var dateTime = this._getTime(date);
		var mintimes = seconds*1000;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },
	  /*ĳ�����ڼ�ȥ���ٷ���*/
	 _minusMinutes : function(date,minutes){
		var dateTime = this._getTime(date);
		var mintimes = minutes*60*1000;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },
	  /*ĳ�����ڼ�ȥСʱ��*/
	 _minusHours : function(date,hours){
		var dateTime = this._getTime(date);
		var mintimes = hours*60*60*1000;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },
	 /*ĳ�����ڼ�ȥ����*/
	 _minusDays : function(date,days){
		var dateTime = this._getTime(date);
		var mintimes = days*60*60*1000*24;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },

	 /*ĳ�����ڼ�ȥ���ٸ���,�����ǰ���һ����30�������������*/
	 _minusMonths : function(date,months){
		var dateTime = this._getTime(date);
		var mintimes = months*30*60*60*1000*24;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },

	 /*ĳ�����ڼ�ȥ���ٸ���,�����ǰ���һ����365�������������*/
	 _minusYears : function(date,years,isLoop){
		var dateTime = this._getTime(date);
		var day = 365;
		if(isLoop)day =366;
		var mintimes = years*day*60*60*1000*24;
		var rdate = dateTime - mintimes;
		return this._format(new Date(rdate));
	 },

	 /*ĳ�����ڼ�ȥĳ�����ڣ�����Ĳ����Ӻ�ûʲô����*/
	 _minusDate : function(date1,date2){
		var dateTime = this._getTime(date1);
		var dateTime2 = this._getTime(date2);;
		var rdate = dateTime - dateTime2;
		return this._format(new Date(rdate));
	 },

	 /*��ȡһ�����ж�����*/
	 _getMonthOfDay :function(date1){
		var currentMonth = this._getFirstDayOfMonth(date1);
		var nextMonth = this._getNextDayOfMonth(date1);
		return this._numDay(currentMonth,nextMonth);
	 },

	 /*��ȡһ���ֶ�����*/
	 _getYearOfDay : function(date){
		var firstDayYear = this._getFirstDayOfYear(date);
		var lastDayYear = this._getLastDayOfYear(date);
		return Math.ceil(this._numDay(firstDayYear,lastDayYear));
	 },

	 /*ĳ�������ǵ����еĵڼ���*/
	 _getDayOfYear : function(date1){
		return Math.ceil(this._numDay(this._getFirstDayOfYear(date1),date1));
	 },

	 /*ĳ���������ڵ����еĵڼ���*/
	  _getDayOfMonth : function(date1){
		return Math.ceil(this._numDay(this._getFirstDayOfMonth(date1),date1));
	 },

	 /*��ȡĳ����������һ��ĵڼ���*/
	 _getDayOfYearWeek : function(date){
		var numdays = this._getDayOfYear(date);
		return Math.ceil(numdays / 7);
	 },

	  /*ĳ���������ڵ����е����ڼ�*/
	  _getDayOfWeek : function(date1){
		return this._getWeek(date1);
	 },

	 /*��ȡ�ڵ�ǰ�����е�ʱ��*/
	 _getHourOfDay : function(date){
		 return this._getHour(date);
	 },
	 _eq : function(date1,date2){
		 var stime = this._getTime(this._transferDate(date1));
		 var etime = this._getTime(this._transferDate(date2));
		 return stime == etime ? true :false;
	 },
	 /*ĳ�������Ƿ�����ĳ������*/
	 _after : function(date1,date2){
		 var stime = this._getTime(this._transferDate(date1));
		 var etime = this._getTime(this._transferDate(date2));
		 return  stime < etime ? true :false;
	 },

	  /*ĳ�������Ƿ�����ĳ������*/
	 _before : function(date1,date2){
		 var stime = this._getTime(this._transferDate(date1));
		 var etime = this._getTime(this._transferDate(date2));
		 return  stime > etime ? true :false;
	 },

	 /*��ȡĳ��ĵ�һ��*/
	 _getFirstDayOfYear : function(date){
		var year = this._getYear(date);
		var dateString = year+"-01-01 00:00:00";
		return dateString;
	 },

	  /*��ȡĳ������һ��*/
	 _getLastDayOfYear : function(date){
		var year = this._getYear(date);
		var dateString = year+"-12-01 00:00:00";
		var endDay = this._getMonthOfDay(dateString);
		return year+"-12-"+endDay+" 23:59:59";
	 },

	  /*��ȡĳ�µĵ�һ��*/
	 _getFirstDayOfMonth: function(date){
		var year = this._getYear(date);
		var month = this._getMonth(date);
		var dateString = year +"-"+month+"-01 00:00:00";
		return dateString;
	 },

	 /*��ȡĳ�����һ��*/
	 _getLastDayOfMonth : function(date){
		var endDay = this._getMonthOfDay(date);
		var year = this._getYear(date);
		var month = this._getMonth(date);
		return year +"-"+month+"-"+endDay+" 23:59:59";
	 },
	 /*һ��Ŀ�ʼʱ��*/
	 _getFirstOfDay : function(date){
		 var year = this._getYear(date);
		 var month = this._getMonth(date);
		 var day = this._getDay(date);
		 return year+"-"+month+"-"+day+" 00:00:00";
	 },

	 /*һ��Ľ���ʱ��*/
	 _getLastOfDay : function(date){
		 var year = this._getYear(date);
		 var month = this._getMonth(date);
		 var day = this._getDay(date);
		 return year+"-"+month+"-"+day+" 23:59:59";
	 },

	 /*��ȡ�¸��µĵ�һ��*/
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
	 /*��*/
	 _getYear:function(date){
		 return this._transferDate(date).getFullYear();
	 },

	 /*��*/
	 _getMonth:function(date){
		 var month = this._transferDate(date).getMonth()+1;
		 return month>9 ? month : "0"+month;
	 },

	 /*��*/
	 _getDay:function(date){
		 var day = this._transferDate(date).getDate();
		 return day >9 ? day : "0"+day;
	 },

	  /*��ȡ�������ڼ�,���Ϊ0���������*/
	 _getWeek : function(date){
		 return this._transferDate(date).getDay();
	 },

	 /*ʱ*/
	 _getHour : function(date){
		 var hour = this._transferDate(date).getHours();
		 return hour >9 ? hour : "0"+hour;
	 },

	 /*12Сʱ��ʱ*/
	 _getHour12 : function(date){
		 var hour = this._transferDate(date).getHours();
		 return hour%12 == 0 ? 12 : hour % 12;
	 },

	 /*��*/
	 _getMinute : function(date){
		 var minutes = this._transferDate(date).getMinutes();
		 return minutes >9 ? minutes : "0"+minutes;
	 },

	 /*��*/
	 _getSecond : function(date){
		var seconds = this._transferDate(date).getSeconds();
		return seconds >9 ? seconds : "0"+seconds;
	 },

	 /*����*/
	 _getMillisecond : function(date){
		return this._transferDate(date).getMilliseconds();
	 },

	 /*��ȡ�����ڵ����ǵڼ�����*/
	 _getPeriod : function(date){
		var month = this._getMonth(date)*1;
		return  Math.floor((month+3)/3);
	 },

	 /*����*/
	 _nowWeekChinies : function(date){
		var nowWeek = this._getWeek(date);
		var day = "";
		switch (nowWeek){
			case 0:day="��";break;
			  break;
			case 1:day="һ";break;
			  break;
			case 2:day="��";break;
			  break;
			case 3:day="��";break;
			  break;
			case 4:day="��";break;
			  break;
			case 5:day="��";break;
			  break;
			case 6:day="��";break;
		 }
		 return day;
	 },
	 _getMessage : function(date){
		 var now = date||new Date();
		 var hour = now.getHours() ;
		 if(hour < 6){return "�賿�ã�";}
		 else if (hour < 9){return "���Ϻã�";}
		 else if (hour < 12){return "����ã�";}
		 else if (hour < 14){return "����ã�";}
		 else if (hour < 17){return "����ã�";}
		 else if (hour < 19){return "����ã�";}
		 else if (hour < 22){return "���Ϻã�";}
		 else {return "ҹ��ã�";}
	 },
	 /*���� 1970 �� 1 �� 1 ������ĺ�����*/
	 _getTime : function(date){
		 return this._transferDate(date).getTime();
	 }
	};
	/*date end*/

//})(jQuery);
