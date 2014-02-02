
menu = [];

menu.buttons = [];

menu.buttons[0] = {
  x: (312-100)/2,
  y: 200,
  high: false,
  w: 100,
  h: 30
};

menu.buttons[1] = {
  x: (312-100)/2,
  y: 230,
  high: false,
  w: 100,
  h: 30
};

menu.buttons[2] = {
  x: (312-100)/2,
  y: 260,
  high: false,
  w: 100,
  h: 30
};

/*
menu.buttons[2] = {
  x: (312-100)/2,
  y: 260,
  high: false,
  w: 100,
  h: 30
};*/

menu.update = function(dt) {

}

menu.draw = function() {
  if(!luv.media.isLoaded()) { return; }
  if (!menu.buttons[0].img) {
    menu.buttons[0].img = playImg;
  }
  if (!menu.buttons[1].img) {
    menu.buttons[1].img = highscoreImg;
  }
  if (!menu.buttons[2].img) {
    menu.buttons[2].img = creditsImg;
  }
  // Draw Logo
  luv.canvas.draw(menuImg, (screenWidth - 300)/2, 10);

  // Draw Buttons
  for (var x=0; x<menu.buttons.length; x++) {
    var b = menu.buttons[x];

    if (b.high) {
      luv.canvas.setColor(255,255,255);
    } else {
      luv.canvas.setColor(150,150,150);
    }

    luv.canvas.draw(b.img, b.x, b.y);
  }

  // Draw instructions
  luv.canvas.print("How to play: Use Left, Right, Up, and Down", 5, 400);
  luv.canvas.print("to move around.", 5, 420);
  luv.canvas.print("Shoot with the spacebar. Don't forget to", 5, 440);
  luv.canvas.print("grab the blue.", 5, 460);
  luv.canvas.print("upgrades!", 5, 480);
}

menu.onPressed = function(key) {

}

menu.onMousePressed = function(x, y, button) {
  if (button == "l") {
    for (var i=0; i<menu.buttons.length; i++) {
      var b = menu.buttons[i];
      if (bbox(x, y, 1, 1, b.x, b.y, b.w, b.h)) {
        if (i == 0) {
          newGame();
        } else if (i == 1) {
          highscores = JSON.parse(window.localStorage["highscores"]);
          currentGamestate = "highscore";
        } else if (i == 2) {
          currentGamestate = "credits";
        }
      }
    }
  }
}
