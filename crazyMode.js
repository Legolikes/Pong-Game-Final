let prevScore = 0;
let topScore = 0;

let ballSize = 10;

function displayResults(){
document.getElementById("previousScore").innerHTML = "Score:"+ prevScore;
document.getElementById("topScore").innerHTML = "Top Score:"+ topScore;
}
displayResults();
class Vec
{
  constructor(x = 0, y = 0)
  {
    this.x = x;
    this.y = y;
  }
}

class Rect
{
  constructor(w, h)
  {
    this.pos = new Vec();
    this.size = new Vec(w, h);
  }
  get left()
  {
    return this.pos.x - this.size.x / 2;
  }
  get right()
  {
    return this.pos.x + this.size.x / 2;
  }
  get top()
  {
    return this.pos.y - this.size.y / 2;
  }
  get bottom()
  {
    return this.pos.y + this.size.y / 2;
  }
}

class Ball extends Rect
{
  constructor()
  {
    super(ballSize,ballSize);
    this.vel = new Vec();
  }
}



class Player extends Rect
 {
   constructor()
   {
      super(20, 100);
      this.score = 0;
   }
 }

class Pong
{
  constructor(canvas)
  {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this.ball = new Ball();
    this.ball.pos.x = 300;
    this.ball.pos.y = 200;
    this.ball.vel.x = 175;
    this.ball.vel.y = 175;
    this.players = [
      new Player(),
     // new Player(),
      ];
      
      this.players[0].pos.x = 40;
     // this.players[1].pos.x = this._canvas.width -40;
      this.players.forEach(player => {
        player.pos.y = this._canvas.height /2;
      });
      
    let lastTime;
    const callback = (millis) => {
        if (lastTime) {
          this.update((millis - lastTime) / 1000);
        }
        lastTime = millis;
        requestAnimationFrame(callback);
      };
      callback();
  }
  collide(player, ball)
  {
    if (player.left < ball.right && player.right > ball.left &&
        player.top < ball.bottom && player.bottom > ball.top) {
        prevScore = prevScore + 1;
      
        this._canvas.height = this.pickRandomHEIGHT();
        this._canvas.width = this.pickRandomWIDTH();
        
        ballSize = pickRandomBallSize();
        console.log(ballSize);
        
        if(ball.vel.x > 0){
        this.ball.vel.x = -(this.ball.vel.x + 40);
        }else{
        this.ball.vel.x = -(this.ball.vel.x - 40);
        }
       if(ball.vel.y > 0){
        this.ball.vel.y = (this.ball.vel.y + 40);
        }else{
        this.ball.vel.y = (this.ball.vel.y - 40);
        }
        //
        
        displayResults();
        if (prevScore > topScore){
        topScore = prevScore;
        displayResults();
        
      }
    }
  }
  draw()
  {
    this._context.fillStyle = '#000';
    this._context.fillRect(0,0, this._canvas.width, this._canvas.height);
    
    this.drawBall(this.ball);
    this.players.forEach(player => this.drawRect(player));
  }
  
  drawRect(rect)
    {
    this._context.fillStyle = colorVariable;
    this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
    //
  drawBall(rect)
    {
    this._context.fillStyle = colorVariable;
    this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
    //
    
    
  update(dt) {
    this.ball.pos.x += this.ball.vel.x * dt;
    this.ball.pos.y += this.ball.vel.y * dt;
    
    if(this.ball.left < 0 ) {
      ballSize = 10;
      this.ball.vel.x = -this.ball.vel.x;
      this.ball.pos.x = 300;
      this.ball.pos.y = 200;
      this._canvas.width = 800;
      this._canvas.height = 400;
      colorVariable = '#fff';
      this.ball.vel.x = 175;
      this.ball.vel.y = 175;
      prevScore = 0;
      displayResults();
      
    }
    
    if(this.ball.right > this._canvas.width - 10) {
      this.ball.vel.x = -this.ball.vel.x;
      colorVariable = (pickRandomCOLOR(COLORS));
      
    }
  

    if(this.ball.top < 0 || this.ball.bottom > this._canvas.height - 10) {
      this.ball.vel.y = -this.ball.vel.y;
      colorVariable = (pickRandomCOLOR(COLORS));
    }
    
   // this.players[1].pos.y = this.ball.pos.y;
    
    this.players.forEach(player => this.collide(player, this.ball));
    
    
    this.draw();
    
    
    
  }
pickRandomWIDTH() {
const randomWidth = (Math.floor(Math.random() * 1000)+200);
return randomWidth;
  }
pickRandomHEIGHT() {
const randomWidth = (Math.floor(Math.random() * 900)+this.ball.pos.y);
return randomWidth;
  }
  
}

const canvas = document.getElementById('pong');
const pong = new Pong(canvas);

canvas.addEventListener('mousemove', event => {
  pong.players[0].pos.y = event.offsetY;
  
});

const COLORS = ['#FF0000','#00FF00' ,'#0000FF' ,'#9400D3' ,'#FFA500', '#FFFF00'];
function pickRandomCOLOR(possibleCOLORS) {
  const randomNumber = Math.floor(Math.random() * possibleCOLORS.length);
  return possibleCOLORS[randomNumber];
}
var colorVariable = '#fff';


function pickRandomBallSize() {
const randomBallSize = (Math.floor(Math.random() * 100));
console.log(randomBallSize);
return randomBallSize;
}