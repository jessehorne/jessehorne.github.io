$(document).ready( function() {
	$("#aboutme").on("click", function() {
		$("#html-stuff").load("./pages/aboutme.html");
	});

	$("#portfolio").on("click", function() {
		$("#html-stuff").load("./pages/portfolio.html");
	});

	$("#games").on("click", function() {
		$("#html-stuff").load("./pages/games.html");
	});

	$("#writings").on("click", function() {
		$("#html-stuff").load("./pages/writings.html");
	});
});