/*
scanimation
an example of barrier-grid animation

viewer can control the speed of animation by sliding mouse across canvas to make cat "move"
press mouse key to remove grid and reveal underlying image

https://en.wikipedia.org/wiki/Barrier-grid_animation_and_stereography
*/

const SIZE = 16;
const SCALE_RATIO = 0.8; //0.5
let img;
let x = 0;
let step = 0.8;
let isGridVisible = true;
let isGridMoving = true;

function preload() {
  img = loadImage("scanimation-cat.png");
}

function mousePressed() {
  isGridVisible = false;
  return false;
}

function mouseReleased() {
  isGridVisible = true;
  return false;
}

function mouseMoved() {
  x = map(mouseX,0,width,0,80);
  isGridMoving = false;
  setTimeout(() => {isGridMoving = true;}, 5000);
  return false;
}

// move grid
// parameters:
// m: is grid moving; boolean value
function moveGrid(m) {
  if(m) {
    // x += step;
    x += step * 0.001*width;
    if(x > width/8) {
      step *= -1;
    }
    if(x < 0) {
      step *= -1;
    }
  } 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(img.width*SCALE_RATIO*(0.001*width), img.height*SCALE_RATIO*(0.001*width));  
}

function draw() {
  background("white");
  image(img,width/2-img.width/2, height/2-img.height/2, img.width, img.height);
  
  // generate grid
  translate(-width,0);
  for(let i=0; i<2*width;i+=2) {
    push();
    noStroke();
    if(isGridVisible) {
      fill("black");
    } else {
      noFill();
    }
    rect(x+i*0.6*SIZE*SCALE_RATIO*(0.001*width), 0, SIZE*SCALE_RATIO*(0.001*width), height);
    pop();
  }
  
  moveGrid(isGridMoving);
}