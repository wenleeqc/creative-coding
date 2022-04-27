// Op Art - Peripheral drift illusion

// draw shape
// parameters:
// d: diamater
// c: color
function shape(d,c) {
  let offset = d*0.15; //0.15
  
  push();
  noStroke();
  fill('white');
  ellipse(0,-offset,d-1,d+1);
  fill('black');
  ellipse(0,offset,d-1,d+1);
  fill(c); // blue
  ellipse(0,0,d,d);
  pop();
}

// set color
// parameters:
// [c]: default color flag
function setColor(c=0) {
  if(c === 1) {
    return [color(76,100,70,1),color(240,100,100,1)]; //'green','blue'
  } else {
      const c1 = random(0,360);
      const c2 = (c1+180)%360; //140
      return [color(c1,100,80,1),color(c2,100,80,1)];
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB,360,100,100,1);
  
  // define colors
  const [c1,c2] = setColor();
  
  background(c1);
  angleMode(DEGREES);
  
  // circle and rotation properties
  const diameter = random(18,35); // 20,40
  let xoff = 0;
  let yoff = 0;
  const offsetRatio = 0.45; //0.45
  const rotationDegree = 18;
  let rotateStartAngle = 0; // track angle of first shape from previous row
  let rotateNext = 0;
  const step = diameter+diameter*offsetRatio;

  for(let i=0;i<height;i+=diameter) {
    rotateNext = rotateStartAngle;
    for(let j=0; j<width;j+=diameter) {
      push()
      translate(xoff,yoff);
      rotate(rotateNext);
      shape(diameter,c2);
      pop();
      xoff+=step;
      rotateNext = (rotateNext+rotationDegree)%360;
    }
    rotateStartAngle = (rotateStartAngle+rotationDegree)%360;
    xoff=0;
    yoff+=step;
  }
}