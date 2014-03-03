var currentGamestate = "game";

gamestates = {
  menu: menu,
  game: game
};

function gameUpdate(dt) {
  gamestates[currentGamestate].update(dt);
}

function gameDraw() {
  gamestates[currentGamestate].draw();
}
