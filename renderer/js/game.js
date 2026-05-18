document.addEventListener('DOMContentLoaded', function() {
	var btn1 = document.getElementById("tictactoe");
	if (btn1) {
		btn1.addEventListener("click", function() {
			window.location.href = "../pages/tictactoe.html";
		});
	} else {
		console.warn('tic tac toe game not found in DOM');
	}

	var btn2 = document.getElementById("rockpaperscissor");
	if (btn2) {
		btn2.addEventListener("click", function() {
			window.location.href = "../pages/rockpaperscissor.html";
		});
	} else {
		console.warn('rock paper scissors game not found in DOM');
	}

	var btn3 = document.getElementById("pacman");
	if (btn3) {
		btn3.addEventListener("click", function() {
			window.location.href="../pages/pacman.html";
		});
	}
    else{
        console.warn('pacman game not found in DOM');
    }

	var btn4 = document.getElementById("snake");
	if (btn4) {
		btn4.addEventListener("click", function() {
			window.location.href="../pages/snake.html"
		});
	}
    else{
        console.warn('Snake game not found in DOM');
    }

	var btn5 =document.getElementById("character");
	if (btn5){
		btn5.addEventListener("click", function(){
			window.location.href="../pages/character.html"
		});
	}
	else{
		console.log('Charcter page not found in DOM');
	}
});

