<template>
  <div class="snake-game" @keydown="handleKeyDown" tabindex="0">
    <canvas ref="canvas" class="game-canvas" width="400" height="400"></canvas>
  </div>
</template>


<script>
export default {
  data() {
    return {
      delay: 100,
      score: 0
    };
  },
  mounted() {
    this.initGame();
    this.$refs.canvas.focus();
  },
  methods: {
    initGame() {
      this.canvas = this.$refs.canvas;
      this.context = this.canvas.getContext('2d');
      this.scale = 20;
      this.rows = this.canvas.height / this.scale;
      this.columns = this.canvas.width / this.scale;
      this.snake = new Snake(this.scale, this.context);
      this.food = new Food(this.scale, this.columns, this.rows, this.context);
      this.score = 0;

      this.draw();
    },
    draw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.snake.update();
      this.food.draw();

      if (this.snake.eat(this.food)) {
        this.score++;
        this.food.update(this.columns, this.rows);
      }

      this.snake.draw();

      if (this.snake.checkCollision(this.columns, this.rows)) {
        this.gameOver();
      } else {
        setTimeout(this.draw, this.delay);
      }
    },
    gameOver() {
      alert('Game over! Your score is ' + this.score);
      this.initGame();
    },
    handleKeyDown(event) {
      const key = event.key;
      if (key === 'ArrowUp' || key === 'w') {
        this.snake.changeDirection('up');
      } else if (key === 'ArrowDown' || key === 's') {
        this.snake.changeDirection('down');
      } else if (key === 'ArrowLeft' || key === 'a') {
        this.snake.changeDirection('left');
      } else if (key === 'ArrowRight' || key === 'd') {
        this.snake.changeDirection('right');
      }
    }
  }
};

class Snake {
  constructor(scale, context) {
    this.scale = scale;
    this.context = context;
    this.xSpeed = scale;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    this.head = { x: 0, y: 0 };
  }

  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    if (this.total > 0) {
      this.tail[this.total - 1] = { x: this.head.x, y: this.head.y };
    }

    this.head.x += this.xSpeed;
    this.head.y += this.ySpeed;
  }

  draw() {
    this.tail.forEach(segment => {
      this.drawSegment(segment.x, segment.y);
    });

    this.drawSegment(this.head.x, this.head.y);
  }

  drawSegment(x, y) {
    const ctx = this.context;
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, this.scale, this.scale);
  }

  checkCollision(columns, rows) {
    if (
        this.head.x < 0 ||
        this.head.x >= columns * this.scale ||
        this.head.y < 0 ||
        this.head.y >= rows * this.scale
    ) {
      return true;
    }

    for (let i = 0; i < this.tail.length; i++) {
      if (this.head.x === this.tail[i].x && this.head.y === this.tail[i].y) {
        return true;
      }
    }

    return false;
  }

  eat(food) {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.total++;
      return true;
    }

    return false;
  }

  changeDirection(direction) {
    if (direction === 'up' && this.ySpeed !== this.scale) {
      this.xSpeed = 0;
      this.ySpeed = -this.scale;
    }
    if (direction === 'down' && this.ySpeed !== -this.scale) {
      this.xSpeed = 0;
      this.ySpeed = this.scale;
    }
    if (direction === 'left' && this.xSpeed !== this.scale) {
      this.xSpeed = -this.scale;
      this.ySpeed = 0;
    }
    if (direction === 'right' && this.xSpeed !== -this.scale) {
      this.xSpeed = this.scale;
      this.ySpeed = 0;
    }
  }
}

class Food {
  constructor(scale, columns, rows, context) {
    this.scale = scale;
    this.columns = columns;
    this.rows = rows;
    this.context = context;
    this.update();
  }

  draw() {
    const ctx = this.context;
    ctx.fillStyle = '#f00';
    ctx.fillRect(this.x, this.y, this.scale, this.scale);
  }

  update() {
    this.x = Math.floor(Math.random() * this.columns) * this.scale;
    this.y = Math.floor(Math.random() * this.rows) * this.scale;
  }
}
</script>

<style>
.snake-game {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.game-canvas {
  border: 1px solid #000;
}
</style>

