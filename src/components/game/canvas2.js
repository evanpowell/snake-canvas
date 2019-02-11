const snake = [];
let snakeDirection = 1;
let snakeNextDirection = 1;
const food = {}

const startGame = (canvas, ctx, wall, speed, gameOver) => {
  for (var i = 4; i >= 0; i--) {
    snake.push({
      x: i,
      y: 15
    });
  }

  placeFood(canvas);

  canvas.onkeydown = (event = window.event) => {
    changeDirection(event.keyCode);
  }

  mainLoop(canvas, ctx, wall, speed, gameOver);
}

const placeFood = (canvas) => {
  food.x = Math.floor(Math.random() * ((canvas.width / 10) - 1));
  food.y = Math.floor(Math.random() * ((canvas.height / 10) - 1));
  for (var i = 0; i < snake.length; i++) {
    if (checkBlock(food.x, food.y, snake[i].x, snake[i].y)) {
      placeFood(snake);
      break;
    }
  }
}

const checkBlock = (x, y, a, b) => {
  return x === a && y === b;
}

const changeDirection = (key) => {
  if (key == 38 && snakeDirection != 2) {
    return 0;
  } else if (key == 39 && snakeDirection != 3) {
    snakeNextDirection = 1;
  } else if (key == 40 && snakeDirection != 0) {
    snakeNextDirection = 2;
  } else if (key == 37 && snakeDirection != 1) {
    snakeNextDirection = 3;
  }
}

const mainLoop = (canvas, ctx, wall, speed, gameOver) => {
  moveSnake();

  checkWall(wall, gameOver);
}

const moveSnake = () => {
  let x = snake[0].x;
  let y = snake[0].y;
    
  snakeDirection = snakeNextDirection;
  
  // 0 - Up, 1 - Right, 2 - Down, 3 - Left
  switch (snakeDirection) {
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

const checkWall = (wall, gameOver) => {
  if (wall) {
    if (snake[0].x < 0 || snake[0].x == canvas.width / 10 || snake[0].y < 0 || snake[0].y == canvas.height / 10) {
      gameOver();
      return;
    }
  } else {
    for (var i = 0, x = snake.length; i < x; i++) {
      if (snake[i].x < 0) {
        snake[i].x = snake[i].x + (canvas.width / 10);
      }
      if (snake[i].x == canvas.width / 10) {
        snake[i].x = snake[i].x - (canvas.width / 10);
      }
      if (snake[i].y < 0) {
        snake[i].y = snake[i].y + (canvas.height / 10);
      }
      if (snake[i].y == canvas.height / 10) {
        snake[i].y = snake[i].y - (canvas.height / 10);
      }
    }
  }
}

export default startGame;
