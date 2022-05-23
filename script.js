'use strict';

// Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let gameWorking, scores, activePlayer, currentScore;

const intials = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  gameWorking = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  document.querySelector(`#name--0`).textContent = `Player 1`;
  document.querySelector(`#name--1`).textContent = `Player 2`;
  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
intials();

const keyButtons = function (e) {
  console.log(e);
  if (e.key === '-') {
    hold();
  } else if (e.key === '+') {
    roll();
  }
};
// Switching players function

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const hold = function () {
  if (gameWorking) {
    //1-Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2-Check if player's score is => 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      gameWorking = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      document.querySelector(`#name--${activePlayer}`).textContent =
        '😍WINNER!';
    } else {
      //Switch to other player
      switchPlayer();
    }
  }
};
// Hold button Functionality

btnHold.addEventListener('click', hold);

//Roll Button Function
const roll = function () {
  if (gameWorking) {
    //1. Generating a random dice roll
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice number
    diceEl.src = `dice-${randomDice}.png`;
    diceEl.classList.remove('hidden');

    //3. Check if Dice = 1, Switch to next player
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //change later
    } else {
      switchPlayer();
      // Switching next player
    }
  }
};

btnRoll.addEventListener('click', roll);
// New game button funtion
document.addEventListener('keydown', keyButtons);
btnNew.addEventListener('click', function () {
  intials();
});

// Using Keyboard Buttons to roll and hold
