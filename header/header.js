(function($){
	var loadingCss = {
		css: function(path){
			var path = loadingCss.getParentPath() + path;
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
	loadingCss.css("skin/header.css");

	//定义jquery对象
	$.fn.kimHeaderNav = function(options){
		var opts = $.extend({},$.fn.kimHeaderNav.methods,$.fn.kimHeaderNav.defaults,options);
		this.each(function(){
			var optss = $.extend({},opts);
			opts.init($(this),optss);
		});
	};

	$.fn.kimHeaderNav.methods = {
		init: function($this,opts){
			var template = this.template($this,opts);
			$this.css("position","relative").append(template);
			if($this.is("body")){
				$("#loadingGifOverlay").width($(window).width()).height($(window).height());
				kimUtil.position($("#loadingGifBox"));
				kimUtil.resize($("#loadingGifBox"));
			}else{
				kimUtil.positionParent($("#loadingGifBox"),$this);
			}

			if(!opts.showShade){
				$this.find("#loadingGifOverlay").css("display","none");
			}
			if(isNotEmpty(opts.ShadeOpacity)){
				$this.find("#loadingGifOverlay").css({"opacity":opts.ShadeOpacity,"filter":"alpha(opacity="+opts.ShadeOpacity *10+")"});
			}
			if(isNotEmpty(opts.tipContentSize)){
				$this.find("#loadingGifBox .tipText").css({"font-size":opts.tipContentSize,"font-weight":opts.tipContentWeight,"color":opts.tipContentColor,});
			}
			if(opts.loadingColor){
				$this.find("#loadingGifBox .loadingGif").css("color",opts.loadingColor);
			}
		},
		template: function($this,opts){
			var headerNavHtml = "<div id='loadingGifOverlay'></div>"+
							  "<div id='loadingGifBox'>"+
							  "		<i class='fa fa-spinner fa-pulse fa-"+opts.loadingSize+"x fa-fw loadingGif'></i>"+
							  "		<p class='sr-only tipText'>"+opts.tipContent+"</p>"+
							  "</div>";
			return headerNavHtml;
		},
		event: function($this,opts){
		
		}
	};

	//默认参数
	$.fn.kimHeaderNav.defaults = {
		
	};

	//阻止事件冒泡
	function stopPropagation(e) {
		// 如果提供了事件对象，则这是一个非IE浏览器
		if (e && e.stopPropagation){
			// 因此它支持W3C的stopPropagation()方法
			e.stopPropagation();
		}else{
			// 否则，我们需要使用IE的方式来取消事件冒泡
			window.event.cancelBubble = true;
		}
	};

	//阻止浏览器的默认行为 
	function stopDefault(e) { 
		//阻止默认浏览器动作(W3C) 
		if ( e && e.preventDefault ){ 
			e.preventDefault(); 
		//IE中阻止函数器默认动作的方式 
		}else{
			window.event.returnValue = false; 
		}
		return false; 
	}

	// 判断空
	function isEmpty(val) {
		val = $.trim(val);
		if (val == null )
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

	//判断非空
	function isNotEmpty(val) {
		return !isEmpty(val);
	}

})(jQuery);