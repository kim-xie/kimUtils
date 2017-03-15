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
	}
	loadingCss.css("skin/banner.css");

	//jquery方法
	$.fn.kimBanner = function(options){
		return this.each(function() {
			var opts = $.extend({},$.fn.kimBanner.defaults,options);
			bannerInit($(this),opts);
			bannerEvent($(this),opts);
		});
	};

	//初始化方法
	function bannerInit($this,opts){
		var imgList = "" , numList = "";
		if(isNotEmpty(opts.imgSrc)){
			var listLen = opts.imgSrc.length;
			for(var i=0; i<listLen; i++){
				imgList += "<li>"+
									 "		<a href='"+opts.imgUrl[i]+"' class='adv_img' target='_blank' title='"+opts.imgTitle[i]+"'>"+
			          	 "			<img src='"+opts.imgSrc[i]+"' alt='"+opts.imgTitle[i]+"'>"+
			          	 "		</a>"+
									 "</li>";

				numList += "<li></li>";
			}

			var bannerTemp = "<div id='banner'>"+
											"			<ul class='bannerList'>"+imgList+"</ul>"+
											"			<ol class='num'>"+numList+"</ol>"+
											"			<span class='prev'>&lt;</span>"+
											"			<span class='next'>&gt;</span>"+
											"</div>";

		 $this.append(bannerTemp);

		 $("ol.num li:first-child").addClass("on");

		}

	};

	//初始化事件
	function bannerEvent($this,opts){
		/*jquery-实现淘宝无缝banner切换*/
		var imgWidth = $("#banner ul li img").width();
		var $litab = $("#banner ol li");
		var $bannerUl = $("#banner ul");
		var $index = 0;
		var nowTime = 0;
		var timer = null;

		//点击切换按钮
		$litab.click(function(){
			$index = $(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			$bannerUl.stop(true,true).animate({"left":-($index+1)*imgWidth},500);
		});

		//点击下一张
		$("#banner .next").click(function(){
			if(new Date()- nowTime > 600){
				nowTime = new Date();
				autoPlay();
			}
		}).mousedown(function(){return false;});

		//点击上一张
		$("#banner .prev").click(function(){
			if(new Date()- nowTime > 600){
				nowTime = new Date();
				$index--;
				var $liIndex = $index;
				if($liIndex < 0){
					$liIndex = $litab.length -1;
				}
				$litab.eq($liIndex).addClass("on").siblings().removeClass("on");
				$bannerUl.stop(true,true).animate({
					"left":-($index+1)*imgWidth},500,function(){
					if($index < 0){
						$bannerUl.css("left",-($litab.length)*imgWidth);
						$index = $litab.length -1;
					}
				});
			}
		}).mousedown(function(){return false;});

		//自动播放
		function autoPlay(){
			$index++;
			var $liIndex = $index;
			if($liIndex == $litab.length){
				$liIndex = 0;
			}
			$litab.eq($liIndex).addClass("on").siblings().removeClass("on");
			$bannerUl.stop(true,true).animate({
				"left":-($index+1)*imgWidth},500,function(){
				if($index == $litab.length){
					$bannerUl.css("left",-imgWidth);
					$index = 0;
				}
			});
		};

		//启动定时器
		timer = setInterval(autoPlay,2000);
		//鼠标进入清除定时
		$("#banner").mouseover(function(){
			clearInterval(timer);
		});
		//鼠标移出继续定时
		$("#banner").mouseout(function(){
			clearInterval(timer);
			timer = setInterval(autoPlay,2000);
		});

	};

	//默认参数
	$.fn.kimBanner.defaults = {
		imgSrc: [],//图片地址链接【数组格式】
		imgUrl: [],//点击图片要跳转到的地址链接【数组格式】
		imgTitle: []//图片title【数组格式】
	};

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
