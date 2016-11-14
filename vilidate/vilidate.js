;(function($){
	//定义jQuery对象
	$.fn.kimVilidate = function(options){
		return this.each(function(){
			var opts = $.extend({},$.fn.kimVilidate.defaults,options);
			//初始化事件
			initEvent($(this),opts);
		});
	};

	//存贮临时密码变量
	var pwd;
	
	//初始化事件
	function initEvent($this,opts){
		
		var vilidateObj = $this.find(".vilidateObj");
		var data = [];
		var objJson = {};
		
		vilidateObj.each(function(){
			var $obj = $(this);
			var val;
			if($obj.prop("tagName").toLowerCase() == "input"){
				val = $obj.val().trim();
			}else{
				val = $obj.text().trim();
			}
			objJson[$obj.attr("id")] = val;
			var validate = $(this).attr("vilidate");
			if(validate){
				var validateArr = validate.split(" ");
				var validateArrLen = validateArr.length;
				for(var i=0;i<validateArrLen;i++){
					data.push(vilidate($obj,validateArr[i],val,opts));
				}
			}
		});
		
		if(opts.result){
			opts.result.call($this,vilidateResult($this,data),objJson);
		}
	}
	
	// 验证方法
	var vilidate = function(obj,match,val,opts){ 
		switch(match){
			case 'required':
				return isEmpty(val)?showMsg(obj,opts.tip_required,false,opts):showMsg(obj,opts.tip_success,true,opts);
			case 'email':
				if(checkReg(val,opts.reg_email) && !isEmpty(val)){
					return showMsg(obj,opts.tip_success,true,opts);
				}else if(isEmpty(val)){
					return showMsg(obj,opts.tip_required,false,opts);
				}else{
					return showMsg(obj,opts.tip_email,false,opts);
				};
			case 'chinese':
				if(checkReg(val,opts.reg_chinese) && !isEmpty(val)){
					return showMsg(obj,opts.tip_success,true,opts);
				}else if(isEmpty(val)){
					return showMsg(obj,opts.tip_required,false,opts);
				}else{
					return showMsg(obj,opts.tip_user,false,opts);
				};
			case 'pwd1':
				return pwd = val; 
			case 'pwd2':
				if(pwdEqual(val,pwd) && !isEmpty(val)){
					return showMsg(obj,opts.tip_success,true,opts);
				}else if(isEmpty(val)){
					return showMsg(obj,opts.tip_required,false,opts);
				}else{
					return showMsg(obj,opts.tip_pwdequal,false,opts);
				};
			case 'idcard':
				if(checkReg(val,opts.reg_idCard) && !isEmpty(val)){
					return showMsg(obj,opts.tip_success,true,opts);
				}else if(isEmpty(val)){
					return showMsg(obj,opts.tip_required,false,opts);
				}else{
					return showMsg(obj,opts.tip_idcard,false,opts);
				};
			case 'phone':
				if(checkReg(val,opts.reg_phone) && !isEmpty(val)){
					return showMsg(obj,opts.tip_success,true,opts);
				}else if(isEmpty(val)){
					return showMsg(obj,opts.tip_required,false,opts);
				}else{
					return showMsg(obj,opts.tip_phone,false,opts);
				};
			defaults:
				return true;
		}
	};

	//判断两次密码是否一致
	var pwdEqual = function(pwd1,pwd2){
		return pwd1 == pwd2 ? true : false;
	};

	//正则验证
	var checkReg = function(str,reg){
		return reg.test(str);
	};

	//显示信息
	var showMsg = function(obj,msg,mark,opts){
		if(opts.tooltip){
			opts.tooltip.tip = msg;
			$(obj).tmTip(opts.tooltip);
		}
		var json = {};
		json[$(obj).attr("id")] = mark;
		return json;
	};
	
	//验证结果
	var vilidateResult = function($this,data){
		var vilidateLen = 0;
		var dataLen = data.length;
		outer:
		for(var i=0;i<dataLen;i++){
			var newJson = data[i];
			inner:
			for(var key in newJson){
				if(newJson[key] == false){
					$this.find("#"+key+"").parent().css("borderColor","red");
					$this.find("#"+key+"").trigger("click").focus();
					//alert("验证不通过！");
					break inner;
				}else{
					//alert("验证通过！");
					$this.find("#"+key+"").parent().css("borderColor","#ddd");
					vilidateLen ++;
				}
			}		
		}
		//全部验证通过后要执行的代码
		if(vilidateLen == dataLen){
			$('.tm-tips').trigger("click");
			return "success";
		}else{
			return "fail";
		}
	};

	$.fn.kimVilidate.defaults ={
		// 提示信息
		tip_success:'验证成功', 
		tip_required:'值不能为空', 
		tip_email:'邮箱格式有误',
		tip_user:"用户名必须是中文",
		tip_phone:'手机号码格式不正确',
		tip_idcard:'身份证号码格式不正确',
		tip_pwdequal: '两次输入密码不一致',
		// 正则验证
		reg_email:/^\w+\@[A-Za-z0-9]+\.[A-Za-z]{2,4}$/i,
		reg_chinese:/^[\u4E00-\u9FA5]+$/, 
		reg_idCard:/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
		reg_phone:/^1[3458]{1}[0-9]{9}$/,
		
		result:function(data,objJson){
			//验证成功后的回调函数
			if(data == "success"){
				//var json = JSON.stringify(objJson);
				//alert(json);
			}	
		},
		tooltip:{
			width: 0,//宽度
			height: 0,//高度如果为0则为自动高度
			event:"click",//触发的事件类型
			arrow:"leftMiddle",
			hideArrow:false,//是否隐藏方向箭头
			background:"#fefe89",//设置背景
			border:"2px solid red",
			//tip: "",//内容
			contentAlign:"center",
			offLeft:0,//左部偏移
			offTop:0,//顶部移动
			color:"#333",
		}
	};

	/**
	 * 判断非空
	 * @param val
	 * @returns {Boolean}
	 */
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


})(jQuery);