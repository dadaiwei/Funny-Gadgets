$(function(){
	var $game = $("#game");
	$("#game").slideDown(400);
	$(".game1").slideDown(1000);
	var gMarginTop;
	var tid1 = setInterval(function(){
		gMarginTop = parseInt($game.css("margin-top"));
			$("#game").animate({
				marginTop: '-=22px'
			},200);
			if(gMarginTop < 4){
			$game.css("margin-top", '3px');
		}
	},500);
	var tid2 = setInterval(function(){
		gMarginTop =  parseInt($game.css("margin-top"));
			$("#game").animate({
				marginTop: '+=22px'
			},200);
		if(gMarginTop > 25){
			$game.css("margin-top", '25px');
		}
	},500);
	$("#startGame").click(function(){
		clearInterval(tid1);
		clearInterval(tid2);
		location.href="index1.html";
	});	
	$("#quitGame").click(function(){
		window.location.href="about:blank";
	});
});
