// Collision
bbox = function(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (x1 < x2 + w2 && x2 < x1 + w1 && y1 < y2 + h2 && y2 < y1 + h1) {
    return true;
  }
};

newHighscoreEntry = function(p, r, t) {
  e = {
    p: p,
    r: r,
    t: t
  };

  highscores.push(e);
}

saveHighscores = function() {
  highscores.sort(function(a,b){ return b.points-a.points;});
  window.localStorage["highscores"] = JSON.stringify(highscores);
}
