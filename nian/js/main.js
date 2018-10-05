let words = [];
const letters = "amnckasdr";

function getWords() {
    jQuery.get('wordlist.txt', function(word) {
        words = word.split("\n");
    });
}

function setSquareLetters() {
    for (let i = 0; i < letters.length; i++) {
        document.getElementById("square" + i).innerHTML = letters.charAt(i).toUpperCase();
    }
}

function containsAllowedLetters(inputText) {
    let correctLetters = (' ' + letters).slice(1);

    for (let i = 0; i < inputText.length; i++) {
        const char = inputText.charAt(i);
        if (!correctLetters.includes(char)) {
            return false;
        }
        correctLetters = correctLetters.replace(char, "");
    }
    return true;
}

function containsMiddleLetter(inputText) {
    let middleLetter = letters[4];
    return inputText.includes(middleLetter);
}

function addGuessListener() {
    document.getElementById("buttonGuess").addEventListener("click", function() {

        const inputText = document.getElementById("inputGuess").value.toLowerCase();
        const ul = document.getElementById("solutions");
        const li = document.createElement("li");

        let solution = "Nope";

        if (containsAllowedLetters(inputText) && containsMiddleLetter(inputText)) {
            /*
            for (let i = 0; i < words.length; i++) {
                if (words[i] === inputText) {
                    solution = words[i];
                    break;
                }
            }
            */

            solution = inputText;


        }

        li.appendChild(document.createTextNode(solution));
        ul.appendChild(li);

    });
}

window.onload = function () {
    getWords();
    setSquareLetters();
    addGuessListener();
};

