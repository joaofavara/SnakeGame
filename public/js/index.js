const snake = {
  headX: 0,
  headY: 0,
  velocityX: 0,
  velocityY: 0,
  tail: 0,
  trail: [],
};

let canvas;
let context;
let fruit = randomFruitPosition();
const velocity = 20;
let gameOver = false;
var rect = {
  x: 150,
  y: 175,
  width: 200,
  height: 150,
};

function randomFruitPosition() {
  return {
    x: Math.floor(Math.random() * 25) * 20,
    y: Math.floor(Math.random() * 25) * 20,
  };
}

function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}
function isInside(pos, rect) {
  return (
    pos.x > rect.x &&
    pos.x < rect.x + rect.width &&
    pos.y < rect.y + rect.height &&
    pos.y > rect.y
  );
}

window.onload = init;

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  document.addEventListener('keydown', update);
  document.addEventListener('click', (event) => {
    console.log('event (click): ', event);
    var mousePos = getMousePos(canvas, event);

    if (isInside(mousePos, rect)) {
      window.location.reload();
    }
  });
  setInterval(gameLoop, 150);
}

function update(event) {
  switch (event.key) {
    case 'ArrowRight':
      snake.velocityX = velocity;
      snake.velocityY = 0;
      break;

    case 'ArrowLeft':
      snake.velocityX = -velocity;
      snake.velocityY = 0;
      break;

    case 'ArrowDown':
      snake.velocityX = 0;
      snake.velocityY = velocity;
      break;

    case 'ArrowUp':
      snake.velocityX = 0;
      snake.velocityY = -velocity;
      break;
  }
}

function gameLoop() {
  snake.headX += snake.velocityX;
  snake.headY += snake.velocityY;

  if (
    snake.headX < 0 ||
    snake.headX > 500 ||
    snake.headY < 0 ||
    snake.headY > 500
  ) {
    console.log('GameOver');
    gameOver = true;
  }

  if (!gameOver) {
    // Draw number to the screen
    context.fillStyle = 'black';
    context.fillRect(0, 0, 500, 500);

    context.fillStyle = 'red';
    context.fillRect(fruit.x, fruit.y, 20, 20);

    context.fillStyle = 'yellow';
    context.fillRect(snake.headX, snake.headY, 20, 20);

    for (var i = 0; i < snake.trail.length; i++) {
      context.fillStyle = 'green';
      context.fillRect(snake.trail[i].x, snake.trail[i].y, 20, 20);
      if (snake.trail[i].x == snake.headX && snake.trail[i].y == snake.headY) {
        snake.velocityX = snake.velocityY = 0;
        gameOver = true;
      }
    }

    snake.trail.push({ x: snake.headX, y: snake.headY });
    while (snake.trail.length > snake.tail) {
      snake.trail.shift();
    }

    if (fruit.x === snake.headX && fruit.y === snake.headY) {
      snake.tail++;
      fruit = randomFruitPosition();
    }
  } else {
    context.fillStyle = 'red';
    context.fillRect(150, 175, 200, 150);
    context.font = '25px Arial';
    context.fillStyle = 'white';
    context.fillText('GAME OVER', 175, 240);
    context.font = '18px Arial';
    context.fillText('Click here to restart', 175, 280);
  }

  const score = document.getElementById('score');
  score.innerHTML = `<span>${snake.tail}</span>`;
}
