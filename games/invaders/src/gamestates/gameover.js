
gameover = [];

gameover.update = function(dt) {
  gameoverTimer += dt;
  if (gameoverTimer > 3) {
    newGame();
    currentGamestate = "game";
  }
}

gameover.draw = function() {
  luv.canvas.setColor(0, 255, 0);
  luv.canvas.print("GAME OVER", 100, 100);
  score = Math.floor(player.points + (seconds*2) * player.round);
  luv.canvas.print("SCORE - " + score, 100, 150);
}

gameover.onPressed = function(key) {

}

gameover.onMousePressed = function(x, y, button) {

}
