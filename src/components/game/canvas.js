const snake = [];
const snakeDirection = {};
const food = {};

const startGame = (canvas, ctx, wall, speedSetting, gameOver, incScore) => {
  canvas.tabIndex = 1000;
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

  updateFood(canvas);

  canvas.onkeydown = (event = window.event) => {
    changeDirection(event.keyCode);
  }

  const speed = [150, 100, 50][speedSetting - 1];

  mainLoop(canvas, ctx, wall, speed, gameOver, incScore);
}

const updateFood = (canvas) => {
  food.x = Math.floor(Math.random() * ((canvas.width / 10) - 1));
  food.y = Math.floor(Math.random() * ((canvas.height / 10) - 1));
  for (var i = 0; i < snake.length; i++) {
    if (checkBlock(food.x, food.y, snake[i].x, snake[i].y)) {
      updateFood(canvas);
      return;
    }
  }
}

const checkBlock = (x, y, a, b) => {
  return x === a && y === b;
}

const changeDirection = (key) => {
  const { current } = snakeDirection;
  if (key === 38 && current !== 2) {
    snakeDirection.next = 0;
  } else if (key === 39 && current !== 3) {
    snakeDirection.next = 1;
  } else if (key === 40 && current !== 0) {
    snakeDirection.next = 2;
  } else if (key === 37 && current !== 1) {
    snakeDirection.next = 3;
  }
}

const mainLoop = (canvas, ctx, wall, speed, gameOver, incScore) => {
  moveSnake();

  if (!checkWallAndAutophagy(wall, canvas)) {
    gameOver();
    return;
  };

  if (checkSnakeEatsFood()) {
    growSnake();
    incScore();
    updateFood(canvas, ctx);
  };

  ctx.beginPath();
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < snake.length; i++) {
    activeDot(snake[i].x, snake[i].y, ctx);
  }

  activeDot(food.x, food.y, ctx, true);

  setTimeout(() => {
    mainLoop(canvas, ctx, wall, speed, gameOver, incScore);
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
  
  snake.pop();
  snake.unshift({
    x,
    y
  });
}

const checkWallAndAutophagy = (wall, canvas) => {
  if (wall) {
    if (snake[0].x < 0 || snake[0].x === canvas.width / 10 || snake[0].y < 0 || snake[0].y === canvas.height / 10) {
      return false;
    }
  }
  
  for (var i = 0; i < snake.length; i++) {
    if (!wall) {
      if (snake[i].x < 0) {
        snake[i].x = snake[i].x + (canvas.width / 10);
      }
      if (snake[i].x === canvas.width / 10) {
        snake[i].x = snake[i].x - (canvas.width / 10);
      }
      if (snake[i].y < 0) {
        snake[i].y = snake[i].y + (canvas.height / 10);
      }
      if (snake[i].y === canvas.height / 10) {
        snake[i].y = snake[i].y - (canvas.height / 10);
      }
    }
    if (i !== 0 && snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return false;
    }
  }

  return true;
}

const checkSnakeEatsFood = () => {
  return checkBlock(snake[0].x, snake[0].y, food.x, food.y);
  // if (checkBlock(snake[0].x, snake[0].y, food.x, food.y)) {
  //   snake.push({
  //     x: snake[0].x,
  //     y: snake[0].y
  //   });
  //   updateFood(canvas);
    
  // }
}

const growSnake = () => {
  snake.push({
    x: snake[0].x,
    y: snake[0].y
  });
}

const activeDot = (x, y, ctx, isFood = false) => {
  if (isFood) {
    ctx.fillStyle = "#e00606";
  } else {
    ctx.fillStyle = "#0bdd1d";
  }

  ctx.fillRect(x * 10, y * 10, 10, 10);
}



export default startGame;
