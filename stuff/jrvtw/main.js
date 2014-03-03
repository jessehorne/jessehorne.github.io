gamestates = {
  menu: menu,
  game: game
};

function newGame() {
  currentGamestate = "game";

    // Tables that hold things
  entities = [];

  // Some variables
  LEVEL = 1;

  // Player init
  player1 = new Player();

  NEWGAME = true;

  newGameCounter = 0;
  newGameText = "ROUND - " + LEVEL;

}

newGame();

function gameUpdate(dt) {
  gamestates[currentGamestate].update(dt);
}

function gameDraw() {
  gamestates[currentGamestate].draw();
}
