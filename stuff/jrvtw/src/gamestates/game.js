game = [];

// Tables that hold things
entities = [];

// Some variables
LEVEL = 1;

// load levels
levels[1] = newImage("assets/levels/level1.png");

// Player init
player1 = new Player();

game.update = function(dt) {
  // Update Entities
  for (var i=0; i<entities.length; i++) {
    entities[i].update(dt);
  }
}

game.draw = function() {
  if (loadingImages != 0) { return; }

  // Draw Background
  setColor("#000000");
  drawRect(0, 0, canvas.width, canvas.height);

  // Draw Map
  ctx.drawImage(levels[LEVEL], 0, 0);

  // Draw Entities
  for (var i=0; i<entities.length; i++) {
    entities[i].draw();
  }

  // drawSprite(playerImg, 0, 0, 1, 1, 2);
  // ctx.drawImage(player2Img, 20, 20);
}
