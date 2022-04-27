// generative gift wrapping pattern in Memphis Design style

// global variables
const density = 45; //45
const pointsField = [];

// generate random points field
function generatePoints() {
  for(let i=0; i<height; i+=density) {
    for(let j=0; j<width; j+=density) {
      // generate random point within region
      pointsField.push([random(j,j+density),random(i,i+density)]);
    }
  }
}

// generate dot grid
// parameters:
// bgColor: background color
function generateGrid(bgColor) {
  let c = 0; // column counter
  const offset = round(random(25,35)); //20,40
  let isEvenRow = true;
  const dotColor = (bgColor) ? [0,0,90] : [0,0,30];
  // light gray: stroke(0,0,90)
  // dark gray: stroke(0,0,30)
      
  push()
  stroke(dotColor); // stroke(60,0,90)
  strokeWeight(4);
  for(let r=0; r<=height; r+=offset) {
    for(; c<=width; c+=offset) {
      point(c,r);
    }
    // create offset for even rows
    if(isEvenRow) {
      c = offset/2;
    }
    else {
      c = 0;
    }
    isEvenRow = !isEvenRow;
  }
  pop()
}

// generate arcs
// parameters:
// bgColor: background color
function generateArcs(bgColor) {
  let a = 60;
  
  for(let p=0; p<pointsField.length; p+=1) {
    push()
    translate(pointsField[p][0], pointsField[p][1]);
    rotate(random(0,360));
    //if(floor(random(0,2))) fill(random(200));
    //fill(random(200));
    //stroke(random(200));
    noFill();
    stroke((bgColor) ? 0 : 255);
    //strokeWeight(random(6));
    strokeWeight(4);
    arc(0, 0, random(5,20), random(5,20), a, a+random(140,180)); //140,180
    pop();
  }
}

// generate squiggly lines
// bgColor: background color
function generateSquiggles(bgColor) {
  let isEven = false;
  const numPoints = 6;
  const xoff = 5; // frequency
  const length = numPoints * xoff;
  
  for(let p=0; p<pointsField.length; p+=1) {
    const amplitude = random(5,10); //10
    let offset = -amplitude/2;
    let x = -length/2;
    let y = -amplitude/2;
    push()
    translate(pointsField[p][0], pointsField[p][1]);
    scale(random(0.5,0.7)); //0.7
    rotate(random(0,360));
    noFill()
    stroke((bgColor) ? 0 : 255);
    strokeWeight(3);
    beginShape();
    curveVertex(x,y); // start anchor point
    for(let i=0;i<numPoints;i++) {
      x = xoff*i;
      y = offset
      curveVertex(x,y);
      offset = isEven ? -amplitude/2 : amplitude/2;
      isEven = !isEven;
    }
    curveVertex(x,y); // end anchor point
    endShape();
    pop();
  }
}

// generate triangles
// parameters:
// shadowColor: shadow color
// c1: color
function generateTriangles(shadowColor,c1=[323,100,50,100]) {
  const sOff = 5; // drop shadow offset
  const step = round(width * density/3 * 0.0012);
  
  for(let i=0; i<pointsField.length; i+=step) { // seed 0, step 10
    const x = pointsField[i][0];
    const y = pointsField[i][1];
    const offset1 = random(10,40);
    const offset2 = random(20,60);
    
    push();
    noStroke();
    translate(pointsField[i][0],pointsField[i][1]);
    rotate(random(0,360));
    fill(shadowColor);
    triangle(0+sOff,0+sOff,-offset1+sOff,offset2+sOff,offset1+sOff,offset2+sOff);
    fill(c1);
    triangle(0,0,-offset1,offset2,offset1,offset2);
    pop();
  }
}

// generate circles
// parameters:
// shadowColor: shadow color
// c2: color
function generateCircles(shadowColor,c2=[64,100,50,100]) {
  const sOff = 5; // drop shadow offset
  let step = round(random(9,10));
  
  for(let i=3; i<pointsField.length; i+=step) {
    const x = pointsField[i][0];
    const y = pointsField[i][1];
    const xShift = random(-30,30);
    const yShift = random(-30,30);
    const diameter = random(35,50);
    
    push();
    translate(pointsField[i][0]+xShift,pointsField[i][1]+yShift);
    rotate(random(0,360));
    noStroke();
    fill(shadowColor);
    ellipse(0+sOff,0,diameter,diameter);
    fill(c2);
    ellipse(0,0,diameter,diameter);
    pop();
    step = round(random(round(width * density/5 * 0.0019),round(width * density/5 * 0.002)));
  }
}

// generate rectangles
// parameters:
// shadowColor: shadow color
// c3: color
function generateRectangles(shadowColor,c3=[176,100,50,100]) {
  const sOff = 5; // drop shadow offset
  const step = round(width * density/5 * 0.0021);
  
  for(let i=7; i<pointsField.length; i+=step) { // seed 6, step 10
    const x = pointsField[i][0];
    const y = pointsField[i][1];
    const offset1 = random(40,60);
    const offset2 = random(10,20);
    
    push();
    noStroke();
    translate(pointsField[i][0],pointsField[i][1]);
    rotate(random(0,360));
    fill(shadowColor);
    rect(0+sOff,0+sOff,offset1,offset2);
    fill(c3);
    rect(0,0,offset1,offset2);
    pop();
  }
}

// generate colors for shapes
function setColors() {
  // const c1 = color(323,100,50,100); // fusia
  // const c2 = color(64,100,50,100); // yellow
  // const c3 = color(176,100,50,100); // aqua
  const hue = random(0,360);
  const lightness = random(50,80);
  const c1 = color(hue,100,lightness,100); // fusia
  const c2 = color((hue+120)%360,100,lightness,100); // yellow
  const c3 = color((hue+240)%360,100,lightness,100); // aqua
  return [c1,c2,c3];
}

//-------------------//
// utility functions //
//-------------------//

// binary choice function
// parameters:
// skew: skew odds
function choose(skew=1) {
  return round(random(0,skew))
}

// render points on screen
// parameters:
// bgColor: background color
function showPoints(bgColor) {
  push();
  strokeWeight(5);
  stroke((bgColor) ? 0 : 255);
  for(let i=0; i<pointsField.length; i++) {
    point(pointsField[i][0],pointsField[i][1]);
  }
  pop();
}

function setup() {
  createCanvas(500, 500);
  colorMode(HSL,360,100,100,100);
  angleMode(DEGREES);
  
  // set background color as black or white
  const bgColor = (choose()) ? 0 : 255;
  // set opposite color of background
  const shadowColor = (bgColor) ? 0 : 255;
  const [c1,c2,c3] = setColors();
  background(bgColor);
  
  // generate points
  generatePoints();
  
  // generate dot grid
  if(choose()) { // yes or no
    generateGrid(bgColor);
  }
    
  // generate arcs or squiggles
  if(choose(7)) {
    generateSquiggles(bgColor);
  } else {
    generateArcs(bgColor);
  }
  
  // generate circles
  generateCircles(shadowColor,c2);
  
  // generate triangles
  generateTriangles(shadowColor,c1);
  
  // generate rectangles
  generateRectangles(shadowColor,c3);
  
  //showPoints(bgColor);
  //print("# points", pointsField.length);
}