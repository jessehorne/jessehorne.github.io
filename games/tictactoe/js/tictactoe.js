/*
	Tic Tac Toe v1
	August 16, 2014
	Jesse Horne
*/

// Initialize

var board = [];
var buttons = [];

var buttonStyle = "2px rgba(0, 204, 255, .2) solid";

var gameArea = document.getElementById("gamearea");

var playerTurn = 2;

var canMove = false;

for (var i=0; i<9; i++) {
	board[i] = 0;
}

var winningMoves = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7]
];

var checkForWin = function() {
	var winner = false;
	for (var y=0; y<winningMoves.length; y++) {
		var sum = 0;
		for (var x=0; x<3; x++) {
			for (var i=0; i<board.length; i++) {
				if (i+1 === winningMoves[y][x]) {
					sum += board[i];
				}
			}
		}
		if (sum === -3) {
			winner = 1;
		} else if (sum === 3) {
			winner = 2;
		}
	}
	return winner;
}

var createBoard = function() {
	canMove = true;
	var counter = 0;
	for(var i=0; i<9; i++) {
		counter += 1;
		buttons[buttons.length-1] = document.createElement("button");
		buttons[buttons.length-1].id = "button" + (i+1);
		buttons[buttons.length-1].boardId = i;
		buttons[buttons.length-1].innerHTML = ".";
		buttons[buttons.length-1].setAttribute("class", "square");
		buttons[buttons.length-1].addEventListener("click", function() {
			move(this.id, this.boardId);
		}, false);
		gameArea.appendChild(buttons[buttons.length-1]);
		// button.onClick = move();
		if (counter === 3) { 
			counter = 0;
			var br = document.createElement("br");
			gameArea.appendChild(br);
		}
	}

	document.getElementById("button1").style["border-bottom"] += buttonStyle;

	document.getElementById("button2").style["border-right"] += buttonStyle;
	document.getElementById("button2").style["border-bottom"] += buttonStyle;
	document.getElementById("button2").style["border-left"] += buttonStyle;

	document.getElementById("button3").style["border-bottom"] += buttonStyle;

	document.getElementById("button4").style["border-bottom"] += buttonStyle;

	document.getElementById("button5").style["border-right"] += buttonStyle;
	document.getElementById("button5").style["border-left"] += buttonStyle;
	document.getElementById("button5").style["border-bottom"] += buttonStyle;

	document.getElementById("button6").style["border-bottom"] += buttonStyle;

	document.getElementById("button8").style["border-right"] += buttonStyle;
	document.getElementById("button8").style["border-left"] += buttonStyle;
}

var restartGame = function() {
	canMove = true;
	for (var i=0; i<buttons.length; i++) {
		buttons[i].innerHTML = ".";
	}
	handleTurns();

	for (var i=0; i<9; i++) {
	board[i] = 0;
}
}

var handleTurns = function(x) {
	if (playerTurn === 1) {
		document.getElementById("gameturn").innerHTML = "Player 2's Turn!";
		playerTurn = 2;
	} else if (playerTurn === 2) {
		document.getElementById("gameturn").innerHTML = "Player 1's Turn!";
		playerTurn = 1;
	}
}

var move = function(id, number) {

	// Handle placing x's and o's
	if (canMove === true) {
		var elem = document.getElementById(id);
		if (elem.innerHTML === ".") {
			if (playerTurn === 1) {
				board[number] = -1;
				elem.innerHTML = "O";
			} else if (playerTurn === 2) {
				board[number] = 1;
				elem.innerHTML = "X";
			}
			handleTurns(id);
		}
	}

	// Check for winner
	if (checkForWin() !== false) {
		winner(checkForWin());
	}

}

var winner = function(winner) {
	canMove = false;
	if (winner === 1) {
		document.getElementById("gamewinner").innerHTML = "Player 1 Wins!";
	} else if (winner === 2) {
		document.getElementById("gamewinner").innerHTML = "Player 2 Wins!";
	}
}

createBoard();
handleTurns();
