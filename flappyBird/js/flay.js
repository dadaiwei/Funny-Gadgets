var ctx;
var birdIndex = 0;
var birds = ["images/0.gif","images/1.gif","images/2.gif"];
var objects = [];
var cwidth = 400;
var cheight = 600;
var tid;
var ver1 = 10;
var ver2;
var gravity = 2;
var pipe_height = 200;
var velocity = 10;
var score = 0;
var isScore = false;
var restart = false;
var tid2;

var back = new Background(0, 0, 400, 600, "./images/bg.png");
var up_pipe = new UpPipe(0, 0, 100, 200, "./images/pipe.png");
var down_pipe = new DownPipe(0, 400, 100, 200, "./images/pipe.png");
var ground = new Background(0, 550, 400, 200, "./images/ground.png");
var bird = new Bird(80, 300, 40, 40, birds);

objects.push(back);
objects.push(up_pipe);
objects.push(down_pipe);
objects.push(ground);
objects.push(bird);

function init(){
	var canvas = document.getElementById('canvas');
	if(!canvas.getContext) { 
		ctx = G_vmlCanvasManager.initElement(canvas); 
	}else{
		ctx = canvas.getContext('2d');
	}
	
	if(document.ontouchend){
		document.ontouchend = touchend;
	}else{
		document.onclick = click;
	}
	document.onkeyup = keyup;
	
	drawWall();
	tid = setInterval(drawWall, 80);
}

function UpPipe(x, y, width, height, img_src){
	this.px = x;
	this.py = y;
	this.pwidth = width;
	this.pheight = height;
	this.img_src = img_src;
	this.draw = drawUpPipe;
}

function drawUpPipe(){
	var img = new Image();
	img.src = this.img_src;
	ctx.drawImage(img, 150, 500, 150, 800, this.px, this.py, this.pwidth, this.pheight);
}

function DownPipe(x, y, width, height, img_src){
	this.px = x;
	this.py = y;
	this.pwidth = width;
	this.pheight = height;
	this.img_src = img_src;
	this.draw = drawDownPipe;
}

function drawDownPipe(){
	var img = new Image();
	img.src = this.img_src;
	ctx.drawImage(img, 0, 500, 150, 500, this.px, this.py, this.pwidth, this.pheight);
}

function Background(x, y, width, height, img_src){
	this.bgx = x;
	this.bgy = y;
	this.bgwidth = width;
	this.bgheight = height;
	var image = new Image();
	image.src = img_src;
	this.img = image;
	this.draw = drawBg;
}

function drawBg(){
	ctx.drawImage(this.img, this.bgx, this.bgy, this.bgwidth, this.bgheight);
}

function Bird(x, y, height, width, img_srcs){
	this.bx = x;
	this.by = y;
	this.bwidth = width;
	this.bheight = height;
	this.imgs = img_srcs;
	this.draw = drawBird;
}

function drawBird(){
	birdIndex++;
	var img = new Image();
	img.src = this.imgs[birdIndex % 3];
	ctx.drawImage(img, this.bx, this.by, this.bwidth, this.bheight);
}

function drawWall(){
	ctx.clearRect(0, 0, cwidth, cheight);
	for(var i = 0; i < objects.length; i++){
		objects[i].draw();
	}
	calculate();
	if(restart == true){
		$("#restartGame").show(500);
	}
}

function calculate(){
	if(bird.by+bird.bheight>ground.bgy || ((bird.bx+bird.bwidth>up_pipe.px)&&(bird.by>up_pipe.py)&&(
			bird.bx+bird.bwidth<up_pipe.px+up_pipe.pwidth)&&(bird.by<up_pipe.py+up_pipe.pheight)) ||
			((bird.bx+bird.bwidth>down_pipe.px)&&(bird.bx+bird.bwidth<down_pipe.px + down_pipe.pwidth)&&(bird.by+bird.bheight>down_pipe.py)&&(
				bird.by + bird.bheight < down_pipe.py + down_pipe.pheight))){
				restart = true;
				clearInterval(tid);
				ctx.fillStyle = '#FFFFFF';
				ctx.font = "30px Accent";
				ctx.fillText("You got " + score + "!", 110, 100);		
				return;
	}
			
	ver2 = ver1 + gravity;
	bird.by += (ver1 + ver2) * 0.5;
	
	if(up_pipe.px + up_pipe.pwidth > 0){
		up_pipe.px -= velocity;
		down_pipe.px -= velocity;
	}else{
		up_pipe.px = 400;
		down_pipe.px = 400;
		up_pipe.pheight = 100 + Math.random()*200;
		down_pipe.py = up_pipe.pheight + pipe_height;
		down_pipe.pheight = 600 - down_pipe.py;
		isScore = true;
	}
	
	if(isScore && bird.bx > up_pipe.px + up_pipe.pwidth){
		score += 1;
		isScore = false;
		if(score > 0 && score % 10 == 0){
			velocity ++;
		}
	}
	
	ctx.fillStyle = "#FFFFFF";
	ctx.font = "30px Accent";
	if(score > 0){
		score%10!=0?ctx.fillText(score,180,100):ctx.fillText("Great!"+score,120,100);
	}
}

function keyup(){	
	bird.by -= 80;
}
function click(){
	bird.by -= 80;
}
function touchend(){
	bird.by -= 80;
}
