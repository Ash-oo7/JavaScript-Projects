// js constants
const startText = document.getElementById('startText');
const paddle1 = document.getElementById('paddle1')
const paddle2 = document.getElementById('paddle2')
const ball = document.getElementById('ball')
const player1ScoreElement = document.getElementById('player1score')
const player2ScoreElement = document.getElementById('player2score')
const lossSound = document.getElementById('lossSound')
const paddleSound = document.getElementById('paddleSound')
const wallSound = document.getElementById('wallSound')


//Game variables
let gameRunning = false;
let keysPressed = {};
let paddle1Speed = 0;
let paddle2Speed = 0;
let paddle1Y = 150;
let paddle2Y = 150;
let ballX = 290;
let ballSpeedX = 2;
let ballY = 192;
let ballSpeedY = 2;
let player1Score = 0;
let player2Score = 0;

//constant 
const paddleAccelaration = 1
const paddleDecelaetration = 1
const maxPaddleSpeed = 5
const gameHeight = 400
const gameWidth = 600

//event listener for the space button to start the game and keydown and keyups
document.addEventListener('keydown', handleSpacebar)
document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keyup', handleKeyUp)

//fn to handle spacebar
function handleSpacebar(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        startGame();
    }
}
// Start game function
function startGame() {
    gameRunning = true
    startText.style.display = 'none';
    document.removeEventListener('keydown', handleSpacebar) //remove the EveList
    console.log('hi')
    gameLoop();
}

//Gameloop fn
function gameLoop() {
    if (!gameRunning) return;
    updatePaddle1()
    updatePaddle2()
    moveBall()
    setTimeout(gameLoop, 8)
}

// fn to handle keydown
function handleKeyDown(e) {
    keysPressed[e.key] = true
}

// fn to handle keyUp
function handleKeyUp(e) {
    keysPressed[e.key] = false
}

//fn for the paddle 1
function updatePaddle1() {

    if (keysPressed['w']) {
        paddle1Speed = Math.max(paddle1Speed - paddleAccelaration, -maxPaddleSpeed)
    }
    else if (keysPressed['s']) {
        paddle1Speed = Math.min(paddle1Speed + paddleAccelaration, maxPaddleSpeed)
    }
    else {
        if (paddle1Speed > 0) {
            paddle1Speed = Math.max(paddle1Speed - paddleDecelaetration, 0)
        }
        else if (paddle1Speed < 0) {
            paddle1Speed = Math.min(paddle1Speed + paddleDecelaetration, 0)
        }
    }

    paddle1Y += paddle1Speed
    if (paddle1Y < 0) {
        paddle1Y = 0
    }

    if (paddle1Y > gameHeight - paddle1.clientHeight) {
        paddle1Y = gameHeight - paddle1.clientHeight
    }
    paddle1.style.top = paddle1Y + 'px'

}

//fn for the paddle 2
function updatePaddle2() {

    if (keysPressed['ArrowUp']) {
        paddle2Speed = Math.max(paddle2Speed - paddleAccelaration, -maxPaddleSpeed)
    }
    else if (keysPressed['ArrowDown']) {
        paddle2Speed = Math.min(paddle2Speed + paddleAccelaration, maxPaddleSpeed)
    }
    else {
        if (paddle2Speed > 0) {
            paddle2Speed = Math.max(paddle2Speed - paddleDecelaetration, 0)
        }
        else if (paddle2Speed < 0) {
            paddle2Speed = Math.min(paddle2Speed + paddleDecelaetration, 0)
        }
    }

    paddle2Y += paddle2Speed
    if (paddle2Y < 0) {
        paddle2Y = 0
    }

    if (paddle2Y > gameHeight - paddle2.clientHeight) {
        paddle2Y = gameHeight - paddle2.clientHeight
    }
    paddle2.style.top = paddle2Y + 'px'
}

function moveBall() {
    ballX += ballSpeedX
    ballY += ballSpeedY

    //collisions with upper and lower walls
    if (ballY >= gameHeight - ball.clientHeight || ballY <= 0) {
        playSound(wallSound)
        ballSpeedY = -ballSpeedY
    }

    //collisions with paddle1
    if (ballX <= paddle1.clientWidth &&
        ballY >= paddle1Y &&
        ballY <= paddle1Y + paddle1.clientHeight) {

        playSound(paddleSound)
        ballSpeedX = -ballSpeedX
    }

    //collisions with paddle2
    if (ballX >= gameWidth - paddle2.clientWidth - ball.clientWidth &&
        ballY >= paddle2Y &&
        ballY <= paddle2Y + paddle2.clientHeight) {

        playSound(paddleSound)
        ballSpeedX = -ballSpeedX
    }

    //wall collision with left and right wall
    if (ballX <= 0) {
        player2Score++;
        playSound(lossSound)
        updateScoreBoard()
        resetBall()
        pauseGame()
    }
    else if (ballX >= gameWidth - ball.clientWidth) {
        player1Score++;
        playSound(lossSound)
        updateScoreBoard()
        resetBall()
        pauseGame()
    }

    ball.style.left = ballX + 'px'
    ball.style.top = ballY + 'px'
}

function updateScoreBoard() {
    player1ScoreElement.textContent = player1Score
    player2ScoreElement.textContent = player2Score

}

function resetBall() {
    ballX = gameWidth / 2 - ball.clientWidth / 2
    ballY = gameHeight / 2 - ball.clientHeight / 2
    ballSpeedX = Math.random() > 0.5 ? 2 : -2
    ballSpeedY = Math.random() > 0.5 ? 2 : -2
}

function pauseGame() {
    gameRunning = false
    document.addEventListener('keydown', handleSpacebar)
}


//playsound function
function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}


// Add event listener for the R key to reset the game
document.addEventListener('keydown', handleResetKey);

// Reset the game back to its initial state
function resetGame() {
    // Reset all game variables
    gameRunning = false;
    paddle1Speed = 0;
    paddle2Speed = 0;
    paddle1Y = 150;
    paddle2Y = 150;
    ballX = 290;
    ballY = 192;
    ballSpeedX = 2;
    ballSpeedY = 2;
    player1Score = 0;  // Reset player 1 score
    player2Score = 0;  // Reset player 2 score

    // Reset paddle and ball positions on the screen
    paddle1.style.top = paddle1Y + 'px';
    paddle2.style.top = paddle2Y + 'px';
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Reset the scoreboard to zero
    player1ScoreElement.textContent = player1Score;
    player2ScoreElement.textContent = player2Score;

    // Show start text and re-enable spacebar to start the game
    startText.style.display = 'block';
    document.addEventListener('keydown', handleSpacebar);

}

// Handle reset key press (R key)
function handleResetKey(e) {
    if (e.key === 'r' || e.key === 'R') {
        resetGame();
    }
}
