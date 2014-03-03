game = [];

// load levels
levels[1] = newImage("assets/levels/level1.png");

game.update = function(dt) {
  // Handle ROUND - X
  if (NEWGAME) {
    newGameCounter += dt;

    if (newGameCounter > 3) {
      NEWGAME = false;
    }
  }

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

  if (NEWGAME) {
    setColor("#FFFFFF")
    print(newGameText, 100, 100);
  }

  // drawSprite(playerImg, 0, 0, 1, 1, 2);
  // ctx.drawImage(player2Img, 20, 20);
}
