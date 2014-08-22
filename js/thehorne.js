var canvas = document.getElementById("fcss-pong");

var circleSpeed = 180;

var ball = document.getElementById("pong-ball");
ball.posX = 100;
ball.posY = 100;
ball.posXVel = circleSpeed;
ball.posYVel = -circleSpeed;

// Timer Stuff
var now = new Date().getTime();
var oldNow = now;

var getPos = function(elem) {
	if (elem) {
		return [elem.offsetLeft, elem.offsetTop];
	}
}

var updateBallPos = function() {
	ball.style.left = ball.posX + "px";
	ball.style.top = ball.posY + "px";
}

var drawCircle = function(ctx, radius, x, y) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = "black";
	ctx.fill();
}

var pxToNumber = function(x) {
	x = x.replace("px", "");
	return parseInt(x);
}

// drawCircle(context, circleRadius, 100, 100);
window.setTimeout(gameloop, 1000 / 60);

var gameloop = function() {
	window.requestAnimationFrame(gameloop);
	now = new Date().getTime();
	dt = (now - oldNow)/1000;
	updateBallPos();

	// context.clearRect(0, 0, canvas.width, canvas.height);
	// drawCircle(context, circleRadius, ball.posX, ball.posY);

	ball.oldPosX = ball.posX;
	ball.oldPosY = ball.posY;
	ball.posX += ball.posXVel * dt;
	ball.posY += ball.posYVel * dt;

	// Circle Physics
	if (ball.posY <= -10) {
		ball.posYVel = -ball.posYVel;
		ball.posX = ball.oldPosX;
		ball.posY = ball.oldPosY;
	} else if (ball.posY >= canvas.offsetHeight-10) {
		ball.posYVel = -ball.posYVel;
		ball.posX = ball.oldPosX;
		ball.posY = ball.oldPosY;
	}

	if (ball.posX <= -10) {
		ball.posXVel = -ball.posXVel;
		ball.posX = ball.oldPosX;
		ball.posY = ball.oldPosY;
	} else if (ball.posX >= canvas.offsetWidth-10) {
		ball.posXVel = -ball.posXVel;
		ball.posX = ball.oldPosX;
		ball.posY = ball.oldPosY;
	}

	oldNow = now;
}

gameloop();