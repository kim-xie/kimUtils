;(function($){
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
	};
	loadingCss.css("skin/loadingGif.css");

	$.fn.kimLoading = function(options){
		var opts = $.extend({},$.fn.kimLoading.methods,$.fn.kimLoading.defaults,options);
		this.each(function(){
			var optss = $.extend({},opts);
			if(opts.show){
				opts.init($(this),optss);
			}
		});
	};

	$.fn.kimLoading.methods = {
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
			var LoadingHtml = "<div id='loadingGifOverlay'></div>"+
							  "<div id='loadingGifBox'>"+
							  "		<i class='fa fa-spinner fa-pulse fa-"+opts.loadingSize+"x fa-fw loadingGif'></i>"+
							  "		<p class='sr-only tipText'>"+opts.tipContent+"</p>"+
							  "</div>";
			return LoadingHtml;
		},
		event: function($this,opts){
		
		}
	};

	$.fn.kimLoading.defaults = {
		show: true,//是否使用加载层
		showShade: true,//是否显示阴影层
		ShadeOpacity: 0.3,//阴影层透明度
		tipContent: "数据加载中",//加载提示内容
		tipContentSize: "14px",//提示内容字体大小
		tipContentColor: "#666",//提示内容字体颜色
		tipContentWeight: 600,//提示内容字体加粗
		loadingSize: 5,//加载动画大小
		loadingColor: "#fff",//加载动画颜色
	};

	//定位工具
	var kimUtil = {
		position : function($dom,amark){//居中定位
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

		positionParent : function($dom,$parent,atop){//相对父元素居中定位
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
				$this.position($dom);	
			});
		}
	}
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
})(jQuery);