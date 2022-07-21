/*
shape invaders
a simple space shooter game

game play:
- move left or right with mouse
- press mouse button to fire
- don't let enemy collide with ship or reach bottom of screen
- game is over when life is zero

enemy types:
- cube: nothing special here
- big boy: can take multiple shots
- seeker: has mangetic personality
- speedy; moves twice as fast
- big boss: !!!

powerups:
- force field: hey, it's dangerous out there
- extra life: get a life
- support ships: teamwork makes the dream work
- moab: clears enemy from screen
*/ 

let lifebar;
let player;
let playerX;
let playerY;
let support1;
let support2;
let shots = [];

let enemies = [];
let enemy;
let enemySpawnRate = 1000; // per millisecond 1000

let powerups = [];
let powerup;
let powerupSpawnRate = 10000; // per millisecond 10000

let starFieldSm = [];
let starFieldMd = [];
let starFieldLg = [];
let smoveSm = 0.05; //0.05
let smoveMd = 0.15; //0.1
let smoveLg = 0.25; //0.15

const KONAMI_CODE = [38,38,40,40,37,39,37,39,66,65,13];
let code = [];

// sfx variables
let sfxForceField;
let sfxLife;
let sfxSupport
let sfxSupportExit;
let sfxMoab;
let sfxEasterEgg;
let sfxShoot;
let sfxImpact;
let sfxExplosion;
let sfxPlayerHit;
let sfxLoseHealth;
let sfxLose;
let bgmusic;

let eightBitFont;

let isGameOver = false;
let button;

//--------------------------------------------------------//
//                     Life Bar Class                     //
//--------------------------------------------------------//

class LifeBar {
  constructor() {
    this.life = 3;
  }
  
  show() {
    push();
    noStroke();
    fill('red');
    for(let i=1; i<=this.life; i++) {
      triangle(40+15*i,40,45+15*i,50,35+15*i,50);
    }
    pop();
  }
}

//--------------------------------------------------------//
//                      Player Class                      //
//--------------------------------------------------------//

class Player {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.c = 'yellow';
    this.r = 12;
    this.life = 3; //3
    this.hasForceField = false;
    this.hasSupport = false;
    this.supportCounter = 0;
  }
  
  show() {
    push();
    fill('yellow');
    triangle(this.x,this.y,this.x+12,this.y+24,this.x-12,this.y+24);
    fill('rgb(143,143,28)');
    triangle(this.x,this.y+15,this.x+12,this.y+24,this.x-12,this.y+24);
    //fill('rgb(163,163,26)');
    fill('rgb(108,108,22)');
    triangle(this.x,this.y,this.x+12,this.y+24,this.x,this.y+15);
    pop();
  }
  
  move() {
    this.x = mouseX;
  }
  
  explode() {
    push();
    noFill();
    strokeWeight(3);
    stroke('red');
    ellipse(this.x,this.y+14,this.r*4,this.r*4);
    strokeWeight(2);
    stroke(color('hsla(0, 100%, 67%, 1)'));
    ellipse(this.x,this.y+14,this.r*8,this.r*8);
    pop();
  }
  
  powerupEffect(powerup) {
    push();
    noFill();
    stroke(powerup.c);
    strokeWeight(3);
    ellipse(player.x,player.y+14,player.r*4,player.r*4);
    strokeWeight(1);
    ellipse(player.x,player.y+14,player.r*6,player.r*6);
    pop();
  }

  force() {
    if(this.hasForceField) {
      push();
      fill(color('hsla(0,80%,50%,0.2)'));
      strokeWeight(2);
      stroke('pink');
      ellipse(this.x,this.y+14,this.r*5,this.r*5);
      pop();
    }
  }
  
  support() {
    if(this.hasSupport) {
      push();
      // right ship
      fill('rgb(0,183,255)');
      triangle(this.x+40,this.y+10,this.x+48,this.y+24,this.x+32,this.y+24);
      fill('rgb(15,93,123)');
      triangle(this.x+40,this.y+18,this.x+48,this.y+24,this.x+32,this.y+24);
      fill('rgb(0,56,78)');
      triangle(this.x+40,this.y+10,this.x+48,this.y+24,this.x+40,this.y+18);
      
      // left ship
      fill('green');
      triangle(this.x-40,this.y+10,this.x-48,this.y+24,this.x-32,this.y+24);
      fill('rgb(0,94,0)');
      triangle(this.x-40,this.y+18,this.x-48,this.y+24,this.x-32,this.y+24);
      fill('rgb(0,57,0)');
      triangle(this.x-40,this.y+10,this.x-32,this.y+24,this.x-40,this.y+18);
      pop();
      
      // remove support ships
      if(this.supportCounter < 600) {
        this.supportCounter+=1;
      } else {
        this.hasSupport = false;
        this.supportCounter = 0;
        sfxSupportExit.play();
      }
    }
  }
}

//--------------------------------------------------------//
//                      Power Up Class                    //
//--------------------------------------------------------//

class Powerup {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.c = 'white';
  }
  
  show() {
    push();
    fill(this.c);
    rect(this.x,this.y,15,15);
    pop();
  }
  
  move() {
    this.y = this.y+2;
  }
  
  hit(player) {
    let d = dist(this.x,this.y,player.x,player.y);
    if(d < player.r+5) {
      return true;
    } else {
      return false;
    }
  }
}

class PowerupForceField extends Powerup {
  constructor(x,y) {
    super(x,y);
    this.c = color('hsla(0,80%,50%,0.2)');
  }
  
  show() {
    push(); 
    fill(this.c);
    strokeWeight(2);
    stroke('pink');
    ellipse(this.x,this.y,20,20);
    pop();
  }
  
  apply() {
    sfxForceField.play();
    player.hasForceField = true;
  }
}

class PowerupLife extends Powerup {
  constructor(x,y) {
    super(x,y);
    this.c = 'red';
    this.s = 15;
  }
  
  show() {
    push(); 
    //y = mouseY;
    fill(this.c);
    //noStroke();
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(this.x - this.s / 2, this.y - this.s / 2, this.x - this.s, this.y + this.s / 3, this.x, this.y + this.s);
    bezierVertex(this.x + this.s, this.y + this.s / 3, this.x + this.s / 2, this.y - this.s / 2, this.x, this.y);
    endShape(CLOSE);
    pop();
  }
  
  apply() {
    sfxLife.play();
    player.life = player.life+1;
    lifebar.life = lifebar.life+1;
  }
}

class PowerupSupport extends Powerup {
  constructor(x,y) {
    super(x,y);
    this.c = 'rgb(0,183,255)';
    this.c2 = 'green';
  }
  
  show() {
    push();
    fill(this.c2);
    triangle(this.x,this.y,this.x+5,this.y+20,this.x-5,this.y+20);
    fill(this.c);
    triangle(this.x+12,this.y,this.x+17,this.y+20,this.x+7,this.y+20);
    pop();
  }
  
  apply() {
    sfxSupport.play();
    player.hasSupport = true;
  }
}

class PowerupMoab extends Powerup {
  constructor(x,y) {
    super(x,y);
    this.c = 'yellow';
    this.c2 = 'black';
  }
  
  show() {
    push();
    fill(this.c)
    stroke(this.c2)
    strokeWeight(2.5);
    ellipse(this.x,this.y,22,22);
    fill(this.c2);
    triangle(this.x,this.y,this.x+5,this.y-10,this.x-5,this.y-10)
    triangle(this.x,this.y,this.x+10,this.y,this.x+5,this.y+10)
    triangle(this.x,this.y,this.x-10,this.y,this.x-5,this.y+10)
    pop();
  }
  
  apply() {
    for(let i=0; i<enemies.length; i++) {
      sfxMoab.play();
      enemies[i].explode();
      //enemies.splice(i, 1);
    }
    enemies = [];
  }
}

//--------------------------------------------------------//
//                       Enemy Class                      //
//--------------------------------------------------------//

class Enemy {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.s = 20;
    this.r = 10;
    this.e = 5;
    this.t = 1;
    this.c = color('hsla(95, 100%, 67%, 1)');
    this.life = 1;
  }
  
  show() {
    push();
    fill(this.c);
    ellipse(this.x,this.y,this.r*2,this.r*2);
    pop();
  }
  
  move() {
    this.y = this.y+2;
  }
  
  hit(player) {
    let d = dist(this.x,this.y,player.x,player.y);
    if(d < this.r + player.r) {
      return true;
    } else {
      return false;
    }
  }
  
  explode() {
    push();
    noFill();
    stroke('white');
    strokeWeight(5);
    ellipse(this.x,this.y,this.e*10,this.e*10);
    strokeWeight(3);
    ellipse(this.x,this.y,this.e*25,this.e*25);
    pop();
  }
}

class Cube extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.r = 5;
    this.t = 3;
    this.life = 1;
  }
  
  show() {
    push();
    fill('rgb(177,0,148)');
    square(this.x,this.y,this.t*6);
    fill('rgb(255,0,213)');
    quad(this.x,this.y-this.t*4.5,this.x+this.t*6,this.y-this.t*4.5,this.x+this.t*3,this.y-this.t*3,this.x-this.t*3,this.y-this.t*3);
    fill('rgb(118,12,101)');
    quad(this.x+this.t*3,this.y-this.t*3,this.x+this.t*6,this.y-this.t*4.5,this.x+this.t*6,this.y+this.t*1.5,this.x+this.t*3,this.y+this.t*3);
    pop();
  }
}

class BigBoy extends Enemy {
  constructor(x,y,r) {
    super(x,y);
    this.c = 'orange';
    this.r = r;
    this.e = 10;
    this.t = 4;
    this.life = 3;
  }
  
  show() {
    push();
    // fill('rgb(217,110,193)');
    fill('rgb(228,103,200)');
    rect(this.x,this.y,this.t*20,this.t*10);
    fill('rgb(254,147,230)');
    quad(this.x-this.t*6,this.y-this.t*7,this.x+this.t*14,this.y-this.t*7,this.x+this.t*10,this.y-this.t*5,this.x-this.t*10,this.y-this.t*5);
    // fill('rgb(210,85,182)');
    fill('rgb(204,43,167)');
    quad(this.x+this.t*10,this.y-this.t*5,this.x+this.t*14,this.y-this.t*7,this.x+this.t*14,this.y+this.t*3,this.x+this.t*10,this.y+this.t*5);
    pop();
  }
  
  move() {
    this.y = this.y+1;
  }
}

class Seeker extends Enemy {
  constructor(x,y,r) {
    super(x,y);
    this.c = color('hsla(186, 100%, 67%, 1)');
    this.r = r;
    this.t = 2;
  }
  
  show() {
    fill('rgb(254,87,34)');
    triangle(this.x,this.y,this.x+4*this.t,this.y+6*this.t,this.x-4*this.t,this.y+6*this.t);
    fill('rgb(216,52,0)');
    triangle(this.x+4*this.t,this.y+6*this.t,this.x-4*this.t,this.y+6*this.t,this.x,this.y+10*this.t);
    fill('rgb(228,64,11)');
    triangle(this.x-7*this.t,this.y+7*this.t,this.x-4*this.t,this.y+6*this.t,this.x,this.y+10*this.t);
    fill('rgb(169,32,5)');
    triangle(this.x+7*this.t,this.y+7*this.t,this.x+4*this.t,this.y+6*this.t,this.x,this.y+10*this.t);
    fill('rgb(248,161,134)');
    triangle(this.x-7*this.t,this.y+1*this.t,this.x,this.y,this.x-4*this.t,this.y+6*this.t);
    fill('rgb(197,34,0)');
    triangle(this.x+7*this.t,this.y+1*this.t,this.x+4*this.t,this.y+6*this.t,this.x,this.y);
    fill('rgb(249,118,76)');
    triangle(this.x-7*this.t,this.y+1*this.t,this.x-4*this.t,this.y+6*this.t,this.x-7*this.t,this.y+7*this.t);
    fill('rgb(169,18,0)');
    triangle(this.x+7*this.t,this.y+1*this.t,this.x+4*this.t,this.y+6*this.t,this.x+7*this.t,this.y+7*this.t);
    fill('rgb(248,98,50)');
    triangle(this.x-7*this.t,this.y+1*this.t,this.x,this.y-3*this.t,this.x,this.y);
    fill('rgb(243,65,8)');
    triangle(this.x+7*this.t,this.y+1*this.t,this.x,this.y-3*this.t,this.x,this.y);
  }
  
  move() {
    let d = dist(this.x,this.y,player.x,player.y);
    this.x = lerp(this.x,player.x,2/d);
    this.y = lerp(this.y,player.y,2/d);
  }
}

class Speedy extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.c = 'red';
    this.r = 5;
    this.e = 8;
  }
  
  show() {
    push();
    fill('darkred')
    triangle(this.x,this.y,this.x+10,this.y+12,this.x,this.y+9);
    fill('red');
    triangle(this.x,this.y,this.x-10,this.y+12,this.x,this.y+9);
    fill('rgb(162,20,20)');
    triangle(this.x,this.y+9,this.x+10,this.y+12,this.x,this.y+35);
    fill('rgb(253,60,60)');
    triangle(this.x,this.y+9,this.x-10,this.y+12,this.x,this.y+35);
    pop();
  }
  
  move() {
    this.y = this.y + 4;
  }
}

class BigBoss extends Enemy {
  constructor(x,y,r) {
    super(x,y);
    this.c = 'purple';
    this.r = r;
    this.e = 15;
    this.t = 10;
    this.life = 10;
  }
  
  show() {
    
    push();
    // back
    fill('rgba(75,0,190,0.33)');
    quad(this.x-this.t*6,this.y-this.t*7,this.x+this.t*14,this.y-this.t*7,this.x+this.t*18,this.y+this.t*3,this.x-this.t*10,this.y+this.t*3);
    // left
    fill('rgba(85,17,189,0.55)');
    quad(this.x-this.t*10,this.y-this.t*5,this.x-this.t*6,this.y-this.t*7,this.x-this.t*10,this.y+this.t*3,this.x-this.t*14,this.y+this.t*5);
    // bottom
    fill('rgba(101,0,255,0.5)');
    quad(this.x-this.t*10,this.y+this.t*3,this.x+this.t*18,this.y+this.t*3,this.x+this.t*14,this.y+this.t*5,this.x-this.t*14,this.y+this.t*5);
    // diamond heart
    fill('red');
    triangle(this.x+2,this.y-10,this.x-2,this.y+2,this.x-8,this.y);
    fill('rgb(145,3,3)');
    triangle(this.x+2,this.y-10,this.x+12,this.y,this.x-2,this.y+2);
    fill('rgb(95,1,1)');
    triangle(this.x+12,this.y,this.x-2,this.y+2,this.x+2,this.y+10);
    fill('rgb(175,43,43)');
    triangle(this.x-8,this.y,this.x-2,this.y+2,this.x+2,this.y+10);

    fill('rgba(75,0,190,0.5)');
    quad(this.x-this.t*10,this.y-this.t*5,this.x+this.t*10,this.y-this.t*5,this.x+this.t*14,this.y+this.t*5,this.x-this.t*14,this.y+this.t*5);  
    // top
    fill('rgba(101,0,255,0.5)');
    quad(this.x-this.t*6,this.y-this.t*7,this.x+this.t*14,this.y-this.t*7,this.x+this.t*10,this.y-this.t*5,this.x-this.t*10,this.y-this.t*5);
    // right
    fill('rgba(85,17,189,0.66)');
    quad(this.x+this.t*10,this.y-this.t*5,this.x+this.t*14,this.y-this.t*7,this.x+this.t*18,this.y+this.t*3,this.x+this.t*14,this.y+this.t*5);
    pop();
  }
  
  move() {
    this.y = this.y+0.5;
  }
}

//--------------------------------------------------------//
//                        Shot Class                      //
//--------------------------------------------------------//

class Shot {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.r = 5;
  }
  
  show() {
    push();
    fill('red');
    ellipse(this.x,this.y,this.r*2,this.r*3);
    pop();
  }
  
  move() {
    this.y = this.y-5;
  }
  
  hit(enemy) {
    let d = dist(this.x,this.y,enemy.x,enemy.y);
    if(d < this.r + enemy.r*enemy.t) {
      return true;
    } else {
      return false;
    }
  }
}

//--------------------------------------------------------//
//                     Helper Functions                   //
//--------------------------------------------------------//

// preload sfx assets
function preload() {
  sfxForceField = loadSound('sfx_forcefield.mp3');
  sfxLife = loadSound('sfx_powerup.mp3');
  sfxSupport = loadSound('sfx_support.mp3');
  sfxSupportExit = loadSound('sfx_supportexit.mp3');
  sfxMoab = loadSound('sfx_moab.mp3');
  sfxEasterEgg = loadSound('sfx_easteregg.mp3');
  sfxShoot = loadSound('sfx_shoot.mp3');
  sfxImpact = loadSound('sfx_impact.mp3');
  sfxExplosion = loadSound('sfx_explosion.mp3');
  sfxPlayerHit = loadSound('sfx_playerhit.mp3');
  sfxLoseHealth = loadSound('sfx_losehealth.mp3');
  sfxLose = loadSound('sfx_lose.mp3');
  bgmusic = loadSound('bgmusic.mp3');
  eightBitFont = loadFont('8-bit.ttf')
}

// generate new enemy
function generateEnemy() {
  let rand = random(11);
  let enemy
  if(rand < 4) {
    enemy = new Cube(random(10,width-10),0);
  } else if(rand < 6) {
    enemy = new BigBoy(random(10,width-10),0,8);
  } else if(rand < 8) {
    enemy = new Seeker(random(10,width-10),0,5);
  } else if(rand < 10) {
    enemy = new Speedy(random(10,width-10),0);
  } else {
    enemy = new BigBoss(random(10,width-10),0,8);
  }
  enemies.push(enemy);
}

// generate new powerup
function generatePowerup() {
  let rand = random(8);
  if(rand < 2) {
    powerup = new PowerupForceField(random(10,width-10),0);
  } else if(rand < 4) {
    powerup = new PowerupLife(random(10,width-10),0);
  } else if(rand < 6) {
    powerup = new PowerupSupport(random(10,width-10),0);
  } else {
    powerup = new PowerupMoab(random(10,width-10),0);
  }
  powerups.push(powerup);
}

// generate new shot
function mousePressed() {
  if(!isGameOver) {
    sfxShoot.play();
    let shot = new Shot(mouseX,playerY-player.r);
  
    if(player.hasSupport) {
    let supportShot1 = new Shot(mouseX+40,playerY-player.r+10);
    let supportShot2 = new Shot(mouseX-40,playerY-player.r+10);
    shots.push(supportShot1);
    shots.push(supportShot2);
  }
  shots.push(shot);
  }
}

// render and move parallax starfield
function generateStarfield() {
  push();
  stroke('white');
  for(let i=0; i<starFieldSm.length; i++) {
    starFieldSm[i][1] = starFieldSm[i][1]+smoveSm;
    starFieldMd[i][1] = starFieldMd[i][1]+smoveMd;
    starFieldLg[i][1] = starFieldLg[i][1]+smoveLg;
    //push();
    strokeWeight(starFieldSm[i][2]);
    point(starFieldSm[i][0],starFieldSm[i][1]);
    strokeWeight(starFieldMd[i][2]);
    point(starFieldMd[i][0],starFieldMd[i][1]);
    strokeWeight(starFieldLg[i][2]);
    point(starFieldLg[i][0],starFieldLg[i][1]);
    //pop();
    if(starFieldSm[i][1] > height) {
      starFieldSm[i][1] = 0;
    }
    if(starFieldMd[i][1] > height) {
      starFieldMd[i][1] = 0;
    }
    if(starFieldLg[i][1] > height) {
      starFieldLg[i][1] = 0;
    }
  }
  pop();
}

// konami code easter egg
// up, up, down, down, left, right, left, right, b, a, enter(start)
function keyPressed() {
  code.push(keyCode);
  for(let i=0; i<code.length; i++) {
    if(code[i] !== KONAMI_CODE[i]) {
      console.log('false')
      code = [];
      break;
    }
  }
  
  if(code.length === 11) {
    sfxEasterEgg.play();
    player.life = 10;
    lifebar.life = 10;
    player.hasForceField = true;
    player.hasSupport = true;
    code = [];
  }
}

//--------------------------------------------------------//
//                        Game Loop                       //
//--------------------------------------------------------//

function resetGame() {
  noCursor();
  bgmusic.loop();
  isGameOver = false;
  lifebar = new LifeBar();
  playerX = width/2;
  playerY = height*0.8;
  player = new Player(playerX,playerY);
  enemies = [];
  powerups = [];
  starFieldSm = [];
  starFieldMd = [];
  starFieldLg = [];
  setInterval(generateEnemy, enemySpawnRate);
  setInterval(generatePowerup, powerupSpawnRate);
  
  for(let i=0; i<99; i++) {
    if(i%3 === 0) {
      starFieldSm.push([random(10,width-10),random(10,height-10),random(2,4)]);
    } else if(i%3 === 1) {
      starFieldMd.push([random(10,width-10),random(10,height-10),random(4,6)]);
    } else {
      starFieldLg.push([random(10,width-10),random(10,height-10),random(7,10)]);
    }
    
  }
}

// start game
function startGame() {
  loop();
  background(color('hsl(222,100%,7%)'));
  generateStarfield();
  
  lifebar.show();
  player.show();
  player.force();
  player.support();
  player.move();
  
  //--------------------------------------------------------//
  //                      handle shots                      //
  //--------------------------------------------------------//
  for(let i=0; i<shots.length;i++) {
    // remove shot for list if it reaches top of sceen
    if(shots[i].y < 0) {
      shots.splice(i,1);
      continue;
    }
    
    shots[i].show();
    shots[i].move();
    
    // collision handling
    for(let j=0; j<enemies.length; j++) {
        if(shots[i].hit(enemies[j])) {
          enemies[j].life = enemies[j].life-1;
          enemies[j].t = enemies[j].t - 1;
          sfxImpact.play();
          if(enemies[j].life <= 0) {
            enemies[j].explode();
            sfxExplosion.play();
            enemies.splice(j, 1);
          }
          shots.splice(i, 1);
          break;
        }
    }
  }
  
  //--------------------------------------------------------//
  //                     handle enemies                     //
  //--------------------------------------------------------//
  for(let i=0; i<enemies.length; i++) {
    enemies[i].show();
    enemies[i].move();
    
    // collision handling
    if(enemies[i].hit(player)) {
      sfxPlayerHit.play();
      enemies[i].explode();
      player.explode();
      
      if(player.hasForceField) {
        player.hasForceField = false;
      } else {
        player.life = player.life-1;
        lifebar.life = lifebar.life-1;
        if(player.life <= 0) {
          endGame();
        }
      }
      enemies.splice(i, 1);
      break;
    }
    
    // remove enemy for list if it reaches bottom of sceen
    if(enemies[i].y > height) {
      sfxLoseHealth.play();
      enemies.splice(i, 1);
      player.life = player.life-1;
      lifebar.life = lifebar.life-1;
      if(player.life <= 0) {
        endGame();
      }
    }
  }
  
  //--------------------------------------------------------//
  //                     handle powerups                    //
  //--------------------------------------------------------//
  for(let i=0; i<powerups.length; i++) {
    powerups[i].show();
    powerups[i].move();
    
    // collison handling
    if(powerups[i].hit(player)) {
      if(!player.hasForceField) {
        player.powerupEffect(powerups[i]);
      }
      if(!player.hasSupport) {
        player.powerupEffect(powerups[i]);
      }
      powerups[i].apply();
      powerups.splice(i, 1);
      break;
    }
    
    // remove powerup if it reaches bottom of screen
    if(powerups[i].y > height) {
      powerups.splice(i, 1);
    }
  }
}

// stop game
function endGame() {
  noLoop();
  cursor();
  isGameOver = true;
  bgmusic.stop();
  sfxLose.play();
  push();
  fill(color('hsla(0, 0%, 0%, 0.40)'));
  rect(width/2,height/2,width-50,height-50);
  fill('yellow');
  textSize(50);
  textAlign(CENTER);
  text('GAME OVER',width/2,height/2);
  console.log(mouseX,mouseY);
  // if (mouseIsPressed === true) {
  //   //ellipse(50, 50, 50, 50);
  //   console.log('true');
  // } else {
  //   //rect(25, 25, 50, 50);
  //   console.log('false');
  // }
  button = createButton('Play Again?','restartbutton');
  button.position(width/2-140, height/2+100);
  button.mousePressed(restartGame);
  
  
  pop();
  // setTimeout(() => {
  //   clear();
  //   console.log('test')
  //   resetGame();
  //   startGame();
  //   //loop();
  // }, 1000);
}

function restartGame() {
  //console.log('yes');
  //clear();
  // remove restart button
  document.querySelector("button[value='restartbutton']").remove();
  resetGame();
  startGame();
}

//--------------------------------------------------------//
//                      Main Functions                    //
//--------------------------------------------------------//

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL);
  rectMode(CENTER);
  noStroke();
  textFont(eightBitFont);
  resetGame();
  //bgmusic.loop();
//   lifebar = new LifeBar();
//   playerX = width/2;
//   playerY = height*0.8;
//   player = new Player(playerX,playerY);
//   setInterval(generateEnemy, enemySpawnRate);
//   setInterval(generatePowerup, powerupSpawnRate);
  
//   for(let i=0; i<99; i++) {
//     if(i%3 === 0) {
//       starFieldSm.push([random(10,width-10),random(10,height-10),random(2,4)]);
//     } else if(i%3 === 1) {
//       starFieldMd.push([random(10,width-10),random(10,height-10),random(4,6)]);
//     } else {
//       starFieldLg.push([random(10,width-10),random(10,height-10),random(7,10)]);
//     }
    
//   }
}

function draw() {
  startGame();
}