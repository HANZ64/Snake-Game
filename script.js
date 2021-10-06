window.onload = function() {
  const canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game, 1000/11);
}

////////////////////////

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
let directionQueue = [];
let points = 0;

////////////////////////

// Main Game Logic
function game() {
  // Prevents reversed snake bug
  if (directionQueue.length) {
    let direction = directionQueue.shift();
    snakeX = direction.snakeX;
    snakeY = direction.snakeY;
  }

  // Move snake
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
  // Simply randomise food locations (does not check for collisions)
  // if (foodX === playerX && foodY === playerY) {
  //   snakeTail++;
  //   foodX = Math.floor(Math.random() * tileCount);
  //   foodY = Math.floor(Math.random() * tileCount);
  // }

  // Prevent food from spawning on snake [Solution 3]
  if(foodX === playerX && foodY === playerY) {
    points++;
    console.log('Your current score is:', points)
    snakeTail++;
    foodX = foodCoordinatesX();
    foodY = foodCoordinatesY();
  }
  if(snakeTail === 5) {
    //console.log('START OVER!')
    points = 0;
  }

  // Prevent food from spawning on snake (works but freezes above snakeTrail 20) [Solution 1]
  // if(foodX === playerX && foodY === playerY) {
  //   points++;
  //   console.log('Your current score is:', points)
  //   snakeTail++;
  //   foodX = foodCoordinatesX();
  //   foodY = foodCoordinatesY();
  // }
  // if(snakeTail === 5) {
  //   console.log('START OVER!')
  //   points = 0;
  // }

  // Prevent food from spawning on snake (works but randomly freezes) [Solution 2]
  // if (foodX === playerX && foodY === playerY) {
  //   points++;
  //   console.log('Your current score is:', points)
  //   snakeTail++;
  //   foodX = getRandomIndex(snakeTrail.map(element => element.x), tileCount);
  //   foodY = getRandomIndex(snakeTrail.map(element => element.y), tileCount);
  // }
  // if(snakeTail === 5) {
  //   console.log('START OVER!')
  //   points = 0;
  // }

  // Random Food Coordinate Collisions Check (simulates fast playthrough) [For Solution 1]
  // do {
  //   // snakeTail++;
  //   foodX = foodCoordinatesX();
  //   foodY = foodCoordinatesY();
  // }
  // while (foodX === playerX && foodY === playerY);

  // Random Food Coordinate Collisions Check (simulates fast playthrough) [For Solution 2]
  // do {
  //   // snakeTail++;
  //   foodX = getRandomIndex(snakeTrail.map(element => element.x), tileCount);
  //   foodY = getRandomIndex(snakeTrail.map(element => element.y), tileCount);
  // }
  // while (foodX === playerX && foodY === playerY);

  // Random Food Coordinate Collisions Check (simulates fast playthrough) [For Solution 3]
  // do {
  //   // snakeTail++;
  //   foodX = foodCoordinatesX();
  //   foodY = foodCoordinatesY();
  // }
  // while (foodX === playerX && foodY === playerY);

  // Check for snake coordinates
  //console.log('snakeX:', snakeTrail.map(element => element.x));
  //console.log('snakeY:', snakeTrail.map(element => element.y));
}

/////////////////////////////////////////////////////////////////

// Controls Logic (Keyboard)
function keyPush(event) {
  switch (event.keyCode) {
    // ArrowLeft
    case 37:
      snakeX = snakeX || -1; 
      snakeY = 0;
      break;
    // ArrowUp
    case 38:
      snakeX = 0; 
      snakeY = snakeY || -1;
      break;
    // ArrowRight
    case 39:
      snakeX = snakeX || 1; 
      snakeY = 0;
      break;
    // ArrowDown
    case 40:
      snakeX = 0; 
      snakeY = snakeY || 1;
      break;
  }
  // Push to directionQueue
  directionQueue.push({ snakeX: snakeX, snakeY: snakeY });
}

/////////////////////////////////////////////////////////////

// Create JoyStick object into the DIV 'joyDiv'
var Joy1 = new JoyStick('joy1Div',{

  // The ID of canvas element
  title: 'joystick',

  // width/height
  width: undefined,
  height: undefined,

  // Internal color of Stick
  internalFillColor: '#aa0000',

  // Border width of Stick
  internalLineWidth: 2,

  // Border color of Stick
  internalStrokeColor: '#330000',

  // External reference circonference width
  externalLineWidth: 2,

  //External reference circonference color
  externalStrokeColor: '#800000',

  // Sets the behavior of the stick
  autoReturnToCenter: true
});

let joy1InputResponseWidth = Joy1.GetWidth() / 1.6;
let joy1InputResponseHeight = Joy1.GetHeight() / 1.6;
// var joy1InputPosX = document.getElementById("joy1PositionX");
// var joy1InputPosY = document.getElementById("joy1PositionY");
// var joy1Direction = document.getElementById("joy1Direction");
// var joy1X = document.getElementById("joy1X");
// var joy1Y = document.getElementById("joy1Y");

// setInterval(function(){ 
//   joy1InputPosX.value=Joy1.GetPosX();
// }, 0);

// setInterval(function() {
//   joy1InputPosY.value=Joy1.GetPosY();
// }, 0);

// setInterval(function() { 
//   joy1Direction.value=Joy1.GetDir(); 
// }, 0);

// setInterval(function() { 
//   joy1X.value=Joy1.GetX();
// }, 0);

// setInterval(function() { 
//   joy1Y.value=Joy1.GetY();
// }, 0);

// Controls Logic (Joystick)
setInterval(function() {
  if (Joy1.GetPosX() < joy1InputResponseWidth && Joy1.GetDir() === 'W') {
    if (snakeX !== 0) return;
    // Joystick Left
    snakeX = snakeX || -1;
    snakeY = 0;
    return
  }

  if (Joy1.GetPosX() > joy1InputResponseWidth && Joy1.GetDir() === 'E') {
    if (snakeX !== 0) return;
    // Joystick Right
    snakeX = snakeX || 1;
    snakeY = 0;
    return
  }

  if (Joy1.GetPosY() < joy1InputResponseHeight && Joy1.GetDir() === 'N') {
    if (snakeY !== 0) return;
    // Joystick Up
    snakeX = 0;
    snakeY = snakeY || -1;
    return
  }

  if (Joy1.GetPosY() < joy1InputResponseHeight && Joy1.GetDir() === 'NE') {
    if (snakeX !== 0) return;
    // Joystick Up-Right (Right)
    snakeX = snakeX || 1;
    snakeY = 0;
    return
  }
  if (Joy1.GetPosY() < joy1InputResponseHeight && Joy1.GetDir() === 'NW') {
    if (snakeY !== 0) return;
    // Joystick Up-Left (Up)
    snakeX = 0;
    snakeY = snakeY || -1;
    return
  }

  if (Joy1.GetPosY() > joy1InputResponseHeight && Joy1.GetDir() === 'S') {
    if (snakeY !== 0) return;
    // Joystick Down
    snakeX = 0;
    snakeY = snakeY || 1;
    return
  }

  if (Joy1.GetPosY() > joy1InputResponseHeight && Joy1.GetDir() === 'SE') {
    if (snakeY !== 0) return;
    // Joystick Down-Right (Down)
    snakeX = 0;
    snakeY = snakeY || 1;
    return
  }

  if (Joy1.GetPosY() > joy1InputResponseHeight && Joy1.GetDir() === 'SW') {
    if (snakeX !== 0) return;
    // Joystick Down-Left (Left)
    snakeX = snakeX || -1; 
    snakeY = 0;
    return
  }
}, 80);

/////////////////////////////////////////////////////////////

const canvasWidth = canvas.getBoundingClientRect().width;
const canvasHeight = canvas.getBoundingClientRect().height;
const centerCanvasWidth = canvas.getBoundingClientRect().width / 2;
const centerCanvasHeight = canvas.getBoundingClientRect().height / 2;

// Mouse/Touch-screen control logic
function mouseMoveHandler(e) {
  // console.log('x', e.layerX)
  // console.log('y', e.layerY)

  // Touch Screen (Top-Left)
  if (e.layerX < centerCanvasWidth && e.layerY < centerCanvasHeight) {
    if (snakeX !== 0) return;
    // Mouse Left
    snakeX = -1;
    snakeY = 0;
    return
  }

  // Touch Screen (Top-Right)
  if (e.layerX > centerCanvasWidth && e.layerY < centerCanvasHeight) {
    if (snakeY !== 0) return;
    // Mouse Up
    snakeX = 0;
    snakeY = -1;
    return
  }

  // Touch Screen (Bottom-Right)
  if (e.layerX > centerCanvasWidth && e.layerY > centerCanvasHeight) {
    if (snakeX !== 0) return;
    // Mouse Right
    snakeX = 1;
    snakeY = 0;
    return
  }

  // Touch Screen (Bottom-Left)
  if (e.layerX < centerCanvasWidth && e.layerY > centerCanvasHeight) {
    if (snakeY !== 0) return;
    // Mouse Down
    snakeX = 0;
    snakeY = 1;
    return
  }
}
canvas.addEventListener("click", mouseMoveHandler);

/////////////////////////////////////////////////////////////

// Reload page after canvas resize
function setResizeHandler(callback, timeout) {
  let timer_id = undefined;
  window.addEventListener("resize", function() {
      if(timer_id != undefined) {
          clearTimeout(timer_id);
          timer_id = undefined;
      }
      timer_id = setTimeout(function() {
          timer_id = undefined;
          callback();
      }, timeout);
  });
}
function callback() {
  location.reload();
}
setResizeHandler(callback, 200);

/////////////////////////////////////////////////////////////

// Prevent food from spawning on snake [Solution 3]
function foodCoordinatesX() {
  let snakeTrailX = new Float64Array(snakeTrail.map(element => element.x));
  snakeTrailX = snakeTrailX.sort();
  //console.log('snakeTrailX', snakeTrailX)
  let randomFoodLocationX = Math.floor(Math.random() * tileCount);
  //console.log('randomFoodLocationX', randomFoodLocationX);
  let blockIsOnSnakeX = snakeTrailX.includes(randomFoodLocationX);
  //console.log('blockIsOnSnakeX', blockIsOnSnakeX);

if (blockIsOnSnakeX) {
    //console.log("BLOCK IS ON SNAKE-X. SHIFT!")
    if(snakeTrailX.at(-1) < (tileCount - 1)) {
      randomFoodLocationX = snakeTrailX.at(-1) + 1;
      //console.log("ADD 1", randomFoodLocationX)
    } else {
      randomFoodLocationX = snakeTrailX[0] - 1;
      //console.log("SUBTRACT 1", randomFoodLocationX)
      if(randomFoodLocationX < 0) {
        randomFoodLocationX = 0;
        while(snakeTrailX.includes(randomFoodLocationX)) {
          randomFoodLocationX += 1;
          //console.log("WHILE LOOP ADDING", randomFoodLocationX)
          if(randomFoodLocationX > (tileCount - 1)) {
            randomFoodLocationX = Math.floor(Math.random() * tileCount);
            //console.log("FINAL RANDOMISE:", randomFoodLocationX)
            break;
          }
        }
      }
    }
    //console.log('New randomFoodLocationX:', randomFoodLocationX);
  }
  return randomFoodLocationX;
}
function foodCoordinatesY() {
  let snakeTrailY = new Float64Array(snakeTrail.map(element => element.y));
  snakeTrailY = snakeTrailY.sort();
  //console.log('snakeTrailY', snakeTrailY)
  let randomFoodLocationY = Math.floor(Math.random() * tileCount);
  //console.log('randomFoodLocationY', randomFoodLocationY);
  let blockIsOnSnakeY = snakeTrailY.includes(randomFoodLocationY);
  //console.log('blockIsOnSnakeY', blockIsOnSnakeY);

if (blockIsOnSnakeY) {
    //console.log("BLOCK IS ON SNAKE-Y. SHIFT!")
    if(snakeTrailY.at(-1) < (tileCount - 1)) {
      randomFoodLocationY = snakeTrailY.at(-1) + 1;
      //console.log("ADD 1", randomFoodLocationY)
    } else {
      randomFoodLocationY = snakeTrailY[0] - 1;
      //console.log("SUBTRACT 1", randomFoodLocationY)
      if(randomFoodLocationY < 0) {
        randomFoodLocationY = 0;
        while(snakeTrailY.includes(randomFoodLocationY)) {
          randomFoodLocationY += 1;
          //console.log("WHILE LOOP ADDING", randomFoodLocationY)
          if(randomFoodLocationY > (tileCount - 1)) {
            randomFoodLocationY = Math.floor(Math.random() * tileCount);
            //console.log("FINAL RANDOMISE:", randomFoodLocationY)
            break;
          }
        }
      }
    }
    //console.log('New randomFoodLocationY:', randomFoodLocationY);
  }
  return randomFoodLocationY;
}

/////////////////////////////////////////////////////////////

// Prevent food from spawning on snake [Solution 1]
// Avoids all collisions, but the browser freezes if the snake trail goes above 20.

// Generate Food Coordinates (and check for collisions)
// function foodCoordinatesX() {
//   let snakeTrailX = snakeTrail.map(element => element.x);
//   // console.log('snakeTrailX', snakeTrailX);
//   let randomFoodLocationX = Math.floor(Math.random() * tileCount);
//   // console.log('randomFoodLocationX', randomFoodLocationX);
//   let blockIsOnSnakeX = snakeTrailX.includes(randomFoodLocationX);
//   // console.log('blockIsOnSnakeX', blockIsOnSnakeX);

//   while(blockIsOnSnakeX) {
//     // console.log("BLOCK IS ON SNAKE-X. RANDOMISE AGAIN!")
//     randomFoodLocationX = Math.floor(Math.random() * tileCount);
//     if (!snakeTrailX.includes(randomFoodLocationX)) {
//       break;
//     }
//   }

//   // Better performance but does not completely prevent collisions
//   // if (blockIsOnSnakeX) {
//   //   do {
//   //     console.log("BLOCK IS ON SNAKE-X. RANDOMISE AGAIN!")
//   //     randomFoodLocationX = Math.floor(Math.random() * tileCount);
//   //     console.log('randomFoodLocationX2', randomFoodLocationX);
//   //   }
//   //   while(!snakeTrailX.includes(randomFoodLocationX));
//   // }

//   return randomFoodLocationX;
// }
// function foodCoordinatesY() {
//   let snakeTrailY = snakeTrail.map(element => element.y);
//   // console.log('snakeTrailY', snakeTrailY);
//   let randomFoodLocationY = Math.floor(Math.random() * tileCount);
//   // console.log('randomFoodLocationY', randomFoodLocationY);
//   let blockIsOnSnakeY = snakeTrailY.includes(randomFoodLocationY);
//   // console.log('blockIsOnSnakeY', blockIsOnSnakeY);

//   while(blockIsOnSnakeY) {
//     // console.log("BLOCK IS ON SNAKE-Y. RANDOMISE AGAIN!")
//     randomFoodLocationY = Math.floor(Math.random() * tileCount);
//     if (!snakeTrailY.includes(randomFoodLocationY)) {
//       break;
//     }
//   }
   
//   return randomFoodLocationY;
// }

/////////////////////////////////////////////////////////////

// Prevent food from spawning on snake [Solution 2]
// Avoids all collisions but browser freezes randomly.

// function getRandomIndex(usedIndexs, maxIndex) {
//   var result = 0;
//   var min = 0;
//   var max = maxIndex - 1;
//   var index = Math.floor(Math.random()*(max-min+1)+min);

//   while(usedIndexs.indexOf(index) > -1) {
//       if (index < max) {
//           index++;
//       } else {
//         index = 0;
//       }
//   }

//   return index;
// }

///////////////////////////////////////////////////////////////////////////////////