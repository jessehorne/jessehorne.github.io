/*
	GoMoku
	Jesse Horne (thehorne.com)
	Started: August 29, 2014
*/

var moves = [];

moves[0] = [];
moves[1] = [];

var grid = [];

var handleTile = function(pos) {
	// Update grid multi-dimensional array
	grid[pos.y][pos.x] = turn;

	// keep track of moves
	moves[turn-1].push(pos);
}

var checkForWinner = function() {
	var winner = "none";
	
	for (var i=0; i<moves[turn-1].length; i++) {

		var pos = moves[turn-1][i];

		var found = "none";
		var searched = false;

		// Check Down
		if (grid[pos.y+4] !== undefined) {
			for (var y=1; y<5; y++) {
				if (grid[pos.y+y][pos.x] !== turn) {
					found = false;
				}
			}

			if (found !== false) {
				found = true;
			}

			// If found is true now, it means that the current pos has four same tokens under it
			if (found === true) {
				return turn;
			} else {
				found = "none";
			}
		}


		// Check Right
		if (grid[pos.y][pos.x+4] !== undefined) {
			for (var x=1; x<5; x++) {
				if (grid[pos.y][pos.x+x] !== turn) {
					found = false;
				}
			}

			if (found !== false) {
				found = true;
			}

			// If found is true now, it means that the current pos has four same tokens under it
			if (found === true) {
				return turn;
			} else {
				found = "none";
			}
		}

		// Check Diagonally Right
		if (grid[pos.y+4] !== undefined) {
			if (grid[pos.y+4][pos.x+4] !== undefined) {
				for (var x=1; x<5; x++) {
					if (grid[pos.y+x][pos.x+x] !== turn) {
						found = false;
					}
				}

				if (found !== false) {
					found = true;
				}

				// If found is true now, it means that the current pos has four same tokens under it
				if (found === true) {
					return turn;
				} else {
					found = "none";
				}
			}
		}

		// Check Diagonally Left
		if (grid[pos.y+4] !== undefined) {
			if (grid[pos.y+4][pos.x-4] !== undefined) {
				for (var x=1; x<5; x++) {
					if (grid[pos.y+x][pos.x-x] !== turn) {
						found = false;
					}
				}

				if (found !== false) {
					found = true;
				}

				// If found is true now, it means that the current pos has four same tokens under it
				if (found === true) {
					return turn;
				} else {
					found = "none";
				}
			}
		}
	}

	return winner;
}

var gm_table = document.getElementById("gm-table");

var paused = false;

// Setup Rows

var rows = [];

for (var x=0; x<15; x++) {
	var row = document.createElement("div");
	row.className = "gm-row";
	row.id = "gm-row" + (x+1);
	rows[x] = gm_table.appendChild(row);
}

var winner = function(num) {
	paused = true;
	document.getElementById("gm-winner").innerHTML = "Player " + num + " Wins!";
}

var move = function(elem) {
	if (paused === false) {
		if (elem.clicked !== true) {
			handleTile({x: elem.x, y: elem.y});

			var isWinner = checkForWinner();
			if (isWinner !== "none") {
				winner(isWinner);
			}

			if (turn === 1) {
				elem.id = "gm-white";
				turn = 2;
				document.getElementById("gm-turn").src = "./css/images/black-stone.png";
			} else if (turn === 2) {
				elem.id = "gm-black";
				turn = 1;
				document.getElementById("gm-turn").src = "./css/images/red-stone.png";
			}
			elem.clicked = true;
		}
	}
}

var hover = function(elem) {
	if (paused === false) {
		if (elem.clicked !== true) {
			if (turn === 1) {
				elem.id = "gm-white-hover";
			} else if (turn === 2) {
				elem.id = "gm-black-hover";
			}
		}
	}
}

var stopHover = function(elem) {
	if (elem.clicked !== true) {
		if (turn === 1) {
			elem.id = "gm-square";
		} else if (turn === 2) {
			elem.id = "gm-square";
		}
	}
}

// Setup squares

var squares = [];
var counter = 0;
var gridCounterX = 0;
var gridCounterY = 0;
var rowCounter = 1;

for (var x=0; x<225; x++) {

	if (grid[gridCounterY] != undefined) {
		grid[gridCounterY][gridCounterX] = 0;
	} else {
		grid[gridCounterY] = [];
		grid[gridCounterY][gridCounterX] = 0;
	}

	counter += 1;
	var square = document.createElement("div");
	square.className += "gm-square";
	square.id = "gm-square-" + (x+1);
	square.x = gridCounterX;
	square.y = gridCounterY;

	squares[x] = document.getElementById("gm-row" + rowCounter).appendChild(square);

	squares[x].addEventListener("mousedown", function() {
		move(this);
	}, false);

	squares[x].addEventListener("mouseenter", function() {
		hover(this);
	}, false);

	squares[x].addEventListener("mouseleave", function() {
		stopHover(this);
	}, false);


	gridCounterX++;

	if (gridCounterX === 15) {
		gridCounterX = 0;
		gridCounterY++;
	}

	if (counter === 15) {
		counter = 0;
		rowCounter += 1;
	}
}

// Setup Turns
var turn = 1;
document.getElementById("gm-turn").src = "./css/images/red-stone.png";