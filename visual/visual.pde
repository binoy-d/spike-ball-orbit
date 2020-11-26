float offset = 0;
float MAX_HEIGHT = 300;

float x = width/2;

float y = height/2;

float z = 5;
float radius = width/3;

float speed = -5;

float delta = 0.01;

float xRotate = 0;
float yRotate = 0;

float xRotAccel = 0;
float yRotAccel = 0;



boolean left, right, up, down, in , out;
void setup(){
  size(640, 480, P3D);
  surface.setResizable(true);
  background(0) ;
  colorMode(HSB);
}


void draw(){
  background(0);
  fill(255, 40);
  movement();
  y = height/2;
  x = width/2;
  translate(radius*cos(offset*2)+x, radius/2*sin(offset/2)+y, radius*sin(offset*2)+z);
  radius = width/3;
  for(float i = 0; i<2*PI; i+=0.05){ 
    float h = map(noise(i+offset), 0, 1, 0, MAX_HEIGHT);
    strokeWeight(map(h, 0, MAX_HEIGHT, 0, 15));
    stroke(map(h+mouseX/10, 0, MAX_HEIGHT+width/10, 0, 255), 255 ,255, 120 );
    line(0,0, 0, h, 0, 0);
    rotateY(i);
    
    
    
    //rotateZ(-map(mouseX, 0, width,0, 2*PI));
    //rotateX(map(mouseY, 0, width,0, 2*PI));
    rotateZ(yRotate);
    rotateX(xRotate);
    
    yRotate+=yRotAccel;
    xRotate+=xRotAccel;
    
    yRotAccel = map(mouseY, 0, height, -1, 1);
    xRotAccel = map(mouseX, 0, width, -1, 1);
  }
  offset+=delta;
}


void keyPressed(){
 if(key == 'w'){
  up = true;
 }else if(key == 's'){
  down = true;
 }else if(key == 'a'){
  left = true;
 }else if(key == 'd'){
  right = true;
 }else if(key == 'q'){
  in = true;
}else if(key == 'e'){
  out = true;
}

}

void keyReleased(){
  if(key == 'w'){
  up = false;
 }else if(key == 's'){
  down = false;
 }else if(key == 'a'){
  left = false;
 }else if(key == 'd'){
  right = false;
 }else if(key == 'q'){
  in = false;
}else if(key == 'e'){
  out = false;
}

}



void movement(){
  if(up){
  y+=speed;
 }else if(down){
  y-=speed;
 }else if(left){
  x+=speed;
 }else if(right){
  x-=speed;
 }else if(in){
  z+=speed; 
}else if(out){
  z-=speed;
}
  
}



void mouseWheel(MouseEvent event) {
  float e = event.getCount();
  println(e);
  delta+=map(e, -10,10,-0.007, 0.007);
  //delta = constrain(delta, -0.2, 0.2);
}
  
  
