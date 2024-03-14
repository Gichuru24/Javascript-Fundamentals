'use strict';
const player0EL = document.querySelector(`.player--0`);
const player1EL = document.querySelector(`.player--1`);

const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0EL = document.getElementById(`current--0`);
const current1EL = document.getElementById(`current--1`);
const diceEL = document.querySelector(`.hidden`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let scores, currentScore, activePlayer, playing;

//Starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEL.classList.add(`hidden`);

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

const newGame = function () {
  //   score0El.textContent = 0;
  // score1El.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEL.classList.add(`hidden`);
  player0EL.classList.remove(`player--winner`);
  player1EL.classList.remove(`player--winner`);
  player0EL.classList.add(`player--active`);
  player1EL.classList.remove(`player--active`);
};
newGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle(`player--active`);
  player1EL.classList.toggle(`player--active`);
};
// rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //1. Generate a random dice roll (1-6)
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the dice (image) - remove the hidden class
    diceEL.classList.remove(`hidden`);
    diceEL.src = `dice-${dice}.png`;
    //3. check to see if the roll is 1
    if (dice !== 1) {
      //Add the dice to the current score
      //currentScore = currentScore + dice; //same as below
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      current0EL.textContent = currentScore;
    } else {
      //4. if true switch to next player (we need to know which player is playing)
      switchPlayer();
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // player0EL.classList.toggle(`player--active`);
      // player1EL.classList.toggle(`player--active`);
    }
  }
});
btnHold.addEventListener(`click`, function () {
  if (playing) {
    // console.log(`hold button`);
    //1.Add currentscore to active player score
    //check if player score is 100. if 100 player wins. if not switch to next player
    scores[activePlayer] += currentScore;
    // console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEL.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener(`click`, newGame);
// playing = true;
// current0EL.textContent = 0;
// current1EL.textContent = 0;
// score0El.textContent = 0;
// score1El.textContent = 0;
// player0EL.classList.remove(`player--winner`);
// player0EL.classList.remove(`player--winner`);
// player0EL.classList.add(`player--active`);
// player1EL.classList.remove(`player--active`);
