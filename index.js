// Style
const bg_color = "black";
const snake_part_color = "white";

// Board variables
const snakeboard = document.getElementById("board");
const snakeboard_ctx = snakeboard.getContext("2d");
const snakeboard_w = snakeboard.width;
const snakeboard_h = snakeboard.height;
const pointPerScore = 1;
var speed = 200; // miliseconds
var score = 0;
var dx = 10;
var dy = 0;

// Snake variables
const snake_part_w = 10;
const snake_parts = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

// Food variables
const food_w = 10;
var foodX;
var foodY;

function drawBackground() {
  // Draw background
  snakeboard_ctx.fillStyle = bg_color;
  snakeboard_ctx.fillRect(0, 0, snakeboard_w, snakeboard_h);

  // Draw score text
  snakeboard_ctx.font = "20px Comic Sans MS";
  snakeboard_ctx.fillStyle = "white";
  snakeboard_ctx.fillText("Score: " + score, 10, 30);
}

function drawSnake() {
  snake_parts.forEach((p) => {
    snakeboard_ctx.fillStyle = snake_part_color;
    snakeboard_ctx.fillRect(p.x, p.y, snake_part_w, snake_part_w);
  });
}

function move() {
  const head = {
    x: snake_parts[0].x + dx,
    y: snake_parts[0].y + dy,
  };

  snake_parts.unshift(head);
  const has_eaten_food =
    snake_parts[0].x === foodX && snake_parts[0].y === foodY;
  if (has_eaten_food) {
    // Generate new food location
    generateFood();
    // Update score
    updateScoreAndLevel();
  } else {
    // Remove the last part of snake body
    snake_parts.pop();
  }
}

function hasGameEnd() {
  for (let i = 4; i < snake_parts.length; i++) {
    if (
      snake_parts[i].x === snake_parts[0].x &&
      snake_parts[i].y === snake_parts[0].y
    )
      return true;
  }
  const hitLeftWall = snake_parts[0].x < 0;
  const hitRightWall = snake_parts[0].x > snakeboard.width - 10;
  const hitToptWall = snake_parts[0].y < 0;
  const hitBottomWall = snake_parts[0].y > snakeboard.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  // Check current direction => Not change direction if snake go reverse
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  const keyPressed = event.keyCode;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10; // Generate number that divisible for 10
}

function generateFood() {
  foodX = randomFood(0, snakeboard_w - 10);
  foodY = randomFood(0, snakeboard_h - 10);
}

function drawFood() {
  snakeboard_ctx.fillStyle = "white";
  snakeboard_ctx.fillRect(foodX, foodY, food_w, food_w);
}

function updateScoreAndLevel() {
  // Update new score
  score += pointPerScore;

  // Update game level
  const level = Math.floor(score / 10) + 1;
  if (level > 1) {
    speed = Math.round((200 / level) / 10) * 10;
  }
}

function start() {
  if (hasGameEnd()) {
    alert("Game end!");
    return;
  }

  setTimeout(() => {
    drawBackground();
    move();
    drawSnake();
    drawFood();
    start();
  }, speed);
}

start();
generateFood(); // Generate food when game start

document.addEventListener("keydown", changeDirection);
