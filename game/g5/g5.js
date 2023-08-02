"use strict";

const home = document.querySelector("#quiz-menu header");
const question = document.getElementById("question");
const timeDisplay = document.querySelector(".time");

const allButtons = document.querySelectorAll(".row button");
const numberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");

const reset = document.querySelector(".reset");
const next = document.querySelector(".next");

const result = document.getElementById("result");
const resultText = document.querySelector(".result-text");
const resultExplanation = document.querySelector(".explanation");
const move = document.querySelector(".move");

let interval;
let timeLeft = parseInt(timeDisplay.getAttribute("data-timeLeft"));

let path = [];
let calculateInclude = [];
let calculate = [];
let answer = -999;
let changeToVariable = 0;

home.addEventListener("click", () => {
	window.location.href = "../../index.html";
});

numberButton.forEach((button) => {
	button.addEventListener("click", addOperator);
});

reset.addEventListener("click", resetButtons);
next.addEventListener("click", () => {
	nextRound(1);
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
	nextRound(-1);
});

function addOperator(event) {
	const button = event.currentTarget;
	let openButton = button.getAttribute("data-open").split("-");

	numberButton.forEach((allButton) => {
		allButton.style.backgroundColor = "var(--clr-background)";
		allButton.style.color = "var(--clr-secondary)";
		allButton.removeEventListener("click", addOperator);
	});
	highlightPath(openButton);
	path.push(button);
	tracePath(path);
}

function addNumber(event) {
	const button = event.currentTarget;
	let openButton = button.getAttribute("data-open").split("-");

	operatorButton.forEach((allButton) => {
		allButton.style.backgroundColor = "var(--clr-secondary)";
		allButton.style.color = "var(--clr-background)";
		allButton.removeEventListener("click", addNumber);
	});
	highlightPath(openButton);
	path.push(button);
	tracePath(path);
}

function highlightPath(lightPath) {
	let i = 0;
	allButtons.forEach((button) => {
		if (button.getAttribute("data-id") === lightPath[i]) {
			button.style.backgroundColor = "var(--clr-primary)";
			button.style.color = "var(--clr-dark)";
			i++;
			if (button.classList.contains("operator") && !path.includes(button)) {
				button.addEventListener("click", addNumber);
			} else if (
				button.classList.contains("number") &&
				!path.includes(button)
			) {
				button.addEventListener("click", addOperator);
			}
		}
	});
}

function tracePath(accentuatePath) {
	accentuatePath.forEach((pathButton) => {
		pathButton.style.backgroundColor = "var(--clr-accent)";
		pathButton.style.color = "var(--clr-dark)";
		let attr = pathButton.getAttribute("data-id");
		if (!calculateInclude.includes(attr)) {
			calculateInclude.push(attr);
			calculate.push(pathButton.innerText);
		}
	});
}

function calculation(calculate) {
	let lastElement = calculate[calculate.length - 1];
	if (
		lastElement === "+" ||
		lastElement === "-" ||
		lastElement === "x" ||
		lastElement === "/"
	) {
		calculate.pop();
	}
	while (calculate.length > 1) {
		calculate[0] = parseInt(calculate[0]);
		calculate[2] = parseInt(calculate[2]);
		let operate = calculate[1];
		if (operate === "+") {
			calculate[0] = calculate[0] + calculate[2];
			calculate.splice(1, 2);
		} else if (operate === "-") {
			calculate[0] = calculate[0] - calculate[2];
			calculate.splice(1, 2);
		} else if (operate === "x") {
			calculate[0] = calculate[0] * calculate[2];
			calculate.splice(1, 2);
		} else if (operate === "/") {
			calculate[0] = calculate[0] / calculate[2];
			calculate.splice(1, 2);
		}
	}
	return calculate[0];
}

function resetButtons() {
	path = [];
	calculateInclude = [];
	calculate = [];
	numberButton.forEach((button) => {
		button.addEventListener("click", addOperator);
		button.style.backgroundColor = "var(--clr-background)";
	});
	operatorButton.forEach((button) => {
		button.removeEventListener("click", addNumber);
		button.style.backgroundColor = "var(--clr-secondary)";
		button.style.color = "var(--clr-background)";
	});
}

function nextRound(condition) {
	clearInterval(interval);
	question.style.display = "none";
	result.style.display = "flex";
	answer = calculation(calculate);
	if (condition === 1) {
		if (answer === 0) {
			resultText.innerText = "You Win!";
			move.innerText = "Continue";
			changeToVariable = 1;
		} else {
			resultText.innerText = "You Lose!";
			move.innerText = "Result";
			changeToVariable = -1;
		}
		resultExplanation.innerHTML = `<div>Target: <span style="font-weight: 700">0</span></div>
		<div>Your Answer: <span style="font-weight: 700">${answer}</span></div>`;
	} else if (condition === -1) {
		resultText.innerText = "Time Up!";
		move.innerText = "Result";
		changeToVariable = -1;
	}
	move.addEventListener("click", () => {
		changePage(changeToVariable);
	});
}

function changePage(changeTo) {
	if (changeTo === 1) window.location.href = "../../index.html";
	else if (changeTo === -1) window.location.href = "../../index.html";
}
