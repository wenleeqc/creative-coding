// generative polygon mesh
// sol lewitt design exploration
// prompt:
// six white geometric figures (outlines) superimposed on a black wall

function setup() {
  createCanvas(400,400);
  background(0);

  noFill();
  strokeCap(ROUND);
  strokeJoin(ROUND);
  strokeWeight(random(1,2));
  stroke(255);
  
  const numShapes = 6;
  const step = width/numShapes;
  
  // generate start points
  let midHeight = random(0,height);
  let prevx1 = random(0,step);
  let prevy1 = random(0,midHeight);
  let prevx2 = random(0,step);
  let prevy2 = random(midHeight, height);
  
  for(let i=1; i<=numShapes; i++) {
    // generate new points
    const x1 = prevx1;
    const y1 = prevy1;
    const x2 = random(prevx1,i*step);
    const y2 = random(0,midHeight);
    const x3 = random(prevx2,i*step);
    const y3 = random(midHeight,height);
    const x4 = prevx2;
    const y4 = prevy2;
    
    push()
    //fill(20*i, 80);
    quad(x1,y1,x2,y2,x3,y3,x4,y4);
    pop();
    
    // set anchor points for next shape
    prevx1 = x2;
    prevy1 = y2;
    prevx2 = x3;
    prevy2 = y3;
    
    midHeight = random(0,height);
  }
}