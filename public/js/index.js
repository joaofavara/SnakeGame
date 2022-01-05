// import { SafeString } from 'hbs';

const board = Array(10)
  .fill(null)
  .map(() => Array(10).fill(0));

board[0][0] = 1;

const displayBoard = () => {
  console.log('displayBoard');
  let total = '';
  for (let j = 0; j < 10; j++) {
    let data = '<tr>';

    for (let i = 0; i < 10; i++) {
      if (board[j][i] === 1) {
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
  console.log('document: ', document);
  console.log('video: ', video);

  video.addEventListener('keydown', (event) => {
    const { key } = event;
    console.log(key);
    if (key === 'ArrowRight') {
      board[1][1] = 1;
      board[0][0] = 0;
      video.innerHTML = createBoard();
    }
  });
};
