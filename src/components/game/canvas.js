import Snake from '../../gameLogic/snake';
import Food from '../../gameLogic/food';

let canvas;
let ctx;
let blockSize;

let snake;
let food;

let wall;
let speed;

let gameOver;
let incScore;

const config = {
  color: {
    snake: '#0bdd1d',
    food: '#e00606',
    screen: '#111',
    overlay: '#dd940b',
  },
  overlay: {
    opacity: 0.25
  },
  renderBlock: ({ left:x, top:y, width, height }, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  },
  checkBlock: (x, y, a, b) => {
    return x === a && y === b;
  }
}

const startGame = (wallSetting, speedSetting, gameOverCb, incScoreCb) => {
  wall = wallSetting;
  gameOver = gameOverCb;
  incScore = incScoreCb;
  speed = [150, 100, 50][speedSetting - 1];

  canvas = document.getElementById('game');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetWidth;
  canvas.tabIndex = 1000;
  canvas.focus();

  ctx = canvas.getContext('2d');
  fillScreen();
  
  blockSize = canvas.width / 40;
  
  ctx.beginPath();

  snake = new Snake({
    canvas,
    blockSize,
    wall,
    renderBlock: config.renderBlock,
    screenColor: config.color.screen,
    snakeColor: config.color.snake,
  });

  food = new Food({
    canvas,
    blockSize,
    snakeBlocks: snake.blocks,
    checkBlock: config.checkBlock,
    foodColor: config.color.food,
    screenColor: config.color.screen,
    checkBlock: config.checkBlock,
    renderBlock: config.renderBlock
  });


  document.addEventListener('keydown', (event) => {
    if (event.key.includes('Arrow')) {
      event.preventDefault();
      snake.changeDirection(event.key);
    }
  })

  mainLoop();
}

const mainLoop = () => {
  snake.move();

  if (snake.checkDeath()) {
    freezeGame();
    return;
  }

  if (checkSnakeEatsFood()) {
    incScore();
    food.place();
  } else {
    snake.advanceTail();
  }
  
  snake.advanceHead();

  setTimeout(() => {
    mainLoop();
  }, speed);
}

const checkSnakeEatsFood = () => {
  return config.checkBlock(snake.blocks[0].x, snake.blocks[0].y, food.x, food.y);
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
  const time = 2000 / snake.blocks.length;

  snake.renderSnakeBlock(snake.blocks[1], '#cecece');
  let i = 2;
  const turnSnakeWhite = setInterval(() => {
    if (i < snake.blocks.length) {
      snake.renderSnakeBlock(snake.blocks[i], '#cecece');
    }

    i += 1;
    
    if (i === snake.blocks.length) {
      let { x, y, direction } = snake.blocks[snake.blocks.length - 1]
      switch (direction) {
        case 'up': {
          y += 1;
          break;
        }
        case 'right': {
          x -= 1;
          break;
        }
        case 'down': {
          y -= 1;
          break;
        }
        default: {
          x += 1;
          break;
        }
      }
  
      config.renderBlock({
        left: x * blockSize - 1,
        top: y* blockSize - 1,
        width: blockSize + 2,
        height: blockSize + 2
      }, '#111');

      // fillScreen(true);
      canvas.style.zIndex = 0;
      gameOver();
      clearInterval(turnSnakeWhite);
    }
  }, time);
}

export default startGame;