//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);
    attempts = 0;

    //hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";

    //showing the Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); //focus the textbox
    playerGuess.value = ""; //clear the textbox;

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; //clear the feedback

    document.querySelector("#guesses").textContent = ""; // clear previous guesses

    // reset table colors and fonts
    document.querySelector("#gamesLost").style.color = "black";
    document.querySelector("#lossColumn").style.background = "ghostwhite";
    document.querySelector("#gamesLost").style.fontWeight = "normal";
    document.querySelector("#gamesWon").style.color = "black";
    document.querySelector("#winColumn").style.background = "ghostwhite";
    document.querySelector("#gamesWon").style.fontWeight = "normal";

    document.querySelector("#remaining").textContent = 7 - attempts;
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);

    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    console.log("Attempts: " + attempts);
    document.querySelector("#remaining").textContent = 7 - attempts;
    feedback.style.color = "orange";

    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";
        wins++;
        document.querySelector("#gamesWon").textContent = wins;
        document.querySelector("#gamesWon").style.color = "darkgreen";
        document.querySelector("#gamesWon").style.fontWeight = "bolder";
        document.querySelector("#winColumn").style.background = "green";
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";

        playerGuess.focus(); //focus the textbox
        playerGuess.value = ""; //clear the textbox;

        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! The number was: " + randomNumber;
            feedback.style.color = "red";
            losses++;
            document.querySelector("#gamesLost").textContent = losses;
            document.querySelector("#gamesLost").style.fontWeight = "bolder";
            document.querySelector("#gamesLost").style.color = "red";
            document.querySelector("#lossColumn").style.background = "red";
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; // hides guess button
    resetBtn.style.display = "inline"; // displayes reset button
}