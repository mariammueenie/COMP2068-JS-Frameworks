// start game
var prompt = require('prompt');
prompt.start();

// Instruction #3
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
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('You chose: ' + result.userSelection);
});

// Instruction #4
// Generate computer choice using Math.random(), 
// where 0.00-0.34 = PAPER
// 0.35-0.67 = SCISSORS
// 0.68-1.00 = ROCK
function getComputerChoice() {
    const randomNum = Math.random(); // generated random number between 0-1

    // determine computer choice based on random number
    if (randomNum < 0.34) {
        return 'paper';
    } else if (randomNum <= 0.67) {
        return 'scissors';
    } else {
        return 'rock';
    }
}

// Instruction #5
// Display userSelection and computerSelection using console.log()
const computerSelection = getComputerChoice();
console.log('Computer chose: ' + computerSelection);
const userSelection = result.userSelection.toLowerCase(); // convert user input to lowercase for comparison


// Compare userSelection with computerSelection

// Display results of game (ie: You chose X, Computer chose Y, You Win/Lose/Tie)

