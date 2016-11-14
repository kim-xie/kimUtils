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
	loadingCss.css("skin/comboBox.css");

	//定义jquery对象
	$.fn.kimComboBox = function(options) {
		return this.each(function() {
			var opts = $.extend({}, $.fn.kimComboBox.defaults, options);
			init($(this), opts);
			initEvent($(this),opts);
		});
	};
	
	//初始化方法
	function init($this,opts){

		var kimComboBox = "<div id='kimComboBoxWrap' class='kimComboBoxWrap'>";
		
		if(opts.addIdsObj && opts.validate){
			kimComboBox +=	"<input id='"+opts.removeIdsObj+"' name='"+opts.removeIdsObj+"' type='hidden' class='vilidateObj removeIds' vilidate='"+opts.validateType+"'/>";
		}
		if(opts.removeIdsObj && opts.validate){
			kimComboBox +=	"<input id='"+opts.addIdsObj+"' name='"+opts.addIdsObj+"' type='hidden' class='vilidateObj addIds' vilidate='"+opts.validateType+"'/>";
		}
		if(opts.idObj && opts.validate){
			kimComboBox +=	"<input id='"+opts.idObj+"' name='"+opts.idObj+"' value='"+opts.idValue+"' type='hidden' class='vilidateObj ids' vilidate='"+opts.validateType+"'/>";
		}
		
		kimComboBox += "<span class='kimComboBox'>";
			
		if(opts.textValue){
			kimComboBox += "<span class='vilidateObj contents ellipsis' vilidate='"+opts.validateType+"'>"+opts.textValue+"</span>";
		}else{
			kimComboBox += "<span class='vilidateObj contents ellipsis' vilidate='"+opts.validateType+"'></span>";
		}

		kimComboBox +=  "	<span class='icon'>"+
						"		<i class='fa fa-times selectclear pointer c9'></i>"+
						"		<i class='fa fa-chevron-down sortDown pointer c9'></i>"+
						"	</span>"+
						"</span>";


		if(opts.listId || opts.listClass){
			kimComboBox += "<div id='"+opts.listId+"' class='"+opts.listClass+" none' style='overflow:auto;position:absolute;z-index:1000;'>";
		} 

		if(opts.listType && opts.listType == "list" && opts.listcontents ){
			kimComboBox += "<ul>";
			var liDom = "";
			for(var i=0;i<opts.listcontents.length;i++){
				if(opts.showCheckBox){
					liDom += "<li><a href='javascript:void(0)' style='display:block;padding:5px;font-size:14px' data-id='"+opts.listids[i]+"'><input type='checkBox' style='display:inline-block;width:16px;height:16px;margin-right:5px;vertical-align:top;'>"+opts.listcontents[i]+"</a></li>";
				}else{
					liDom += "<li><a href='javascript:void(0)' style='display:block;padding:5px;font-size:14px' data-id='"+opts.listids[i]+"'>"+opts.listcontents[i]+"</a></li>";
				}
			}
			kimComboBox += liDom + "</ul>";
		}

		kimComboBox += "</div></div>";

		$this.append(kimComboBox);

		if(opts.width){
			$this.find(".kimComboBox").width(opts.width);
		}
		if(opts.height){
			$this.find(".kimComboBox").height(opts.height);
		}
		if(typeof opts.listWidth == "string" && opts.listWidth.indexOf("%") != -1){
			$this.find("."+opts.listClass+"").width($this.width());
		}else{
			$this.find("."+opts.listClass+"").width(opts.listWidth);
		}
		if(opts.listHeight){
			$this.find("."+opts.listClass+"").height(opts.listHeight);
		}
		if(opts.listBackground){
			$this.find("."+opts.listClass+"").css("background",opts.listBackground);
		}
		if(opts.listBorder){
			$this.find("."+opts.listClass+"").css("border",opts.listBorder);
		}
		
	}

	//初始化事件
	function initEvent($this,opts){

		showClear($this);

		//展开收起下拉列表
		$this.find(".kimComboBox").click(function(e){
			var e = e || window.event || arguments.callee.caller.arguments[0]; //兼容firefox
			stopPropagation(e);
			$(this).parent().find("."+opts.listClass+"").toggle();
			stopDefault(e);
		});
		
		//下拉框为数控件时的初始化事件
		if(opts.listType && opts.listType == "tree" && opts.tree){
			$("#"+opts.listId+"").tmTree(opts.tree);
		}

		//重置按钮
	    $this.find(".selectclear").click(function(e){
			var e = e || window.event || arguments.callee.caller.arguments[0]; //兼容firefox
			stopPropagation(e);
			$(this).parents("#kimComboBoxWrap").find(".contents").text("");
			
			if(opts.listType == "tree"){
				$(this).parents("#kimComboBoxWrap").find(".trees .search_in").val("");
				$(this).parents("#kimComboBoxWrap").find(".trees .tm-tree-checkbox").removeClass("tm-tree-checkbox-checked").removeClass("tm-tree-checkbox-focus");
				$(this).parents("#kimComboBoxWrap").find(".trees .tm-tree-radio").removeClass("tm-tree-radio-checked").removeClass("tm-tree-radio-focus");
				$(this).parents("#kimComboBoxWrap").find(".trees .tree .toggle").removeClass("first_collapsable").addClass("expandable");
				$(this).parents("#kimComboBoxWrap").find(".trees .tree .father").next().hide();
			}else if(opts.listType == "list" && opts.showCheckBox){
				$(this).parents("#kimComboBoxWrap").find("input:checkbox").prop("checked",false);
			}
			$(this).hide();
		});
		
		//给list内容框赋值
		if(opts.listType == "list" && opts.listcontents){
			
			$this.find("ul li a").click(function(){
				//var e = e || window.event || arguments.callee.caller.arguments[0]; //兼容firefox
				//stopPropagation(e);
				var aText = "";
				var aId = "";
				if(opts.isMultiSelect){
					var checkedNameArr = [];
					var checkedIdArr = [];
					$(this).find("input:checkbox").trigger("click");
					$this.find("ul li a input[type='checkbox']:checked").each(function(){
						checkedNameArr.push($(this).parent().text());
						checkedIdArr.push($(this).parent().data("id"));
					});
					$this.find(".contents").text(checkedNameArr.join(",")).attr("title",checkedNameArr.join(","));
					$this.find(opts.idObj).val(checkedIdArr.join(",")).attr("title",checkedIdArr.join(","));
				}else{
					$(this).find("input:checkbox").trigger("click");
					$(this).parent().siblings().find("input:checkbox").prop("checked",false);
					aText = $(this).text();
					aId = $(this).data("id");
					$this.find(".contents").text(aText).attr("title",aText);
					$this.find(opts.idObj).val(aId).attr("title",aId);
				}
				showClear($this);
			});
		}
		
		//点击文档收起下拉框
		$(document).click(function(){
			$("."+opts.listClass+"").hide();
		});
		
	}

	//默认参数
	$.fn.kimComboBox.defaults = {
		width:"100%",//展示框的宽度
		height:"30px",//展示框的高度
		validate:true,//是否需要验证
		validateType:"required",//验证类型 (默认为非空验证-required)- email/phone/chinese/idcard
		addIdsObj:"",//存放增量ID的Dom对象
		removeIdsObj:"",//存放删除ID的Dom对象
		idObj:"",//存放ID的Dom对象
		idValue:"",//存放的ID值
		textValue:"--请选择一个值--",//展示框的显示值
		listId:"kimComboBoxList",//下拉框的ID属性
		listClass:"kimComboBoxList",//下拉框的class属性
		listWidth:"100%",//下拉框的宽度
		listHeight:"200px",//下拉框的高度
		listBackground:"#fff",//下拉框的背景色
		listBorder:"1px solid #ddd",//下拉框的边框
		listType:"list",//下拉框的类型
		listids:["1111","2222","3333"],//下拉框里的值对应的id
		listcontents:["list下拉框测试1","list下拉框测试2","list下拉框测试3"],//下拉框里的值（针对下拉框为list类型的值）
		showCheckBox:true,//是否显示复选框
		isMultiSelect:true,//是否支持多选
		tree:{}//下拉框为树类型的树初始化
	};

	//显示重置按钮
	function showClear($this){
		var val = $this.find(".contents").text().trim();
		if(isNotEmpty(val)){
			$this.find(".contents").parent().find(".selectclear").show();
		}else{
			$this.find(".contents").parent().find(".selectclear").hide();
		}
	}

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