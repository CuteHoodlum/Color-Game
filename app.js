// Get elements from the DOM
const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");
const loader = document.getElementById("loader");
const gameContainer = document.getElementById("game-container");

let score = 0;
let targetColor = "";
let colorOptions = [];
let correctGuesses = 0; // Track consecutive correct guesses
let prankTriggered = false; // Flag to track if the prank has been triggered

// Predefined color set
const colorSet = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFFF33", "#33FFF5"
];

// Function to generate a random color from the color set
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colorSet.length);
  return colorSet[randomIndex];
}

// Function to set up a new game
function newGame() {
  prankTriggered = false; // Reset the prank flag for new game
  gameStatus.textContent = "";
  colorOptionsContainer.innerHTML = ""; // Clear color options
  targetColor = getRandomColor(); // Set a new target color
  colorBox.style.backgroundColor = targetColor; // Show target color

  // Generate random color options
  colorOptions = [targetColor];
  while (colorOptions.length < 6) {
    const randomColor = getRandomColor();
    if (!colorOptions.includes(randomColor)) {
      colorOptions.push(randomColor);
    }
  }

  // Shuffle the color options
  colorOptions = colorOptions.sort(() => Math.random() - 0.5);

  // Create buttons for each color option
  colorOptions.forEach(color => {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.dataset.color = color;
    button.dataset.testid = "colorOption";
    button.addEventListener("click", handleColorClick);
    colorOptionsContainer.appendChild(button);
  });

  // Reset score display
  scoreDisplay.textContent = "Score: " + score;
}

// Function to handle color option click
function handleColorClick(event) {
  const selectedColor = event.target.dataset.color;

  if (correctGuesses === 2 && !prankTriggered) {
    // Trigger the prank on the third correct guess
    prankTriggered = true; // Prevent prank from being triggered again

    gameStatus.textContent = "Wrong!"; // Initial "wrong" message
    gameStatus.style.color = "red";
    
    // After a short delay, show the prank message
    setTimeout(() => {
      gameStatus.textContent = "Yo Yo I'm kidding!"; // Show prank message
      gameStatus.style.color = "orange";

      // Check if the selected color was correct (this is after the prank)
      if (selectedColor === targetColor) {
        score++; // Increment score for the correct guess after the prank
      }

      correctGuesses = 0; // Reset consecutive correct guesses
      setTimeout(newGame, 2000); // Start a new game after a short delay
    }, 1000); // Delay before prank message
    return; // Prevent the normal logic from executing
  }

  if (selectedColor === targetColor) {
    correctGuesses++;
    score++;
    gameStatus.textContent = "Correct!";
    gameStatus.style.color = "green";
  } else {
    score = Math.max(0, score - 1);
    gameStatus.textContent = "Wrong! Try again.";
    gameStatus.style.color = "red";
    correctGuesses = 0; // Reset consecutive correct guesses after a wrong answer
  }

  scoreDisplay.textContent = "Score: " + score;
  setTimeout(newGame, 1000); // Start a new game after 1 second
}

// Add event listener to New Game button
newGameButton.addEventListener("click", newGame);

// Start the game after a short delay to show the loader
window.onload = () => {
  setTimeout(() => {
    loader.style.display = "none";
    gameContainer.classList.remove("hidden");
    newGame();
  }, 2000); // Show loader for 2 seconds
};
