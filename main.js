function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumbers(count, min, max) {
  const result = [];

  while (result.length < count) {
    const randomNumber = generateRandomNumber(min, max);
    if (!result.includes(randomNumber)) {
      result.push(randomNumber);
    }
  }

  return result;
}

function getBallColorClass(number) {
  let result = '';

  if (number >= 1 && number <= 10) {
    result = 'ball-color-yellow';
  } else if (number >= 11 && number <= 20) {
    result = 'ball-color-blue';
  } else if (number >= 21 && number <= 30) {
    result = 'ball-color-red';
  } else if (number >= 31 && number <= 40) {
    result = 'ball-color-grey';
  } else {
    result = 'ball-color-green';
  }

  return result;
}

const generateBtn = document.querySelector('.header > .row1 button.generate');
generateBtn.addEventListener('click', function (e) {
  emptyGameSection();
  renderGames();
});

function emptyGameSection() {
  document.querySelector('.section').replaceChildren();
}

function renderGames() {
  const gameCount = getGameCount();
  for (let i = 0; i < gameCount; i++) {
    renderGame();
  }
}

function getGameCount() {
  return document.querySelector('input[name=gameCount].active').dataset.game;
}

function renderGame() {
  const rowElement = document.createElement('div');
  rowElement.classList.add('row');
  rowElement.classList.add('m-2');
  rowElement.classList.add('mb-3');

  const randomNumbers = generateRandomNumbers(6, 1, 45);
  randomNumbers.sort((a, b) => a - b);

  randomNumbers.forEach((randomNumber) => {
    rowElement.appendChild(generateGameElement(randomNumber));
  });

  document.querySelector('.section').appendChild(rowElement);
}

function generateGameElement(randomNumber) {
  const result = document.createElement('div');
  result.classList.add('col-2');
  result.appendChild(generateBallElement(randomNumber));

  return result;
}

function generateBallElement(randomNumber) {
  const result = document.createElement('div');
  result.classList.add('ball');
  result.classList.add(getBallColorClass(randomNumber));
  result.innerText = randomNumber;

  return result;
}

const gameCountBtns = document.querySelectorAll(
  '.header > .row1 input[name=gameCount]'
);
gameCountBtns.forEach((gameCountBtn, _) => {
  gameCountBtn.addEventListener('click', (e) => {
    gameCountBtns.forEach((gameCountBtn, _) => {
      gameCountBtn.classList.remove('active');
    });
    e.target.classList.add('active');
  });
});

const miniGameBtns = document.querySelectorAll('.header > .row2 a.miniGame');
miniGameBtns.forEach((miniGameBtn, _) => {
  miniGameBtn.addEventListener('click', (e) => {
    emptyGameSection();

    switch (e.target.dataset.miniGame) {
      case 'miniGame1':
        miniGameCard();
        break;
      case 'miniGame2':
        miniGameShooting();
        break;
      case 'miniGame3':
        miniGameSixmog();
        break;
      default:
        throw '선택한 미니게임은 없습니다.';
    }
  });
});

function miniGameCard() {
  console.log('miniGameCard');
}
function miniGameShooting() {
  console.log('miniGameShooting');
}
function miniGameSixmog() {
  console.log('miniGameSixmog');
  /*
    게임 룰
    1.돌을 놓을 수 있는 빈 공간이 없을 때 게임이 종료.
    2.돌을 놓은 선수는 상대방의 돌을 자신의 돌로 둘러싸야 합니다. 이를 "뒤집기"라고 합니다.
    3.돌을 뒤집을 수 있는 조건은 다음과 같습니다:
      3.1 상대방의 돌이 내 돌로 둘러싸여 있는 직선 방향으로 돌을 놓을 수 있어야 합니다.
      3.2 둘러싸인 돌은 내 돌과 반대 색상입니다. 
          즉, 상대방의 돌은 흑돌이면 내 돌은 백돌이어야 하고, 상대방의 돌이 백돌이면 내 돌은 흑돌이어야 합니다.
      3.3 돌을 뒤집을 수 있는 직선 방향은 상, 하, 좌, 우, 대각선 4방향입니다.
      3.4 직선 방향으로 상대방의 돌이 없거나 내 돌로 둘러싸여 있지 않으면 돌을 뒤집을 수 없습니다.
    4.게임이 종료되면 돌의 개수가 많은 선수가 승리합니다. 돌의 개수가 같을 경우 비깁니다.
  */
  const sectionElement = document.querySelector('.section');

  const boardElement = document.createElement('div');
  boardElement.classList.add('board');

  const turnElement = document.createElement('div');
  turnElement.classList.add('turn');

  sectionElement.appendChild(boardElement);
  sectionElement.appendChild(turnElement);

  let winningRowsCols = [];
  const board = [
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'black', 'white', 'empty', 'empty'],
    ['empty', 'empty', 'white', 'black', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ];
  let currentPlayer = 'black';

  const renderBoard = () => {
    boardElement.innerHTML = '';
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', board[row][col]);
        cell.dataset.position = `${row}-${col}`;
        cell.addEventListener('click', () => placeStone(row, col));
        boardElement.appendChild(cell);
      }
    }
  };

  const placeStone = (row, col) => {
    if (board[row][col] !== 'empty') return;
    const stone = currentPlayer === 'black' ? 'black' : 'white';
    board[row][col] = stone;
    flipStones(row, col);
    renderBoard();

    if (checkWin(row, col)) {
      setTimeout(() => {
        const randomNumbers = generateRandomNumbers(6, 1, 45);
        const cells = document.querySelectorAll('.section > .board > .cell');
        cells.forEach((cell, _) => {
          const aaa = cell.dataset.position;
          winningRowsCols.forEach((item1, index1) => {
            const [row, col] = item1;
            const position = `${row}-${col}`;
            if (aaa == position) {
              const ballElement = generateBallElement(randomNumbers.shift());
              cell.appendChild(ballElement);
            }
          });
        });

        if (currentPlayer === 'black') {
          alert(`흑돌이 승리했습니다!`);
        } else {
          alert(`백돌이 승리했습니다!`);
        }

        // TODO: resetGame 버튼 활성화
        //resetGame();
      }, 100);
      return;
    }

    togglePlayer();
    updateTurn();
  };

  const flipStones = (row, col) => {
    const stone = currentPlayer === 'black' ? 'black' : 'white';
    const opponentStone = currentPlayer === 'black' ? 'white' : 'black';

    // Check in all eight directions
    const directions = [
      [-1, -1], // top-left
      [-1, 0], // top
      [-1, 1], // top-right
      [0, -1], // left
      [0, 1], // right
      [1, -1], // bottom-left
      [1, 0], // bottom
      [1, 1], // bottom-right
    ];

    for (const direction of directions) {
      const [dx, dy] = direction;
      let newRow = row + dx;
      let newCol = col + dy;
      let hasOpponentStone = false;

      while (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[newRow].length
      ) {
        if (board[newRow][newCol] === opponentStone) {
          hasOpponentStone = true;
        } else if (board[newRow][newCol] === stone) {
          if (hasOpponentStone) {
            let flipRow = row + dx;
            let flipCol = col + dy;

            while (flipRow !== newRow || flipCol !== newCol) {
              board[flipRow][flipCol] = stone;
              checkWin(flipRow, flipCol);
              flipRow += dx;
              flipCol += dy;
            }
          }
          break;
        } else {
          break;
        }

        newRow += dx;
        newCol += dy;
      }
    }
  };

  const togglePlayer = () => {
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
  };

  const updateTurn = () => {
    turnElement.textContent = `현재 차례: ${
      currentPlayer === 'black' ? '흑돌' : '백돌'
    }`;
  };

  const checkWin = (row, col) => {
    const stone = currentPlayer === 'black' ? 'black' : 'white';
    winningRowsCols.push([row, col]);
    // Check in all eight directions
    const directions = [
      [-1, -1], // top-left
      [-1, 0], // top
      [-1, 1], // top-right
      [0, -1], // left
      [0, 1], // right
      [1, -1], // bottom-left
      [1, 0], // bottom
      [1, 1], // bottom-right
    ];

    for (const direction of directions) {
      const [dx, dy] = direction;
      let count = 1;
      let newRow = row + dx;
      let newCol = col + dy;

      while (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[newRow].length
      ) {
        if (board[newRow][newCol] === stone) {
          count++;
          winningRowsCols.push([newRow, newCol]);
        } else {
          winningRowsCols = [[row, col]];
          break;
        }

        if (count >= 6) {
          return true;
        }

        newRow += dx;
        newCol += dy;
      }
    }

    return false;
  };

  const resetGame = () => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        board[row][col] = 'empty';
      }
    }

    board[2][2] = 'black';
    board[2][3] = 'white';
    board[3][2] = 'white';
    board[3][3] = 'black';

    currentPlayer = 'black';
    renderBoard();
    updateTurn();
  };

  renderBoard();
  updateTurn();
}

// 회차
// 당첨번호
// 보너스번호
// 1등당첨수
// 1등당첨금액
// 발표일

const gameResultBtn = document.querySelector('.header > .row2 .gameResult');
gameResultBtn.addEventListener('click', (e) => {
  const headerElement = document.createElement('div');
  headerElement.classList.add('row');

  const colElement = document.createElement('div');
  colElement.classList.add('col');
});
