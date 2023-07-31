"use strict";

const home = document.querySelector("#quiz-menu header");
const question = document.getElementById("question");
const moveDisplay = document.querySelector(".moves");
const timeDisplay = document.querySelector(".time");

const inputButton = document.querySelectorAll(".row button");
const answerContainer = document.getElementById("answer-container");
const answerButton = document.querySelectorAll("#answer-container button");

const reset = document.querySelector(".reset");
const next = document.querySelector(".next");

const result = document.getElementById("result");
const resultText = document.querySelector(".result-text");
const move = document.querySelector(".move");

let interval;
let movesLeft = parseInt(moveDisplay.getAttribute("data-movesLeft"));
let timeLeft = parseInt(timeDisplay.getAttribute("data-timeLeft"));

let inputArray = [];
let dataId;
let changeToVariable = 0;

moveDisplay.innerText = `${movesLeft}`;

home.addEventListener("click", () => {
	window.location.href = "../../index.html";
});

inputButton.forEach((button) => {
	button.addEventListener("click", addValue);
});

reset.addEventListener("click", resetButtons);

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

function addValue(event) {
	const button = event.currentTarget;
	let buttonSelected = button.getAttribute("data-selected") === "true";
	dataId = parseInt(button.getAttribute("data-buttonId"));
	inputArray = [];
	inputButton.forEach((button) => {
		button.style.borderColor = "var(--clr-secondary)";
		button.setAttribute("data-selected", "false");
	});
	if (!buttonSelected) {
		button.style.borderColor = "var(--clr-primary)";
		button.setAttribute("data-selected", "true");
		inputArray.push(button);
		answerButton.forEach((button) => {
			button.addEventListener("click", removeValue);
		});
	} else if (buttonSelected) {
		movesLeft++;
		answerButton.forEach((button) => {
			if (dataId === parseInt(button.getAttribute("data-buttonId"))) {
				button.style.backgroundColor = "var(--clr-background)";
				button.setAttribute("data-buttonId", "");
			}
		});
		button.innerText = "";
		button.setAttribute("data-selected", "false");
		answerContainer.style.display = "grid";
	}
	moveDisplay.innerText = `${movesLeft}`;
}

function removeValue(event) {
	const button = event.currentTarget;
	let value = parseInt(button.getAttribute("data-value"));
	inputArray[0].innerText = `${value}`;
	button.style.backgroundColor = "var(--clr-secondary)";
	button.setAttribute("data-buttonId", dataId);
	answerButton.forEach((button) => {
		button.removeEventListener("click", removeValue);
	});
	movesLeft--;
	next.disabled = false;
	if (movesLeft === 0) {
		answerContainer.style.display = "none";
		next.addEventListener("click", () => {
			nextRound(1);
		});
	}
	moveDisplay.innerText = `${movesLeft}`;
}

function resetButtons() {
	inputButton.forEach((button) => {
		button.style.borderColor = "var(--clr-secondary)";
		button.setAttribute("data-selected", "false");
		button.innerText = "";
		inputArray = [];
	});
	answerButton.forEach((button) => {
		button.removeEventListener("click", removeValue);
		button.style.backgroundColor = "var(--clr-background)";
		button.setAttribute("data-buttonId", "");
	});
	movesLeft = 12;
	answerContainer.style.display = "grid";
	next.disabled = true;
	moveDisplay.innerText = `${movesLeft}`;
}

function nextRound(condition) {
	clearInterval(interval);
	question.style.display = "none";
	result.style.display = "flex";
	let isWin = true;
	inputButton.forEach((button) => {
		if (
			parseInt(button.innerText) !==
			parseInt(button.getAttribute("data-answer"))
		) {
			isWin = false;
			return;
		}
	});
	if (condition === 1) {
		if (isWin) {
			resultText.innerText = "You Win!";
			move.innerText = "Continue";
			changeToVariable = 1;
		} else {
			resultText.innerText = "You Lose!";
			move.innerText = "Result";
			changeToVariable = -1;
		}
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
	if (changeTo === 1) window.location.href = "../../question/q5/q5.html";
	else if (changeTo === -1) window.location.href = "../../index.html";
}
