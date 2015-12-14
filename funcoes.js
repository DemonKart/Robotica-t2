var canvas = document.getElementById('myCanvas');
document.oncontextmenu=function (){return false};
canvas.width=window.innerWidth-10;
canvas.height=window.innerHeight-10;
var context = canvas.getContext('2d');
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var maxTempo=0;
var tempo=0;
/*global points*/
/*global mapPoints*/

context.lineWidth = 3;
context.strokeStyle = 'black';
context.cap = 'round';

var img = new Image();
img.src='car.png';

/* Velocidade das rodas */
var lstang=-1;
var radius=1; /* Raio das rodas */

function getAngSpeed(vel) { /* Retorna velocidade angular */
    return vel / radius ;
}

function drawMap() {
	var p1,p2;
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

function drawPath (tempo) {
	var p,p1,p2;
	for (var i=1;i<points.length;i++){
		p1=points[i-1];
		p2=points[i];
		
		context.beginPath();
		context.moveTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		if (p2.t<=tempo){
			context.strokeStyle = '#2980b9';
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
		context.arc(p.x,p.y,5,0,2*Math.PI);
		if (i==0)
			context.fillStyle = '#2ecc71';
		else if (i==maxTempo-1)
			context.fillStyle = '#e74c3c';
		else if (p.t<=tempo)
			context.fillStyle = '#3498db';
		else
			context.fillStyle = '#95a5a6';
			
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

function calcWheelVelocitys(vel, ang) {
	var l=0;
	var r=0;
		
	var sp = getAngSpeed(vel); /* Velocidade de cada roda */
	if (lstang == -1 )
      lstang = ang;

  if (lstang != ang){ /* Se fez curva */
  	var ang360=ang;
  	var last360=lstang;
  	if (ang == 0 )
  		ang360 = 360;
  	if (lstang == 0 )
  		last360 = 360;
  	if (ang360 > last360)
  		l = sp;
  	else
  		r = sp;
	}
  else{
    l = sp;
    r = sp;
	}
  lstang = ang;
  var result={};
  result["l"]=l;
  result["r"]=r;
  return result;
}

function drawAnimation(tempo) {
	context.clearRect(0, 0, WIDTH, HEIGHT);
	var p = points[tempo];
	var TO_RADIANS = Math.PI/180;
	drawMap();
	drawPath(p.t);
	var ang = (p.a+360)%360;
	var wheels=calcWheelVelocitys(p.v, ang);
	var printX=prettyPrint('X',p.x/50, p.x);
	var printY=prettyPrint('Y',p.y/50, p.y);
	var printT=prettyPrint('Tempo',p.t/50, p.t/50);
	var printL=prettyPrint('Velocidade roda esquerda',wheels["l"].toFixed(4)*10,wheels["l"].toFixed(4));
	var printR=prettyPrint('Velocidade roda direita',wheels["r"].toFixed(4)*10,wheels["r"].toFixed(4));
	
	var printA='<div class="title">Ângulo &#x2192; '+ang+
	'°</div><div class="block arrow" style="transform:rotate('+ang+'deg);">&#x21a3;</div><br>';
  
	document.getElementById('infos').innerHTML=printX+printY+printT+printL+printR+printA;
	// rotate 45º image "imgSprite", based on its rotation axis located at x=20,y=30 and draw it on context "ctx" of the canvas on coordinates x=200,y=100
	rotateAndPaintImage ( context, img, p.a*TO_RADIANS, p.x, p.y, 46, 22 );
	
	return tempo+1;
}

function Atualizar() {
	tempo=drawAnimation(tempo)%maxTempo;
}

window.onload = function () {
	setInterval(function(){ Atualizar();},250);
}
