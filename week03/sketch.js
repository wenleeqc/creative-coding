// Computational exploration of color schemes for randomly generated color values

const colorBackground = 255;
const cMode = 'HSB';
// draw head
// paramters:
// color: set color; color value array
// xcord: x-coordinate of translation
// ycord: y-coordinate of translation
// s: scaling ratio
// mode: set color mode
function head(color=0,xcord=0,ycord=0,s=1,mode='HSB') {
  push()
  setColorMode(mode);
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

// draw head composition
// paramters:
// color: set color; color value array
// scheme: set color scheme
// mode: set color mode
function headComposition(color=[0,100,100],scheme='monochromatic',mode='HSB') {
  push();
  setColorMode(mode);
  const [range1,range2,range3] = setColorModeRange(mode);
  const [offset1,offset2,offset3] = setColorSchemeOffset(scheme);
  const [bgOffset1,bgOffset2,bgOffset3] = setBackgroundColorOffset(scheme);
  noStroke();
  fill([(color[0]+bgOffset1)%range1,(color[1]+bgOffset2)%range2,(color[2]+bgOffset3)%range3]);
  rect(0,0,400,600);
  head([color[0],color[1],color[2]],-120,0,1.5,mode);
  head([(color[0]+offset1)%range1,(color[1]+offset2)%range2,(color[2]+offset3)%range3],-85,50,1.2,mode);
  head([(color[0]+offset1*2)%range1,(color[1]+offset2*2)%range2,(color[2]+offset3*2)%range3],-50,100,1,mode);
  head([(color[0]+offset1*3)%range1,(color[1]+offset2*3)%range2,(color[2]+offset3*3)%range3],-14,153,0.85,mode);
  head([(color[0]+offset1*4)%range1,(color[1]+offset2*4)%range2,(color[2]+offset3*4)%range3],28,218,0.72,mode);
  head([(color[0]+offset1*5)%range1,(color[1]+offset2*5)%range2,(color[2]+offset3*5)%range3],95,320,0.58,mode);
  head([(color[0]+offset1*6)%range1,(color[1]+offset2*6)%range2,(color[2]+offset3*6)%range3],178,440,0.47,mode);
  head([(color[0]+offset1*7)%range1,(color[1]+offset2*7)%range2,(color[2]+offset3*7)%range3],325,655,0.35,mode);
  arrow([(color[0]+bgOffset1)%range1,(color[1]+bgOffset2)%range2,(color[2]+bgOffset3)%range3]);
  pop();
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
  vertex(50,0);
  vertex(0,0);
  vertex(0,80);
  endShape();
  pop();
}

// helper functions

// set color mode
// parameters:
// mode: set color mode
function setColorMode(mode) {
  if(mode === 'RGB')
    return colorMode(RGB,255,255,255)
  else
    return colorMode(HSB,360,100,100);
}

// set range for color mode attributes
// parameters:
// mode: set color mode
function setColorModeRange(mode) {
  if(mode === 'RGB')
    return [256,256,256];
  else
    return [360,101,101];
}

// set color scheme offset
// parameters:
// scheme: color scheme
function setColorSchemeOffset(scheme) {
  switch (scheme) {
    case 'analogous':
      return [30,0,0];
    case 'complementary':
      return [10,0,0];
    case 'triadic':
      return [120,0,0];
    case 'quadratic':
      return [90,0,0]
    default: // monochromatic
      return [0,0,-10];
  }
}

// set background color offset
// parameters:
// scheme: color scheme
function setBackgroundColorOffset(scheme) {
    switch (scheme) {
    case 'analogous':
      return [-30,0,0];
    case 'complementary':
      return [180,0,0];
    case 'triadic':
      return [-120,0,0];
    case 'quadratic':
      return [90,0,0]
    default: // monochromatic
      return [0,-10,-20];
  }
}

// get random color value
// parameters:
// mode: color mode
function getRandomColor(mode) {
  if(mode === 'RGB')
    return random(0,255);
  else
    return random(0,360);
}

function setup() {
  createCanvas(400, 600);
  background(colorBackground);
  scale(0.5);
  const color1 = getRandomColor(cMode);
  const color2 = getRandomColor(cMode);
  const color3 = getRandomColor(cMode);
  const color4 = getRandomColor(cMode);
  
  getRandomColor();
  
  // head top left
  push();
  translate(0,0);
  headComposition([color1,100,100],'complementary',cMode);
  pop();
  
  // head top right
  push();
  translate(400,0);
  headComposition([color2,100,100],'monochromatic',cMode);
  pop();
  
  // head bottom right
  push();
  translate(400,600);
  headComposition([color3,100,100],'analogous',cMode);
  pop();
  
  // head bottom left
  push();
  translate(0,600);
  headComposition([color4,100,100],'triadic',cMode);
  pop();
  
  // 180, 240, 160, 180
}
