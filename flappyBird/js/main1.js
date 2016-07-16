$(function(){
	$("body").css("background", "#E0E0E0");	
	setTimeout(init, 2000);
	$("#restartGame").click(function(){
		history.go(0);
	});
});
