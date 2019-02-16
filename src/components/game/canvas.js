let canvas;
let ctx;
let blockSize;

const snake = [];
const snakeDirection = {};
const food = {};

let wall;
let speed;

let gameOver;
let incScore;

let isGameOver;

const startGame = (wallSetting, speedSetting, gameOverCb, incScoreCb) => {
  wall = wallSetting;
  gameOver = gameOverCb;
  incScore = incScoreCb;
  speed = [150, 100, 50][speedSetting - 1];
  isGameOver = false;

  canvas = document.getElementById('game');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetWidth;
  canvas.tabIndex = 1000;

  blockSize = canvas.width / 40;
 
  ctx = canvas.getContext('2d');
  
  canvas.focus();

  snake.length = 0;
  snakeDirection.current = 1;
  snakeDirection.next = 1;

  for (var i = 4; i >= 0; i--) {
    snake.push({
      x: i,
      y: 15
    });
  }

  updateFood();

  canvas.onkeydown = (event = window.event) => {
    event.preventDefault();
    changeDirection(event.key);
  }

  mainLoop();
}

const updateFood = () => {
  food.x = Math.floor(Math.random() * ((canvas.width / blockSize) - 1));
  food.y = Math.floor(Math.random() * ((canvas.height / blockSize) - 1));
  for (var i = 0; i < snake.length; i++) {
    if (checkBlock(food.x, food.y, snake[i].x, snake[i].y)) {
      updateFood();
      return;
    }
  }
}

const checkBlock = (x, y, a, b) => {
  return x === a && y === b;
}

const changeDirection = (key) => {
  const { current } = snakeDirection;
  if (key === 'ArrowUp' && current !== 2) {
    snakeDirection.next = 0;
  } else if (key === 'ArrowRight' && current !== 3) {
    snakeDirection.next = 1;
  } else if (key === 'ArrowDown' && current !== 0) {
    snakeDirection.next = 2;
  } else if (key === 'ArrowLeft' && current !== 1) {
    snakeDirection.next = 3;
  }
}

const mainLoop = () => {
  moveSnake();

  if (isGameOver) {
    freezeGame();
    return;
  }

  render();

  setTimeout(() => {
    mainLoop();
  }, speed);
}

const moveSnake = () => {
  let x = snake[0].x;
  let y = snake[0].y;
    
  snakeDirection.current = snakeDirection.next;
  
  // 0 - Up, 1 - Right, 2 - Down, 3 - Left
  switch (snakeDirection.current) {
    case 0: {
      y--;
      break;
    }
    
    case 1: {
      x++;
      break;
    }
  
    case 2: {
      y++;
      break;
    }
  
    default: {
      x--;
      break;
    }
  }

  if (checkWallAndAutophagy(x, y)) {
    isGameOver = true;
  } else {
    if (checkSnakeEatsFood(x, y)) {
      incScore();
      updateFood();
    } else {
      snake.pop();
    }
    
    snake.unshift({
      x,
      y
    });
  }
}

const checkWallAndAutophagy = (x, y) => {
  if (wall) {
    if (x < 0 || x === canvas.width / blockSize || y < 0 || y === canvas.height / blockSize) {
      return true;
    }
  }
  
  for (var i = 0; i < snake.length; i++) {
    if (!wall) {
      if (snake[i].x < 0) {
        snake[i].x = snake[i].x + (canvas.width / blockSize);
      }
      if (snake[i].x === canvas.width / blockSize) {
        snake[i].x = snake[i].x - (canvas.width / blockSize);
      }
      if (snake[i].y < 0) {
        snake[i].y = snake[i].y + (canvas.height / blockSize);
      }
      if (snake[i].y === canvas.height / blockSize) {
        snake[i].y = snake[i].y - (canvas.height / blockSize);
      }
    }
    if (i !== 0 && x === snake[i].x && y === snake[i].y) {
      return true;
    }
  }

  return false;
}

const checkSnakeEatsFood = (x, y) => {
  return checkBlock(x, y, food.x, food.y);
}

const render = () => {
  ctx.beginPath();
  
  fillScreen();

  for (var i = 0; i < snake.length; i++) {
    activeDot(snake[i].x, snake[i].y);
  }

  activeDot(food.x, food.y, true);
}

const activeDot = (x, y, isFood = false, isGameOver = false) => {
  if (isFood) {
    if (isGameOver) {
      ctx.fillStyle = '#d8d8d8'
    } else {
      ctx.fillStyle = '#e00606';
    }
  } else {
    if (isGameOver) {
      ctx.fillStyle = '#cecece';
    } else {
      ctx.fillStyle = '#0bdd1d';
    }
  }

  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

const fillScreen = (isOverlay) => {
  if (isOverlay) {
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = '#dd940b';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;
  } else {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

const freezeGame = () => {
  ctx.beginPath();
  fillScreen();
  for (var i = 0; i < snake.length; i++) {
    activeDot(snake[i].x, snake[i].y, false, true);
  }
  activeDot(food.x, food.y, true, true);

  fillScreen(true);
}

export default startGame;
