// Bullet Class

var Bullet = function(x, y, w, h, s, dir, btype, eType, which) {
  // Init
  this.w = w;
  this.h = h;
  this.x = x;
  this.y = y;
  this.speed = s;
  this.dir = dir;
  this.btype = btype;
  this.eType = eType;
  this.type = "bullet";
  this.dead = false;
  this.which = which;

  // Update
  this.update = function(dt) {
    // Handle dead
    if (this.dead == true) {
      entities.remove(entities.indexOf(this));
    }
    // Movement
    if (this.dir == "up") {
      this.y -= this.speed * dt;
    } else if (this.dir == "down") {
      this.y += this.speed * dt;
    } else if (this.dir == "diag-left") {
      this.y += this.speed * dt;
      this.x -= (this.speed/10) * dt;
    } else if (this.dir == "diag-right") {
      this.y += this.speed * dt;
      this.x += (this.speed/10) * dt;
    }

    // Check if bullet made it off screen, if so delete it
    if (this.y < -30 || this.y > screenHeight) {
      entities.splice(entities.indexOf(this), 1);
    }
  };

  // Draw
  this.draw = function() {
    if (this.btype == "player") {
      luv.canvas.draw(playerBulletImg, this.x, this.y);
    } else if (this.btype == "enemy") {
      if (this.eType == 1) {
        luv.canvas.draw(enemy1BulletImg, this.x, this.y);
      } else if (this.eType == 2) {
        luv.canvas.draw(enemy2BulletImg, this.x, this.y);
      } else if (this.eType == 3) {
        luv.canvas.draw(enemy3BulletImg, this.x, this.y);
      } else if (this.eType == 4) {
        luv.canvas.draw(enemy4BulletImg, this.x, this.y);
      } else if (this.eType == 5) {
        luv.canvas.draw(enemy5BulletImg, this.x, this.y);
      }
    } else if (this.btype == "upgrade") {
      luv.canvas.draw(upgradeImg, this.x, this.y);
    }
  };

  // Mouse Pressed
  this.onPressed = function(x, y, button) {

  };

  entities.push(this);
};
