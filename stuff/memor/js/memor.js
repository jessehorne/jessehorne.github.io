(function() {
	var app = {};
	app.textarea = document.getElementById("memor-textarea");

	app.flip = {};
	app.flip.element = document.getElementById("memor-flip");
	app.flip.flipped = false;

	app.flip.element.addEventListener("click", function() {
		if (app.textarea.value !== "") {
			if (app.flip.flipped) {
				app.textarea.value = app.flip.oldValue;
				app.flip.flipped = false;
			} else {
				app.flip.oldValue = app.textarea.value;
				app.textarea.value = "Ready?";
				app.flip.flipped = true;
			}
		}
	}, false);

	app.bg_color = document.getElementById("memor-bg-color");
	app.bg_color.addEventListener("click", function() {
		var r = Math.floor(Math.random() * 255) - 1;
		var g = Math.floor(Math.random() * 255) - 1;
		var b = Math.floor(Math.random() * 255) - 1;
		document.body.style.backgroundColor =
			"rgba(" + r + "," + g + "," + b + ",1)";
		app.textarea.style.backgroundColor = "rgba(" + r + "," + g + "," + b +
			",1)";
	});

	app.text_color = document.getElementById("memor-text-color");
	app.text_color.addEventListener("click", function() {
		var r = Math.floor(Math.random() * 255) - 1;
		var g = Math.floor(Math.random() * 255) - 1;
		var b = Math.floor(Math.random() * 255) - 1;
		app.textarea.style.color = "rgba(" + r + "," + g + "," + b + ",1)";
	});

	app.reset = document.getElementById("memor-reset");
	app.reset.addEventListener("click", function() {
		app.textarea.value = "";
	});
})();
