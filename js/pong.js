var canvas = document.getElementById("fcss-pong");

var circleSpeed = 180;

var ball = document.getElementById("pong-ball");
ball.posX = 500;
ball.posY = 100;
ball.posXVel = circleSpeed;
ball.posYVel = -circleSpeed;

var paddleSpeed = 190;

var paddle1 = document.getElementById("pong-paddle-1");
paddle1.posX = canvas.offsetLeft - 15;
paddle1.posY = 100;
paddle1.speed = paddleSpeed;

var paddle2 = document.getElementById("pong-paddle-2");
paddle2.posX = canvas.offsetWidth - canvas.offsetLeft;
paddle2.posY = 100;
paddle2.speed = paddleSpeed;

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

	// Might as well update paddles positions here
	paddle1.style.top = paddle1.posY + "px";
	paddle1.style.left = paddle1.posX + "px";


	paddle2.style.top = paddle2.posY + "px";
	paddle2.style.left = paddle2.posX + "px";
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


	if (ball.posXVel < 0 && ball.posX <= (canvas.offsetWidth / 2)) {
		if (ball.posY+10 < paddle1.posY+10) {
			paddle1.posY -= paddle1.speed * dt;
		} else {
			paddle1.posY += paddle1.speed * dt;
		}
	}

	if (ball.posXVel > 0 && ball.posX >= ((canvas.offsetWidth / 2)) + 50) {
		if (ball.posY+10 < paddle2.posY+10) {
			paddle2.posY -= paddle2.speed * dt;
		} else {
			paddle2.posY += paddle2.speed * dt;
		}
	}

	// Circle Physics
	if (ball.posY <= -5) {
		ball.posYVel = -ball.posYVel;
		ball.posX = ball.oldPosX;
		ball.posY = ball.oldPosY;
	} else if (ball.posY >= canvas.offsetHeight-20) {
		ball.posYVel = -ball.posYVel;
		ball.posX = ball.oldPosX;
		ball.posY = ball.oldPosY;
	}

	if (ball.posX <= 0) {
		ball.posXVel = -ball.posXVel;
		ball.posX = ball.oldPosX;
		ball.posY = ball.oldPosY;
	} else if (ball.posX >= canvas.offsetWidth-30) {
		ball.posXVel = -ball.posXVel;
		ball.posX = ball.oldPosX;
		ball.posY = ball.oldPosY;
	}

	oldNow = now;
}

gameloop();