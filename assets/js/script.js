//Wait for DOM to finish loading
//Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }
    //listen for when the Enter key is pressed down and then calling check answer
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })
    runGame("addition");
})
/**
 * The main game loop, called when the script is first loaded
 * and after the users answer is processed
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    //create two random numbers from 1-25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } 
    else if (gameType === "multiply") {
        displayMultiplicationQuestion(num1, num2);
    }
    else if (gameType === "subtract")
        displaySubtractionQuestion(num1, num2);
    else if (gameType === "division")
        displayDivisionQuestion(num1, num2)
    else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }

}
/**
 * Checks the answer against the first element in
 * the returned calculatecorrectanswer array
 */
function checkAnswer () {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        incrementScore();
        alert ("Hey! Nice jerb der pal! :)")
    } else {
        incrementWrongAnswer();
        alert(`Nice try! :( you answered ${userAnswer}. The answer was ${calculatedAnswer[0]}!`);
    }
    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands and the operator
 * directly from the DOM (HTML) and returns the right answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } 
    else if (operator === "x") {
        return [operand1 * operand2, "multiply"]
    }
    else if (operator === "-") {
        return [operand1 - operand2, "subtract"]
    }
    else if (operator === "/") {
        return [parseInt(operand1 / operand2), "division"]

    }
    else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

/**
 * Gets the current score from the DOM
 * and increments it by 1
 */
function incrementScore () {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}
/**
 * Gets the current incorrect score from the DOM
 * and increments it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1
    document.getElementById("operator").textContent = "-";
}

function displayMultiplicationQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = parseInt(operand1 * operand2)
    document.getElementById("operand2").textContent = operand2
    document.getElementById("operator").textContent = "/";

}
