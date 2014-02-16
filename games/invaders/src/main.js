var luv = Luv();

// Array remove
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// Load local storage highscore string
if (!window.localStorage["highscores"]) {
  window.localStorage["highscores"] = JSON.stringify([]);
}

highscores = JSON.parse(window.localStorage["highscores"]);
saveHighscores();

// Handle ratio
screenWidth = 312;
screenHeight = 500;
luv.canvas.setDimensions(screenWidth, screenHeight);

var ratioX = Math.abs(screenWidth/32);
var ratioY = Math.abs(screenHeight/32);

// Set volume
var volume = 0.1;

var gamestates = {
  menu: menu,
  game: game,
  gameover: gameover,
  highscore: highscore,
  credits: credits,
};

currentGamestate = "menu";

luv.canvas.setBackgroundColor(0,0,0);

// Font
luv.canvas.ctx.font="15px 'font.ttf'";

luv.load = function() {
  playerImg = luv.graphics.Image("src/assets/playership1.png");
  playerBulletImg = luv.graphics.Image("src/assets/player_bullet.png");

  enemy1OpenImg = luv.graphics.Image("src/assets/enemy1_open.png");
  enemy1ClosedImg = luv.graphics.Image("src/assets/enemy1_closed.png");
  enemy1BulletImg = luv.graphics.Image("src/assets/enemy1bullet.png");

  enemy2OpenImg = luv.graphics.Image("src/assets/enemy2_open.png");
  enemy2ClosedImg = luv.graphics.Image("src/assets/enemy2_closed.png");
  enemy2BulletImg = luv.graphics.Image("src/assets/enemy2bullet.png");

  enemy3OpenImg = luv.graphics.Image("src/assets/enemy3_open.png");
  enemy3ClosedImg = luv.graphics.Image("src/assets/enemy3_closed.png");
  enemy3BulletImg = luv.graphics.Image("src/assets/enemy3bullet.png");

  enemy4OpenImg = luv.graphics.Image("src/assets/enemy4_open.png");
  enemy4ClosedImg = luv.graphics.Image("src/assets/enemy4_closed.png");
  enemy4BulletImg = luv.graphics.Image("src/assets/enemy4bullet.png");

  enemy5OpenImg = luv.graphics.Image("src/assets/enemy5_open.png");
  enemy5ClosedImg = luv.graphics.Image("src/assets/enemy5_closed.png");
  enemy5BulletImg = luv.graphics.Image("src/assets/enemy5bullet.png");

  facebookImg = luv.graphics.Image("src/assets/facebook.jpg");
  facebookX = screenWidth-150;
  facebookY = 5;
  facebookW = 20;
  facebookH = 20;

  musicPausedImg = luv.graphics.Image("src/assets/music_on.png");
  musicResumedImg = luv.graphics.Image("src/assets/music_off.png");
  musicButtonX = screenWidth-108;
  musicButtonY = 5;

  gameResumeImg = luv.graphics.Image("src/assets/game_resume.png");
  gamePauseImg = luv.graphics.Image("src/assets/game_pause.png");
  gameButtonX = screenWidth-71;
  gameButtonY = 5;

  backButtonImg = luv.graphics.Image("src/assets/back.png");
  backButtonX = screenWidth-34;
  backButtonY = 5;

  menuImg = luv.graphics.Image("src/assets/logo.png");
  playImg = luv.graphics.Image("src/assets/play.png");
  highscoreImg = luv.graphics.Image("src/assets/highscore.png");
  achievementImg = luv.graphics.Image("src/assets/achievement.png");

  controlsImg = luv.graphics.Image("src/assets/controls.png");

  spaceImg = luv.graphics.Image("src/assets/space.jpg"); // Background Image

  upgradeImg = luv.graphics.Image("src/assets/speedupgrade.png");
  creditsImg = luv.graphics.Image("src/assets/credits.png");
  powerUpSound = luv.audio.Sound("src/assets/powerup.ogg");
  shootPlayerSound = luv.audio.Sound("src/assets/shoot_player.ogg");
  shootEnemySound = luv.audio.Sound("src/assets/shoot_enemy.ogg");
  hitSound = luv.audio.Sound("src/assets/hit.wav");

  powerUpSound.setVolume(volume+0.2);
  shootPlayerSound.setVolume(volume);
  shootEnemySound.setVolume(volume);
  hitSound.setVolume(volume);

  song1 = luv.audio.Sound("src/assets/song1.mp3");
  song1.setVolume(volume);

};

luv.update = function(dt) {
  gamestates[currentGamestate].update(dt);
};

luv.draw = function() {
  if(!luv.media.isLoaded()) { return; }
  luv.canvas.draw(spaceImg, 0, 0);
  gamestates[currentGamestate].draw();
};

luv.mouse.onPressed = function(x, y, button) {
  gamestates[currentGamestate].onMousePressed(x, y, button);
};

luv.keyboard.onPressed = function(key, code) {
  // console.log(code);
  if (code == 80) { pause(); }
  gamestates[currentGamestate].onPressed(key);
};

luv.run();
