// Select elements
const gameStatus = document.querySelector("[data-testid='gameStatus']");
const colorBox = document.querySelector("[data-testid='colorBox']");
const colorOptionsContainer = document.getElementById("colorOptions");
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
}


// Function to get a random color category
function getRandomColorCategory() {
    const colorKeys = Object.keys(colors);
    return colorKeys[Math.floor(Math.random() * colorKeys.length)];
}

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
}

// Function to check user's guess
function checkGuess(selectedBtnColor, targetBoxColor) {
    if (selectedBtnColor === targetBoxColor && guess > 0) {
        gameStatus.textContent = "✅ Correct!";
        gameStatus.style.color = "green";
        score++;
        scoreDisplay.textContent = score;
        startGame();
    } else {
        gameStatus.textContent = "❌ Wrong! Try again.";
        gameStatus.style.color = "red";
        guess--;
        
        if(guess <= 0){
            guess = 0;
            gameOver();
        }
        
        guessNumber.textContent = guess;
    }
}