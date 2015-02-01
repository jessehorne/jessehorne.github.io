$(document).ready(function() {
	$("#aboutme").on("click", function() {
		$("#html-stuff").load("./pages/aboutme.html");
	});

	$("#goals").on("click", function() {
		$("#html-stuff").load("./pages/goals.html");
	});

	$("#games").on("click", function() {
		$("#html-stuff").load("./pages/games.html");
	});

	$("#writings").on("click", function() {
		$("#html-stuff").load("./pages/writings.html");
	});

	$("#apps").on("click", function() {
		$("#html-stuff").load("./pages/apps.html");
	});
});
