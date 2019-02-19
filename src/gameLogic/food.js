class Food {
  constructor(config) {
    this.config = config;
    this.x = 0;
    this.y = 0;
    this.place();
  }

  place() {
    const { canvas, blockSize, snakeBlocks, checkBlock, renderBlock, foodColor } = this.config;
    const x = Math.floor(Math.random() * ((canvas.width / blockSize) - 1));
    const y = Math.floor(Math.random() * ((canvas.height / blockSize) - 1));
    for (var i = 0; i < snakeBlocks.length; i++) {
      if (checkBlock(x, y, snakeBlocks[i].x, snakeBlocks[i].y)) {
        this.place();
        return;
      }
    }
    this.destroy();
    this.x = x;
    this.y = y;
    renderBlock(x * blockSize + 1, y * blockSize + 1, blockSize - 2, blockSize - 2, foodColor);
  }

  getFoodRect() {
    const { blockSize } = this.config;
    return {
      left: this.x * blockSize + 1,
      top: this.y * blockSize + 1,
      width: blockSize - 2,
      height: blockSize - 2
    }
  }

  destroy() {
    const { blockSize, renderBlock, screenColor } = this.config;
    renderBlock(this.x * blockSize + 1, this.y * blockSize + 1, blockSize - 2, blockSize - 2, screenColor);
  }
}

export default Food;
