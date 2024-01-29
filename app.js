setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");
let playerScore = 0;
let computerScore = 0;

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win";
      resultDivs[0].classList.toggle("winner");
      playerScore += 1;
    } else if (aiWins) {
      resultText.innerText = "you lose";
      resultDivs[1].classList.toggle("winner");
      computerScore += 1;
    } else {
      resultText.innerText = "draw";
    }

    updateScore();

    if (playerScore === 3 || computerScore === 3) {
      endGame();
    } else {
      resultWinner.classList.toggle("hidden");
      resultsDiv.classList.toggle("show-winner");
      setTimeout(restartGame, 2000); // Starta om spelet efter 2 sekunder
    }
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function updateScore() {
  scoreNumber.innerText = `${playerScore} - ${computerScore}`;
}

function endGame() {
  if (playerScore === 3) {
    resultText.innerText = "You win the game!";
  } else {
    resultText.innerText = "Computer wins the game!";
  }

  playAgainBtn.style.display = "block";
  playAgainBtn.addEventListener("click", restartGame);
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  updateScore();

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");

  playAgainBtn.style.display = "none";
}

btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
