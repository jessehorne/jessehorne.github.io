var gm_screen = document.getElementById("gm-screen");

var squares = [];

var counter = 0;
for (var x=1; x<=225; x++) {
	counter += 1;
	var square = document.createElement("div");
	square.className += "gm-square";

	squares[squares.length] = gm_screen.appendChild(square);

	if (counter === 15) {
		var br = document.createElement("br");
		gm_screen.appendChild(br);
		counter = 0;
	}
}