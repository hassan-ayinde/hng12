// Select elements
const gameStatus = document.querySelector("[data-testid='gameStatus']");
const colorBox = document.querySelector("[data-testid='colorBox']");
const colorOptionsContainer = document.querySelectorAll(".color-options button");
const scoreDisplay = document.querySelector("[data-testid='score']");
const newGameButton = document.querySelector("[data-testid='newGameButton']");
const startGameButton = document.getElementById("startGameButton");
const gameInstructions = document.querySelector("[data-testid='gameInstructions']");
const game = document.querySelector(".game");
const guessNumber = document.querySelector("#guessNumber");


const targetStyles = window.getComputedStyle(colorBox);
let optionStyles;


const targetColor = colorBox.style.backgroundColor;
let score = 0;
let guess = 3;




startGameButton.addEventListener("click", () => {
    // game.classList.remove("hidden");
    // // game.classList.add("visible");
    // gameInstructions.classList.add("hidden");
});

function startGame() {
    // Pick a random target color
    colorOptionsContainer.forEach(colorOption => {
        colorOption.addEventListener("click", () => {
            optionStyles = window.getComputedStyle(colorOption);
            checkGuess(optionStyles);
        });
    })
}

startGame();


function checkGuess(selectedColor) {
    

    if(optionStyles.backgroundColor === targetStyles.backgroundColor) {
        gameStatus.textContent = "✅ Correct!";
        gameStatus.style.color = "green";
        score++;
        scoreDisplay.textContent = score;
    } else {
        gameStatus.textContent = "❌ Wrong! Try again.";
        gameStatus.style.color = "red";
        guess--;
        if(guess <= 0){
            alert('game over')
            guess = 0;
        }
        guessNumber.textContent = guess;
    }
}