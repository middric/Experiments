var canvas, ctx, asteroid = new Asteroid(75, 0.1, 23, 0.1);
asteroid.generatePath();

function init() {

  canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'asteroid');
  canvas.width = div.offsetWidth;
  canvas.height = div.offsetHeight;
  ctx = canvas.getContext('2d');

  var a = document.createElement('a');
  a.appendChild(document.createTextNode('Regenerate'));

  var div = document.getElementById('asteroid-div');
  div.appendChild(canvas);
  div.appendChild(a);

  setInterval(loop, 1000/24);
  a.onclick = function() {
    asteroid.generatePath();
  }
}

function loop() {
  canvas.width = canvas.width;
  ctx.lineWidth = asteroid.radius / 10;
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
  ctx.save();
  asteroid.tracePath(ctx);
  ctx.restore();
}

function Asteroid(radius, rotationSpeed, detail, texture) {
  this.radius = radius;
  this.rotationSpeed = rotationSpeed;
  this.rotation = 0;
  this.detail = detail;
  this.texture = texture;
  this.path = [];

  this.increaseRotation = function() {
      this.rotation += this.rotationSpeed;
  }
  this.generatePath = function() {
    for(var i = this.detail, segments = 360 / i;i > 0;) {
      i--;
      angle = (segments * i) * (Math.PI/180);
      rand = this.radius * (1 - this.texture + Math.random() * 2 * this.texture);
      this.path[i] = [Math.cos(angle) * rand, Math.sin(angle) * rand];
    }
  }

  this.tracePath = function(c) {
    c.translate(canvas.width / 2, canvas.height / 2);
    c.rotate(this.rotation * (Math.PI/180));
    c.beginPath();

    for(var i = this.path.length; i > 0;) {
      i--;
      c.lineTo(this.path[i][0], this.path[i][1]);
    }
    c.closePath();
    c.stroke();

    this.increaseRotation();
  }
}