/*针对留言板的表单控件的验证信息*/
(function(){
	var nicheng = document.getElementById("nicheng");
	var tips1 = document.getElementsByClassName("tips1");
	var liuyanneirong = document.getElementById("liuyanneirong");
	var tips2 = document.getElementsByClassName("tips2");
	
	nicheng.onfocus = function (){
		var context = "";
		function validate(){
			context = nicheng.value;
			if(context == ""){
			tips1[0].style.display = "none";
			tips1[1].style.display = "block";
			tips1[2].style.display = "none";
			}else{
				tips1[0].style.display = "block";
				tips1[1].style.display = "none";
			}
		}
		setInterval(validate,10);
	};	
	
	nicheng.onblur = function (){
			var context = nicheng.value;
			(function validate(){	
			if(context != ""){
				tips1[0].style.display = "none";
				tips1[1].style.display = "none";
				tips1[2].style.display = "block";
			}else{
				tips1[0].style.display = "block";
				tips1[1].style.display = "none";
				tips1[2].style.display = "none";
			}
		})();
	}	
	
	liuyanneirong.onfocus = function (){
		var context = "";
		function validate(){
			context = liuyanneirong.value;
			if(context == ""){
			tips2[0].style.display = "none";
			tips2[1].style.display = "block";
			tips2[2].style.display = "none";
			}else{
				tips2[0].style.display = "block";
				tips2[1].style.display = "none";
			}
		}
		setInterval(validate,10);
	};	
	
	liuyanneirong.onblur = function (){
			var context = liuyanneirong.value;
			(function validate(){	
			if(context != ""){
				tips2[0].style.display = "none";
				tips2[1].style.display = "none";
				tips2[2].style.display = "block";
			}else{
				tips2[0].style.display = "block";
				tips2[1].style.display = "none";
				tips2[2].style.display = "none";
			}
		})();
	}	
	
})();
