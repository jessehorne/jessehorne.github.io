var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var globalColor = "#000000";
var lastUpdate = Date.now();
var keysDown = [];
var loadingImages = 0;
var levels = [];

var animFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    null;

var init = function() {
  animFrame(recursiveAnim);
};

var recursiveAnim = function() {
  mainLoop();
  animFrame(recursiveAnim);
};

var mainLoop = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var now = Date.now()
  var dt = (new Date().getTime() - lastUpdate)/1000;

  lastUpdate = now;
  gameUpdate(dt);
  gameDraw();
};

var drawRect = function(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = globalColor;
  ctx.fill();
};

var setColor = function(color) {
  globalColor = color;
};

var print = function(text, x, y) {
  ctx.fillStyle = globalColor;
  ctx.fillText(text, x, y);
};

var setFont = function(font) {
  ctx.font = font;
};

var handleKeyDown = function(e) {
  var char = keysDown.indexOf(e.keyCode);
  if (char == -1){
    keysDown.push(e.keyCode);
  }
};

var handleKeyUp = function(e) {
  var char = keysDown.indexOf(e.keyCode);
  if (char != -1){
    keysDown.splice(char, 1);
  }
};

var keyDown = function(key) {
  if (keysDown.indexOf(key) != -1) {
    return true;
  } else {
    return false;
  }
}

var newImage = function(path, ix, iy) {
  loadingImages += 1;
  var imageObj = new Image();
  imageObj.onload = function() {
    loadingImages -= 1;
  };
  imageObj.src = path;

  imageObj.tileX = ix;
  imageObj.tileY = iy;
  imageObj.tileW = imageObj.width/ix;
  imageObj.tileH = imageObj.height/iy;

  return imageObj;
}

var drawSprite = function(obj, x, y, tx, ty, s, dir) {
  var w = (obj.tileW * tx);
  var h = (obj.tileH * ty);
  var w2 = obj.tileW * s;
  var h2 = obj.tileH * s;

  if (dir == "left") {
    ctx.drawImage(obj, w - obj.tileW, h - obj.tileH, obj.tileW, obj.tileH, x, y, w2, h2);
  } else if (dir == "right") {
    ctx.drawImage(obj, w - obj.tileW, h - obj.tileH, obj.tileW, obj.tileH, x, y, w2, h2);
  }
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
