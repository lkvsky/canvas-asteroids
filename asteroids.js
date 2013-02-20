var AG = (function() {
  function Asteroid(pos, ctx, fill, vel) {
    var self = this;

    self.x = pos['x'];
    self.y = pos['y'];
    self.rad = 20;
    self.vel = vel;

    self.draw = function() {
      ctx.fillStyle = fill;

      ctx.beginPath();
      ctx.arc(self.x, self.y, self.rad, 0, 2 * Math.PI, true)
      ctx.fill();
    }

    self.update = function() {
      self.x += self.vel['x'];
      self.y += self.vel['y'];
    }
  }

  function Game(ctx, canvasMin, canvasMax){
    var self = this;

    self.asteroids = [];

    self.initialize = function() {
      self.getAsteroids();
      self.start();
    };

    self.start = function() {
      setInterval(self.gameloop, 1000/24);
    };

    self.gameloop = function(){
      ctx.clearRect(0, 0, 900, 600);
      for (var i=0; i<self.asteroids.length; i++) {
        var a = self.asteroids[i];
        a.update();
        a.draw();
      }
    };

    self.getAsteroids = function() {
      for (var i=0; i<1000; i++) {
        self.asteroids.push(self.randomAsteroid());
      }
    };

    self.randomAsteroid = function() {
      var randX = Math.floor(Math.random() * canvasMax) + canvasMin;
      var randY = Math.floor(Math.random() * canvasMax) + canvasMin;
      var pos = {x: randX, y: randY};
      var vel = self.randomVelocity();

      return new Asteroid(pos, ctx, "#000", vel);
    };

    self.randomVelocity = function() {
      var randX = Math.random() * 10 + -5;
      var randY = Math.random() * 10 + -5;

      return {x: randX, y:randY}
    }
  }

  return {
    Asteroid: Asteroid,
    Game: Game,
  }
})();


var canvas = $("canvas")[0]
canvas.width = 900;
canvas.height = 600;
var ctx = canvas.getContext("2d");

var a = new AG.Asteroid({x:100, y:100}, ctx, "#FCDC3B");
a.draw();


var g = new AG.Game(ctx, 0, 2000);
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