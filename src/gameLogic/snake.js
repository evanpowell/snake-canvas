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
    let snakeBlock;
    for (let i = 4; i >= 0; i--) {
      snakeBlock = new SnakeBlock(i, 15, 'right');
      this.blocks.push(snakeBlock);
      this.renderSnakeBlock(snakeBlock);
    }
    this.config.renderBlock({
      left: 0,
      top: 15 * this.blockSize,
      width: 1,
      height: this.blockSize
    }, this.screenColor);
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

  advanceHead() {
    this.renderSnakeBlock(this.blocks[0]);
  }

  advanceTail() {
    const { blockSize, screenColor, renderBlock } = this.config;
    const { x, y } = this.blocks.pop();
    renderBlock({
      left: x * blockSize - 1,
      top: y * blockSize - 1,
      width: blockSize + 2,
      height: blockSize + 2
    }, screenColor);
  }

  renderSnakeBlock(snakeBlock, color = this.config.snakeColor) {
    this.config.renderBlock(this.getSnakeBlockRect(snakeBlock), color);
  }

  getSnakeBlockRect({ x, y, direction }) {
    const { blockSize } = this.config;
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