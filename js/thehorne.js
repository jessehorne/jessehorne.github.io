var canvas = document.getElementById("pong-canvas");
var context = canvas.getContext('2d');

canvas.width = window.innerWidth-25;
canvas.height = window.innerHeight-250;

var circleX = 100;
var circleY = 100;
var circleRadius = 10;
var circleSpeed = 80;
var circleXVel = circleSpeed;
var circleYVel = -circleSpeed;

// Timer Stuff
var now = new Date().getTime();
var oldNow = now;

var drawCircle = function(ctx, radius, x, y) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = "black";
	ctx.fill();
}

drawCircle(context, circleRadius, 100, 100);

var gameloop = function() {
	window.requestAnimationFrame(gameloop);
	now = new Date().getTime();
	dt = (now - oldNow)/1000;

	context.clearRect(0, 0, canvas.width, canvas.height);
	drawCircle(context, circleRadius, circleX, circleY);

	oldCircleX = circleX;
	oldCircleY = circleY;
	circleX += circleXVel * dt;
	circleY += circleYVel * dt;

	// Circle Physics
	if (circleY <= 0) {
		circleYVel = -circleYVel;
		circleX = oldCircleX;
		circleY = oldCircleY;
	} else if (circleY >= canvas.height) {
		circleYVel = -circleYVel;
		circleX = oldCircleX;
		circleY = oldCircleY;
	}

	if (circleX <= 0) {
		circleXVel = -circleXVel;
		circleX = oldCircleX;
		circleY = oldCircleY;
	} else if (circleX >= canvas.width) {
		circleXVel = -circleXVel;
		circleX = oldCircleX;
		circleY = oldCircleY;
	}

	oldNow = now;
}

gameloop();