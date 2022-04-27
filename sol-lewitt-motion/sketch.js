// generative polygon mesh
// sol lewitt design exploration revisited
// prompt:
// six white geometric figures (outlines) superimposed on a black wall

const vectorStartArray = [];
const vectorEndArray = [];
const numShapes = 6;
const numCoordinates = (numShapes+1)*2;

// initialize vector arrays
for(let i=0; i<numCoordinates*2; i++) {
  vectorStartArray.push(0);
  vectorEndArray.push(0);
}

// compute difference between x-coordinate and target x-coordinate
// parameters:
// x: x-coordinate of current position of vector
// xTarget: x-coordinate of target vector
// threshold: threshold value
function almostEqual(x,xTarget,threshold) {
  if (Math.abs(x-xTarget) < threshold) {
    return true;
  }
  return false;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeCap(ROUND);
  stroke(255);
  strokeWeight(3);
}

function draw() {
  background(0);
  
  const unit = width/(numShapes+1);
  const speed = 0.015; // speed of transition
  
  // calculate steps to target vector
  for(let i=0; i<vectorStartArray.length; i++) {
    vectorStartArray[i] = lerp(vectorStartArray[i], vectorEndArray[i], speed);
  }

  let unitCounter = 0;
  const threshold = 0.5;
  
  // generate new vectors
  for(let i=0; i<vectorStartArray.length; i+=4) {
    // testing for equailty of floats is problematic due to precision errors in rounding
    // instead test the difference of floats against a threshold value
    if(almostEqual(vectorStartArray[i], vectorEndArray[i], threshold)) {
      vectorEndArray[i] = random(unitCounter*unit, (unitCounter+1)*unit);
      vectorEndArray[i+1] = random(height/2);
      vectorEndArray[i+2] = random(unitCounter*unit, (unitCounter+1)*unit);
      vectorEndArray[i+3] = random(height/2,height);
    }
    unitCounter++;
  }
  
  // draw shapes
  line(vectorStartArray[0], vectorStartArray[1], vectorStartArray[2], vectorStartArray[3]);
  for(let i=0; i<vectorStartArray.length; i+=4) {
    line(vectorStartArray[i], vectorStartArray[i+1], vectorStartArray[i+4], vectorStartArray[i+5]);
    line(vectorStartArray[i+2], vectorStartArray[i+3], vectorStartArray[i+6], vectorStartArray[i+7]);
    line(vectorStartArray[i+4], vectorStartArray[i+5], vectorStartArray[i+6], vectorStartArray[i+7]);
  }
}