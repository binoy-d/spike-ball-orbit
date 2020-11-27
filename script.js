var offset = 0;
var MAX_HEIGHT = 300;

var x = 0;

var y = 0;

var z = 0;
var radius = 200;

var speed = -20;

var delta = 0.01;

var xRotate = 0;
var yRotate = 0;
let s;

var left, right, up, down, zoomin, zoomout;

var SMOOTH_AMT = 1;

function setup() {
    //size(640, 480, P3D);
    canv = createCanvas(windowWidth, windowHeight, WEBGL);
    canv.position(0,0)
    canv.style('z-index', '-1')
    //surface.setResizable(true);
    background(0);
    colorMode(HSB);
    s = new Strand(0, 0, 0, MAX_HEIGHT / 4);
}



function draw() {
    background(0);
    fill(255, 40);
    movement();
    translate(radius * cos(offset) + x, radius / 2 * sin(offset / 2) + y, radius * sin(offset) + z);
    radius = width / 3;
    for (var i = 0; i < 2 * PI; i += 0.05) {
        var h = map(noise(i + offset), 0, 1, 0, MAX_HEIGHT);
        strokeWeight(map(h, 0, MAX_HEIGHT, 0, 15));
        stroke(map(h + mouseX / 10, 0, MAX_HEIGHT + width / 10, 0, 255), 255, 255, 120);
        line(0, 0, 0, h, 0, 0);
        rotateZ(-map(xRotate, 0, width, 0, 2 * PI));
        rotateX(map(yRotate, 0, width, 0, 2 * PI));
        xRotate += (mouseX / 5 - xRotate) / ((width / 1000));
        yRotate += (mouseY / 5 - yRotate) / ((width / 1000));
        s.display();
        s.sway();
    }
    offset += delta;
}


function keyPressed() {
    if (key == 'w') {
        up = true;
    } else if (key == 's') {
        down = true;
    } else if (key == 'a') {
        left = true;
    } else if (key == 'd') {
        right = true;
    } else if (key == 'q') {
        zoomin = true;
    } else if (key == 'e') {
        zoomout = true;
    }else if(key == 'f'){
        let fs = fullscreen();
        fullscreen(!fs);
    }

}

function keyReleased() {
    if (key == 'w') {
        up = false;
    } else if (key == 's') {
        down = false;
    } else if (key == 'a') {
        left = false;
    } else if (key == 'd') {
        right = false;
    } else if (key == 'q') {
        zoomin = false;
    } else if (key == 'e') {
        zoomout = false;
    }

}



function movement() {
    if (up) {
        y += speed;
    } else if (down) {
        y -= speed;
    } else if (left) {
        x += speed;
    } else if (right) {
        x -= speed;
    } else if (zoomin) {
        z += speed;
    } else if (zoomout) {
        z -= speed;
    }

}



function mouseWheel(event) {
    var e = event.delta;
    println(e);
    delta += map(e, -10, 10, -0.007, 0.007);
}


class Strand {
    constructor(_x, _y, _z, _len) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.len = _len;
    }

    display() {
        noFill();
        //stroke the strand
        bezier(this.x, this.y, this.z + mouseX / 5, this.x, this.y + sin(offset) * radius, this.z + this.len, this.x, this.y + this.len, sin(offset / 2) * radius, cos(offset) * radius, width / 5 + 200, z);

    }
    sway() {
        this.len = (mouseX + mouseY) / 3 * noise(offset / 5) * 2;
    }
}
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}