var startGame = document.getElementById("startGame");
var endGame = document.getElementById("endGame");
var welcome = document.getElementById("welcome");
var closeFlag = false;
//开始游戏
startGame.onclick = function(){
	window.location.href="index1.html";
};

//退出游戏
endGame.onclick = function(){
	$("#quitGame").fadeIn(1000);  
}

$("#sure").click(function(){
	$("#quitGame").hide(); 
	 window.location.href="about:blank";
});
$("#cancel").click(function(){
	$("#quitGame").fadeOut(500);
});
