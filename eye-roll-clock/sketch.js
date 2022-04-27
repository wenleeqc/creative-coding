// eye roll clock
//
// direction of iris corresponds to position on a clock face
// color brightness corresponds to the time of day
//
// first pair of eyes track hours
// second pair of eyes track minutes
// third pair of eyes track seconds
//
// base color is generated randomly
// color brightness is map to the minutes in a day, updated per minute
// cycle ever 12 hours

const color = rand(0,360);

// render eye
// parameters:
// innerColor: color of iris
// outerColor: color of eye
// xcord: x-coordinate of translation
// ycord: y-coordinate of translation
// r: degree of rotation of iris
// brightness: brightness value
function eye(innerColor=0,outerColor=255,xcord=0,ycord=0,r=0,brightness=100){
  push()
    translate(xcord,ycord);
    
    push();
      noStroke();
      // eye
      fill(outerColor);
      const offset = 333/2; // length of eye 332
      beginShape();
      vertex(-offset,0);
      bezierVertex(180-offset,-171,offset,0,offset,0);
      bezierVertex(174-offset,165,-offset,0,-offset,0);
      endShape();

      // iris
      push();
        rotate(radians(r));
        fill([innerColor, 100, brightness]);
        translate(0, -60);
        ellipse(0,0,160,158);
      pop();
    pop();
  pop();
}

// render pair of eyes
// parameters:
// timeUnit: time unit
// brightness: brightness value
// s: scale ratio
function eyes(timeUnit,brightness,s=1) {
  push();
    scale(s)
    //push();
    eye(color,255,-450,0,timeUnit,brightness);
    eye(color,255,0,0,timeUnit,brightness);
    //pop();
  pop();
}

function eyeRollClock(h,m,s,b) {
  scale(windowWidth/5000);
    // hours
    push();
    translate(-1100,0);
    eyes(h,b);
    pop();
  
    // minutes
    eyes(m,b);
  
    // seconds
    push();
    translate(1100,0);
    eyes(s,b);
    pop();
}

// get current brightness
// parameters:
// hRaw: current number of hours
// mRaw: current number of minutes
function getCurrentBrightness(hRaw,mRaw) {
  if(hRaw*60+mRaw <= 720) {
    return (hRaw*60+mRaw)*0.125;
  } else {
    return 180 - (hRaw*60+mRaw)*0.125;
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
  createCanvas(windowWidth, windowHeight); // 600 400
  colorMode(HSB);
}

function draw() {  
  let hRaw = hour();
  let mRaw = minute();
  let h = map(hRaw%12, 0, 12, 0, 360);
  let m = map(mRaw, 0, 60, 0, 360);
  let s = map(second()%60, 0, 60, 0, 360);
  const b = getCurrentBrightness(hRaw,mRaw);

  background([color, 100, b]);

  translate(width/2*1.1,height/2);
  eyeRollClock(h,m,s,b);

}