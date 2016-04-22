// JavaScript Document
function lunbo1(){
	var banner = document.getElementsByClassName("banner")[0];
	var ul = document.getElementById("img");
	var lis = document.getElementById("btn").getElementsByTagName("li");
	var interval = 2000;
	var timer;
	var animated = false;
	var index2;
	function toggle(){
		var index1 = parseInt(ul.style.left)/(-1440);		
		for(var i =0; i < lis.length; i++){
			var index = this.getAttribute("index");
			for(var j = 0; j < lis.length; j++){
				if(lis[j].className == 'on'){
					lis[j].className = '';	
				}		
			}
			lis[index - 1].className = 'on';	
		}
		var offset = (index - index1)*(-1440);
		if(!animated){
				animate(offset);	
		}
	}
	function animate(offset){
		animated = true;
		var newLeft = parseInt(ul.style.left) + offset;
		var time = 400;
		var interval = 10;
		var speed = offset/(time/interval);
		function go(){
			if((speed > 0 && parseInt(ul.style.left) < newLeft) || 
				(speed < 0 && parseInt(ul.style.left) > newLeft)
			){
				ul.style.left = parseInt(ul.style.left)  +  speed + 'px';
				setTimeout(go,interval);	
			}else{
				animated = false;
				ul.style.left = newLeft + 'px';
			if(newLeft > -1440){
				ul.style.left = -14400 + 'px';
			}
			if(newLeft < -14400){
				ul.style.left = -1440 + 'px';
			}
		  }	
		}	
		go();
	}
	for(var i = 0; i < lis.length; i++){
		lis[i].onmouseover = toggle;
	}
	function auto(){
		var offset = -1440;
		index2 = parseInt(ul.style.left)/offset - 1;
		if(index2 == 9){
			index2 = 0;
			lis[9].className = '';
		}else{			
			for(var j = 0; j < lis.length; j++){			
				if(lis[j].className == 'on'){
						lis[j].className = '';	
					}	
			}
			index2 += 1;																
		}				
		lis[index2].className = 'on';			
		if(!animated){
			animate(offset);	
		}		
	}
	function play(){
		timer = setInterval(auto,interval);	
	}
	
	function stop(){
		clearInterval(timer);
	}
	banner.onmouseover = stop;
	banner.onmouseout = play;
	play();
}
lunbo1();


function newsShowHide(){
		var btn1 = document.getElementsByClassName("btn1")[0];
		var btn11 = btn1.getElementsByClassName("btn11")[0];
		var btn2 = document.getElementsByClassName("btn2")[0];
		var btn21 = btn2.getElementsByClassName("btn21")[0];
		var news = document.getElementsByClassName("news")[0];
		var time = 300;
		var interval = 30;
		var speed = 150/ (time / interval);
		var flag = false;
		function btnToggle(){	
		btn11.onclick = function(){
			btn2.style.display = 'block';
			btn1.style.display = 'none';
			showNews();
		}
		btn21.onclick = function(){
			btn2.style.display = 'none';
			btn1.style.display = 'block';
			hideNews();
		}
	}
	btnToggle();
	
	function hideNews(){
		flag = true;
		function setHeight(){
			var height = parseInt(news.style.height);
			if(flag == true){
					if(height > 0){
					news.style.height = height - speed + 'px';
					setTimeout(setHeight,interval);
				}else
				{
					news.style.height = 0 + 'px';		
				}
			}
		}
		setHeight();
	};
	function showNews(){
		flag = false;
		function setHeight(){
			var height = parseInt(news.style.height);
			if(flag == false){
						if(height < 150){
					news.style.height = height + speed + 'px';
					setTimeout(setHeight,interval);
				}else
				{
					news.style.height = 150 + 'px';		
				}
			}
		}
		setHeight();
	};
}
newsShowHide();

function newsChange(){
	var nc =  document.getElementsByClassName('nc')[0];
	var center =  nc.getElementsByClassName('c')[0];
	var ul = center.getElementsByTagName("ul")[0];
	var li = ul.getElementsByTagName["li"];
	var lbtn = nc.getElementsByClassName("l")[0];
	var rbtn = nc.getElementsByClassName("r")[0];
	var index = 1;
	var animated = false;
	var timer;
	var interval = 2000;
	
	function animate(offset){
		var newMarginLeft = parseInt(ul.style.marginLeft) + offset;
		var time = 320;
		var interval = 10;
		var speed = offset/(time/interval);
		function go(){
			animated = true;
			if((speed > 0 && parseInt(ul.style.marginLeft) < newMarginLeft)||
				(speed < 0 && parseInt(ul.style.marginLeft) > newMarginLeft)){
					ul.style.marginLeft = parseInt(ul.style.marginLeft) + speed + 'px';
					setTimeout(go,interval);
				}else{
					animated = false;
						ul.style.marginLeft = newMarginLeft + 'px';
					if(newMarginLeft > -320){
						ul.style.marginLeft = -1600 + 'px';
					}
					if(newMarginLeft < -1600){
						ul.style.marginLeft = -320 + 'px';
					}	
				}
		}
		go();		
	}
	
	lbtn.onclick = function(){
		if(!animated){
			animate(320);	
		}	
	}
	rbtn.onclick = function(){
		if(!animated){
			animate(-320);	
		}
	}
	function play(){
		timer = setInterval(rbtn.onclick, interval);
	}
	function stop(){
		clearInterval(timer);
	}
	nc.onmouseover = stop;
	nc.onmouseout = play;
	play();
}
newsChange();