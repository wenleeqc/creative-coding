// color palette
const colorBackground = 130;
const headColor = 45;

// draw head
// paramters:
// color: define color
// xcord: x-coordinate of translation
// ycord: y-coordinate of translation
// s: scaling ratio
function head(color=0,xcord=0,ycord=0,s=1) {
  push()
  noStroke();
  fill(color)
  scale(s);
  translate(xcord,ycord);
  beginShape();
  vertex(150,246);
  bezierVertex(80,-20,370,44,343,120);
  bezierVertex(349,139,350,147,350,147);
  bezierVertex(355,158,360,170,360,170);
  vertex(362,170)
  bezierVertex(364,178,361,178,361,178);
  bezierVertex(353,180,350,185,353,190);
  vertex(370,216);
  bezierVertex(376,223,368,227,368,227);
  vertex(360,230);
  bezierVertex(354,235,356,236,355,239);
  bezierVertex(361,251,360,248,353,255);
  bezierVertex(358,265,355,261,355,263);
  bezierVertex(349,268,348,268,345,272);
  bezierVertex(373,313,282,307,282,307);
  bezierVertex(273,307,270,314,270,314);
  bezierVertex(266,334,249,342,249,342);
  vertex(161,268);
  bezierVertex(165,258,163,252,163,252);
  bezierVertex(156,252,151,250,150,246);
  endShape();
  pop()
}

// draw arrow
// parameters:
// color: define color
function arrow(color=255) {
  push();
  noStroke();
  fill(color);
  beginShape();
  vertex(0,80);
  vertex(120,180);
  vertex(95,207);
  vertex(187,289);
  vertex(174,301);
  vertex(213,310); // center arrow point
  vertex(214,268);
  vertex(202,278);
  vertex(155,193);
  vertex(178,172);
  vertex(20,-50);
  vertex(0,80);
  endShape();
  pop();
}

function setup() {
  createCanvas(400, 600);
  background(colorBackground);
  
  // head composition
  head(headColor+70,-120,0,1.5);
  head(headColor+60,-85,50,1.2);
  head(headColor+50,-50,100,1);
  head(headColor+40,-14,153,0.85);
  head(headColor+30,28,218,0.72);
  head(headColor+20,95,320,0.58);
  head(headColor+10,178,440,0.47);
  head(headColor,325,655,0.35);
  
  arrow(colorBackground);
}