var Player = function() {
  // Init
  this.img = newImage("assets/person1.png", 10, 10);
  this.x = 0;
  this.y = canvas.height - (this.img.tileH) - 64;
  this.speed = 80;
  this.health = 100;
  this.dead = false;
  this.moveCounter = 1;
  this.attackCounter = 0;
  this.canAttack = true;
  this.moveMode = "standing";
  this.direction = "right";

  this.update = function(dt) {
    // console.log(keysDown.join());
    // Handle animation moving left and right

    if (this.canAttack) {
      this.moveMode = "standing";
    }

    if (keyDown(83)) { // Crouch
      this.moveMode = "crouching";
    }

    // Attacks
    if (keyDown(74)) { // Slam
      this.slam();
    } else if (keyDown(75)) { // Punch
      this.punch();
    } else if (keyDown(76)) { // Kick
      this.kick();
    }

    if (keyDown(68)) { // Move Right
      this.direction = "right";
      if (this.moveMode != "crouching") {
        if (this.canAttack != false) {
          this.x += this.speed * dt;
          this.moveCounter += dt*4;
          this.moveMode = "walking";
        }
      }
    }

    if (keyDown(65)) { // Move Left
      this.direction = "left";
      if (this.moveMode != "crouching") {
        if (this.canAttack != false) {
          this.x -= this.speed * dt;
          this.moveCounter -= dt*4;
          this.moveMode = "walking";
        }
      }
    }

    // Handle Move Counter
    if (this.moveCounter < 2) {
      this.moveCounter = 7;
    } else if (this.moveCounter > 7.9) {
      this.moveCounter = 2;
    }

    // Handle Attack Counter
    if (this.canAttack == false) {
      this.attackCounter += dt;
    }

    if (this.attackCounter > 0.4) {
      this.canAttack = true;
      this.attackCounter = 0;
    }

    // Player doesn't need to go off screen!
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.img.tileW > canvas.width) {
      this.x = canvas.width - this.img.tileW;
    }
  }

  this.draw = function() {
    if (this.moveMode == "standing") {
      drawSprite(this.img, this.x, this.y, 1, 1, 1, this.direction);
    } else if (this.moveMode == "walking") {
      drawSprite(this.img, this.x, this.y, Math.floor(this.moveCounter), 1, 1, this.direction);
    } else if (this.moveMode == "crouching") {
      drawSprite(this.img, this.x, this.y, 10, 1, 1, this.direction);
    } else if (this.moveMode == "slamming") {
      drawSprite(this.img, this.x, this.y, 3, 3, 1, this.direction);
    } else if (this.moveMode == "punching") {
      drawSprite(this.img, this.x, this.y, 9, 3, 1, this.direction);
    } else if (this.moveMode == "kicking") {
      drawSprite(this.img, this.x, this.y, 10, 3, 1, this.direction);
    }
  }

  this.slam = function() {
    if (this.canAttack) {
      this.canAttack = false;
      this.moveMode = "slamming";
    }
  }

  this.punch = function() {
    if (this.canAttack) {
      this.canAttack = false;
      this.moveMode = "punching";
    }
  }

  this.kick = function() {
    if (this.canAttack) {
      this.canAttack = false;
      this.moveMode = "kicking";
    }
  }

  entities.push(this);
}
