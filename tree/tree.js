(function(){
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
	loadingCss.css("skin/tree.css");

	/*table tree*/
	var treeBlankCount = 0;
	/*控制线的全局变量-*/
	var tableTreeArr = [];

	(function($) {

		/*控制线的全局变量-*/
		var treeLineCount = 0;
		var tree_zindex = 1;
		var rootId = "";

		$.fn.kimTree = function(options) {
			return this.each(function() {
				var opts = $.extend({}, $.fn.kimTree.defaults, $.fn.kimTree.parseOptions($(this)), options);
				init($(this), opts);
			});
		};

		/*初始化方法*/
		function init($this, opts) {
			var root = "";
			if (opts.showSearch) {
				root =  "<div class='searchbox'>"+
						"	<span class='searchwrap'>"+
						"		<input type='text' class='search_in' maxlength='30' placeholder='请输入搜索关键字...'>"+
						"		<i class='fa fa-times-circle fa-lg inputclear cd'></i>"+
						"		<span class='searchbutton'>搜  索</span>"+
						"	</span>"+
						"</div>";
			}
			
			root += "<div class='rootDiv'>";

			if (opts.showClose) {
				root += '<a style="text-decoration:underline;" class="tm-tree-close" href="javascript:void(0);">关闭</a>&nbsp;&nbsp;';
			}
			if (opts.expand) {
				root += '<a style="text-decoration:underline;" class="tm-tree-expand-down" href="javascript:void(0);">展开</a>&nbsp;&nbsp;<a  style="text-decoration:underline;" class="tm-tree-expand-up" href="javascript:void(0);">收起</a>';
			}
			root += "</div>";
			
			for (var i = 0; i < opts.root.length; i++) {
				root += '<ul class="tree treeFolder">';
				var rootData = opts.root[i];
				//var opid = rootData.opid;
				var parent = rootData.pid;
				var childJson = opts.children[parent];
				root += dateMessage("", treeLineCount, rootData, childJson, opts);
				root += "</ul>";
			}
			
			//树初始化
			$this.append(root);

			/*事件绑定*/
			initEvent($this, opts);

			/*其他事件*/
			tm_tree_line_icons($this, opts);

			if (opts.width != 0) {
				$this.width(opts.width + "px");
			}
			if (opts.height != 0) {
				$this.css({
					height: opts.height + "px",
					overflow: "auto"
				});
			}
			if (opts.left != 0 && opts.top != 0) {
				$this.css({
					left: opts.left,
					top: opts.top
				});
			}
			if (isNotEmpty(opts.border)) {
				$this.css("border", opts.border);
			}
		}
		
		//加载html数据
		function dateMessage(rid, treeLineCount, rootData, childrenData, opts) {
			
			if (isEmpty(rootData.url)){
				 rootData.url = "javascript:void(0);";
			}
			
			if (childrenData != undefined) {
				if (rid != ""){
					rid = 'pid="' + rid + '"';
				}
				
				if(rootData.mark && isNotEmpty(rootData.mark) && rootData.mark=="focus"){
					rootData.mark = "tm-tree-checkbox-focus";
				}else if(rootData.mark && isNotEmpty(rootData.mark) && rootData.mark=="check"){
					rootData.mark = "tm-tree-checkbox-checked  markParent";
				}else if(rootData.mark && isNotEmpty(rootData.mark) && rootData.mark=="unCheck"){
					rootData.mark = "";
				}
					
				var rootHTML = '<li id="tm-tree-' + rootData.opid + '" opid="' + rootData.opid + '" ' + rid + '>';
				
				if (isEmpty(opts.type)) {
					rootHTML += '<div class="father">'
					+ 				getTreeLine(treeLineCount) 
					+ 				'<div class="expandable toggle"></div>'
					+				'<div class="folder_expandable"></div>'
					+				'<label class="tm-ui-tree-name" id="tm-tree-name-'+ rootData.opid + '">'
					+					'<a href=' +rootData.url+ ' opid="'+ rootData.opid + '" ' + rid + ' ' + opts.elements + '>'+ rootData.name + '</a>'
					+				'</label>'
					+			'</div>';
				} else {
					rootHTML += '<div class="father">' 
					+ 				 getTreeLine(treeLineCount) 
					+ 				'<div class="expandable toggle"></div>'
					+				'<div class="folder_expandable"></div>'
					+				'<div class="folder_' + opts.type + '_expandable">'
					+					'<span class="tm-tree-'+ opts.type +' '+rootData.mark+'" data-title="' + rootData.name + '" opid="' + rootData.opid +'" '+ rid + '></span>'
					+				'</div>'
					+				'<label class="tm-ui-tree-name" id="tm-tree-name-'+ rootData.opid + '">'
					+					'<a href='+rootData.url+' title="'+ rootData.name +'" opid="'+ rootData.opid + '" ' + rid + ' ' + opts.elements + '>'+ rootData.name + '</a>'
					+				'</label>'
					+			'</div>';
				}
		
				rootHTML += '<ul style="display:none;">';
				treeLineCount++;
		
				if (childrenData != undefined) {
					for (var i = 0; i < childrenData.length; i++) {
						var cdata = opts.children[childrenData[i].pid];
						if (cdata != undefined) {
							rootId = rootData.opid;
							rootHTML += dateMessage(rootId, treeLineCount, childrenData[i], cdata, opts);
						} else {
							 //这里递归
							if (isEmpty(childrenData[i].url)){
								childrenData[i].url = "javascript:void(0);";
							}
							if (isNotEmpty(childrenData[i].mark) && childrenData[i].mark == "check"){
								childrenData[i].mark = "tm-tree-checkbox-checked";
								
							}else if(isNotEmpty(childrenData[i].mark) && childrenData[i].mark == "focus"){
								childrenData[i].mark = "tm-tree-checkbox-focus";
							}
							
							if (isEmpty(opts.type)) {
								rootHTML += '<li id="tm-tree-'+ childrenData[i].opid +'" opid="'+ childrenData[i].opid +'" pid="'+ rootData.opid + '">'
								+'				<div class="">' 
								+ 					getTreeLine(treeLineCount) 
								+'					<div class="node"></div>'
								+'					<div class="file"></div>'
								+'					<label class="tm-ui-tree-name" id="tm-tree-name-'+ childrenData[i].opid +'">'
								+'						<a href='+ childrenData[i].url+' opid="'+ childrenData[i].opid + '" pid="'+ rootData.opid + '"' + opts.elements + '>'+ childrenData[i].name +'</a>'
								+'					</label>'
								+'				</div>'
								+'			</li>';
							} else {
								rootHTML += '<li id="tm-tree-'+ childrenData[i].opid +'" opid="'+ childrenData[i].opid + '" pid="'+ rootData.opid + '">'
								+'				<div class="">'
								+ 					getTreeLine(treeLineCount)
								+'					<div class="node"></div>'
								+'					<div class="file"></div>'
								+'					<div class="file_' + opts.type + '">'
								+'						<span class="tm-tree-'+ opts.type +' '+ childrenData[i].mark+'" data-title="' + childrenData[i].name + '" opid="'+ childrenData[i].opid +'" pid="'+ rootData.opid+ '"></span>'
								+'					</div>'
								+'					<label class="tm-ui-tree-name" id="tm-tree-name-'+ childrenData[i].opid + '">'
								+'						<a href=' + childrenData[i].url + ' title="'+ childrenData[i].name +'" opid="'+ childrenData[i].opid +'" pid="'+ rootData.opid + '" ' + opts.elements + '>'+ childrenData[i].name +'</a>'
								+'					</label>'
								+'				</div>'
								+'			</li>';
							}
						}
					}
					rootHTML += "</ul>";
					rootHTML += '</li>';
				}
		
				return rootHTML;

			} else {
				//没有子节点
				if (isEmpty(opts.type)) {
					return '<li id="tm-tree-'+ rootData.opid + '" class="last" opid="' + rootData.opid + '">'
						  +'	<div class="">'
						  +'		<div class="node"></div>'
						  +'		<div class="file"></div>'
						  +'		<label class="tm-ui-tree-name" id="tm-tree-name-'+ rootData.opid + '">'
						  +'			<a href=' + rootData.url + 'opid="' + rootData.opid + '" ' + opts.elements + '>'+ rootData.name +'</a>'
						  +'		</label>'
						  +'	</div>'
						  +'</li>';
				} else {
					//选中的效果
					if (isNotEmpty(rootData.mark) && rootData.mark == "check"){
						rootData.mark = "tm-tree-checkbox-checked";
					}else{
						rootData.mark = "";
					}
					return '<li id="tm-tree-' + rootData.opid + '" class="last" opid="'+ rootData.opid + '">'
						  +' 	<div class="">'
						  +'		<div class="node"></div>'
						  +'		<div class="file"></div>'
						  +'		<div class="file_' + opts.type + '">'
						  +'			<span class="tm-tree-'+ opts.type +' '+rootData.mark+'" data-title="' + rootData.name + '" opid="' + rootData.opid + '"></span>'
						  +'		</div>'
						  +'		<label class="tm-ui-tree-name" id="tm-tree-name-'+ rootData.opid + '">'
						  +'			<a href=' + rootData.url + ' opid="' + rootData.opid + '" ' + opts.elements + '>'+ rootData.name +'</a>'
						  +'		</label>'
						  +'	</div>'
						  +'</li>';
				}
			}
		}
		
		/*通过全局变量linecount获取需要的线距*/
		function getTreeLine(numberLine) {
			var line = "";
			for (var i = 0; i < numberLine; i++) {
				line += "<div class='line'></div>";
			}
			return line;
		}
		
		/*线和图标控制*/
		function tm_tree_line_icons($this, opts) {
			/*控制是否有图标*/
			if (!opts.icons) {
				$this.find(".folder_expandable").hide();
				$this.find(".file").hide();
			}
			/*控制是否有线*/
			if (!opts.line) {
				$this.find(".line").css("backgroundPosition", "0 -600px");
				$this.find(".node").css("backgroundPosition", "0 -600px");
			}
		}

		//搜索方法
		function jsSearch(obj){
			
			setTimeout(function(){
				
				var val = $(obj).find(".search_in").val().trim();
				var tree = $(obj).find(".tree .tm-ui-tree-name");
				tree.find("a").css("color","#183152");
				$(obj).find(".tree .toggle").removeClass("first_collapsable").addClass("expandable");
				$(obj).find(".tree .father").next().hide();
				
				if(isNotEmpty(val)){
					tree.each(function(i){
						var treeVal = $(this).text();
						if(treeVal.toLowerCase().indexOf(val.toLowerCase()) != -1){	
							$(this).find("a").css("color","red");
							
							$(this).parent().find(".toggle").removeClass("first_collapsable").addClass("expandable");
							$(this).parent().next().hide();
		
							$(this).parents("ul").each(function(){
								$(this).show();
							});
							
							var liDom = $(this).parents("li");
							liDom.each(function(i){
								$(this).children(".father").find(".toggle").removeClass("expandable").addClass("first_collapsable");
								liDom.eq(0).children(".father").find(".toggle").removeClass("first_collapsable").addClass("expandable");
							});
						}
					});
					
					if(tree.text().toLowerCase().indexOf(val.toLowerCase()) == -1){
						$(obj).find(".inputclear").removeClass("cd").removeClass("cb").addClass("tm_red");
					}else{
						$(obj).find(".inputclear").removeClass("cd").removeClass("tm_red").addClass("cb");
					}
					
				}else{
					$(obj).find(".tree .toggle").each(function(){
						$(this).removeClass("first_collapsable").addClass("expandable");
						$(obj).find(".tree ul").css("display","none");
					});
				}
			},0);
		}

		/*初始化事件*/
		function initEvent($this, opts) {
			//隐藏下拉框
			$(document).click(function() {
				if(isNotEmpty($(".search_in").val())){
					$(".search_in").val("");
				}
				$(".inputclear").hide();
				$this.hide();
			});
			
			//点击树空件
			$this.click(function(e) {
				var e = e || window.event;
				stopPropagation(e);
			});
			
			//点击收缩展开开关
			$this.find(".toggle").click(function() {   
				$(this).toggleClass("first_collapsable expandable");
				if ($(this).hasClass("first_collapsable")) {
					$(this).parent().next().show();
					//判断互斥
					if (opts.exclusion) {
						$(this).parents(".tree").siblings().find(".first_collapsable").removeClass("first_collapsable").addClass("expandable");
						$(this).parents(".tree").siblings().find(".expandable").parent().next().hide();
						
						$(this).parents("li").siblings().find(".first_collapsable").removeClass("first_collapsable").addClass("expandable");
						$(this).parents("li").siblings().find(".expandable").parent().next().hide();
					}
				} else {
					$(this).parent().next().hide();
				}
			});
			
			//js搜索
			if(opts.showSearch && opts.searchMethod == "js"){
				$this.find(".rootDiv").css({"margin-top":"40px"});
				//调用搜索方法
				$this.find(".searchbutton").click(function(){
					jsSearch($this);
				});
				
				//输入框获取焦点事件
				$this.find(".search_in").focus(function(){
					$this.find(".inputclear").show().removeClass("cd").removeClass("tm_red").addClass("cb");
					
				});
				//输入框获取焦点事件
				$this.find(".search_in").blur(function(){
					var val = $this.find(".search_in").val();
					if(val != null || val != ""){
						$this.find(".inputclear").show().removeClass("cb").removeClass("tm_red").addClass("cd");
					}else{
						$this.find(".inputclear").hide();
					}
				});
				//点击重置按钮
				$this.find(".inputclear").click(function(){
					$(this).parent().find(".search_in").val("");
					$this.scrollTop(0);
					$(this).hide();
					jsSearch($this);
				});
				//回车键触发搜索
				$this.find(".search_in").keydown(function(e){
					var e = e || window.event;
					if(e.keyCode == 13){
						jsSearch($this);
					}
				});
			}
			
			//java搜索
			if(opts.showSearch && opts.searchMethod == "java"){
				$this.find(".rootDiv").css({"margin-top":"40px"});
				//调用搜索方法
				$this.find(".searchbutton").click(function(){
					javaSearch($this);
				});
				
				//输入框获取焦点事件
				$this.find(".search_in").focus(function(){
					$this.find(".inputclear").show().removeClass("cd").removeClass("tm_red").addClass("cb");
					
				});
				//输入框获取焦点事件
				$this.find(".search_in").blur(function(){
					var val = $this.find(".search_in").val();
					if(val != null || val != ""){
						$this.find(".inputclear").show().removeClass("cb").removeClass("tm_red").addClass("cd");
					}else{
						$this.find(".inputclear").hide();
					}
				});
				//点击重置按钮
				$this.find(".inputclear").click(function(){
					$(this).parent().find(".search_in").val("");
					$this.scrollTop(0);
					$(this).hide();
					javaSearch($this);
				});
				//回车键触发搜索
				$this.find(".search_in").keydown(function(e){
					var e = e || window.event;
					if(e.keyCode == 13){
						javaSearch($this);
					}
				});
			}
					
			/*点击选中*/
			if (isNotEmpty(opts.to)) {
				$this.hide();
				var arr = [];
				var opidsArr = [];
				var namesArr = [];

				$(opts.to).click(function(e) {
					
					var x = $(this).offset().left;
					var y = $(this).offset().top + $(this).height() + 1;
					var width = $(this).width();
					alert(x +"--"+y+"---"+width);
					$this.css({
						border: "1px solid #ccc",
						width: width,
						position: "absolute",
						left: x,
						top: y
					}).toggle();

					stopPropagation(e);
				});
				
				/*子类选中定位事件*/
				if (opts.childrenSelected) {
					/*事件绑定*/
					$this.find(".file").next(".tm-ui-tree-name").find("a").click(function(e) {
						tree_zindex++;
						var opid = $(this).attr("opid");
						var pid = $(this).attr("pid");
						var name = $this.find("#tm-tree-name-" + opid).text();
						var pid = $this.find("#tm-tree-" + opid).attr("pid");
						var text = $(this).text();
						var pname = $this.find("#tm-tree-name-" + pid).text();
						if (isEmpty(pid))
							pid = opid;
						if (isEmpty(pname))
							pname = name;
						$(".tm-selected-floder").removeClass("tm-selected-floder");
						var data = {
							opid: opid,
							name: name,
							pid: pid,
							pname: pname
						};
						if (opts.ctrl) {
							if (e.ctrlKey) {
								if (!$(this).parent().hasClass("tm_85C1E4")) {
									arr.push(data);
									$(this).parent().addClass("tm_85C1E4");
								} else {
									arr.removeObject(text);
									namesArr.removeElement(text);
									opidsArr.removeElement(opid);
									$(this).parent().removeClass("tm_85C1E4");
								}
								for (var i = 0; i < arr.length; i++) {
									var jsonData = arr[i];
									if ($.inArray(jsonData.name, namesArr) == -1) {
										opidsArr.push(jsonData.opid);
										namesArr.push(jsonData.name);
									}
								}
								opts.onclick($this, {
									opid: opidsArr.toString(),
									name: namesArr.toString(),
									pid: pid,
									pname: pname
								});
							} else {
								$(".tm-ui-tree-name").removeClass("tm_85C1E4");
								arr = new Array();
								opidsArr = new Array();
								namesArr = new Array();
								namesArr.push(name);
								opidsArr.push(opid);
								arr.push(data);
								$(this).parent().addClass("tm_85C1E4");
								opts.onclick($this, data);
							}
						} else {
							$(".tm-ui-tree-name").removeClass("tm_85C1E4");
							$(this).parent().addClass("tm_85C1E4");
							namesArr = new Array();
							opidsArr = new Array();
							namesArr.push(name);
							opidsArr.push(opid);
							arr.push(data);
							opts.onclick($this, data);
						}
					});
				}
				
				/*父类选中子类定位事件*/
				if (opts.parentSelected) {
					tree_zindex++;
					$this.find(".folder_expandable").next(".tm-ui-tree-name").find("a").click(function() {
						var opid = $(this).attr("opid");
						var pname = $(this).text();
						var $parent = $this.find("#tm-tree-" + opid);
						if (!$(this).hasClass("tm-selected-floder")) {
							$parent.find(".folder_expandable").next(".tm-ui-tree-name").find("a").addClass("tm-selected-floder");
							$(this).addClass("tm-selected-floder");
							$parent.find("li").find(".file").next(".tm-ui-tree-name").find("a").each(function() {
								$(this).parent().addClass("tm_85C1E4");
								namesArr.push($(this).text());
								opidsArr.push($(this).attr("opid"));
							});
						} else {
							$(this).removeClass("tm-selected-floder");
							$parent.find(".folder_expandable").next(".tm-ui-tree-name").find("a").removeClass("tm-selected-floder");
							$parent.find("li").find(".file").next(".tm-ui-tree-name").find("a").each(function() {
								$(this).parent().removeClass("tm_85C1E4");
								namesArr.removeElement($(this).text());
								opidsArr.removeElement($(this).attr("opid"));
							});
						}
						opts.onclick($this, {
							opid: $.tmArray.unique(opidsArr).toString(),
							name: $.tmArray.unique(namesArr).toString(),
							pid: opid,
							pname: pname
						});
					});
				}
				
				$this.css("zIndex", tree_zindex);

			} else {
				$this.find(".folder_expandable").next(".tm-ui-tree-name").find("a").click(function() {
					if (isNotEmpty(opts.selectClass)) {
						$(".tm-ui-tree-name").find("a").removeClass(opts.selectClass);
						$(this).addClass(opts.selectClass);
					}
					var opid = $(this).attr("opid");
					var name = $(this).text();
					var pid = $this.find("#tm-tree-" + opid).attr("pid");
					var pname = $this.find("#tm-tree-name-" + pid).text();
					if (isEmpty(pid))
						pid = opid;
					if (isEmpty(pname))
						pname = name;
					var data = {
						opid: opid,
						name: name,
						pid: pid,
						pname: pname
					};
					opts.onclick($this, data);
				});
				
				$this.find(".file").next(".tm-ui-tree-name").find("a").click(function() {
					if (isNotEmpty(opts.selectClass)) {
						$(".tm-ui-tree-name").find("a").removeClass(opts.selectClass);
						$(this).addClass(opts.selectClass);
					}
					var opid = $(this).attr("opid");
					var name = $(this).text();
					var pid = $this.find("#tm-tree-" + opid).attr("pid");
					var pname = $this.find("#tm-tree-name-" + pid).text();
					if (isEmpty(pid))
						pid = opid;
					if (isEmpty(pname))
						pname = name;
					var data = {
						opid: opid,
						name: name,
						pid: pid,
						pname: pname
					};
					opts.onclick($this, data);
				});
			}
			
			$this.click(function() {
				tree_zindex++;
				$this.css("zIndex", tree_zindex);
			});

			/*只限制于子类点击按住ctrl多选*/
			
			//是否采用右键
			if (opts.rightMenu) {
				$this.find(".tm-ui-tree-name").attr("menu", "tm-tree-menu");
				$this.find(".tm-ui-tree-name").find("*").attr("menu", "tm-tree-menu");
			};
			
			/*行高亮*/
			$this.find(".tm-ui-tree-name").hover(function() {
				$(this).parent().addClass("tm_ccc");
			}, function() {
				$(this).parent().removeClass("tm_ccc");
			});
			
			/*展开收起*/
			$this.find(".tm-tree-expand-down").on("click", function() {
				$this.find(".expandable").addClass("first_collapsable");
				$this.find(".expandable").removeClass("expandable");
				$this.find("ul").show();
			});
			
			$this.find(".tm-tree-expand-up").on("click", function() {
				$this.find(".first_collapsable").addClass("expandable");
				$this.find(".first_collapsable").removeClass("first_collapsable");
				$this.find("ul").hide();
				$this.find(".tree").show();
			});
			
			/*关闭*/
			$this.find(".tm-tree-close").on("click", function() {
				$this.hide();
			});
			
			/*展开第几个节点*/
			if (isNotEmpty(opts.expandCount) && opts.expandCount != 0) {
				var $li = $this.find(".tree").children("li").eq((opts.expandCount - 1));
				$li.find("ul").show();
				$li.find(".expandable").removeClass("expandable").addClass("first_collapsable");
			}
			
			/*
			 * tm-tree-checkbox:最初没有选中状态
			 * tm-tree-checkbox-focus:半选状态
			 * tm-tree-checkbox-checked:选中状态
			 */
			if (!opts.isRadio) {
				
				$this.find(".tm-tree-" + opts.type).click(function() {
					var opid = $(this).attr("opid");
					var pid = $(this).attr("pid");
					//找到父元素
					var $parent = $this.find("#tm-tree-" + opid);
					//找到根元素
					var $parents = $this.find("#tm-tree-" + pid);
					
					//判断当前的复选框是否选中
					if (!$(this).hasClass("tm-tree-" + opts.type + "-checked")) {
						//当前元素选中
						$(this).addClass("tm-tree-" + opts.type + "-checked");
						//遍历父类下所有的复选框选中
						$parent.each(function() {
							$(this).find(".tm-tree-" + opts.type).addClass("tm-tree-" + opts.type + "-checked");
							//$(this).find(".tm-tree-"+opts.type).addClass("tm-tree-"+opts.type+"-checked").addClass("tm-tree-"+opts.type+"-focus");
						});
						//遍历根元素下的所有的复选框选中(从里到外)
						$(this).parents("li").each(function() {
							var $p = $(this);
							var len = $p.find(".tm-tree-" + opts.type).length;
							var clen = $p.find(".tm-tree-" + opts.type + "-checked").length;
							//var flen = $p.find(".tm-tree-" + opts.type + "-focus").length;
							//alert("复选框个数"+len +"==="+"选中的个数"+clen+"==="+"半选的个数"+flen)
							
							if (len != (clen + 1)) {
								$p.find(".tm-tree-" + opts.type).first().addClass("tm-tree-" + opts.type + "-focus");
								$parent.find(".tm-tree-" + opts.type).removeClass("tm-tree-" + opts.type + "-focus");
								$parents.find("li .tm-tree-" + opts.type).removeClass("tm-tree-" + opts.type + "-focus");
							} else {
								$p.find(".tm-tree-" + opts.type).addClass("tm-tree-" + opts.type + "-checked");
							}
							
							//若已选中则去掉半选状态
							if ($parents.children(".father").find(".tm-tree-" + opts.type).hasClass("tm-tree-" + opts.type + "-checked")) {
								$parents.children(".father").find(".tm-tree-" + opts.type).removeClass("tm-tree-" + opts.type + "-focus");
							}  
						});
					} else {
						//若已选中则取消
						$(this).removeClass("tm-tree-" + opts.type + "-focus").removeClass("tm-tree-" + opts.type + "-checked");
						
						$parent.each(function() {
							$(this).find(".tm-tree-" + opts.type).removeClass("tm-tree-" + opts.type + "-focus").removeClass("tm-tree-" + opts.type + "-checked");
						});
						
						$(this).parents("li").each(function() {
							var $p = $(this);
							//var len = $p.find(".tm-tree-" + opts.type).length;
							var clen = $p.find(".tm-tree-" + opts.type + "-checked").length;
							if (clen != 0) {
								$p.find(".tm-tree-" + opts.type).first().removeClass("tm-tree-" + opts.type + "-checked").addClass("tm-tree-" + opts.type + "-focus");
							} else {
								$p.find(".tm-tree-" + opts.type).first().removeClass("tm-tree-" + opts.type + "-focus").removeClass("tm-tree-" + opts.type + "-checked");
							}
						});
					}
					
					if(opts.markParent && ($parents.children(".father").find(".tm-tree-" + opts.type).hasClass("tm-tree-" + opts.type + "-checked") || $parent.children(".father").find(".tm-tree-" + opts.type).hasClass("tm-tree-" + opts.type + "-checked"))){
						$parents.children(".father").find(".tm-tree-" + opts.type).addClass("markParent");
						$parent.children(".father").find(".tm-tree-" + opts.type).addClass("markParent");
					}else{
						$parents.children(".father").find(".tm-tree-" + opts.type).removeClass("markParent");
						$parent.children(".father").find(".tm-tree-" + opts.type).removeClass("markParent");
					}
					
					var chkOpidArr = [];
					var chkNameArr = [];
					var chkParentOpidArr = [];
					var chkParentNameArr = [];
					var focusOpidArr = [];
					var focusNameArr = [];
					//遍历选中的复选框
					$this.find(".tm-tree-" + opts.type + "-checked").each(function() {
						
						if($(this).hasClass("markParent")){
							var parentName = $(this).parent().next().text().replace(/[\t|\n|\s+]/g,"");
							var parentOpid = $(this).attr("opid");
							chkParentNameArr.push(parentName);
							chkParentOpidArr.push(parentOpid);
						}
						
						var name = $(this).parent().next().text();
						if(name.indexOf("-")!=-1){
							name = name.split("-")[1].replace(/[\t|\n|\s+]/g,"");
						}else{
							name = $(this).parent().next().text().replace(/[\t|\n|\s+]/g,"");
						}
						var opid = $(this).attr("opid");
						
						chkOpidArr.push(opid);
						chkNameArr.push(name);
					}
					);
					//遍历获取到焦点的复选框
					$this.find(".tm-tree-" + opts.type + "-focus").each(function() {
						var name = $(this).parent().next().text();
						focusOpidArr.push($(this).attr("opid"));
						focusNameArr.push(name);
					});
					
					//var checkedArr = {opid:$.tmArray.unique(chkOpidArr).toString(),name:$.tmArray.unique(chkNameArr).toString()};
					var checkedArr = {
						opid: chkOpidArr.toString(),
						name: chkNameArr.toString(),
						parentOpid: chkParentOpidArr.toString(),
						parentName: chkParentNameArr.toString()
					};
					var focusArr = {
						opid: focusOpidArr.toString(),
						name: focusNameArr.toString()
					};
					
					var data = {
						"checkArr": checkedArr,
						"focusArr": focusArr
					};
					opts.onclick($(this), data);
				});
			} else {
				//raido互斥
				$this.find(".tm-tree-" + opts.type).click(function() {
					var opid = $(this).attr("opid");
					var pid = $(this).attr("pid");
					
					$this.find(".tm-tree-" + opts.type).removeClass("tm-tree-" + opts.type + "-checked").removeClass("tm-tree-" + opts.type + "-focus");

					$(this).parents("li").each(function() {
						$(this).children().first().find(".tm-tree-" + opts.type).addClass("tm-tree-" + opts.type + "-focus");
					});

					$(this).addClass("tm-tree-" + opts.type + "-checked").removeClass("tm-tree-" + opts.type + "-focus");
					
					var pName = [];
					//遍历获取到焦点的复选框
					$this.find(".tm-tree-" + opts.type + "-focus").each(function() {
						var pNames = $(this).parent().next().text();
						if(pNames.indexOf("-")!=-1){
							pNames = pNames.split("-")[1].replace(/[\t|\n|\s+]/g,"");
						}else{
							pNames = $(this).parent().next().text().replace(/[\t|\n|\s+]/g,"");
						}
						pName.push(pNames);
					});
					
					var name = $(this).parent().next().text();
					if(name.indexOf("-")!=-1){
						name = name.split("-")[1].replace(/[\t|\n|\s+]/g,"");
					}else{
						name = $(this).parent().next().text().replace(/[\t|\n|\s+]/g,"");
					}
					
					var pname = pName.join("/");

					if (isEmpty(pname)){pname = name;}
					if (isEmpty(pid)){pid = opid;}
					
					var data = {
						opid: opid,
						name: name,
						pid: pid,
						pname: pname
					};
					opts.onclick($(this), data);
				});
			}
			
			//点击名称触发复选框事件
			$this.find(".tm-ui-tree-name").click(function() {
				$(this).prev().find("span").trigger("click");
			});
			
			//文件夹图标
			if (opts.iconFolder) {
				$(".file").addClass("folder_expandable");
				$(".folder_expandable").removeClass("file");
			}

			//文件图标
			if (opts.iconFile) {
				$(".folder_expandable").addClass("file");
				$(".file").removeClass("folder_expandable");
			}
		};
		
		$.fn.kimTree.parseOptions = function($target) {
			return {
				width: $target.attr("width"),
				height: $target.attr("height")
			};
		};
		
		$.fn.kimTree.methods = {
			remove: function($this) {
				$this.remove();
			}
		};
		
		function tm_window_posXY(event) {
			event = event || window.event;
			var posX = event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
			var posY = event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
			return {
				x: posX,
				y: posY
			};
		};
		
		$.fn.kimTree.defaults = {
			root: [ {name: "主题框架1",url: "",opid: 1,pid: "root1",mark:"focus"}, 
					{name: "主题框架2",url: "",opid: 2,pid: "root2"}, 
					{name: "主题框架3",url: "",opid: 3,pid: "root3"}, 
					{name: "主题框架4",url: "",opid: 4,pid: "root4"}, 
					{name: "主题框架5",url: "",opid: 5,pid: "root5"}, 
					{name: "主题框架6",url: "",opid: 6,pid: "root6"}
				  ],
			
			children: {
			   root1: [ {name: "框架11",url: "javascript:void(0);",opid: 11,pid: "c11",mark:"check"}, 
						{name: "框架12",url: "javascript:void(0);",opid: 12,pid: "c12",mark:"check"}, 
						{name: "框架13",url: "javascript:void(0);",opid: 13,pid: "c13",mark:"check"}
					  ],
					   
			   root2: [ {name: "框架21",url: "javascript:void(0);",opid: 21,pid: "c21",mark:"check"}, 
						{name: "框架22",url: "javascript:void(0);",opid: 22,pid: "c22"}, 
						{name: "框架23",url: "javascript:void(0);",opid: 23,pid: "c23"}
					  ],
					   
			   root3: [{name: "框架31",url: "javascript:void(0);",opid: 31,pid: "c31"}, 
					   {name: "框架32",url: "javascript:void(0);",opid: 32,pid: "c32"}, 
					   {name: "框架33",url: "javascript:void(0);",opid: 33,pid: "c33"}
					  ],
					  
			   root4: [{name: "框架41",url: "javascript:void(0);",opid: 41,pid: "c41"}, 
					   {name: "框架42",url: "javascript:void(0);",opid: 42,pid: "c42"}, 
					   {name: "框架43",url: "javascript:void(0);",opid: 43,pid: "c43"}
					  ],
			   c41: [{name: "框架41",url: "javascript:void(0);",opid: 411,pid: "c411"}, 
					 {name: "框架42",url: "javascript:void(0);",opid: 42,pid: "c42"}, 
					 {name: "框架43",url: "javascript:void(0);",opid: 43,pid: "c43"}
				   ]
				
			},
			showSearch: true,
			searchMethod: "js",
			checkData:"",
			elements: "",
			selectClass: "",
			exclusion: true,/*根节点同时点击是否互斥*/
			rightMenu: false,
			expand: false,//是否显示展开和收起
			expandCount: 1,//展示第几个节点
			showClose: false,//是否显示关闭
			type: "",//
			iconFolder: false,
			iconFile: false,
			icons: true,//控制是否显示图标
			line: true,//控制是否显示线
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			isRadio: false,
			childrenSelected: false,/*控制只能选择子类*/
			parentSelected: false,/*控制父类选中所有子类不包含自身*/
			to: "",//目标元素
			ctrl: false,//目标子元素是否支持多选,和to结合使用
			border: "",//给外边框加线
			onclick: function($obj, data) {//触发点击事件以后回调返回的函数
			
			}
		};


		$.kimTree = {
			_expand: function(pid, obj, e) {
				tableTreeArr = [];
				var $this = $(obj);
				var $root = $("#tm_items_" + pid);
				var isOpen = $root.attr("isOpen");
				var isRoot = $root.attr("isRoot");
				if (isRoot == 1)
					treeBlankCount = 0;
				if (isOpen == 0) {
					$this.attr("src", "../../images/treetable/minus.gif");
					$root.attr("isOpen", 1);
					var len = $(".tm_children_" + pid).length;
					if (len == 0)
						$this.parents("tr").after(this._initChildren(pid));
					$.tmTable._init();
					$(".tm_children_" + pid).show();
				} else {
					$this.attr("src", "../../images/treetable/plus.gif");
					$root.attr("isOpen", 0);
					this._childrenHide(pid);
				}
				//tm_tree_callback(obj,pid,e);
				stopPropagation(e);
			},
			_childrenHide: function(pid) {
				var childrenArr = this._getAllChlidren(pid);
				if (childrenArr.length > 0) {
					for (var i = 0; i < childrenArr.length; i++) {
						var node = $("#tm_items_" + childrenArr[i]);
						$(".tm_children_" + childrenArr[i]).hide();
						if (isNotEmpty(node.attr("isOpen")) && node.attr("isOpen") == 1) {
							node.attr("isOpen", 0);
							$("#tm_items_expand_" + childrenArr[i]).attr("src", "../../images/treetable/plus.gif");
						}
					}
				}
			},
			_initTableTree: function(options) {
				var opts = $.extend({target: $("#tm_tbody")}, options);
				opts.target.data("treeTableData", opts);
				opts.target.html(this._initRoot());
				$.tmTable._init();
				this._initMethod(opts);
			},
			_initMethod: function(opts) {
				if (isNotEmpty(opts.type)) {
					$(".tm_tree_box").find(".tm-icon").before("<input type='" + opts.type + "'/>&nbsp;");
				}
			},
			_initRoot: function() {
				var html = "";
				var n = 1;
				for (var i = 0; i < root.length; i++,n++) {
					var data = root[i];
					var chhtml = "<img id=\"tm_items_expand_" + data.pid + "\"  class=\"tm-icon\" style=\"CURSOR: pointer;\"  onclick=\"$.kimTree._expand(" + data.pid + ",this,event);\" src=\"../../images/treetable/plus.gif\"><img style=\"position: relative;top:2px;\"  src=\"../../images/treetable/fshut.gif\">";
					if (isEmpty(children[data.pid])) {
						//在子类中找不到就不显示收起和展开节点了。
						chhtml = "<img class=\"tm_tree_leaf tm-icon \"  src=\"../../images/treetable/leaf.gif\">";
					}
					html += "<tr id=\"tm_items_" + data.opid + "\" isStatus=\"" + data.publishFlag + "\" parentId=\"" + data.parentId + "\"  opid=\"" + data.opid + "\" isRoot=\"1\"  title=\"" + data.name + "\" isOpen=\"0\" class=\"tm-items\">" + 
					"<td></td>" + 
					"<td><span class=\"tm_sort\">" + n + "</span></td>" + 
					"<td>" + chhtml + "<a href=\"javascript:void(0)\" class=\"tmui-name\">" + data.name + "</a></td>" + 
					"<td><span class=\"tm_publish\">" + data.publish + "</span></td>" + 
					"<td><span class=\"tmui-buttons none\" style=\"position: relative;left: 15px;\" >" + 
					"<a href=\"javascript:void(0)\" opid=\"" + data.opid + "\" onclick=\"$.tmChannel._edit(this)\"><img src=\"../../images/admin/edit.png\" height=\"12\" /></a>&nbsp;&nbsp;&nbsp;&nbsp;" + 
					"<a href=\"javascript:void(0)\" opid=\"" + data.opid + "\" onclick=\"$.tmTable._delete(this)\"><img src=\"../../images/admin/delete.png\" height=\"12\"></a>" + 
					"</span>" + 
					"</td>" + 
					"</tr>";
				}
				return html;
			},
			_initChildren: function(pid) {
				var html = "";
				if (children) {
					var childrenArr = children[pid];
					if (childrenArr.length > 0) {
						var n = 1;
						treeBlankCount++;
						for (var i = 0; i < childrenArr.length; i++,n++) {
							var data = childrenArr[i];
							var chhtml = "<img id=\"tm_items_expand_" + data.pid + "\" style=\"CURSOR: pointer;\" class=\"tm-icon\" onclick=\"$.kimTree._expand(" + data.pid + ",this,event);\" src=\"../../images/treetable/plus.gif\"><img style=\"position: relative;top:2px;\" src=\"../../images/treetable/fshut.gif\">";
							if (isEmpty(children[data.pid])) {
								//在子类中找不到就不显示收起和展开节点了。
								chhtml = "<img class=\"tm_tree_leaf tm-icon\"  src=\"../../images/treetable/leaf.gif\">";
							}
							html += "<tr id=\"tm_items_" + data.opid + "\" isStatus=\"" + data.publishFlag + "\"  parentId=\"" + data.parentId + "\" opid=\"" + data.opid + "\" title=\"" + data.name + "\" class=\"tm-items tm-items-children tm_children_" + pid + "\">" + 
							"<td></td>" + 
							"<td><span class=\"tm_sort\">" + this._getTreeLine(treeBlankCount) + n + "</span></td>" + 
							"<td>" + this._getTreeLine(treeBlankCount) + chhtml + "<a href=\"javascript:void(0)\" class=\"tmui-name\">" + data.name + "</a></td>" + 
							"<td><span class=\"tm_publish\">" + data.publish + "</span></td>" + 
							"<td _td_pro=\"rd\"><span class=\"tmui-buttons none\" style=\"position: relative;left: 15px;\" >" + 
							"<a href=\"javascript:void(0)\" opid=\"" + data.opid + "\" onclick=\"$.tmChannel._edit(this)\"><img src=\"../../images/admin/edit.png\" height=\"12\" /></a>&nbsp;&nbsp;&nbsp;&nbsp;" + 
							"<a href=\"javascript:void(0)\" opid=\"" + data.opid + "\" onclick=\"$.tmTable._delete(this)\"><img src=\"../../images/admin/delete.png\" height=\"12\"></a>" + 
							"</span>" + 
							"</td>" + 
							"</tr>";
						}
					}
				}
				return html;
			},
			_getTreeLine: function(numberLine) {
				var line = "";
				for (var i = 0; i < numberLine; i++) {
					line += "<img src=\"../..//images/treetable/blank.gif\">";
				}
				return line;
			},
			_getAllChlidren: function(pid) {
				tableTreeArr.push(pid);
				var childrenArr = children[pid];
				if (isNotEmpty(childrenArr) && childrenArr.length > 0) {
					for (var i = 0; i < childrenArr.length; i++) {
						this._getAllChlidren(childrenArr[i].pid);
						tableTreeArr.push(childrenArr[i].pid);
					}
				}
				return tableTreeArr;
			}
		};
		
		// 判断非空
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
		
		function isNotEmpty(val) {
			return !isEmpty(val);
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

	})(jQuery);

	/*右键菜单*/
	//function tm_tree_selected(obj, opid) {
	//	var pid = $("#tm-tree-" + opid).attr("pid");
	//	var pname = $("#tm-tree-name-" + pid).text();
	//	myHomeInitLoading("你当前选中的【opid】是：" + opid + ",名称是："
	//			+ $("#tm-tree-name-" + opid).text()
	//			+ "&nbsp;&nbsp;<br/><br/>父类pid是：" + pid + ",父名称是：" + pname);
	//}
	//
	///*获取子类*/
	//function tm_tree_children_selected(obj, opid, mark) {
	//	var $this = $("#tm-tree-" + opid);
	//	var opidArr = [];
	//	if (mark == 'self')
	//		opidArr.push(opid);
	//	$this.find("ul").find("li").each(function() {
	//		if ($(this).attr("pid") == opid) {
	//			opidArr.push($(this).attr("opid"));
	//		}
	//	});
	//	myHomeInitLoading("子类ID有：" + opidArr.toString());
	//}
	//
	//function tm_tree_childrens_selected(obj, opid, mark) {
	//	var $this = $("#tm-tree-" + opid);
	//	var opidArr = [];
	//	if (mark == 'self')
	//		opidArr.push(opid);
	//	$this.find("ul").find("li").each(function() {
	//		opidArr.push($(this).attr("opid"));
	//	});
	//	myHomeInitLoading("所有子类ID有：" + opidArr.toString());
	//}
	///*右键删除子类*/
	//function tm_tree_remove(obj, opid) {
	//	$("#tm-tree-" + opid).remove();
	//}
})();

