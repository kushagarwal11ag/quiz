"use strict";

const home = document.querySelector("#quiz-menu header");
const question = document.getElementById("question");
const timeDisplay = document.querySelector(".time");

const textTag = document.querySelectorAll(".list-item");
const moveUp = document.querySelectorAll(".up");
const moveDown = document.querySelectorAll(".down");

const reset = document.querySelector(".reset");
const next = document.querySelector(".next");
const result = document.getElementById("result");
const resultText = document.querySelector(".result-text");
const move = document.querySelector(".move");

let interval;
let timeLeft = parseInt(timeDisplay.getAttribute("data-timeLeft"));

home.addEventListener("click", () => {
	window.location.href = "../../index.html";
});

moveUp.forEach((button) => {
	button.addEventListener("click", moveUpwards);
});
moveDown.forEach((button) => {
	button.addEventListener("click", moveDownwards);
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

function moveUpwards(event) {
	const button = event.currentTarget;
	const upIndex = parseInt(button.getAttribute("data-i"));

	if (upIndex > 0) {
		let previousList = textTag[upIndex - 1];
		let currentList = textTag[upIndex];

		let temp = previousList.innerText;
		previousList.innerText = currentList.innerText;
		currentList.innerText = temp;
	}
}

function moveDownwards(event) {
	const button = event.currentTarget;
	const downIndex = parseInt(button.getAttribute("data-i"));

	if (downIndex < 4) {
		let nextList = textTag[downIndex + 1];
		let currentList = textTag[downIndex];

		let temp = nextList.innerText;
		nextList.innerText = currentList.innerText;
		currentList.innerText = temp;
	}
}

function resetButtons() {
	textTag[0].innerText = "Veer Pratap Singh";
	textTag[1].innerText = "Kabir Khan";
	textTag[2].innerText = "Vijay Chauhan";
	textTag[3].innerText = "Simran Singh";
	textTag[4].innerText = "Kabir Thapar";
}

function nextRound(val) {
	clearInterval(interval);
	question.style.display = "none";
	result.style.display = "flex";
	if (val === 1) {
		if (
			textTag[0].innerText === "Vijay Chauhan" &&
			textTag[1].innerText === "Veer Pratap Singh" &&
			textTag[4].innerText === "Kabir Khan"
		) {
			resultText.innerText = "You Win!";
			move.innerText = "Continue";
		} else {
			resultText.innerText = "You Lose!";
			move.innerText = "Result";
		}
	} else if (val === -1) {
		resultText.innerText = "Time Up!";
		move.innerText = "Result";
	}
	move.addEventListener("click", changePage);
}

function changePage() {
	if (move.textContent === "Continue") {
		window.location.href = "../../index.html";
	} else window.location.href = "../../index.html";
}
