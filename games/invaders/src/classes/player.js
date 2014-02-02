// Player Class

var Player = function() {
  // Init
  this.w = 20;
  this.h = 20;

  this.x = luv.canvas.getWidth()/2 - this.w/2;
  this.y = screenHeight - (this.h+10);

  this.round = 0;
  this.points = 0;
  this.enemiesKilled = 0;

  this.speed = 150;

  this.type = "player";

  this.canFire = true;
  this.canFireTimer = 0;
  this.rateOfFire = 0.7;
  this.chanceOfUpgrade = 100;
  // Update
  this.update = function(dt) {

    if (this.lives <= 0) {
      gameOver();
    }

    // Keep the player on the screen
    if (this.x < 0) { this.x = 0; }
    if (this.x+this.w > screenWidth) { this.x = screenWidth-this.w }
    if (this.y < 0) { this.y = 0; }
    if (this.y+this.h > screenHeight) { this.y = screenHeight-this.h }

    // Movement
    if (luv.keyboard.isDown("left")) {
      this.x -= this.speed * dt;
    } 
    if (luv.keyboard.isDown("right")) {
      this.x += this.speed * dt;
    }
    if (luv.keyboard.isDown("up")) {
      this.y -= this.speed * dt;
    }
    if (luv.keyboard.isDown("down")) {
      this.y += this.speed * dt;
    }
    // Can Fire Timer
    this.canFireTimer += dt;

    if (this.canFireTimer > this.rateOfFire) {
      this.canFire = true;
      this.canFireTimer = 0;
    }
  };

  // Draw
  this.draw = function() {
    luv.canvas.setColor(255,255,255);
    luv.canvas.draw(playerImg, this.x, this.y);
    //luv.canvas.fillRectangle(this.x, this.y, this.w, this.h);
    // luv.canvas.print("Player X = " + this.x, 10, 10);
    // luv.canvas.print("Player Y = " + this.y, 10, 20);
    // luv.canvas.print(luv.timer.getFPS(), 10, 20);
    // luv.canvas.print(entities.length, 10, 30);
    // luv.canvas.setColor(255,255,255);
    luv.canvas.print("ROUND - " + this.round, 10, 15);
    // luv.canvas.print("LIVES - " + this.lives, 10, 30);
    luv.canvas.print("SCORE - " + this.points, 10, 30);
    luv.canvas.print("TIME - " + seconds.toFixed(), 10, 45);
  };

  // Mouse Pressed
  this.onPressed = function(key) {
    if (key == " ") {
      if (this.canFire) {
        var b = new Bullet(this.x + (this.w/2), this.y, 5, 5, 300, "up", "player");
        this.canFire = false;
        shootPlayerSound.play();
      }
    }
  };

  entities.push(this);

  this.upgrade = function() {
    this.speed += 20;
    this.rateOfFire -= 0.05;
    this.chanceOfUpgrade -= 5;
    powerUpSound.play();
  }

};
