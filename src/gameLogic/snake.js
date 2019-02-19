import { debug } from "util";

class SnakeBlock {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
}

class Snake {
  constructor(config) {
    this.config = config;
    this.blocks = [];
    this.currentDirection = 'right';
    this.nextDirection = 'right';
    this.init();
  }

  init() {
    const { blockSize, snakeColor } = this.config;
    let snakeBlock;
    for (let i = 4; i >= 0; i--) {
      snakeBlock = new SnakeBlock(i, 15, 'right');
      this.blocks.push(snakeBlock);
      if (i === 0) {
        this.config.renderBlock(0 * blockSize + 1, 15 * blockSize + 1, blockSize - 2, blockSize - 2, snakeColor);
      } else {
        this.renderSnakeBlock(snakeBlock);
      }
    }
  }

  move() {
    let{ x, y } = this.blocks[0];
      
    this.currentDirection = this.nextDirection;
    
    switch (this.currentDirection) {
      case 'up': {
        y--;
        break;
      }
      
      case 'right': {
        x++;
        break;
      }
    
      case 'down': {
        y++;
        break;
      }

      // 'left'
      default: {
        x--;
        break;
      }

    }

    this.blocks.unshift(new SnakeBlock(x, y, this.currentDirection));
  }

  changeDirection(key) {
    if (key === 'ArrowUp' && this.currentDirection !== 'down') {
      this.nextDirection = 'up';
    } else if (key === 'ArrowRight' && this.currentDirection !== 'left') {
      this.nextDirection = 'right';
    } else if (key === 'ArrowDown' && this.currentDirection !== 'up') {
      this.nextDirection = 'down';
    } else if (key === 'ArrowLeft' && this.currentDirection !== 'right') {
      this.nextDirection = 'left';
    }
  }

  checkDeath() {
    const { canvas, wall, blockSize } = this.config
    const snakeBlocks = this.blocks;
    const { x, y } = snakeBlocks[0];
    if (wall) {
      if (x < 0 || x === canvas.width / blockSize || y < 0 || y === canvas.height / blockSize) {
        return true;
      }
    }

    for (var i = 0; i < snakeBlocks.length; i++) {
      if (!wall) {
        if (snakeBlocks[i].x < 0) {
          snakeBlocks[i].x = snakeBlocks[i].x + (canvas.width / blockSize);
        }
        if (snakeBlocks[i].x === canvas.width / blockSize) {
          snakeBlocks[i].x = snakeBlocks[i].x - (canvas.width / blockSize);
        }
        if (snakeBlocks[i].y < 0) {
          snakeBlocks[i].y = snakeBlocks[i].y + (canvas.height / blockSize);
        }
        if (snakeBlocks[i].y === canvas.height / blockSize) {
          snakeBlocks[i].y = snakeBlocks[i].y - (canvas.height / blockSize);
        }
      }
      if (i !== 0 && x === snakeBlocks[i].x && y === snakeBlocks[i].y) {
        return true;
      }
    }

    return false;
  }

  /* snake needs to be skinny by one pixel on each side
  
  renderSnakeBlock
    block is initially skinny by one pixel on each side
    add 2 pixels behind it based on direction of block

  destroy tail
    based on direction of the new tail
    remove full width and height PLUS the 2 pixels

  on init
    create full snake
      on tail piece, don't add extra pixels behind
  */

  advanceHead() {
    this.renderSnakeBlock(this.blocks[0]);
  }

  advanceTail() {
    const { blockSize, screenColor, renderBlock } = this.config;
    const { x, y } = this.blocks.pop();
    renderBlock(x * blockSize - 1, y * blockSize - 1, blockSize + 2, blockSize + 2, screenColor);
  }

  renderSnakeBlock(snakeBlock) {
    let { left, top, width, height } = this.getSnakeBlockRect(snakeBlock);
    this.config.renderBlock(left, top, width, height, this.config.snakeColor);
  }

  getSnakeBlockRect({ x, y, direction }, isDestroy) {
    const { blockSize } = this.config
    let top = y * blockSize + 1,
      left = x * blockSize + 1,
      width = blockSize - 2,
      height = blockSize - 2;

  
    switch (direction) {
      case 'up': {
        height += 2;
        break;
      }
      case 'right': {
        left -= 2;
        width += 2;
        break;
      }
      case 'down':{
        top -= 2;
        height += 2;
        break;
      }
      //left
      default: {
        width += 2;
      }
    }

    return {
      left,
      top,
      width,
      height
    };
  }
}

export default Snake;