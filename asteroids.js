var AG = (function() {
  function Asteroid(pos, ctx, fill) {
    var self = this;

    self.x = pos['x'];
    self.y = pos['y'];
    self.rad = 20;
    self.fill = fill;

    self.vel = function() {
      var randX = Math.random() * 10 + -5;
      var randY = Math.random() * 10 + -5;

      return {x: randX, y:randY}
    }();

    self.draw = function() {
      ctx.fillStyle = self.fill;

      ctx.beginPath();
      ctx.arc(self.x, self.y, self.rad, 0, 2 * Math.PI, true)
      ctx.fill();
    };

    self.update = function(maxX, maxY) {
      self.offScreenX(maxX);
      self.offScreenY(maxY);

      self.x += self.vel['x'];
      self.y += self.vel['y'];
    };

    self.offScreenX = function(maxX) {
      if (self.x > maxX){
        self.x = 0;
      } else if (self.x < 0){
        self.x = maxX;
      }
    };

    self.offScreenY = function(maxY) {
      if (self.y > maxY){
        self.y = 0;
      } else if (self.y < 0){
        self.y = maxY;
      }
    };
  }

  // Asteroid Class Methods

  Asteroid.randomAsteroid = function(maxX, maxY) {
    var randX = Math.floor(Math.random() * maxX);
    var randY = Math.floor(Math.random() * maxY);
    var pos = {x: randX, y: randY};

    return new Asteroid(pos, ctx, "#000");
  }

  function Ship(pos, ctx) {
    var self = this;

    self.x = pos['x'];
    self.y = pos['y'];

    self.draw = function() {
      ctx.fillStyle = "#FF0000";

      // Create ship
      ctx.beginPath();
      ctx.moveTo(self.x, self.y);
      ctx.lineTo(self.x+12, self.y+30);
      ctx.lineTo(self.x-12, self.y+30);
      ctx.lineTo(self.x, self.y);
      ctx.fill();

      // Create forcefield
      ctx.beginPath();
      ctx.arc(self.x, self.y+17, 20, 0, 2 * Math.PI, true)
      ctx.strokeStyle = '#5ac3b6'
      ctx.stroke();
    };

    self.isHit = function(asteroids) {
      for(var i = 0; i < asteroids.length; i++){
        var astr = asteroids[i];
        var astrX = astr.x;
        var astrY = astr.y;

        var deltX = Math.pow(astrX - self.x, 2);

        // Center of forcefield circle is at (self.x, self.y+17)
        var deltY = Math.pow(astrY - (self.y + 17), 2);

        d = Math.sqrt(deltX + deltY);
        if (d < (astr.rad + 20)) {
          return true;
        }
      }
    };
  }

  function Game(ctx, canvasWidth, canvasHeight){
    var self = this;

    self.asteroids = [];
    self.maxX = canvasWidth;
    self.maxY = canvasHeight;
    self.ship = new Ship(
      {x: (self.maxX / 2), y: (self.maxY / 2)},
      ctx,
      self.asteroids);

    self.initialize = function() {
      self.getAsteroids();
      self.start();
    };

    self.start = function() {
      self.gameInt = setInterval(self.step, 1000/24);
    };

    self.step = function() {
      self.update();
      self.draw();
      if (self.ship.isHit(self.asteroids)) {
        alert("YOU GOT HIT!");
        clearInterval(self.gameInt);
      }
    }

    self.draw = function(){
      ctx.clearRect(0, 0, 900, 600);
      self.ship.draw();

      for (var i=0; i<self.asteroids.length; i++) {
        var a = self.asteroids[i];
        a.draw();
      }
    };

    self.update = function() {
      for (var i=0; i<self.asteroids.length; i++) {
        var a = self.asteroids[i];
        a.update(self.maxX, self.maxY);
      }
    }

    self.getAsteroids = function() {
      for (var i=0; i<10; i++) {
        var a = Asteroid.randomAsteroid(self.maxX, self.maxY)
        self.asteroids.push(a);
      }
    };
  }

  return {
    Asteroid: Asteroid,
    Game: Game,
    Ship: Ship
  }
})();


var canvas = $("canvas")[0]
canvas.width = 900;
canvas.height = 600;
var ctx = canvas.getContext("2d");

var a = new AG.Asteroid({x:100, y:100}, ctx, "#FCDC3B");
a.draw();


var g = new AG.Game(ctx, 900, 600);
g.initialize();



/*
var mercury = new AG.Asteroid(350, 250, ctx, 15, "#867970");
mercury.draw(mercury.X, mercury.Y);

var venus = new AG.Asteroid(400, 400, ctx, 35, "#238E68");
venus.draw(venus.X, venus.Y);

var earth = new AG.Asteroid(650, 350, ctx, 55, "#38B0DE");
earth.draw(earth.X, earth.Y);

var mars = new AG.Asteroid(850, 450, ctx, 25, "#FF2400")
mars.draw(mars.X, mars.Y);
*/