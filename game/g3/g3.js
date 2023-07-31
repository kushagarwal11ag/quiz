"use strict";

const home = document.querySelector("#quiz-menu header");
const question = document.getElementById("question");
const timeDisplay = document.querySelector(".time");

const qText = document.querySelector(".qtext");

const operators = document.querySelector(".operator-left");
const operatorsButton = document.querySelectorAll(".operator-button button");

const reset = document.querySelector(".reset");
const next = document.querySelector(".next");

const result = document.getElementById("result");
const resultText = document.querySelector(".result-text");
const playerSolution = document.querySelector(".player-solution");
const move = document.querySelector(".move");

let interval;
let timeLeft = parseInt(timeDisplay.getAttribute("data-timeLeft"));

let operatorLeft = parseInt(operators.getAttribute("data-operatorLeft"));

let number = [7, 3, 7, 3];
let sum = [".", ".", "."];
let answer = 999;
let changeToVariable = 0;

home.addEventListener("click", () => {
	window.location.href = "../../index.html";
});

function countdownTimer(duration, callback) {
	interval = setInterval(() => {
		timeDisplay.innerText = `${duration} seconds`;
		duration--;
		if (duration < 0) {
			callback();
			clearInterval(interval);
		}
	}, 1000);
}

countdownTimer(timeLeft, () => {
	answer = -999;
	nextButton();
});

reset.addEventListener("click", resetButton);

operatorsButton.forEach((button) => {
	button.addEventListener("click", changeColorOperator);
});

function changeColorOperator(event) {
	const button = event.currentTarget;
	let buttonSelected = button.getAttribute("data-selected") === "true";
	let operatorButtonValue = button.dataset.value;

	if (!buttonSelected && operatorLeft > 0) {
		button.style.backgroundColor = "var(--clr-secondary)";
		button.style.color = "var(--clr-background)";
		button.style.cursor = "default";
		button.setAttribute("data-selected", "true");
		operatorLeft--;

		operators.innerText = `${operatorLeft}`;
		if (operatorLeft === 2) sum[0] = operatorButtonValue;
		else if (operatorLeft === 1) sum[1] = operatorButtonValue;
		else if (operatorLeft === 0) sum[2] = operatorButtonValue;
		qText.innerText = `7 ${sum[0]} 3 ${sum[1]} 7 ${sum[2]} 3`;
		if (sum[2] !== ".") {
			next.addEventListener("click", nextButton);
		}
	}
}

function calculate(number, sum) {
	let numbers = number.slice();
	let operators = sum.slice();
	let operatorPosition;
	if (operators.includes("/")) {
		operatorPosition = operators.indexOf("/");
		numbers[operatorPosition] =
			numbers[operatorPosition] / numbers[operatorPosition + 1];
		numbers.splice(operatorPosition + 1, 1);
		operators.splice(operatorPosition, 1);
	}
	if (operators.includes("*")) {
		operatorPosition = operators.indexOf("*");
		numbers[operatorPosition] =
			numbers[operatorPosition] * numbers[operatorPosition + 1];
		numbers.splice(operatorPosition + 1, 1);
		operators.splice(operatorPosition, 1);
	}
	if (operators.includes("+")) {
		operatorPosition = operators.indexOf("+");
		numbers[operatorPosition] =
			numbers[operatorPosition] + numbers[operatorPosition + 1];
		numbers.splice(operatorPosition + 1, 1);
		operators.splice(operatorPosition, 1);
	}
	if (operators.includes("-")) {
		operatorPosition = operators.indexOf("-");
		numbers[operatorPosition] =
			numbers[operatorPosition] - numbers[operatorPosition + 1];
		numbers.splice(operatorPosition + 1, 1);
		operators.splice(operatorPosition, 1);
	}
	return numbers[0];
}

function resetButton() {
	operatorsButton.forEach((button) => {
		button.style.backgroundColor = "var(--clr-background)";
		button.style.color = "var(--clr-secondary)";
		button.style.cursor = "pointer";
		button.dataset.selected = "false";
		operatorLeft = 3;

		qText.innerText = `7 . 3 . 7 . 3`;
		sum = [".", ".", "."];
		operators.innerText = `${operatorLeft}`;
	});
	next.removeEventListener("click", nextButton);
}

function nextButton() {
	clearInterval(interval);
	question.style.display = "none";
	result.style.display = "flex";
	if (answer === -999) {
		resultText.innerText = "Time Up!";
		move.innerText = "Result";
		changeToVariable = -1;
	} else {
		answer = calculate(number, sum);
		playerSolution.innerHTML = `7 <span style="font-weight: 700">${sum[0]}</span> 3 <span style="font-weight: 700">${sum[1]}</span> 7 <span style="font-weight: 700">${sum[2]}</span> 3 = <span style="font-weight: 700">${answer}</span>`;
		if (answer === 0) {
			resultText.innerText = "You Win!";
			move.innerText = "Continue";
			changeToVariable = 1;
		} else if (answer !== 0) {
			resultText.innerText = "You Lose!";
			move.innerText = "Result";
			changeToVariable = -1;
		}
	}

	move.addEventListener("click", () => {
		changePage(changeToVariable);
	});
}

function changePage(changeTo) {
	if (changeTo === 1) window.location.href = "../../question/q4.html";
	else if (changeTo === -1) window.location.href = "../../index.html";
}
