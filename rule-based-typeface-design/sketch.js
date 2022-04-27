// rule-based type

let alphabet = [
  [2,1,1,1,2,
   2,0,0,0,2,
   2,1,1,1,2,
   0,0,0,0,0], // A
  [2,1,1,1,2,
   2,1,1,1,0,
   2,1,1,1,2,
   0,1,1,1,0], // B
  [2,1,1,1,2,
   2,0,0,0,0,
   2,0,0,0,2,
   0,1,1,1,0], // C
  [2,1,1,1,0,
   2,0,0,0,7,
   2,0,0,0,8,
   0,1,1,1,0], // D
  [2,1,1,1,6,
   2,1,1,1,6,
   2,0,0,0,0,
   0,1,1,1,6], // E
  [2,1,1,1,6,
   2,1,1,1,6,
   2,0,0,0,0,
   0,0,0,0,0], // F
  [2,1,1,1,2,
   2,0,0,0,0,
   2,0,1,1,2,
   0,1,1,1,0], // G
  [2,0,0,0,2,
   2,0,0,0,2,
   2,1,1,1,2,
   0,0,0,0,0], // H
  [3,1,2,1,3,
   0,0,2,0,0,
   4,0,2,0,4,
   0,1,1,1,0], // I
  [3,1,1,1,2,
   0,0,0,0,2,
   2,1,1,0,2,
   0,1,1,1,0], // J
  [2,0,0,0,2,
   2,1,1,1,0,
   2,1,1,1,2,
   0,0,0,0,0], // K
  [2,0,0,0,0,
   2,0,0,0,0,
   2,0,0,0,0,
   0,1,1,1,6], // L
  [2,1,2,1,2,
   2,0,2,0,2,
   2,0,2,0,2,
   0,0,0,0,0], // M
  [2,1,2,0,2,
   2,0,2,0,2,
   2,0,2,0,2,
   0,0,0,1,0], // N
  [2,1,1,1,2,
   2,0,0,0,2,
   2,0,0,0,2,
   0,1,1,1,0], // O
  [2,1,1,1,2,
   2,0,0,0,2,
   2,1,1,1,0,
   0,0,0,0,0], // P
  [2,1,1,1,2,
   2,0,0,0,2,
   0,1,2,1,0,
   0,0,0,1,6], // Q
  [2,1,1,1,2,
   2,0,0,0,2,
   2,1,2,1,0,
   0,0,0,1,6], // R
  [2,1,1,1,3,
   0,1,1,1,2,
   2,0,0,0,2,
   0,1,1,1,0], // S
  [2,1,2,1,2,
   0,0,2,0,0,
   0,0,2,0,0,
   0,0,0,0,0], // T
  [2,0,0,0,2,
   2,0,0,0,2,
   2,0,0,0,2,
   0,1,1,1,0], // U
  [2,0,0,0,2,
   2,0,0,0,2,
   5,2,0,2,6,
   0,0,1,0,0], // V
  [2,0,2,0,2,
   2,0,2,0,2,
   2,0,2,0,2,
   0,1,1,1,0], // W
  [2,0,0,0,2,
   0,1,2,1,0,
   2,1,0,1,2,
   0,0,0,0,0], // X
  [2,0,0,0,2,
   2,0,0,0,2,
   0,1,2,1,0,
   0,0,0,0,0], // Y
  [3,1,1,1,2,
   2,1,1,1,0,
   2,0,0,0,2,
   0,1,1,1,0], // Z
];

const blocksize = 10;
const cols = 5;
const xGap = 5;
let yGap = 0;

function setup() {
  createCanvas(400, 400);
  background(0);
  
  noFill();
  stroke(230);
  translate((width/2)-blocksize*cols*cols/2,(height/2)-140);
  for(let i=0; i<alphabet.length; i++) {
    let x = 0;
    let y = 0;

    push();
    translate(blocksize * xGap * (i%cols), yGap);
    strokeCap(PROJECT);
    strokeWeight(blocksize/2);
    for(let j=0; j<alphabet[i].length; j++) {
       if(alphabet[i][j] === 1) {
        line(x,y,x+blocksize,y);
      }
      if(alphabet[i][j] === 2) {
        line(x+blocksize/2,y,x+blocksize/2,y+blocksize);
      }
      if(alphabet[i][j] === 3) {
        line(x+blocksize/2,y,x+blocksize/2,y+blocksize/3);
      }
      if(alphabet[i][j] === 4) {
        line(x+blocksize/2,y+blocksize/1.5,x+blocksize/2,y+blocksize);
      }
      if(alphabet[i][j] === 5) {
        line(x+blocksize/2,y,x+blocksize,y);
      }
      if(alphabet[i][j] === 6) {
        line(x,y,x+blocksize/2,y);
      }
      if(alphabet[i][j] === 7) {
        line(x+blocksize/2,y-blocksize/2,x+blocksize/2,y+blocksize/2);     
        line(x,y-blocksize/1.5,x+0.001,y-blocksize/1.5);
      }
      if(alphabet[i][j] === 8) {
        line(x+blocksize/2,y-blocksize/2,x+blocksize/2,y+blocksize/2);     
        line(x,y+blocksize/1.5,x+0.001,y+blocksize);
      }
      
      x+=blocksize;
      if(j%cols === cols-1) {
        x = 0;
        y+=blocksize;
      }
    }
    if(i%cols === cols-1) {
      yGap+=blocksize * cols;
    }
    pop();
  }
}