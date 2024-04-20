// variables
let computerWins = 0;
let playerWins = 0;
let history = new Array();

// Returns either "rock", "paper" or "scissors"
function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    switch (randomNumber) {
        case 1:
            return "rock";
        case 2:
            return "paper";
        case 3:
            return "scissors";
    }
}

// Plays a round of the game
function playRound(playerSelection, computerSelection) {

    let tie = (playerSelection == computerSelection);
    let playerWin;

    if (playerSelection == "rock") {
        switch (computerSelection) {
            case "paper":
                playerWin = false;
                break;
            case "scissors":
                playerWin = true;
                break;
        }
    }

    if (playerSelection == "paper") {
        switch (computerSelection) {
            case "rock":
                playerWin = true;
                break;
            case "scissors":
                playerWin = false;
                break;
        }
    }

    if (playerSelection == "scissors") {
        switch (computerSelection) {
            case "rock":
                playerWin = false;
                break;
            case "paper":
                playerWin = true;
                break;
        }
    }

    let result = playerWin ? `You win! ${playerSelection} beats ${computerSelection}` :
        `You lose! ${computerSelection} beats ${playerSelection}`;

    if (tie) {
        result = `You both went ${playerSelection}, that's a tie`;
    }

    const paragraphContainer = document.querySelector("#p-container");
    let computedResult = document.createElement("p");
    computedResult.classList += "computed-result";
    computedResult.textContent = result;

    history.push(computedResult);

    paragraphContainer.appendChild(history[history.length - 1]);

    console.log(result);
    return result;
}

// Getting the page size and setting the container's width and height
const container = document.querySelector(".container");
container.setAttribute("style", `width: ${window.innerWidth - 20}px; height: ${window.innerHeight - 250}px;`);


// Click events handled perfectly
const buttonContainer = document.querySelector(".button-container");
buttonContainer.addEventListener('click', (event) => {

    let computerChoice = getComputerChoice();
    const computerButton = document.querySelector("#computer");
    const score = document.querySelector(".score");

    let emoji;
    switch (computerChoice) {
        case "rock":
            emoji = "🪨";
            break;
        case "paper":
            emoji = "📄";
            break;
        case "scissors":
            emoji = "✂️";
            break;
    }
    computerButton.textContent = emoji;

    let result;

    switch (event.target.id) {
        case "rock":
            result = playRound("rock", computerChoice);
            break;
        case "paper":
            result = playRound("paper", computerChoice);
            break;
        case "scissors":
            result = playRound("scissors", computerChoice);
            break;
    }

    if (result != "") {

        if (result.slice(4, 5) == 'w') {
            playerWins++;
            score.textContent = `${playerWins}-${computerWins}`;
        } else if (result.slice(4, 5) == 'l') {
            computerWins++;
            score.textContent = `${playerWins}-${computerWins}`;
        } else {
            score.textContent = `${playerWins}-${computerWins}`;
        }
    }

    if (playerWins == 5 || computerWins == 5) {
        let endMessage;
        if (playerWins == 5) {
            endMessage = "You won the game!";
            const scoreSibling = document.createElement("p");
            scoreSibling.textContent = endMessage;
            score.appendChild(scoreSibling);
        } else if (computerWins == 5) {
            endMessage = "You lost the game!";
            const scoreSibling = document.createElement("p");
            scoreSibling.textContent = endMessage;
            score.appendChild(scoreSibling);
        }
        alert("The game is over");
        playerWins = 0;
        computerWins = 0;
        for (let i = 0; i < history.length; i++) {
            history[i].textContent = "";
        }
        history = new Array();
        setTimeout(() => {
            score.textContent = "0-0";
        }, 1500);
    }

    // container.setAttribute("style", "display: flex; justify-content: space-evenly;");
});



