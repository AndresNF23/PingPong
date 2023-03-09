const NGROK = `${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

let controllerX, controllerY = 0;

//let interactions = 0;
//let isTouched = false;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');

    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;

    background(0);
    angleMode(DEGREES);

    const userAgent = window.navigator.userAgent;
    let deviceType;

    if (/iPhone|iPad|iPod/.test(userAgent)) {
        deviceType = 'iOS';
        let btn = createButton("Permitir movimiento");
    btn.mousePressed(function () {
        DeviceOrientationEvent.requestPermission();
    });
    } else if (/Android/.test(userAgent)) {
        deviceType = 'Android';
    } else {
        deviceType = 'Other';
    }
    socket.emit('device-size', { deviceType, windowWidth, windowHeight });
    
    };

function draw() {
    background(0, 5);
    fill(255);
    ellipse(controllerX, controllerY, 50, 50);
}

/*function mouseDragged() {
    socket.emit('positions', { controlX: pmouseX, controlY: pmouseY });
}*/
/*
function touchMoved() {
    switch (interactions) {
        case 0:
            socket.emit('mobile-instructions', { interactions, pmouseX, pmouseY });
            background(255, 0, 0);
            break;
    }
}

function touchStarted() {
    isTouched = true;
}

function touchEnded() {
    isTouched = false;
}*/

function deviceMoved() {
            socket.emit('mobile-instructions', { rotationX, rotationY, rotationZ });
            background(0, 255, 0);
    }

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}