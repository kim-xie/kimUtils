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
		
		if(opts.removeIdsObj && opts.validateId && opts.validateIdType){
			kimComboBox +=	"<input id='"+opts.removeIdsObj+"' name='"+opts.removeIdsObj+"' type='hidden' class='vilidateObj removeIds' vilidate='"+opts.validateIdType+"'/>";
		}else if(opts.removeIdsObj){
			kimComboBox +=	"<input id='"+opts.removeIdsObj+"' name='"+opts.removeIdsObj+"' type='hidden' class='removeIds'/>";
		}
		if(opts.addIdsObj && opts.validateId && opts.validateIdType){
			kimComboBox +=	"<input id='"+opts.addIdsObj+"' name='"+opts.addIdsObj+"' type='hidden' class='vilidateObj addIds' vilidate='"+opts.validateIdType+"'/>";
		}else if(opts.addIdsObj){
			kimComboBox +=	"<input id='"+opts.addIdsObj+"' name='"+opts.addIdsObj+"' type='hidden' class='addIds'/>";
		}
		if(opts.idObj && opts.validateId && opts.validateIdType){
			kimComboBox +=	"<input id='"+opts.idObj+"' name='"+opts.idObj+"' value='"+opts.idValue+"' type='hidden' class='vilidateObj ids' vilidate='"+opts.validateIdType+"'/>";
		}else if(opts.idObj){
			kimComboBox +=	"<input id='"+opts.idObj+"' name='"+opts.idObj+"' value='"+opts.idValue+"' type='hidden' class='ids'/>";
		}
		
		kimComboBox += "<span class='kimComboBox'>";
			
		if(opts.textId && opts.validateVal && opts.validateValType){
			kimComboBox += "<span id='"+opts.textId+"' class='vilidateObj contents ellipsis' vilidate='"+opts.validateValType+"'>"+opts.textValue+"</span>";
		}else{
			kimComboBox += "<span id='"+opts.textId+"' class='contents ellipsis'>"+opts.textValue+"</span>";
		}

		kimComboBox +=  "	<span class='icon'>"+
						"		<i class='fa fa-times selectclear pointer c9'></i>"+
						"		<i class='fa fa-chevron-down sortDown pointer c9'></i>"+
						"	</span>"+
						"</span>";


		if(opts.listId || opts.listClass){
			kimComboBox += "<div id='"+opts.listId+"' class='"+opts.listClass+" none' style='position:absolute;z-index:1000;'>";
		} 
		if(opts.listType && opts.listType == "list" && opts.showSearch ){
			kimComboBox += "<div class='searchBox'>	<span class='searchwrap'><input type='text' class='search_in' maxlength='30' placeholder='请输入搜索关键字...'><i class='fa fa-times-circle fa-lg inputclear cd'></i><span class='searchbutton'>搜  索</span></span></div>";
		}
		if(opts.listType && opts.listType == "list" && opts.listcontents ){
			kimComboBox += "<div id='listBox'><div id='listRoot'><ul>";
			var liDom = "";
			for(var i=0;i<opts.listcontents.length;i++){
				
				if(opts.showCheckBox){
					liDom += "<li><a href='javascript:void(0)' style='display:block;padding:5px;font-size:14px' data-id='"+opts.listids[i]+"'><input type='checkBox' style='display:inline-block;width:16px;height:16px;margin-right:5px;vertical-align:top;'>"+opts.listcontents[i]+"</a></li>";
				}else{
					liDom += "<li><a href='javascript:void(0)' style='display:block;padding:5px;font-size:14px' data-id='"+opts.listids[i]+"'>"+opts.listcontents[i]+"</a></li>";
				}
			}
			kimComboBox += liDom + "</ul></div><div id='searchRoot'><ul class='searchList'></ul></div><div id='overlay'><div class='imgBox'><img src='comboBox/skin/img/loading.gif' style='vertical-align:middle;margin-right:6px;'><span style='font-size:12px;'></span></div></div></div>";
		}

		kimComboBox += "</div></div>";

		$this.append(kimComboBox);
		/*if(opts.showSearch){
			$this.find("#listBox").css("margin-top","40px");
		}*/
		if(opts.width){
			$this.find(".kimComboBox").width(opts.width);
		}
		if(opts.height){
			$this.find(".kimComboBox").height(opts.height);
		}

		if(opts.searchBoxWidth){
			$this.find(".searchBox").width(opts.searchBoxWidth);
		}
		if(typeof opts.listWidth == "string" && opts.listWidth.indexOf("%") != -1){
			$this.find("."+opts.listClass+"").width($this.width());
		}else{
			$this.find("."+opts.listClass+"").width(opts.listWidth);
			$this.find(".searchBox").width(parseInt(opts.listWidth) - 10);
		}
		if(opts.listHeight){
			$this.find("."+opts.listClass+"").height(opts.listHeight);
			$this.find("#listBox").height(parseInt(opts.listHeight) - $this.find(".searchBox").height() - 10);
		}
		if(opts.listBackground){
			$this.find("."+opts.listClass+"").css("background",opts.listBackground);
		}
		if(opts.listBorder){
			$this.find("."+opts.listClass+"").css("border",opts.listBorder);
		}
		
		$this.find("#overlay .imgBox").css({"left":($this.find(".kimComboBox").width() - 100)/2 +"px","top": ($this.find("#listBox").height() - 100)/2+"px"});
	}

	//初始化事件
	function initEvent($this,opts){
		
		if(opts.triggerClick){
			//showClear($this);
			$this.hover(function(){
				showClear($this);
			},function(){
				$this.find(".contents").parent().find(".selectclear").hide();
			});
		}

		//展开收起下拉列表
		$this.find(".kimComboBox").click(function(e){
			var e = e || window.event || arguments.callee.caller.arguments[0]; //兼容firefox
			stopPropagation(e);
			$(this).children().first().css("user-select","none");
			$(this).parent().find("."+opts.listClass+"").toggle();
			if($(this).parents("td")){
				$(this).parents("td").siblings().find("."+opts.listClass+"").hide();
				$(this).parents("tr").siblings().find("."+opts.listClass+"").hide();
			}
			stopDefault(e);
		});
		
		//下拉框为数控件时的初始化事件
		if(opts.listType && opts.listType == "tree" && opts.tree){
			$("#"+opts.listId+"").kimTree(opts.tree);
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
			 $this.click(function(e) {
                var e = e || window.event || arguments.callee.caller.arguments[0];
                stopPropagation(e);
            });

			if (opts.showSearch) {
                $this.find(".searchbutton").click(function() {
					setTimeout(function(){
						$this.find("#overlay").show();
					},0);
                    search($this);
                });
                $this.find(".search_in").focus(function() {
                    $this.find(".inputclear").show().removeClass("cd").removeClass("tm_red").addClass("cb");
                });
                $this.find(".search_in").blur(function() {
                    var val = $this.find(".search_in").val();
                    if (val != null  || val != "") {
                        $this.find(".inputclear").show().removeClass("cb").removeClass("tm_red").addClass("cd");
                    } else {
                        $this.find(".inputclear").hide();
                    }
                });
                $this.find(".inputclear").click(function() {
                    $(this).parent().find(".search_in").val("");
                    $this.scrollTop(0);
                    $(this).hide();
                    setTimeout(function(){
						$this.find("#overlay").show();
					},0);
                    search($this);
                });
               
                $this.find(".search_in").keydown(function(e) {
                    var e = e || window.event || arguments.callee.caller.arguments[0];
                    if (e.keyCode == 13) {
						setTimeout(function(){
							$this.find("#overlay").show();
						},0);
                        search($this);
                    }
                });
				if(opts.triggerClick){
					//事件委托
					$this.find("#searchRoot").bind("click",function(e){
						e = e || window.event || arguments.callee.caller.arguments[0];
						var target = e.target || e.srcElement;
						
						if(target.nodeName.toLowerCase() === "a"){
							var opid = target.getAttribute("data-id");
							$this.find("#listRoot li a[data-id="+opid+"]").trigger("click");
							//$(this).find("input:checkbox").trigger("click");
							search($this);
						}else if(target.nodeName.toLowerCase() === "input"){
							
						}
					});
				}
            }
			
			if(opts.triggerClick){
				$this.find("ul li a").bind("click",function(e){
					e = e || window.event || arguments.callee.caller.arguments[0];
					var target = e.target || e.srcElement;
					var aText = "";
					var aId = "";
					if(target.nodeName.toLowerCase() !== "input"){
						if(opts.showCheckBox){
							$(this).find("input:checkbox").trigger("click");
						}
					}else if(target.nodeName.toLowerCase() === "input"){
						
					}
					if(opts.isMultiSelect){
						var checkedNameArr = [];
						var checkedIdArr = [];
						$this.find("ul li a input[type='checkbox']:checked").each(function(){
							checkedNameArr.push($(this).parent().text());
							checkedIdArr.push($(this).parent().attr("data-id"));
						});
						$this.find(".contents").text(checkedNameArr.join(",")).attr("title",checkedNameArr.join(","));
						$this.find(opts.idObj).val(checkedIdArr.join(",")).attr("title",checkedIdArr.join(","));
					}else{
						$(this).parent().siblings().find("input:checkbox").prop("checked",false);
						if($(this).find("input:checkbox").prop("checked")===false){
							$this.find(".contents").text("").attr("title","");
						}else{
							aText = $(this).text();
							aId = $(this).attr("data-id");
							$this.find(".contents").text(aText).attr("title",aText);
						}
						$this.find("#"+opts.idObj).val(aId).attr("title",aId);
					}
					//showClear($this);
					if(opts.onchange){
						opts.onchange($this,aId,aText);
					}
				});
			}else{
				$this.find("input:checkbox").attr("disabled",true);
			}
		}
		
		//点击文档收起下拉框
		$(document).click(function(){
			$("."+opts.listClass+"").hide();
		});
		
	}

	function search(obj) {
		setTimeout(function(){
			var searchVal = $(obj).find(".search_in").val().trim();
			var list = $(obj).find("#listRoot ul li");
			
			if (isNotEmpty(searchVal)) {
				var searchLiDom = "";
				$(obj).find("#overlay").show();
				list.each(function(i) {
					var listVal = $(this).find("a").text();
					if (listVal.toLowerCase().indexOf(searchVal.toLowerCase()) != -1) {
						var checkMark = $(this).find("a input").prop("checked");
						searchLiDom += "<li class='"+checkMark+"'>"+$(this).html()+"</li>";
					}
				});
				$(obj).find("#listRoot").hide();
				$(obj).find("#searchRoot").show();
				$(obj).find("#searchRoot .searchList").html("").append(searchLiDom);
				
				if($(obj).find("#searchRoot .searchList li").attr("class")=="true"){
					$(obj).find("#searchRoot .searchList li a input[type='checkbox']").trigger("click");
				}

				if (list.text().toLowerCase().indexOf(searchVal.toLowerCase()) == -1) {
					$(obj).find(".inputclear").removeClass("cd").removeClass("cb").addClass("tm_red");
				} else {
					$(obj).find(".inputclear").removeClass("cd").removeClass("tm_red").addClass("cb");
				}	
			} else {
				$(obj).find("#listRoot").show();
				$(obj).find("#searchRoot").hide();
			}
			$(obj).find("#overlay").hide();
		},1000);
	}

	//默认参数
	$.fn.kimComboBox.defaults = {
		width:"100%",//展示框的宽度
		height:"30px",//展示框的高度
		validateId:false,//是否需要验证Id
		validateVal:false,//是否需要验证Val
		validateIdType:"required",//验证类型 (默认为非空验证-required)- email/phone/chinese/idcard
		validateValType:"required",//验证类型 (默认为非空验证-required)- email/phone/chinese/idcard
		addIdsObj:"",//存放增量ID的Dom对象
		removeIdsObj:"",//存放删除ID的Dom对象
		idObj:"",//存放ID的Dom对象
		idValue:"",//存放的ID值
		textId:"contents",
		textValue:"--请选择一个值--",//展示框的显示值
		listId:"kimComboBoxList",//下拉框的ID属性
		listClass:"kimComboBoxList",//下拉框的class属性
		listWidth:"100%",//下拉框的宽度
		listHeight:"200px",//下拉框的高度
		listBackground:"#fff",//下拉框的背景色
		listBorder:"1px solid #ddd",//下拉框的边框
		showSearch:true,
		searchBoxWidth:"200px",
		listType:"list",//下拉框的类型
		listids:["1111","2222","3333"],//下拉框里的值对应的id
		listcontents:["list下拉框测试1","list下拉框测试2","list下拉框测试3"],//下拉框里的值（针对下拉框为list类型的值）
		showCheckBox:true,//是否显示复选框
		isMultiSelect:false,//是否支持多选
		triggerClick:true,
		onchange:function(obj,ids,values){},//值变化事件
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