/*最新产品轮播代码*/
(function(){
	var content_border =  document.getElementById("content").getElementsByClassName("content_border")[0];
	var content_box = document.getElementById("content").getElementsByClassName("content_box")[0];
	var timer = null;
	var interval = 1000;
	var animated = false;
	var stoped = false;
	
	/*图片位移函数，改变marginLeft值*/
	function animate(event){
		var newMarginleft = parseInt(content_box.style.marginLeft) - 150;
		var interval = 50;
		var speed = -150/interval;
		function go(event){
			animated = true;
			if((parseInt(content_box.style.marginLeft) > newMarginleft)){
				content_box.style.marginLeft = parseInt(content_box.style.marginLeft) + speed + 'px';
				setTimeout(go, interval);				
			}else{
				animated = false;
				content_box.style.marginLeft = newMarginleft + 'px';
				if(newMarginleft < -1050){
					content_box.style.marginLeft = 0 + 'px';
				}
			}
		}
		if(!animated){
			go();
		}
	}
	
	/*自动播放*/
	function play(){
		timer = setInterval(animate,interval);
	}
	/*停止播放*/
	function stop(){
		clearInterval(timer);
	}
	
	content_border.onmouseover = stop;
	content_border.onmouseout = play;
	
	play();
})();

