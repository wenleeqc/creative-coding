// doodleshop gui

const bgcolor = [0,0,90];
let btn1,btn2,btn3,btn4,btn5,btn6,btn7,btn8;
let brush = 1;
let bOffset = 0;
let brushColor = 0;
//let brushWidth = 5;
let rainbow = 0;
let speed = 0;
let easing = 0.03;
let canvasOffset = 63;
let canvasObject;
let saveCount = 1;
let saveButton, clearButton, slider;

// generate points for spray can texture
const sprayCanVectors = [];
for(let i=0; i<150; i++) {
  sprayCanVectors.push(rand(20));
}

// tool panel interface
// paramters:
// x: x-coordinate
// y: y-coordinate
// d: diameter
// c1: color
// c2: hover color
// b: brush number
function Interface(x, y, d, c1, c2, b) {
  this.button = function() {
    if((mouseX > x) && (mouseX < x + d) && (mouseY > y) && (mouseY < y + d) && mouseIsPressed) {
      fill(c2);
      brush = b;
      brushColor = c1;
      bOffset = 20;
    } else {
      fill(c1);
      bOffset = 0;
    }
    
    if(b === 6) {
      // draw spray can
      push();
      fill([0,0,100-bOffset]);
      rect(x+8,y-7,4,6);
      fill([0,0,80-bOffset]);
      ellipse(x+4,y-4,12,9);
      fill([48,100,100-bOffset]);
      rect(x+4,y,12,20,0,0,3,3);
      pop();
    } else if(b === 7) {
      // draw rainbow
      push();
      noFill();
      strokeWeight(3);
      stroke([120,100,80-bOffset]);
      arc(x+8,y+8,d-16,d-12,radians(-180),radians(0));
      stroke([240,100,100-bOffset]);
      arc(x+4,y+4,d-8,d-4,radians(-180),radians(0));
      stroke([0,100,100-bOffset]);
      arc(x,y,d,d+5,radians(-180),radians(0));
      pop();
    } else if(b === 8) {
      // draw eraser
      push();
      fill([350,45,80-bOffset]);
      quad(x,y+10,x+5,y+5,x+10,y+15,x+5,y+19);
      fill([350,45,100-bOffset]);
      quad(x+5,y+5,x+19,y,x+25,y+10,x+10,y+15);
      fill([350,45,60-bOffset]);
      quad(x+10,y+15,x+25,y+10,x+19,y+15,x+5,y+19);
      pop();
    } else {
      ellipseMode(CORNER);
      ellipse(x,y,d,d);
    }
  }
  
  this.brush = function(xcur,ycur,px,py) {
    if(((mouseX < x) || (mouseX > x + d) || (mouseY < y) || (mouseY > y + d)) && brush === b && mouseIsPressed) {
      // if(b === 7 && mouseX !== pmouseX && mouseY !== pmouseY) { // don't get next color
      //   let target = dist(mouseX, mouseY, pmouseX, pmouseY);
      //   speed += (target - speed) * easing;
      //   rainbow = (rainbow+10)%360;
      //   brushColor = [rainbow,100,100];
      // }
      
      // generate rainbow pen
      if(b === 7) {
        // don't get next color if pen is not moving
        if(mouseX !== pmouseX && mouseY !== pmouseY) {
          rainbow = (rainbow+10)%360;
          brushColor = [rainbow,100,100];
        }
        let target = dist(mouseX, mouseY, pmouseX, pmouseY);
        speed += (target - speed) * easing;
      }

      // if(mouseIsPressed && mouseX > canvasOffset-10) {
      if(mouseX > canvasOffset-10) {
        // generate spray can texture
        if(b === 6) {
          push();
          translate(mouseX,mouseY);
          stroke([48,100,100,0.7]);
          strokeWeight(random(1,1.5));
          for(let i=0; i<sprayCanVectors.length; i+=2) {
            point(sprayCanVectors[i],sprayCanVectors[i+1])
          }
          pop();
        } else {
          push();
          // strokeWeight(brushWidth);
          strokeWeight(b === 7 ? speed/2 : slider.value()); // variable stroke if rainbow pen
          stroke(brushColor);
          line(xcur,ycur,px,py);
          pop();
        }
      } 
    }
  }
}

// save canvas on key press of 'p' or 's'
function keyPressed() {
  // keyCode for 'p' and 's'
  if(keyCode === 80 || keyCode === 83) {
    saveDrawing();
  }
}

// save current canvas
function saveDrawing() {
  saveCanvas(canvasObject, 'drawing' + saveCount, 'png');
  saveCount++;
}

// clear canvas
function clearCanvas() {
  clear();
  // redraw canvas and tool bar panel
  background(bgcolor);
  push();
  fill(40);
  rect(0,0,60,height);
  pop();
  
  push();
  fill("white");
  text('20', slider.x+40, slider.y-47);
  text('0', slider.x+43.5, slider.y+65);
  pop();
}

// random function wrapper
// parameters:
// max: max value
function rand(max) {
  return Math.random() * max;
}

function setup() {
  canvasObject = createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(bgcolor);
  noStroke();
  
  // tool panel
  push();
  fill(40);
  rect(0,0,60,height);
  pop();
  
  // tools
  btn1 = new Interface(20,20,20,color(0, 0, 0), color(0, 0, 20), 1); // black
  btn2 = new Interface(20,50,20,color(0, 0, 100), color(0, 0, 80), 2); // white
  btn3 = new Interface(20,80,20,color(0, 100, 100), color(0, 100, 80), 3); // red
  btn4 = new Interface(20,110,20,color(240, 100, 100), color(240, 100, 80), 4); // blue
  btn5 = new Interface(20,140,20,color(120, 100, 100), color(120, 100, 80), 5); // green
  btn6 = new Interface(20,178,20,color(60,100,100), color(60,100,80), 6); // spray can
  btn7 = new Interface(20,211,20,color(0, 100, 100), color(0, 100, 70), 7); // rainbow
  btn8 = new Interface(19,238,20, bgcolor, bgcolor, 8); // eraser
  
  // pen size slider
  slider = createSlider(0, 20, 5);
  slider.position(-17, 360);
  //slider.style('width', '80px');
  slider.size(90);
  push();
  fill("white");
  text('20', slider.x+40, slider.y-47);
  text('0', slider.x+43.5, slider.y+65);
  pop();
  
  // clear button
  clearButton = createButton('clear');
  clearButton.position(10, height-70);
  clearButton.mousePressed(clearCanvas);
  
  // save button
  saveButton = createButton('save ');
  saveButton.position(10, height-40);
  saveButton.mousePressed(saveDrawing);
}
  
function draw() {
  //background(220);
  
  // constrain to drawing canvas
  let x = constrain(mouseX, canvasOffset, width);
  let y = constrain(mouseY, 0, height);
  let px = constrain(pmouseX, canvasOffset, width);
  let py = constrain(pmouseY, 0, height);
  
  btn1.button();
  btn1.brush(x,y,px,py);
  btn2.button();
  btn2.brush(x,y,px,py);
  btn3.button();
  btn3.brush(x,y,px,py);
  btn4.button();
  btn4.brush(x,y,px,py);
  btn5.button();
  btn5.brush(x,y,px,py);
  btn6.button();
  btn6.brush(x,y,px,py);
  btn7.button();
  btn7.brush(x,y,px,py);
  btn8.button();
  btn8.brush(x,y,px,py); 
}