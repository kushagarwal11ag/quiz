"use strict";

const home = document.querySelector("#quiz-menu header");
const question = document.getElementById("question");
const moveDisplay = document.querySelector(".moves");
const timeDisplay = document.querySelector(".time");
const gameRoundResult = document.querySelector(".game-round-result");
const optionButton = document.querySelectorAll(".options button");
const result = document.getElementById("result");
const resultText = document.querySelector(".result-text");
const move = document.querySelector(".move");

let interval;
let movesLeft = parseInt(moveDisplay.getAttribute("data-movesLeft"));
let timeLeft = parseInt(timeDisplay.getAttribute("data-timeLeft"));
const randomNumber = Math.floor(Math.random() * 20) + 1;
let noOfChoice = parseInt(question.getAttribute("data-choice"));
let noOfButtonSelected = 0;
let changeToVariable = 0;

moveDisplay.innerText = `${movesLeft}`;

home.addEventListener("click", () => {
	window.location.href = "../../index.html";
});

optionButton.forEach((button) => {
	button.addEventListener("click", changeColor);
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

function changeColor(event) {
	const button = event.currentTarget;
	let buttonSelected = button.getAttribute("data-selected") === "true";
	let data = parseInt(button.getAttribute("data-value"));
	movesLeft--;
	moveDisplay.innerText = `${movesLeft}`;
	if (!buttonSelected && noOfButtonSelected < noOfChoice) {
		button.style.color = "var(--clr-background)";
		button.style.borderColor = "var(--clr-background)";
		button.style.cursor = "default";
		if (data === randomNumber) {
			gameRoundResult.innerText = "Correct!";
			button.innerHTML =
				"<img class='mole' src='../../assets/images/mole.svg' />";
			nextRound(1);
		} else if (data > randomNumber + 2) {
			gameRoundResult.innerText = "Too High!";
		} else if (data > randomNumber) {
			gameRoundResult.innerText = "High!";
		} else if (data < randomNumber - 2) {
			gameRoundResult.innerText = "Too Low!";
		} else if (data < randomNumber) {
			gameRoundResult.innerText = "Low!";
		}
		button.setAttribute("data-selected", "true");
		noOfButtonSelected++;
	}
	if (noOfButtonSelected === noOfChoice && data !== randomNumber) nextRound(0);
}

function nextRound(condition) {
	clearInterval(interval);
	setTimeout(() => {
		question.style.display = "none";
		result.style.display = "flex";
		if (condition === 1) {
			resultText.innerText = "You Win!";
			move.innerText = "Continue";
			changeToVariable = 1;
		} else {
			if (condition === 0) resultText.innerText = "You Lose!";
			else if (condition === -1) resultText.innerText = "Time Up!";
			move.innerText = "Result";
			changeToVariable = -1;
		}
	}, 2000);
	move.addEventListener("click", () => {
		changePage(changeToVariable);
	});
}

function changePage(changeTo) {
	if (changeTo === 1) window.location.href = "../g2/g2.html";
	else if (changeTo === -1) window.location.href = "../../index.html";
}
