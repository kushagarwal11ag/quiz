"use strict";

const home = document.querySelector("#quiz-menu header");
const question = document.getElementById("question");
const timeDisplay = document.querySelector(".time");

const currentResult = document.querySelector(".current-result-text");

const qText = document.querySelector(".qtext");

const numbers = document.querySelector(".number-left");
const operators = document.querySelector(".operator-left");

const allButton = document.querySelectorAll("#question button");
const numbersButton = document.querySelectorAll(".number-button button");
const operatorsButton = document.querySelectorAll(".operator-button button");

const reset = document.querySelector(".reset");
const next = document.querySelector(".next");

const result = document.getElementById("result");
const resultText = document.querySelector(".result-text");
const move = document.querySelector(".move");

let interval;
let timeLeft = parseInt(timeDisplay.getAttribute("data-timeLeft"));

let numberLeft = parseInt(numbers.getAttribute("data-numberLeft"));
let operatorLeft = parseInt(operators.getAttribute("data-operatorLeft"));

let operation = [];

let currentPage = parseInt(question.getAttribute("data-page"));
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
	nextButton(-1);
});

numbersButton.forEach((button) => {
	button.addEventListener("click", changeColorNumber);
});

reset.addEventListener("click", resetButton);

function changeColorNumber(event) {
	const button = event.currentTarget;
	let buttonSelected = button.dataset.value === "true";
	let numberButtonValue = parseInt(button.dataset.value);

	if (!buttonSelected && numberLeft > 0) {
		button.style.backgroundColor = "var(--clr-secondary)";
		button.style.color = "var(--clr-background)";
		button.style.cursor = "default";
		button.dataset.selected = "true";
		numberLeft--;

		numbers.innerText = `${numberLeft}`;
		if (numberLeft === 3) qText.innerText = `${numberButtonValue}`;
		else qText.innerText += ` ${numberButtonValue}`;

		operation.push(numberButtonValue);
		if (operation[2] !== undefined) calculate(operation);

		numbersButton.forEach((button) => {
			button.removeEventListener("click", changeColorNumber);
		});

		operatorsButton.forEach((button) => {
			button.addEventListener("click", changeColorOperator);
		});
	}

	if (numberLeft === 0) next.addEventListener("click", () => {
		nextButton(1);
	});
}

function changeColorOperator(event) {
	const button = event.currentTarget;
	let buttonSelected = button.dataset.value === "true";
	let operatorButtonValue = button.dataset.value;

	if (!buttonSelected && operatorLeft > 0) {
		button.style.backgroundColor = "var(--clr-secondary)";
		button.style.color = "var(--clr-background)";
		button.style.cursor = "default";
		button.dataset.selected = "true";
		operatorLeft--;

		operators.innerText = `${operatorLeft}`;
		qText.innerText += ` ${operatorButtonValue}`;
		operation.push(operatorButtonValue);

		numbersButton.forEach((button) => {
			button.addEventListener("click", changeColorNumber);
		});

		operatorsButton.forEach((button) => {
			button.removeEventListener("click", changeColorOperator);
		});
	}
}

function calculate(operator) {
	let answer;
	if (operator[1] === "+") answer = operator[0] + operator[2];
	else if (operator[1] === "-") answer = operator[0] - operator[2];
	else if (operator[1] === "*") answer = operator[0] * operator[2];
	else if (operator[1] === "/") answer = operator[0] / operator[2];
	operation = [answer];
	currentResult.innerText = `${answer}`;
	qText.innerHTML = `${answer}`;
}

function resetButton() {
	allButton.forEach((button) => {
		button.style.backgroundColor = "var(--clr-background)";
		button.style.color = "var(--clr-secondary)";
		button.style.cursor = "pointer";
		button.dataset.selected = "false";
		numberLeft = 4;
		operatorLeft = 3;

		currentResult.innerText = `0`;
		qText.innerText = `0`;
		operation = [];
		numbers.innerText = `${numberLeft}`;
		operators.innerText = `${operatorLeft}`;
		numbersButton.forEach((button) => {
			button.addEventListener("click", changeColorNumber);
		});

		operatorsButton.forEach((button) => {
			button.removeEventListener("click", changeColorOperator);
		});
	});
	next.removeEventListener("click", () => {
		nextButton(0);
	});
}

function nextButton(val) {
	clearInterval(interval);
	question.style.display = "none";
	result.style.display = "flex";
	if (val === 1) {
		if (qText.innerText === "2") {
			resultText.innerText = "You Win!";
			move.innerText = "Continue";
			changeToVariable = 1;
		}
		else {
			resultText.innerText = "You Lose!";
			move.innerText = "Result";
			changeToVariable = -1;
		}
	} else if(val === -1){
		resultText.innerText = "Time Up!";
		move.innerText = "Result";
		changeToVariable = -1;
	}
	move.addEventListener("click", () => {
		changePage(changeToVariable);
	});
}

function changePage(changeTo) {
	if (changeTo === 1) window.location.href = "../../question/q1.html";
	else if (changeTo === -1) window.location.href = "../../index.html";
}
