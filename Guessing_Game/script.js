// Select elements
const gameStatus = document.querySelector("[data-testid='gameStatus']");
const colorBox = document.querySelector("[data-testid='colorBox']");
const colorOptionsContainer = document.getElementById("colorOptions");
const scoreDisplay = document.querySelector("[data-testid='score']");
const newGameButton = document.querySelector("[data-testid='newGameButton']");
const startGameButton = document.getElementById("startGameButton");
const gameInstructions = document.querySelector("[data-testid='gameInstructions']");
const guessNumber = document.querySelector("#guessNumber");
const game = document.querySelector(".game");
const modal = document.getElementById("modal");
const finalScoreDisplay = document.querySelector("[data-testid='finalScore']");
const playAgainButton = document.getElementById("playAgainButton");
const quitGameButton = document.getElementById("quitGameButton");
const closeButton = document.querySelector(".close-btn");

let score = 0;
let guess = 3;

const colors = {
    gray: ["#F5F5F5", "#DCDCDC", "#BEBEBE", "#A9A9A9", "#808080", "#696969"],
    pink: ["#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#DB7093", "#C71585"],
    orange: ["#FFA500", "#FF8C00", "#FF7F50", "#FF6347", "#FF4500", "#E65100"],
    purple: ["#E6E6FA", "#D8BFD8", "#DDA0DD", "#BA55D3", "#9932CC", "#800080"],
    green: ["#98FB98", "#90EE90", "#32CD32", "#008000", "#006400", "#004D00"],
    gold: ["#FFD700", "#FFC125", "#EEC900", "#DAA520", "#B8860B", "#8B6508"],
    red: ["#FF0000", "#DC143C", "#B22222", "#8B0000", "#A52A2A", "#800000"],
    black: ["#000000", "#1C1C1C", "#363636", "#4F4F4F", "#696969", "#808080"],
    blue: ["#ADD8E6", "#87CEEB", "#4682B4", "#1E90FF", "#0000FF", "#00008B"],
    violet: ["#EE82EE", "#DA70D6", "#D87093", "#C71585", "#9400D3", "#800080"]
};

// Function to get a random color category
function getRandomColorCategory() {
    const colorKeys = Object.keys(colors);
    return colorKeys[Math.floor(Math.random() * colorKeys.length)];
}

function scoreIncrement() {}

// Function to start the game
function startGame() {
    // Reset the guess count
    guessNumber.textContent = guess;
    
    // Pick a random color category
    const selectedColor = getRandomColorCategory();
    const shades = colors[selectedColor];

    // Set the target color
    const targetShade = shades[Math.floor(Math.random() * shades.length)];
    colorBox.style.backgroundColor = targetShade;

    // Clear previous options
    colorOptionsContainer.innerHTML = "";

    // Shuffle colors and create buttons
    const shuffledShades = [...shades].sort(() => Math.random() - 0.5);
    shuffledShades.forEach((shade) => {
        const button = document.createElement("button");
        button.classList.add("colorOption");
        button.style.backgroundColor = shade;
        button.setAttribute("data-testid", "colorOption");
        
        // Click event to check guess
        button.addEventListener("click", () => checkGuess(shade, targetShade));
        
        colorOptionsContainer.appendChild(button);
    });

    gameStatus.textContent = "Pick a color!";
    gameStatus.style.color = "black";
}

// Function to check user's guess
function checkGuess(selectedBtnColor, targetBoxColor) {
    if (selectedBtnColor === targetBoxColor && guess > 0) {
        gameStatus.textContent = "✅ Correct! 🎈";
        gameStatus.style.color = "green";

        // Add the celebration animation
        gameStatus.classList.add("celebrate");

        // Remove the animation after it plays to allow re-triggering
        setTimeout(() => {
            gameStatus.classList.remove("celebrate");
            startGame(); // Start next round after celebration
        }, 1000); // Show message & animation for 1 second

        score++;
        scoreDisplay.textContent = score;
    } else {
        gameStatus.textContent = "❌ Wrong! Try again.";
        gameStatus.style.color = "red";
        
        // Remove and re-add fadeIn class to restart animation
        gameStatus.classList.remove("fadeIn");
        void gameStatus.offsetWidth; // Forces reflow
        gameStatus.classList.add("fadeIn");

        guess--;

        if (guess <= 0) {
            guess = 0;
            gameOver();
        }

        guessNumber.textContent = guess;
    }
}




// Function to show modal
function showModal(score) {
    finalScoreDisplay.textContent = score; // Update score in modal
    modal.style.display = "block";
}

// Function to hide modal
function closeModal() {
    modal.style.display = "none";
}

// Show modal when the game is over
function gameOver() {
    showModal(score); // Show the modal with the final score
}

// Restart the game when "Play Again" is clicked
playAgainButton.addEventListener("click", () => {
    guess = 3; // Reset guess count
    score = 0; // Reset score
    scoreDisplay.textContent = score;
    guessNumber.textContent = guess;
    closeModal(); // Hide modal
    startGame(); // Start new game round
});

// Quit the game when "Quit Game" is clicked
quitGameButton.addEventListener("click", () => {
    closeModal();
    game.classList.add("hidden");
    gameInstructions.classList.remove("hidden");

    guess = 3;
    score = 0;
    scoreDisplay.textContent = score;
    guessNumber.textContent = guess;
});

// Close modal when ❌ button is clicked
closeButton.addEventListener("click", closeModal);

// Start game when the start button is clicked
startGameButton.addEventListener("click", () => {
    game.classList.remove("hidden");
    gameInstructions.classList.add("hidden");
    startGame();
});

// Restart game when the "New Game" button is clicked
newGameButton.addEventListener("click", () => {
    guess = 3;
    score = 0;
    scoreDisplay.textContent = score;
    guessNumber.textContent = guess;
    startGame();
});
