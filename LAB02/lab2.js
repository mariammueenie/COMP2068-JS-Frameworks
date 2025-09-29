// LAB02 - Rock, Paper, Scissors Game

// Step 1: Start game.
const prompt = require('prompt');
prompt.start();

// Step 2: Generate computer choice using Math.random()
    // where; 
    // 0.00-0.34 = PAPER
    // 0.35-0.67 = SCISSORS
    // 0.68-1.00 = ROCK
function getComputerChoice() {
    const randomNum = Math.random(); // generated random number between 0-1

    // determine computer choice based on random number
    if (randomNum <= 0.34) {
        return 'paper';
    } else if (randomNum <= 0.67) {
        return 'scissors';
    } else {
        return 'rock';
    }
}

// Step 3: Ask user for their input, using prompt().
// Get user to choose between rock, paper, or scissors
// Response will be stored as userSelection 
// makes it so that user can only choose rock, paper, or scissors
prompt.get([{
    name: 'userSelection',
    description: 'Choose rock, paper, or scissors',
    pattern: /^(rock|paper|scissors)$/i,
    message: 'Input must be rock, paper, or scissors',
    required: true
}], function (err, result) {
    if (err) {
        console.error(err);
        return;
    }

    // Step 4: Retrieve userSelection and ComputerChoice
    const userSelection = result.userSelection.toLowerCase(); // convert to lowercase
    const computerSelection = getComputerChoice();

    // Step 5: Print userSelection and ComputerChoice using console.log()
    // Debug ref: https://stackoverflow.com/questions/64552472/what-determines-whether-node-prints-object-object-or-a-full-object
    console.log(`You chose: ${userSelection}`);
    console.log(`Computer chose: ${computerSelection}`);

    // Step 6: Compare userSelection with ComputerChoice to determine winner, and display results.
    // using if, else if, else statements to determine winner

    // Tie in this condition.
    if (userSelection === computerSelection) {
        console.log("It's a tie!");

    // User wins in these conditions.
    } else if (
        (userSelection === 'rock' && computerSelection === 'scissors') ||
        (userSelection === 'paper' && computerSelection === 'rock') ||
        (userSelection === 'scissors' && computerSelection === 'paper')     
    ) {
        console.log("User wins!");

    // Computer wins in all other conditions.
    } else {
        console.log("Computer wins!");
    }
});




