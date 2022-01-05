// import { SafeString } from 'hbs';
const snake = {
  x: 0,
  y: 0,
};

const board = Array(10)
  .fill(null)
  .map(() => Array(10).fill(0));

board[snake.x][snake.y] = 1;

const displayBoard = () => {
  const { x, y } = snake;
  let total = '';
  for (let j = 0; j < 10; j++) {
    let data = '<tr>';

    for (let i = 0; i < 10; i++) {
      if (board[j][i] === 1 && j === y && i === x) {
        data += `<td class="snake"></td>`;
      } else {
        data += `<td></td>`;
      }
    }
    data += `</tr>`;
    total += data;
  }
  return total;
};

function createBoard() {
  return `<table id="board" cellspacing="0">
    ${displayBoard()}
  </table>`;
}

window.onload = function () {
  const video = document.body;
  video.innerHTML = createBoard();

  video.addEventListener('keydown', (event) => {
    const { key } = event;

    switch (key) {
      case 'ArrowRight':
        if (snake.x + 1 < 10) {
          board[snake.y][snake.x] = 0;
          snake.x += 1;
          board[snake.y][snake.x] = 1;
          video.innerHTML = createBoard();
        }
        break;
      case 'ArrowLeft':
        if (snake.x - 1 >= 0) {
          board[snake.y][snake.x] = 0;
          snake.x -= 1;
          board[snake.y][snake.x] = 1;
          video.innerHTML = createBoard();
        }
        break;
      case 'ArrowDown':
        if (snake.y + 1 < 10) {
          board[snake.y][snake.x] = 0;
          snake.y += 1;
          board[snake.y][snake.x] = 1;
          video.innerHTML = createBoard();
        }
        break;
      case 'ArrowUp':
        if (snake.y - 1 >= 0) {
          board[snake.y][snake.x] = 0;
          snake.y -= 1;
          board[snake.y][snake.x] = 1;
          video.innerHTML = createBoard();
        }
        break;
    }
  });
};
