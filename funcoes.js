var canvas = document.getElementById('myCanvas');
document.oncontextmenu=function (){return false};
canvas.width=window.innerWidth-10;
canvas.height=window.innerHeight-10;
maxTempo=0;
tempo=0;
var context = canvas.getContext('2d');
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var PhMax=300;
var PwMax=300;
cx=WIDTH/2;
cy=HEIGHT/2;

cx+(PwMax/2);
context.lineWidth = 3;
context.strokeStyle = 'black';
context.cap = 'round'

range=10;
ind=-1;
var img = new Image();
img.src='car.png';

function drawMap() {
	for (var i=0;i<mapPoints.length;i=i+2){
		p1=mapPoints[i];
		p2=mapPoints[i+1];
		context.beginPath();
		context.moveTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.strokeStyle = 'black';
		context.stroke();
		context.closePath();
	}
}

function drawSplines (tempo) {
	for (var i=1;i<points.length;i++){
		p1=points[i-1];
		p2=points[i];
		
		context.beginPath();
		context.moveTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		console.log(p2.t+" | "+tempo);
		if (p2.t<tempo){
			context.strokeStyle = 'red';
		}else{
		context.strokeStyle = 'black';
		}
		context.stroke();
		context.closePath();
	}
	if(maxTempo==0){
		maxTempo=i;
	}
	for (var i=0;i<points.length;i++){
		p=points[i];
		context.beginPath();
		context.arc(p.x,p.y,5,0,2*Math.PI)
		context.stroke();
		context.fill();
		context.closePath();
	}
}

function rotateAndPaintImage ( context, image, angleInRad , positionX, positionY, axisX, axisY ) {
  context.translate( positionX, positionY );
  context.rotate( angleInRad );
  context.drawImage( image, -axisX, -axisY );
  context.rotate( -angleInRad );
  context.translate( -positionX, -positionY );
}

function prettyPrint(text,max,value) {
	var blocks='';	
	for (var i = 0; i < max; i++) {
		blocks+='<div class="block"></div>';
	}
	return '<div class="title">'+text+' &#x2192; '+value+'</div>'+blocks+'<br>';
}

function drawAnimation(tempo) {
	context.clearRect(0, 0, WIDTH, HEIGHT);
	var p= points[tempo];
	var TO_RADIANS = Math.PI/180;
	drawMap();
	drawSplines(p.t);
	printX=prettyPrint('X',p.x/50, p.x);
	printY=prettyPrint('Y',p.y/50, p.y);
	printT=prettyPrint('Tempo',p.t/50, p.t/50);
	printV=prettyPrint('Velocidade',p.v.toFixed(4)*10,p.v.toFixed(4));
	var ang = (p.a+360)%360;
	printA='<div class="title">Ângulo &#x2192; '+ang+
	'</div><div class="block arrow" style="transform:rotate('+ang+'deg);">&#x21a3;</div><br>';
	
	document.getElementById('teste').innerHTML=printX+printY+printT+printV+printA;
	// rotate 45º image "imgSprite", based on its rotation axis located at x=20,y=30 and draw it on context "ctx" of the canvas on coordinates x=200,y=100
	rotateAndPaintImage ( context, img, p.a*TO_RADIANS, p.x, p.y, 46, 22 );
	
	return tempo+1;
}

function MouseMove(evt){
	var Ym=evt.clientY;
	var Xm=evt.clientX;
	if (linhas[ind]!=null){
		switch (linhas[ind].edit) {
			case 1:
				if ((Xm<WIDTH) && (Xm >0)) {
					linhas[ind].x1=Xm;
				}
				if ((Ym<HEIGHT) && (Ym >0)) {
					linhas[ind].y1=Ym;
				}
			break;
			case 2:
				if ((Xm<WIDTH) && (Xm >0)) {
					linhas[ind].x2=Xm;
				}
				if ((Ym<HEIGHT) && (Ym >0)) {
					linhas[ind].y2=Ym;
				}
			break;
			case 3:
				if (((Xm<WIDTH) && (Xm >0)) && ((Ym<HEIGHT) && (Ym >0))){
					linhas[ind].x1=origem[ind].oX1+(Xm-Xd);
					linhas[ind].y1=origem[ind].oY1+(Ym-Yd);
					linhas[ind].x2=origem[ind].oX2+(Xm-Xd);
					linhas[ind].y2=origem[ind].oY2+(Ym-Yd);
				}
			break;
			case 4:
				var newInd=(linhas.length)-1;
				// if (((Xm<WIDTH) && (Xm >0)) && ((Ym<HEIGHT) && (Ym >0))){
				linhas[newInd].x1=Xm;
				linhas[newInd].y1=Ym;
				linhas[ind].x2=Xm;
				linhas[ind].y2=Ym;
				// }
			break;
		}
	}
}

function Atualizar() {
	tempo=drawAnimation(tempo)%maxTempo;
}

//window.addEventListener('mousemove', function (evt){document.getElementById('teste').innerHTML='X='+evt.clientX+'<br>Y='+evt.clientY;}, true);


window.onload = function () {
	setInterval(function(){ Atualizar();},100);
}