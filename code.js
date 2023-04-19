const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let currentSpeed = speed;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLenght = 2;

let appleX = 5;
let appleY = 5;
let score = 0;
let xVelocity = 0;
let yVelocity = 0;

//game loop
function drawGame() {
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();
  setTimeout(drawGame, 1000 / speed);
}

function resetGame() {
  // reset game state variables
  score = 0;
  location.reload();

  // hide the play again button
  document.getElementById("playAgain").style.display = "none";
}

function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }
  //walls
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
    }
  }
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px verdana";
    ctx.fillText("Game Over! ", canvas.width / 6.5, canvas.height / 2);
    ctx.font = "16px verdana";
    ctx.fillText(
      "your score is: " + score,
      canvas.width / 8,
      canvas.height / 1.5
    );
    document.getElementById("playAgain").style.display = "block";
  }
  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "11px verdana";
  ctx.fillText("Score " + score, canvas.width - 70, 380);
}

function clearScreen() {
  ctx.fillStyle = "rgb(140, 206, 40)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(
    headX * tileCount + tileSize / 2,
    headY * tileCount + tileSize / 2,
    tileSize / 1.35,
    0,
    2 * Math.PI
  );
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(
    headX * tileCount + tileSize / 3,
    headY * tileCount + tileSize / 3,
    tileSize / 6,
    0,
    2 * Math.PI
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    headX * tileCount + (2 * tileSize) / 3,
    headY * tileCount + tileSize / 3,
    tileSize / 6,
    0,
    2 * Math.PI
  );
  ctx.fill();

  ctx.fillStyle = "yellow";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new snakePart(headX, headY));
  if (snakeParts.length > tailLenght) {
    snakeParts.shift();
  }
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(
    appleX * tileCount + tileSize / 2,
    appleY * tileCount + tileSize / 2,
    tileSize / 1.5,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLenght++;
    score += 10;
    if (score % 100 === 0) {
      currentSpeed++;
    }
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //up
  if (event.keyCode == 38) {
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }
  //down
  if (event.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }

  //left
  if (event.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }
  //right
  if (event.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();

