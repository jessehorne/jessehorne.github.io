
game = [];

// Round Enemy Info
rounds = [];
rounds[1]  = [1, 1, 1, 1, 1];
rounds[2]  = [1, 2, 1, 2, 1];
rounds[3]  = [1, 1, 2, 2, 1, 1 ,2, 1];
rounds[4]  = [2, 2, 3, 2, 2, 1, 2, 3];
rounds[5]  = [3, 3, 2, 2, 2, 3, 3, 3];
rounds[6]  = [2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3];
rounds[7]  = [4, 3, 3, 3, 3, 3, 4, 4, 2, 2, 2, 4];
rounds[8]  = [4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4];
rounds[9]  = [4, 4, 4, 4, 4, 5, 5, 4, 4, 5, 5, 5, 5, 4, 4, 4, 4, 4];
rounds[10] = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

seconds = 0;

paused = true;

pause = function() {
  if (paused) {
    paused = false;
  } else {
    music.stop();
    paused = true;
  }
}

// Game Over
gameOver = function() {

  // Save score n such
  newHighscoreEntry(player.points, player.round, seconds);
  saveHighscores();
  seconds = 0;
  currentGamestate = "gameover";
  gameoverTimer = 0;

  music.stop()

  if (!paused) { pause(); }
}

newGame = function() {
  music.stop()
  currentGamestate = "game";
  entities = [];
  seconds = 0;
  player = new Player();
  player.lives = 3;

  nextLevel();
};

// Next Level
nextLevel = function() {
  if (player.round != 10) {
    player.round += 1;
  } else {
    rounds[player.round].push(5);
  }

  var startX = 0;
  var startY = 0;

  var enemyWidth = 32;
  var enemyHeight = 32;

  var widthApart = (screenWidth - 64) / 10;

  var lvlCounter = 0;

  nextEnemyCounter = 0;
  enemyInc = 1;

  player.enemiesKilled = 0;
  /*
  // Add enemies for this round
  for (var x=0; x<rounds[player.round].length; x++) {
    var e = new Enemy(rounds[player.round][x]);
  }*/

};

var songPlaying = false;
var songPaused = true;

game.update = function(dt) {
  if(!luv.media.isLoaded()) { return; }
  if (paused) {

  } else {

    if (player.round >= rounds.length) { gameOver(); return; }

    // Music
    if (songPlaying == false) {
      songPlaying = true;
      songPaused = false;
    }

    // Enemy progression each round 

    if (nextEnemyCounter > 1) {
      var e = new Enemy(rounds[player.round][enemyInc-1]);
      enemyInc += 1;
      nextEnemyCounter = 0;
    }

    if (enemyInc <= rounds[player.round].length) {
      nextEnemyCounter += dt;
    }

    // Count how many seconds we've played
    seconds += dt;

    var numOfEnemies = 0;

    for (var i=0; i<entities.length; i++) {
      if (entities[i] != undefined) {

        // Player loses if enemies touch the bottom of the screen
        if (entities[i].type == "enemy") {
          if (entities[i].y > screenHeight-entities[i].h) { gameOver(); }
        }

        // Collision
        if (entities[i].type == "bullet") {
          for (var x=0; x<entities.length; x++) {
            // player && enemy bullet collision
            if (entities[x].type == "player" && entities[i].btype == "enemy") {
              if (bbox(entities[x].x, entities[x].y, entities[x].w, entities[x].h,
                  entities[i].x, entities[i].y, entities[i].w, entities[i].h)) {
                entities[i].dead = true;
                player.lives -= 1;
                hitSound.play();
              }
            // enemy and player bullet collision
            } else if (entities[x].type == "enemy" && entities[i].btype == "player") {
              if (bbox(entities[x].x, entities[x].y, entities[x].w, entities[x].h,
                  entities[i].x, entities[i].y, entities[i].w, entities[i].h)) {
                // Player gets points
                player.points += entities[x].worth;
                player.enemiesKilled += 1;

                entities[x].dead = true;
                entities[i].dead = true;
                
                hitSound.play();
              }
            } else if (entities[x].type == "player" && entities[i].btype == "upgrade") {
              if (bbox(entities[x].x, entities[x].y, entities[x].w, entities[x].h,
                  entities[i].x, entities[i].y, entities[i].w, entities[i].h)) {
                // Upgrade player
                entities[i].dead = true;
                player.upgrade();
              }
            }
          }
        } // end collision
        entities[i].update(dt);
      }
    }
    // Level progression
    if (player.enemiesKilled >= rounds[player.round].length) {
      nextLevel();
    }
  }
};

game.draw = function() {
  if(!luv.media.isLoaded()) { return; }

  for (var i=0; i<entities.length; i++) {
    entities[i].draw();
  }
  /*
  luv.canvas.setColor(0, 255, 0);
  if (paused) {
    luv.canvas.print("Press 'p' to resume!", 100, 10);
  } else {
    luv.canvas.print("Press 'p' to pause!", 100, 10);
  }
  */

  // Draw lives
  for (var x=1; x<=player.lives; x++) {
    luv.canvas.draw(playerImg, (15*x) + x*3, 55, 0, 0.8, 0.8);
  }

  // Draw facebook
  luv.canvas.draw(facebookImg, facebookX, facebookY);

  // Draw Music on/off
  if (songPaused == true) {
    luv.canvas.draw(musicPausedImg, musicButtonX, musicButtonY);
  } else {
    luv.canvas.draw(musicResumedImg, musicButtonX, musicButtonY);
  }

  // Draw game pause/resume
  if (paused) {
    luv.canvas.draw(gameResumeImg, gameButtonX, gameButtonY);
  } else {
    luv.canvas.draw(gamePauseImg, gameButtonX, gameButtonY);
  }

  luv.canvas.draw(backButtonImg, backButtonX, backButtonY);

};

game.onPressed = function(key) {
  if (paused) {

  } else {
    for (var i=0; i<entities.length; i++) {
      entities[i].onPressed(key);
    }
  }
}

game.onMousePressed = function(x, y, button) {
  if (button == "l") {

    // Facebook Button Mouse Pressed
    if (bbox(x, y, 1, 1, facebookX, facebookY, facebookW, facebookH)) {
      pause();
      window.open("https://www.facebook.com/sharer/sharer.php?u=www.google.com",
                  "mywindow","menubar=1,resizable=1,width=350,height=250");
    }

    // Music Button Mouse Pressed
    if (bbox(x, y, 1, 1, musicButtonX, musicButtonY, 32 ,32)) {
      if (songPaused == true) {
        if (!paused) {
          music.pause();
          music.setVolume(volume);
          music.play();
          songPaused = false;
        }
      } else {
        if (!paused) {
          music.pause();
          music.setVolume(0);
          music.play();
          songPaused = true;
        }
      }
    }

    // Game Button Mouse Pressed
    if (bbox(x, y, 1, 1, gameButtonX, gameButtonY, 32 ,32)) {
      if (paused == true) {
        if (songPaused == true) {
          music.play()
        }
        paused = false;
      } else {
        songPaused = true;
        music.stop();
        paused = true;
      }
    }

    // Back Button Mouse Pressed
    if (bbox(x, y, 1, 1, backButtonX, backButtonY, 32 ,32)) {
      currentGamestate = "menu";
    }
  }
}
