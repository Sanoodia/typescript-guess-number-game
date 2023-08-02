import chalk from "chalk";
import inquirer from "inquirer";
import * as emoji from "node-emoji";
function* lives() {
    let index = 5;
    while (index > 0) {
        console.log(emoji.emojify(index === 5 ?
            `Your Lives:${" :heart: ".repeat(index)}`
            : `Your Remaining Lives:${" :heart: ".repeat(index)}`));
        yield index--;
    }
}
const promptGuess = async (attempts) => {
    const prompt = await inquirer.prompt([
        {
            name: "guess",
            type: "input",
            message: attempts < 5 ? "Guess Again " : "Guess Number Between 0-9:",
            validate: (input) => {
                const number = parseInt(input);
                return (!isNaN(number)) ? true : "Input Should be a Number";
            }
        },
    ]);
    return parseInt(prompt.guess);
};
const startGame = () => {
    console.clear();
    let generateLives = lives();
    let actualNumber = Math.floor(Math.random() * 10) + 1;
    function continueGame() {
        console.log(chalk.bgCyanBright.bold("\n        Guess Number         \n"));
        let lives = generateLives.next().value;
        if (lives) {
            let guess = promptGuess(lives);
            guess.then((guess) => {
                if (guess === actualNumber) {
                    console.log(chalk.bgGreen.bold("\uD83C\uDF89 \uD83C\uDF89 You won \uD83C\uDF89 \uD83C\uDF89"));
                }
                else {
                    console.clear();
                    continueGame();
                }
            });
        }
        else {
            console.log(chalk.bgRed.bold("\n\uD83D\uDE22 \uD83D\uDE22 You lost \uD83D\uDE22 \uD83D\uDE22\n"));
            console.log(chalk.gray.bold(`Actuall Number is  ${actualNumber}`));
        }
    }
    return continueGame;
};
let initGame = startGame();
initGame();
