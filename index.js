// Style
const bg_color = "black";
const snake_part_color = "white";

// Board variables
const snakeboard = document.getElementById("board");
const snakeboard_ctx = snakeboard.getContext("2d");
const snakeboard_w = snakeboard.width;
const snakeboard_h = snakeboard.height;
const score = 0;

// Snake variables
const snake_parts = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];
const snake_part_w = 10;

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

drawBackground();
drawSnake();
