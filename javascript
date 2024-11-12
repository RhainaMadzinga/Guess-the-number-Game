document.addEventListener('DOMContentLoaded', function () {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const startButton = document.getElementById('startButton');
    const gameContainer = document.getElementById('gameContainer');
    const maxNumberDisplay = document.getElementById('maxNumber');
    const userGuessInput = document.getElementById('userGuess');
    const checkButton = document.getElementById('checkButton');
    const guessesLeftDisplay = document.getElementById('guessesLeft');
    const guessList = document.getElementById('guessList');
    let maxGuesses;
  
    let randomNumber;
    let guessesLeft;
  
    radioButtons.forEach(radioButton => {
      radioButton.addEventListener('change', function () {
        const selectedRange = parseInt(this.value);
        randomNumber = Math.floor(Math.random() * selectedRange) + 1;
        maxGuesses = getMaxGuesses(selectedRange);
        guessesLeft = maxGuesses;
  
        maxNumberDisplay.textContent = selectedRange;
        guessesLeftDisplay.textContent = guessesLeft;
  
        startButton.disabled = false;
      });
    });
  
    startButton.addEventListener('click', function () {
      gameContainer.style.display = 'block';
      startButton.disabled = true;
    });
  
    checkButton.addEventListener('click', function () {
      const userGuess = parseInt(userGuessInput.value);
      if (!isNaN(userGuess) && userGuess >= 1 && userGuess <= parseInt(maxNumberDisplay.textContent)) {
        guessesLeft--;
  
        const guessResult = compareGuess(userGuess);
        displayGuessResult(userGuess, guessResult);
  
        guessesLeftDisplay.textContent = guessesLeft;
  
        if (guessResult === 0 || guessesLeft === 0) {
          endGame(guessResult);
        }
      } else {
        alert('Please enter a valid number between 1 and ' + maxNumberDisplay.textContent + '.');
      }
      userGuessInput.value = ''; 
    });
  
    function getMaxGuesses(range) {
      switch (range) {
        case 10:
          return 3;
        case 100:
          return 7;
        case 1000:
          return 10;
        default:
          return 5;
      }
    }
  
    function compareGuess(guess) {
      if (guess === randomNumber) {
        return 0; 
      } else if (guess < randomNumber) {
        return -1; 
      } else {
        return 1; 
      }
    }
  
    function displayGuessResult(guess, result) {
      let resultText;
      let resultColor;
      if (result === 0) {
        resultText = 'Correct. Well done!';
        resultColor = 'green';
      } else if (result === -1) {
        resultText = 'Too low. Try again!';
        resultColor = 'red';
      } else {
        resultText = 'Too high. Try again!';
        resultColor = 'red';
      }
      const guessItem = document.createElement('li');
      guessItem.textContent = `Guess ${guess}: ${resultText}`;
      guessItem.style.color = resultColor;
      guessList.appendChild(guessItem);
    }
  
    function endGame(result) {
      gameContainer.style.display = 'none';
      let message;
      if (result === 0) {
        message = `Well done! The number is correct.`;
      } else {
        message = `Your answers were wrong. The number was ${randomNumber}.`;
      }
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `
        <div class="modal-content">
          <p>${message}</p>
          <button id="playAgainButton">Play again</button>
        </div>
      `;
      document.body.appendChild(modal);
      const playAgainButton = document.getElementById('playAgainButton');
      playAgainButton.addEventListener('click', function () {
        location.reload();
      });
    }
  });
  
  
