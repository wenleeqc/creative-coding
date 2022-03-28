// representational poster color study
// random color seed is used to generate color palette

// draw eye
// parameters:
// innerColor: set iris color
// outerColor: set eye color
// xcord: x-coordinate of translation
// ycord: y-coordinate of translation
// s: scaling ratio
function eye(innerColor=0,outerColor=255,xcord=0,ycord=0,s=1) {
  push()
  scale(s);
  translate(xcord,ycord);
  colorMode(HSB);
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
  fill(innerColor);
  ellipse(3,-1,160,148);
  pop();
}

// draw nose
// parameters:
// color: set nose color
// xcord: x-coordinate of translation
// ycord: y-coordinate of translation
// s: scaling ratio
function nose(color=0,xcord=0,ycord=0,s=1) {
  push()
  scale(s);
  translate(xcord,ycord);
  colorMode(HSB);
  noStroke();
  fill(color);
  beginShape();
  vertex(34,300);
  bezierVertex(36,239,161,311,310,214);
  bezierVertex(352,192,363,233,363,233); // peak    
  bezierVertex(368,250,355,250,353,263);  
  bezierVertex(350,276,366,284,367,300); // peak
  bezierVertex(370,316,357,319,353,333);
  bezierVertex(350,349,364,346,362,370); // peak
  bezierVertex(354,404,317,397,305,388);
  bezierVertex(185,304,34,349,34,300);
  endShape();
  pop();
}

// draw mouth
// parameters:
// upperColor: set upper lip color
// lowerColor: set lower lip color
// xcord: x-coordinate of translation
// ycord: y-coordinate of translation
// s: scaling ratio
function mouth(upperColor=50,lowerColor=100,xcord=0,ycord=0,s=1) {
  push()
  scale(s);
  translate(xcord,ycord);
  colorMode(HSB);
  noStroke();
  
  // upper lip
  fill(upperColor);
  beginShape();
  vertex(33,485);
  bezierVertex(224,386,367,485,367,485);
  endShape();
  
  // lower lip
  fill(lowerColor);
  beginShape();
  vertex(33,485);
  bezierVertex(204,603,367,485,367,485);
  endShape();
  pop();
}

// get colors
// parameters:
// scheme: color scheme
function getColors(scheme) {
  const color = round(random(0,360));

  switch(scheme) {
    case 'analogous':
      return [[color,100,60],[(color+30)%360,100,100],[(color+60)%360,100,80],[(color+60)%360,80,100],[(color+90)%360,100,100]];
    case 'complementary':
      return [[color,100,60],[color,100,100],[color,100,80],[color,80,100],[(color+180)%360,100,100]];
    case 'monochromatic':
      return [[color,100,60],[color,100,100],[color,100,80],[color,80,100],[color,50,80]];
    case 'quadratic':
      return [[color,100,60],[(color+90)%360,100,100],[(color+180)%360,100,80],[(color+180)%360,80,100],[(color+270)%360,100,100]];
    case 'triadic':
      return [[color,100,60],[(color+120)%360,100,100],[(color+240)%360,100,80],[(color+240)%360,80,100],[color,100,100]];
    case 'grayscale':
      return [20,50,40,60,80];
    default:
      return [[color,100,60],[(color+30)%360,100,100],[(color+60)%360,100,80],[(color+60)%360,80,100],[(color+180)%360,100,100]];
  }
}

// randomly pick a color scheme
function schemePicker() {
  const choice = round(random(1,7));
  print(choice);
  switch(choice) {
    case 1:
      return 'analogous';
    case 2:
      return 'complementary';
    case 3:
      return 'monochromatic';
    case 4:
      return 'quadratic';
    case 5:
      return 'triadic';
    case 6:
      return 'grayscale';
    default:
      return 'default';
  } 
}

function setup() {
  createCanvas(400, 600);
  colorMode(HSB);
  const [c1,c2,c3,c4,bg] = getColors('complementary');
  
  background(bg);
  eye(c1,255,width/2,118);
  nose(c2);
  mouth(c3,c4);
}
