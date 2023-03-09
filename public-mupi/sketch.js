const NGROK = `${window.location.hostname}`;
//const NGROK = `https://${window.location.hostname}`;
//let socket = io(`${window.location.hostname}:5050`, { path: '/real-time' }); 
let socket = io(NGROK, { path: '/real-time' });
console.log('Server IP: ', NGROK);

let deviceWidth, deviceHeight = 0;
let mupiWidth, mupiHeight = 0;


let paddleWidth = 100;
let paddleHeight = 15;
let controllerX, controllerY = 0;

let ballSize = 20;
let ballX = 100;
let ballY = 10;
let velBallX = 5;
let velBallY = 3;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    mupiWidth = windowWidth;
    mupiHeight = windowHeight;
    background(0);
}

function draw() {
    background(0);
    fill(255);

    rect(controllerX, controllerY - paddleHeight/2, paddleWidth, paddleHeight);

    ellipse(ballX, ballY, ballSize);

    ballX += velBallX;
    ballY += velBallY;
    
    // Colisión con paredes de la pantalla
    if (ballX < ballSize/2 || ballX > width - ballSize/2) {
        velBallX = -velBallX;
    }
    if (ballY < ballSize/2 || ballY > height - ballSize/2) {
        velBallY = -velBallY;
    }
    
    // Colisión con el player
    
    if (ballX >= controllerX && ballX <= controllerX + paddleWidth &&
        ballY >= controllerY - paddleHeight/2 && ballY <= controllerY + paddleHeight) {
        velBallX = -velBallX;
    }
}

function mouseDragged() {
    socket.emit('positions', { controlX: pmouseX, controlY: pmouseY });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

socket.on('mupi-instructions', instructions => {
    console.log('ID: ' + socket.id);

    let { rotationX, rotationY, rotationZ } = instructions;
    controllerX = (rotationX * mupiHeight) / 90;
});

socket.on('mupi-size', deviceSize => {
    let { deviceType, windowWidth, windowHeight } = deviceSize;
    deviceWidth = windowWidth;
    deviceHeight = windowHeight;
    console.log(`User is using an ${deviceType} smartphone size of ${deviceWidth} and ${deviceHeight}`);
});