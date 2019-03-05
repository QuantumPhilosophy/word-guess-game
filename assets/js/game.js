'use strict';

let secretWords = ['calm', 'blackout', 'death', 'laconism', 'sulk', 'gag', 'mute', 'quash', 'squelch', 'dampen'];
let currentWord = getRandomWord(secretWords);

let gameBoardElement = document.getElementById('game-board');
let winsElement = document.getElementById('wins');
let guessesRemainingElement = document.getElementById('guesses-remaining');
let lettersGuessedElement = document.getElementById('letters-guessed');

let wins = 0;
let guessesRemaining = 10;
let lettersGuessed = [];
let correctAnswerCount = 0;

winsElement.textContent = wins;
guessesRemainingElement.textContent = guessesRemaining;

document.onkeyup = function (event) {
  let userInput = event.key;
  const regex = /[a-zA-Z]/;

  if (userInput.match(regex)) {
    if (currentWord.indexOf(userInput) < 0) {
      lettersGuessed.push(userInput);
      lettersGuessedElement.textContent = lettersGuessed;
      guessesRemaining--;
      guessesRemainingElement.textContent = guessesRemaining;

      if (guessesRemaining <= 0) {
        setupBoard(currentWord);
      }
    } else {
      for (let i = 0; i < currentWord.length; i++) {
        if (userInput === currentWord[i]) {
          correctAnswerCount++;
          const secretWordElement = document.getElementById(`${i}`);
          secretWordElement.innerHTML = userInput;
        }
      }

      if (correctAnswerCount === currentWord.length) {
        wins++;
        winsElement.textContent = wins;
        setupBoard(currentWord);
      }
    }
  }
};

function getRandomWord(array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))]
}

function setupBoard() {
  guessesRemaining = 10;
  lettersGuessed = [];
  correctAnswerCount = 0;
  currentWord = getRandomWord(secretWords);
  lettersGuessedElement.textContent = lettersGuessed;
  guessesRemainingElement.textContent = guessesRemaining;

  const secretWordElements = document.getElementsByClassName('secretWordLetters');

  if (gameBoardElement.hasChildNodes()) {
    while(secretWordElements.length > 0) {
      secretWordElements[0].parentNode.removeChild(secretWordElements[0]);
    }
  }

  for (let i = 0; i < currentWord.length; i++) {
    let newSpan = document.createElement('span');
    newSpan.className = 'mx-2 secretWordLetters';
    newSpan.id = `${i}`;
    let newSpanText = document.createTextNode('_');
    newSpan.appendChild(newSpanText);
    gameBoardElement.appendChild(newSpan);
  }
}

setupBoard();
