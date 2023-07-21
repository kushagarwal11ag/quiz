const home = document.querySelector("#quiz-menu header");
const playButton = document.querySelector(".play");

home.addEventListener("click", () => {
	window.location.href = "index.html";
});

playButton.addEventListener("click", () => {
	window.location.href = "question/q1.html";
});
