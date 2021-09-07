window.onload = function() {
  const canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game, 1000/11);
}

let gridSize = 20;
let tileCount = 20;

// Player Positions
let playerX = 10;
let playerY = 10;

// Food Positions
let foodX = 15;
let foodY = 15;

// Snake Coordinates
let snakeX = 0;
let snakeY = 0;

let snakeTrail = [];
let snakeTail = 5;

// Main Game Logic
function game() {
    playerX += snakeX;
    playerY += snakeY;
    
    // Snake Board Wrap
    if (playerX < 0) {
      playerX = tileCount - 1;
    }
    if (playerX > tileCount - 1) {
      playerX = 0;
    }
    if (playerY < 0) {
      playerY = tileCount - 1;
    }
    if (playerY > tileCount - 1) {
      playerY = 0;
    }
    
    // Canvas Styling
    context.fillStyle = "whitesmoke";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Snake Styling & Logic
    context.fillStyle = "lime";
    for (var i = 0; i < snakeTrail.length; i++) {
      context.fillRect(snakeTrail[i].x * gridSize, snakeTrail[i].y * gridSize, gridSize - 2, gridSize - 2);
      
      if (snakeTrail[i].x === playerX && snakeTrail[i].y === playerY) {
        snakeTail = 5;
      }
    }
    snakeTrail.push({x:playerX, y:playerY});
    while (snakeTrail.length > snakeTail) {
      snakeTrail.shift();
    }

    // Food Styling & Logic
    context.fillStyle = "red";
    context.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
    if (foodX === playerX && foodY === playerY) {
      snakeTail++;
      foodX = Math.floor(Math.random() * tileCount);
      foodY = Math.floor(Math.random() * tileCount);
    }
}

// Controls Logic
function keyPush(event) {
  switch(event.keyCode) {
    case 37:
      if (snakeX !== 0) break;
      snakeX = -1;
      snakeY = 0;
      break;
    case 38:
      if (snakeY !== 0) break;
      snakeX = 0;
      snakeY = -1;
      break;
    case 39:
      if (snakeX !== 0) break;
      snakeX = 1;
      snakeY = 0;
      break;
    case 40:
      if (snakeY !== 0) break;
      snakeX = 0;
      snakeY = 1;
      break;
  }
}