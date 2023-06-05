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

// 생성 클릭 이벤트
const generateBtn = document.querySelector('.header > .row1 button.generate');
generateBtn.addEventListener('click', function (e) {
  showGenerateSpinner();

  emptySection();
  renderGames();

  hideGenerateSpinner();
});

function emptySection() {
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
  rowElement.classList.add('mb-2');

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

  const ballElement = document.createElement('div');
  ballElement.classList.add('p-2');
  ballElement.classList.add('ball');
  ballElement.classList.add(getBallColorClass(randomNumber));
  ballElement.innerText = randomNumber;

  result.appendChild(ballElement);

  return result;
}

// 생성 스피너 보이기
function showGenerateSpinner() {
  const generateText = document.querySelector('.header > .row1 .generateText');
  const generateSpinner = document.querySelector(
    '.header > .row1 .generateSpinner'
  );

  generateText.classList.add('hidden');
  generateSpinner.classList.remove('hidden');
}

// 생성 스피너 숨기기
function hideGenerateSpinner() {
  const generateText = document.querySelector('.header > .row1 .generateText');
  const generateSpinner = document.querySelector(
    '.header > .row1 .generateSpinner'
  );

  generateText.classList.remove('hidden');
  generateSpinner.classList.add('hidden');
}

// 게임버튼 active 토글 이벤트
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

// 게임으로뽑기 이벤트
const miniGameBtns = document.querySelectorAll('.header > .row2 a.miniGame');
miniGameBtns.forEach((miniGameBtn, _) => {
  miniGameBtn.addEventListener('click', (e) => {
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
  emptySection();
}
function miniGameShooting() {
  console.log('miniGameShooting');
  emptySection();
}
function miniGameSixmog() {
  console.log('miniGameSixmog');
  emptySection();

  const rowElement = document.createElement('div');
  rowElement.classList.add('row');
  const colElement = document.createElement('div');
  colElement.classList.add('col');

  rowElement.appendChild(colElement);

  document.querySelector('.section').appendChild(rowElement);
}

const gameResultBtn = document.querySelector('.header > .row2 .gameResult');
gameResultBtn.addEventListener('click', (e) => {
  flogJSONData();
});

async function logJSONData() {
  const response = await fetch(
    'https://dhlottery.co.kr/gameResult.do?method=byWin'
  );
  const jsonData = await response.json();
  console.log(jsonData);
}
