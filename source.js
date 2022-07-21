//All implemented languages
const langs = [
	"JAVA",
	"PYTHON",
	"JAVASCRIPT",
	"C",
	"COBOL"
];

//Java
const javaText = [
	"public class HelloWorld {",
	"&emsp;public static void main(String[] args) {",
	"&emsp;&emsp;System.out.println(\"Hello, World!\");",
	"&emsp;}",
	"}",
	"JAVA"
];

//Python
const pythonText = [
	"def main()",
	"&emsp;text = 'Hello, World!'",
	"&emsp;print(text)",
	"if __name__ == '__main__'",
	"&emsp;main()",
	"PYTHON"
];

//JavaScript
const javascriptText = [
	"function helloWorld() {",
	"&emsp;let text = 'Hello, World!';",
	"&emsp;console.log(text);",
	"}",
	"helloWorld();",
	"JAVASCRIPT"
];

//C
const cText = [
	"#include &#60;stdio.h&#62;", //&#60; = < , &#62; = >
	"int main() {",
	"&emsp;printf(\"Hello, World!\");",
	"&emsp;return 0;",
	"}",
	"C"
];

//COBOL
const cobolText = [
	"IDENTIFICATION DIVISION.",
	"PROGRAM-ID. HELLOWRD.",
	"PROCEDURE DIVISION.",
	"&emsp;DISPLAY \"SIMPLE HELLO WORLD\".",
	"&emsp;STOP RUN.",
	"COBOL"
]

//Generstes random number to pick language
function dailyPick() {
	switch (Math.floor(Math.random() * 5) + 1) {
		case 1:
			return javaText;
			break;
		case 2:
			return pythonText;
			break;
		case 3:
			return javascriptText;
			break;
		case 4:
			return cText;
			break;
		case 5:
			return cobolText;
			break;
	}
}

//Common name variables based on generated language
let dailyText = dailyPick();
let correctLang = dailyText[5];

//Perfomed immediately to show first line of selected code
document.getElementById("codeLine1").innerHTML = dailyText[0];

//User guess data
let guesses = 0;
let guess = "";

//Valid guess is incorrect, or skip button is pressed. Default is not skipped
function missedGuess(skipped) {
	if (skipped) {
		guesses++;
	}
	let adjust = guesses + 1;
	let currLine = "codeLine" + adjust;
	if (guesses < 5) {
		document.getElementById(currLine).innerHTML = dailyText[guesses];
		document.getElementById("guessCount").innerHTML = "Guesses remaining: " + (5 - guesses);
	} else if ((5 - guesses) >= 0) {
		document.getElementById("guessCount").innerHTML = "Guesses remaining: " + (5 - guesses);
		document.getElementById("winlose").innerHTML = "You lost!";
	}
}

//User presses guess button. Validates guess and then checks correctness
function guessed() {
	guesses++;
	guess = (document.getElementById("guessField").value).toUpperCase();
	document.getElementById("prevGuess").innerHTML = "You guessed: " + guess;
	if (!(langs.includes(guess))) {
		invalidGuess();
	} else if (guess != correctLang) {
		missedGuess();
	} else {
		correct();
	}
}

//Invalid guess, user gets to try again
function invalidGuess() {
	guesses--;
	document.getElementById("prevGuess").innerHTML = guess + " is not a valid guess.";
}

//Correct guess
function correct() {
	if (guesses < 5) {
		for (let i = 0; i < 5 - guesses; i++) {
			let adjust = guesses + 1 + i;
			let currLine = "codeLine" + adjust;
			document.getElementById(currLine).innerHTML = dailyText[guesses + i];
		}
	}
	if (guesses == 1) {
		document.getElementById("guessCount").innerHTML = "Took you 1 guess!";
	} else {
		document.getElementById("guessCount").innerHTML = "Took you " + guesses + " guesses!";
	}
	document.getElementById("winlose").innerHTML = "You Win!";
}
