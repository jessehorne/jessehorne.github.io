highscore = [];

highscore.startX = 30;
highscore.startY = 30;
highscore.spacer = 15;

highscore.update = function(dt) {

}

highscore.draw = function() {
  luv.canvas.print("Points          Round         Time", highscore.startX + 10, highscore.spacer);
  for (var x=0; x<highscores.length; x++) {
    luv.canvas.print(x+1 + ".", highscore.startX-highscore.spacer, highscore.startY + highscore.spacer*x);
    luv.canvas.print(highscores[x].p, highscore.startX + 10, highscore.startY + highscore.spacer*x);
    luv.canvas.print(highscores[x].r, highscore.startX + 90, highscore.startY + highscore.spacer*x);
    luv.canvas.print(highscores[x].t.toFixed(), highscore.startX + 170, highscore.startY + highscore.spacer*x);
  }
  if (highscores.length == 0) {
    luv.canvas.print("No entries...", highscore.startX + highscore.spacer, 20);
  }
}

highscore.onPressed = function(key) {

}

highscore.onMousePressed = function(x, y, button) {
  currentGamestate = "menu";
}
