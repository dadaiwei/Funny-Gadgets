$(function(){
	$("body").css("background", "#E0E0E0");
	init();
	$("#restartGame").click(function(){
		history.go(0);
	});
});
