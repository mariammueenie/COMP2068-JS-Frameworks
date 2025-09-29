// LAB02 - Rock, Paper, Scissors Game

// Step 1: Start game.
var prompt = require('prompt');
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

    // Retrieve userSelection and ComputerChoice

    // Print userSelection and ComputerChoice using console.log()

    // Compare userSelection with ComputerChoise to determine winner, and display results.
});




