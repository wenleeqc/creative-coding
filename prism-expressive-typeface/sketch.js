// generative prism type

// type properties
const unit = 25;
const widthRatio = 2; //2
const heightRatio = 2; //2
const xOffset = rand(-8,8); //rand(min,max)
const yOffset = rand(-70,10); //rand(-10,10)
const xVanishingPoint = unit * widthRatio/2 * xOffset; //5
const yVanishingPoint = unit * heightRatio/2 * 5 + yOffset; //5;
const kerning = unit*widthRatio+unit/2;
const leading = yVanishingPoint+unit/2;
const numCol = 7;

//console.log(xOffset,yOffset);

// character set
const prismType = [
  function a() {
    push();
    fill(270,100,60,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(270,100,70,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit/2,yVanishingPoint);
    fill(270,100,80,0.8);
    triangle(0,unit*heightRatio/2,unit*widthRatio,unit*heightRatio/2,xVanishingPoint+unit/2,yVanishingPoint);
    fill(270,100,90,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function b() {
    push();
    fill(180,100,50,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(180,100,60,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit/2,yVanishingPoint);
    fill(180,100,70,0.8);
    triangle(0,unit*heightRatio/2,unit*widthRatio,unit*heightRatio/2,xVanishingPoint+unit/2,yVanishingPoint);
    fill(180,100,80,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    fill(180,100,90,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function c() {
    push();
    fill(50,100,70,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(50,100,80,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit,yVanishingPoint);
    fill(50,100,90,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function d() {
    push();
    fill(342,100,60,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(342,100,70,0.8);
    triangle(0,0,unit*widthRatio,unit*heightRatio*0.05,xVanishingPoint+unit/2,yVanishingPoint);
    fill(342,100,80,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    fill(342,100,90,0.8);
    triangle(unit*widthRatio,unit*heightRatio*0.05,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function e() {
    push();
    fill(110,100,60,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(110,100,70,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit,yVanishingPoint);
    fill(110,100,80,0.8);
    triangle(0,unit*heightRatio/2,unit*widthRatio*0.75,unit*heightRatio/2,xVanishingPoint+unit,yVanishingPoint);
    fill(110,100,90,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function f() {
    push();
    fill(220,100,70,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(220,100,80,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit,yVanishingPoint);
    fill(220,100,90,0.8);
    triangle(0,unit*heightRatio/2,unit*widthRatio*0.75,unit*heightRatio/2,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function g() {
    push();
    fill(40,100,50,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(40,100,60,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit,yVanishingPoint);
    fill(40,100,70,0.8);
    triangle(unit*widthRatio/2,unit*heightRatio/2,unit*widthRatio,unit*heightRatio/2,xVanishingPoint+unit/2,yVanishingPoint);
    fill(40,100,80,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    fill(40,100,90,0.8);
    triangle(unit*widthRatio,unit*heightRatio/2,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function h() {
    push();
    fill(60,100,70,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(60,100,80,0.8);
    triangle(0,unit*heightRatio/2,unit*widthRatio,unit*heightRatio/2,xVanishingPoint+unit/2,yVanishingPoint);
    fill(60,100,90,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function i() {
    push();
    fill(150,100,90,0.8);
    triangle(unit*widthRatio/2,0,unit*widthRatio/2,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function j() {
    push();
    fill(90,100,60,0.8);
    triangle(0,unit*heightRatio/2,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(90,100,70,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit/2,yVanishingPoint);
    fill(90,100,80,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    fill(90,100,90,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    pop();
  },
  function k() {
    push();
    fill(290,100,70,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(290,100,80,0.8);
    triangle(0,unit*heightRatio/2,unit*widthRatio,0,xVanishingPoint+unit,yVanishingPoint);
    fill(290,100,90,0.8)
    triangle(0,unit*heightRatio/2,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function l() {
    push();
    fill(50,100,80,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(50,100,90,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function m() {
    push();
    fill(62,100,60,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(62,100,70,0.8);
    triangle(0,0,unit*widthRatio/2,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    fill(62,100,80,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio/2,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    fill(62,100,90,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function n() {
    push();
    fill(250,100,70,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(250,100,80,0.8);
    triangle(0,0,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    fill(250,100,90,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function o() {
    push();
    fill(165,100,60,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(165,100,70,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit/2,yVanishingPoint);
    fill(165,100,80,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    fill(165,100,90,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function p() {
    push();
    fill(9,100,60,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(9,100,70,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit/2,yVanishingPoint);
    fill(9,100,80,0.8);
    triangle(0,unit*heightRatio/2,unit*widthRatio,unit*heightRatio/2,xVanishingPoint+unit/2,yVanishingPoint);
    fill(9,100,90,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio,unit*heightRatio/2,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function q() {
    push();
    fill(130,100,50,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(130,100,60,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit/2,yVanishingPoint);
    fill(130,100,70,0.8);
    triangle(unit*widthRatio/2,unit*heightRatio*0.75,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    fill(130,100,80,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    fill(130,100,90,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function r() {
    push();
    fill(190,100,50,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(190,100,60,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit/2,yVanishingPoint);
    fill(190,100,70,0.8);
    triangle(0,unit*heightRatio/2,unit*widthRatio,unit*heightRatio/2,xVanishingPoint+unit/2,yVanishingPoint);
    fill(190,100,80,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio,unit*heightRatio/2,xVanishingPoint+unit,yVanishingPoint);
    fill(190,100,90,0.8);
    triangle(0,unit*heightRatio/2,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    pop();
  },
  function s() {
    push();
    fill(100,100,50,0.8);
    triangle(0,0,0,unit*heightRatio/2,xVanishingPoint,yVanishingPoint);
    fill(100,100,60,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit,yVanishingPoint);
    fill(100,100,70,0.8);
    triangle(0,unit*heightRatio/2,unit*widthRatio,unit*heightRatio/2,xVanishingPoint+unit/2,yVanishingPoint);
    fill(100,100,80,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    fill(100,100,90,0.8);
    triangle(unit*widthRatio,unit*heightRatio/2,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function t() {
    push();
    fill(0,100,80,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint+unit,yVanishingPoint);
    fill(0,100,90,0.8);
    triangle(unit*widthRatio/2,0,unit*widthRatio/2,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    pop();
  },
  function u() {
    push();
    fill(60,100,70,0.8);
    triangle(0,0,0,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(60,100,80,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    fill(60,100,90,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function v() {
    push();
    fill(220,100,80,0.8);
    triangle(0,0,unit,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(220,100,90,0.8);
    triangle(unit,unit*heightRatio,unit*widthRatio,0,xVanishingPoint,yVanishingPoint);
    translate(0,1*unit*heightRatio+kerning+45);
    pop();
  },
  function w() {
    push();
    fill(40,100,60,0.8);
    triangle(0,0,unit*widthRatio*0.15,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    fill(40,100,70,0.8);
    triangle(unit*widthRatio*0.15,unit*heightRatio,unit*widthRatio/2,0,xVanishingPoint+unit/2,yVanishingPoint);
    fill(40,100,80,0.8);
    triangle(unit*widthRatio/2,0,unit*widthRatio*0.85,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    fill(40,100,90,0.8);
    triangle(unit*widthRatio*0.85,unit*heightRatio,unit*widthRatio,0,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function x() {
    push();
    fill(150,100,80,0.8);
    triangle(0,0,unit*widthRatio,unit*heightRatio,xVanishingPoint+unit,yVanishingPoint);
    fill(150,100,90,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,0,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function y() {
    push();
    fill(180,100,60,0.8);
    triangle(0,0,0,unit*heightRatio/2,xVanishingPoint,yVanishingPoint);
    fill(180,100,70,0.8);
    triangle(0,unit*heightRatio/2,unit*widthRatio,unit*heightRatio/2,xVanishingPoint+unit/2,yVanishingPoint);
    fill(180,100,80,0.8);
    triangle(unit*widthRatio/2,unit*heightRatio/2,unit*widthRatio/2,unit*heightRatio,xVanishingPoint+unit/2,yVanishingPoint);
    fill(180,100,90,0.8);
    triangle(unit*widthRatio,0,unit*widthRatio,unit*heightRatio/2,xVanishingPoint+unit,yVanishingPoint);
    pop();
  },
  function z() {
    push();
    fill(240,100,70,0.8);
    triangle(0,0,unit*widthRatio,0,xVanishingPoint,yVanishingPoint);
    fill(240,100,80,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,0,xVanishingPoint+unit,yVanishingPoint);
    fill(240,100,90,0.8);
    triangle(0,unit*heightRatio,unit*widthRatio,unit*heightRatio,xVanishingPoint,yVanishingPoint);
    pop();
  },
  function space() {
    //print('blank space')
  }
]

// render word on screen
// parameters:
// word: word to display in string format
function displayWord(word) {
  // character map
  const cMap = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
    ' ': 26
  };
  
  // split word into characters
  const wordArray = word.toUpperCase().split('');
  
  for(let i=0; i<wordArray.length; i++) {
    push();
    translate(i*kerning,0);
    // find character in map
    prismType[cMap[wordArray[i]]]();
    pop();
  }
}

// render font on screen
// parameters:
// columns: number of columns
function displayType(columns=7) {
  const col = columns;
  let r = 0
  let c = 0
  for(let i=0; i<prismType.length; i++) {
    push();
    translate(c*kerning,r*leading);
    prismType[i]();
    pop();
    c++
    if(i%col === col-1) {
      r++
      c = 0
    }
  }
}

// random function wrapper
// parameters:
// min: minimum value
// max: maximum value
function rand(min=-10,max=10) {
  return Math.random() * (max - min) + min;
}

function setup() {
  createCanvas(600, 600);
  colorMode(HSB,360,100,100,1);
  background(0,0,0,1);
  blendMode(LIGHTEST);
  noStroke();
  
  translate(width/2-(numCol-2)*kerning/2,height/2-ceil(26/numCol)*leading/2);
  
  push();
  // translate(140,40);
  displayWord("PRISM");
  pop();
  
  push();
  scale(0.7);
  // translate(200,270)
  translate(0,1.8*leading)
  displayType();
  pop();
}