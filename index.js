// Style
const bg_color = "black";
const snake_part_color = "white";

// Board variables
const snakeboard = document.getElementById("board");
const snakeboard_ctx = snakeboard.getContext("2d");
const snakeboard_w = snakeboard.width;
const snakeboard_h = snakeboard.height;
const score = 0;
const snake_part_w = 10;
const speed = 200; // miliseconds
var dx = 10;
var dy = 0;

// Snake variables
const snake_parts = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

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
  snake_parts.pop();
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

function start() {
  if (hasGameEnd()) {
    alert("Game end!");
    return;
  }
  setTimeout(() => {
    drawBackground();
    move();
    drawSnake();
    start();
  }, speed);
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

start();
document.addEventListener("keydown", changeDirection);
