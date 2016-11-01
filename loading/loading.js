//;(function($){
	var loadingCss = {
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
		getParentPath:function(){
			var ParentPath = document.scripts;
			ParentPath = ParentPath[ParentPath.length-1].src.substring(0,ParentPath[ParentPath.length-1].src.lastIndexOf("/")+1);
			return ParentPath;
		}
	}
	loadingCss.css("skin/loading.css");

	//jquery插件的定义方式
	var Loading = function(message,options){
		var opts = $.extend({},options);
		this.init(message,opts.timeout,opts);
	};

	Loading.prototype = {
		init : function(message,timeout,opts){
			var $loading = this.template(message,opts);
			if($loading){
				//定位	
				kimUtil._position($loading).resize($loading);
				//事件绑定
				this.events($loading,function(){
					if(opts.top)$loading.css("top",opts.top);
					if(opts.left)$loading.css("left",opts.left);
				});
				//时间关闭
				this.timeout($loading,timeout);
			}
		},
		
		template:function(content,opts){
			var $loading = $("#Loading");
			if(content == "remove"){
				kimUtil.animates($loading,"slideUp");
				return;
			}
			if($loading.length == 0){
				if(content == "remove"){
					kimUtil.animates($loading,"slideUp");
					return;
				}
				$loading = $("<div id='Loading' class='tzui-loading "+animateIn()+" bg3'></div>");
				var $loadingGif = $("<div class='tzui-loading-gif'></div>");
				var $loadingContent = $("<div class='tzui-loading-cnt'></div>");
				$loadingContent.html(content);
				$loading.append($loadingGif).append($loadingContent);
				$("body").append($loading);
				if(opts.overlay){
					$("body").append("<div class='tzui-loading-overlay bg3'></div>");
					$loading.next().click(function(){
						$(this).remove();
						$loading.trigger("click");
					});
				}
			}else{
				$loading.find(".tzui-loading-cnt").html(content);
			}
			
			if(opts.height){$loading.height(opts.height);}

			return $loading;
		},

		events :function($loading,callback){
			$loading.click(function(){
				kimUtil.animates($(this),"slideUp",function(){
					if(callback)callback();
				});
			});
		},

		timeout:function($loading,timeout){
			var timr = null;
			if(isNotEmpty(timeout+"") && timeout >0){
				clearTimeout(timr);
				timr = setTimeout(function(){
					//事件的触发
					$loading.trigger("click");
					$loading.next().remove();
				},timeout*500);
			}
		}
	};

	var loading = function(message,timeout,overlay){
		new Loading(message,{"timeout":timeout,overlay:overlay});
	};

	//加载loading
	$.loading = function(options){
		var opts = $.extend({},$.loading.template,$.loading.defaults,options);
		if(isEmpty(opts.mark)){opts.mark = Math.floor(Math.random() * 10);}
		var $div = $(opts["t"+opts.mark]);
		$div.width(opts.width).height(opts.height);
		opts.target.html($div);
	};

	$.loading.defaults = {
		width:36,
		height:36,
		mark:7
	};

	$.loading.template = {
		t1:"<div class='sk-cube-grid kcube'>"+
			"      <div class='sk-cube sk-cube1'></div>"+
			"      <div class='sk-cube sk-cube2'></div>"+
			"      <div class='sk-cube sk-cube3'></div>"+
			"      <div class='sk-cube sk-cube4'></div>"+
			"      <div class='sk-cube sk-cube5'></div>"+
			"      <div class='sk-cube sk-cube6'></div>"+
			"      <div class='sk-cube sk-cube7'></div>"+
			"      <div class='sk-cube sk-cube8'></div>"+
			"      <div class='sk-cube sk-cube9'></div>"+
			"    </div>",
		t2:" <div class='sk-rotating-plane kcube'></div>",
		t3:"<div class='sk-folding-cube kcube'>"+
			"      <div class='sk-cube1 sk-cube'></div>"+
			"      <div class='sk-cube2 sk-cube'></div>"+
			"      <div class='sk-cube4 sk-cube'></div>"+
			"      <div class='sk-cube3 sk-cube'></div>"+
			"    </div>",
		t4:"<div class='sk-spinner sk-spinner-pulse kcube'></div>",
		t5:"<div class='sk-wandering-cubes kcube'>"+
		   "   <div class='sk-cube sk-cube1'></div>"+
		   "   <div class='sk-cube sk-cube2'></div>"+
		   "</div>",
		t6:"<div class='sk-wave kcube'>"+
			"   <div class='sk-rect sk-rect1'></div>"+
			"   <div class='sk-rect sk-rect2'></div>"+
			"   <div class='sk-rect sk-rect3'></div>"+
			"   <div class='sk-rect sk-rect4'></div>"+
			"   <div class='sk-rect sk-rect5'></div>"+
			"</div>",
		t7:"<div class='sk-circle kcube'>"+
			"   <div class='sk-circle1 sk-child'></div>"+
			"   <div class='sk-circle2 sk-child'></div>"+
			"   <div class='sk-circle3 sk-child'></div>"+
			"   <div class='sk-circle4 sk-child'></div>"+
			"   <div class='sk-circle5 sk-child'></div>"+
			"   <div class='sk-circle6 sk-child'></div>"+
			"   <div class='sk-circle7 sk-child'></div>"+
			"   <div class='sk-circle8 sk-child'></div>"+
			"   <div class='sk-circle9 sk-child'></div>"+
			"   <div class='sk-circle10 sk-child'></div>"+
			"   <div class='sk-circle11 sk-child'></div>"+
			"   <div class='sk-circle12 sk-child'></div>"+
			"</div>",
		t8:"<div class='sk-double-bounce kcube'>"+
			"   <div class='sk-child sk-double-bounce1'></div>"+
			"   <div class='sk-child sk-double-bounce2'></div>"+
			" </div>",
		t9:"<div class='sk-chasing-dots kcube'>"+
			"   <div class='sk-child sk-dot1'></div>"+
			"   <div class='sk-child sk-dot2'></div>"+
			"</div>",
		t10:"<div class='sk-three-bounce kcube'>"+
			"  <div class='sk-child sk-bounce1'></div>"+
			"  <div class='sk-child sk-bounce2'></div>"+
			"  <div class='sk-child sk-bounce3'></div>"+
			"</div>",
		t11:"<div class='sk-fading-circle kcube'>"+
			"	<div class='sk-circle1 sk-circle'></div>"+
			"	<div class='sk-circle2 sk-circle'></div>"+
			"	<div class='sk-circle3 sk-circle'></div>"+
			"	<div class='sk-circle4 sk-circle'></div>"+
			"	<div class='sk-circle5 sk-circle'></div>"+
			"	<div class='sk-circle6 sk-circle'></div>"+
			"	<div class='sk-circle7 sk-circle'></div>"+
			"	<div class='sk-circle8 sk-circle'></div>"+
			"	<div class='sk-circle9 sk-circle'></div>"+
			"	<div class='sk-circle10 sk-circle'></div>"+
			"	<div class='sk-circle11 sk-circle'></div>"+
			"	<div class='sk-circle12 sk-circle'></div>"+
			"</div>"
	};

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

		_positionParent : function($dom,$parent,atop){//居中定位
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
				$this._position($dom);	
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

	function isNotEmpty(val) {
		return !isEmpty(val);
	}

//})(jQuery);
