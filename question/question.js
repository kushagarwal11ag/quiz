"use strict";

const home = document.querySelector("#quiz-menu header");
const question = document.getElementById("question");
const timeDisplay = document.querySelector(".time");
const optionButton = document.querySelectorAll(".options button");
const riddleText = document.querySelector(".riddle-text");
const reset = document.querySelector(".reset");
const next = document.querySelector(".next");
const result = document.getElementById("result");
const resultText = document.querySelector(".result-text");
const move = document.querySelector(".move");

let interval;
let timeLeft = parseInt(timeDisplay.getAttribute("data-timeLeft"));
let value = 0;
let noOfChoice = parseInt(question.getAttribute("data-choice"));
let noOfButtonSelected = 0;
let currentPage = parseInt(question.getAttribute("data-page"));

home.addEventListener("click", () => {
	window.location.href = "../index.html";
});

optionButton.forEach((button) => {
	button.addEventListener("click", changeColor);
});

if (currentPage === 4) {
	riddleText.addEventListener("input", () => {
		if (riddleText.value !== "") next.disabled = false;
	});
}

reset.addEventListener("click", resetButtons);
next.addEventListener("click", nextRound);
move.addEventListener("click", changePage);

next.disabled = true;

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
	value = -1;
	nextRound();
});

function changeColor(event) {
	const button = event.currentTarget;
	let buttonSelected = button.getAttribute("data-selected") === "true";
	if (!buttonSelected && noOfButtonSelected < noOfChoice) {
		button.style.backgroundColor = "var(--clr-secondary)";
		button.style.color = "var(--clr-background)";
		if (parseInt(button.getAttribute("data-value")) === 1) {
			value++;
		} else value = 0;
		button.setAttribute("data-selected", "true");
		noOfButtonSelected++;
	}
	next.disabled = false;
}

function resetButtons() {
	optionButton.forEach((button) => {
		button.style.backgroundColor = "var(--clr-background)";
		button.style.color = "var(--clr-text)";
		button.setAttribute("data-selected", "false");
	});
	if (currentPage === 4) riddleText.value = "";
	next.disabled = true;
	noOfButtonSelected = 0;
	value = 0;
}

function nextRound() {
	clearInterval(interval);
	question.style.display = "none";
	result.style.display = "flex";
	if (value === noOfChoice) {
		resultText.innerText = "You Win!";
		move.innerText = "Continue";
	} else if (currentPage === 4 && riddleText.value.toLowerCase() === "echo") {
		resultText.innerText = "You Win!";
		move.innerText = "Continue";
	} else {
		if (value === -1) resultText.innerText = "Time Up!";
		else resultText.innerText = "You Lose!";
		move.innerText = "Result";
	}
}

function changePage() {
	if (move.textContent === "Continue") {
		if (currentPage === 1) window.location.href = "q2.html";
		else if (currentPage === 2) window.location.href = "../game/g1/g1.html";
		else if (currentPage === 3) window.location.href = "../game/g3/g3.html";
		else if (currentPage === 4) window.location.href = "../game/g4/g4.html";
	} else window.location.href = "../index.html";
}
