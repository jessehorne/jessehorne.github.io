credits = [];

credits.update = function(dt) {

}

credits.draw = function() {
  luv.canvas.print("Thanks to...", 10, 10);
  luv.canvas.print("My buddy John at www.fullof.bs.", 10, 30);
  luv.canvas.print("mikhog at www.opengameart.org.", 10, 50);
  luv.canvas.print("Kenney at www.opengameart.org.", 10, 70);
}

credits.onPressed = function(key) {

}

credits.onMousePressed = function(x, y, button) {
  currentGamestate = "menu";
}
