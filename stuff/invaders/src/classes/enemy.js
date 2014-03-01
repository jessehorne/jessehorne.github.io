// Enemy Class

var Enemy = function(eType) {
  // Init
  this.eType = eType;

  this.w = 32; 
  this.h= 32;

  if (this.eType == 1) {
    this.chanceOfFire = 995;
    this.speed = 100;
    this.startx = -this.w;
    this.starty = 64;
  } else if (this.eType == 2) {
    this.chanceOfFire = 990;
    this.speed = 150;
    this.startx = -this.w;
    this.starty = 64;
  } else if (this.eType == 3) {
    this.chanceOfFire = 980;
    this.speed = 200;
    this.startx = screenWidth + this.w;
    this.starty = 64;
  } else if (this.eType == 4) {
    this.chanceOfFire = 970;
    this.speed = 250;
    this.startx = screenWidth + this.w;
    this.starty = 64;
  } else if (this.eType == 5) {
    this.chanceOfFire = 960;
    this.speed = 300;
    this.startx = screenWidth/2 - this.w/2;
    this.starty = -this.h;
  }

  this.x = this.startx;
  this.y = this.starty;

  this.worth = this.eType*15;

  this.type = "enemy";

  this.timer = 0;

  this.chooseDest = function() {
    if (this.eType == 1) {
      this.targetX = Math.floor((Math.random()*screenWidth)+1);
      this.targetY = this.y+10;
    } else if (this.eType == 2) {
      this.targetX = Math.floor((Math.random()*screenWidth)+1);
      this.targetY = this.y+10;
    } else if (this.eType == 3) {
      this.targetX = Math.floor((Math.random()*screenWidth)+1);
      this.targetY = this.y+10;
    } else if (this.eType == 4) {
      this.targetX = Math.floor((Math.random()*screenWidth)+1);
      this.targetY = this.y+10;
    } else if (this.eType == 5) {
      this.targetX = Math.floor((Math.random()*screenWidth)+1);
      this.targetY = Math.floor((Math.random()*screenHeight/2)+1);
    }
  }

  this.chooseDest();

  // Update
  this.update = function(dt) {

    if (bbox(this.x, this.y, this.w, this.h, player.x, player.y, player.w, player.h)) {
      player.lives -= 1;
      hitSound.play();
      this.dead = true;
    }

    // Movement
    if (Math.abs(this.x - this.targetX) > 5) {
      // If this.x is farther than 5 pixels from target location
      if (this.x < this.targetX) {
        this.x += this.speed * dt;
      } else if (this.x > this.targetX) {
        this.x -= this.speed * dt;
      }
    }
    if (Math.abs(this.y - this.targetY) > 5) {
      // If this.y is farther than 5 pixels from target location
      if (this.y < this.targetY) {
        this.y += this.speed * dt;
      } else if (this.x > this.targetY) {
        this.Y -= this.speed * dt;
      }
    } 
    if ((Math.abs(this.x - this.targetX) < 5) && (Math.abs(this.y - this.targetY) < 5)){
      this.chooseDest();
    }

    // Image handler timer
    this.timer += dt;
    if (this.timer > 5) {
      this.timer = 0;
    }

    // Dead handler
    if (this.dead == true) {
      var succeed = Math.floor((Math.random()*player.chanceOfUpgrade)+1);
      if (succeed > player.chanceOfUpgrade-10) {
        var b = new Bullet(this.x + (this.w/2), this.y, 15, 15, 50, "down", "upgrade");  
      }
      entities.remove(entities.indexOf(this));
    }

    // Fire
    var num = Math.floor((Math.random()*this.chanceOfFire)+1);
    if (num < 1000 - this.chanceOfFire) {
      if (this.eType == 1) {
        var b = new Bullet(this.x + (this.w/2), this.y+this.h, 5, 5, 200, "down", "enemy", this.eType);
      } else if (this.eType == 2) {
        var b = new Bullet(this.x + (this.w), this.y+this.h, 10, 30, 200, "down", "enemy", this.eType);
        var b = new Bullet(this.x, this.y+this.h, 10, 30, 200, "down", "enemy", this.eType);
      } else if (this.eType == 3) {
        var b = new Bullet(this.x + (this.w), this.y+this.h, 3, 20, 200, "down", "enemy", this.eType);
        var b = new Bullet(this.x, this.y+this.h, 3, 20, 200, "down", "enemy", this.eType);
      } else if (this.eType == 4) {
        var b = new Bullet(this.x + (this.w), this.y+this.h, 16, 15, 200, "diag-right", "enemy", this.eType);
        var b = new Bullet(this.x + (this.w/2), this.y+this.h, 16, 15, 200, "down", "enemy", this.eType);
        var b = new Bullet(this.x, this.y+this.h, 16, 15, 200, "diag-left", "enemy", this.eType);
      } else if (this.eType == 5) {
        var b = new Bullet(this.x + (this.w), this.y+this.h, 20, 20, 200, "diag-right", "enemy", this.eType);
        var b = new Bullet(this.x + (this.w/2), this.y+this.h, 20, 20, 200, "down", "enemy", this.eType);
        var b = new Bullet(this.x, this.y+this.h, 20, 20, 200, "diag-left", "enemy", this.eType);
      }
      shootEnemySound.play();
    }

  };

  // Draw
  this.draw = function() {
    luv.canvas.setColor(0,255,0);
    // luv.canvas.print(this.x + "," + this.y, this.x, this.y);
    // luv.canvas.fillRectangle(this.x, this.y, this.w, this.h);
    if (this.timer < 2) {
      if (this.eType == 1) {
        luv.canvas.draw(enemy1OpenImg, this.x, this.y);
      } else if (this.eType == 2) {
        luv.canvas.draw(enemy2OpenImg, this.x, this.y);
      } else if (this.eType == 3) {
        luv.canvas.draw(enemy3OpenImg, this.x, this.y);
      } else if (this.eType == 4) {
        luv.canvas.draw(enemy4OpenImg, this.x, this.y);
      } else if (this.eType == 5) {
        luv.canvas.draw(enemy5OpenImg, this.x, this.y);
      }
    } else {
      if (this.eType == 1) {
        luv.canvas.draw(enemy1ClosedImg, this.x, this.y);
      } else if (this.eType == 2) {
        luv.canvas.draw(enemy2ClosedImg, this.x, this.y);
      } else if (this.eType == 3) {
        luv.canvas.draw(enemy3ClosedImg, this.x, this.y);
      } else if (this.eType == 4) {
        luv.canvas.draw(enemy4ClosedImg, this.x, this.y);
      } else if (this.eType == 5) {
        luv.canvas.draw(enemy5ClosedImg, this.x, this.y);
      }
    }
  };

  // Mouse Pressed
  this.onPressed = function(x, y, button) {

  };

  entities.push(this);
};
