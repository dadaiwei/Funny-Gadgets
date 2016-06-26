var endGame = document.getElementById("endGame");
var welcome = document.getElementById("welcome");
var chess = document.getElementById("chess");
var restartGame = document.getElementById("restartGame");

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


//重新开始游戏
restartGame.onclick = function(){
	history.go(0);
}

play();
//开始玩五子棋函数
function play(){
	var chessBoard = [];//棋盘的位置
	var me = true;//起始黑子
	var over = false;//棋有没有结束
	
	//赢法数组
	var wins = [];
	
	//赢法的统计数组
	var myWin = [];//我方赢
	var computerWin = [];//AI赢
	
	for(var i = 0; i < 15; i++){
		chessBoard[i] = [];
		for(var j = 0; j < 15; j++){
			chessBoard[i][j] = 0;
		}
	}
	
	for(var i = 0; i < 15; i++){
		wins[i] = [];
		for(var j = 0; j < 15; j++){
			wins[i][j] = [];
		}
	}
	
	var count = 0;//赢法种类
	//所有的横线的赢法
	//wins[0][0][0] = true
	//wins[0][1][0] = true
	//wins[0][2][0] = true
	//wins[0][3][0] = true
	//wins[0][4][0] = true
	
	//wins[0][1][1] = true
	//wins[0][2][1] = true
	//wins[0][3][1] = true
	//wins[0][4][1] = true
	//wins[0][5][1] = true
	for(var i = 0; i < 15; i++){
		for(var j = 0; j < 11; j++){	
			for(var k =0; k < 5; k++){
				wins[i][j + k][count] = true;
			}
			count++;
		}
	}
	
	//所有纵线的赢法
	//wins[0][0][0] = true
	//wins[1][1][0] = true
	for(var i = 0; i < 15; i++){
		for(var j = 0; j < 11; j++){
			for(var k =0; k < 5; k++){
				wins[j + k][i][count] = true;
			}
			count++;
		}
	}
	
	//所有斜线的赢法
	for(var i = 0; i < 11; i++){
		for(var j = 0; j < 11; j++){
			for(var k =0; k < 5; k++){
				wins[i + k][j + k][count] = true;
			}
			count++;
		}
	}
	
	//所有反斜线的赢法
	for(var i = 0; i < 11; i++){
		for(var j = 14; j > 3; j--){
			for(var k =0; k < 5; k++){
				wins[i + k][j - k][count] = true;
			}
			count++;
		}
	}
	
	for(var i =0; i < count; i++){
		myWin[i] = 0;
		computerWin[i] = 0;
	}
	var context = chess.getContext('2d');
	context.strokeStyle = '#BFBFBF';
	
	//画棋盘
	var drawChessBoard = function(){
			for(var i = 0; i < 15; i++){
			context.moveTo(15 + i * 30, 15);
			context.lineTo(15 + i * 30, 435);
			context.stroke();
			context.moveTo(15, 15 + i * 30);
			context.lineTo(435, 15 + i * 30);
			context.stroke();
		}
	}
	
	drawChessBoard();
	
	//画棋子,i,j分别表示第几行和第几列，me表示(false)白棋还是黑棋(true)
	var oneStep = function(i, j, me ){
		context.beginPath();
		context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
		context.closePath();
		var gradient = context.createRadialGradient(15 + i * 30 +2, 15 + j * 30 - 2, 13, 15 + i * 30 +2, 15 + j * 30 - 2, 0);
		if(me){
			gradient.addColorStop(0, "#0A0A0A");
			gradient.addColorStop(1, "#636766");
		}else{
			gradient.addColorStop(0, "#D1D1D1");
			gradient.addColorStop(1, "#F9F9F9");
		}
		
		context.fillStyle = gradient;
		context.fill();
	}
	
	chess.onclick = function(e){
		if(over){
			return;
		}
		if(!me){
			return;
		}
		var x = e.offsetX;
		var y = e.offsetY;
		var i = Math.floor(x / 30);
		var j = Math.floor(y / 30);
		if(chessBoard[i][j] == 0){
			oneStep(i, j, me);
			chessBoard[i][j] = 1;
			chessBoard[i][j] = 2;
			for(var k = 0; k <count; k++){
				if(wins[i][j][k]){
					myWin[k]++;
					computerWin[k] = 6;
					if(myWin[k] == 5){
						$("#result").fadeIn(1000)
							.find(".result1").show();
						$("#result").fadeIn(1000)
							.find(".result2").hide();
						$("#result").fadeOut(2000);
						over = true;
					}
				}
			}
			if(!over){
				me = !me;
				computerAI();
			}
		}	
	}
	
	var computerAI = function(){
		var myScore = [];//我得分
		var computerScore = [];//计算机得分
		var max = 0;//最高得分
		var u =0, v= 0;//最高分数点的坐标
		for(var i = 0; i< 15; i++){
			myScore[i] = [];
			computerScore[i] = [];
			for(var j = 0; j < 15; j++){
				myScore[i][j] = 0;
				computerScore[i][j] = 0;
			}
		}
		for(var i = 0; i < 15; i++){
			for(var j = 0; j < 15; j++){
				if(chessBoard[i][j] == 0){
					for(var k = 0; k < count; k++){
						if(wins[i][j][k]){
							if(myWin[k] == 1){
								myScore[i][j] += 200;
							}else if(myWin[k] == 2){
								myScore[i][j] += 400;
							}else if(myWin[k] == 3){
								myScore[i][j] += 2000;
							}else if(myWin[k] == 4){
								myScore[i][j] += 10000;
							}
							if(computerWin[k] == 1){
								computerScore[i][j] += 220;
							}else if(computerWin[k] == 2){
								computerScore[i][j] += 420;
							}else if(computerWin[k] == 3){
								computerScore[i][j] += 2100;
							}else if(computerWin[k] == 4){
								computerScore[i][j] += 20000;
							}
						}
					}
					if(myScore[i][j] > max){
						max = myScore[i][j];
						u = i;
						v = j;
					}else if(myScore[i][j] == max){
						if(computerScore[i][j] > computerScore[u][v]){
							u = i;
							v = j;
						}
					}
					if(computerScore[i][j] > max){
						max = computerScore[i][j];
						u = i;
						v = j;
					}else if(computerScore[i][j] == max){
						if(myScore[i][j] > myScore[u][v]){
							u = i;
							v = j;
						}
					}
				}
			}
		}
		oneStep(u, v, false);
		chessBoard[u][v] = 2;
		for(var k = 0; k <count; k++){
				if(wins[u][v][k]){
					computerWin[k]++;
					myWin[k] = 6;
					if(computerWin[k] == 5){
						$("#result").fadeIn(1000)
							.find(".result1").hide();
						$("#result").fadeIn(1000)
							.find(".result2").show();
						$("#result").fadeOut(2000);
						over = true;
					}
				}
			}
			if(!over){
				me = !me;
			}
	}
}


