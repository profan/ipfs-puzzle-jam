let words = [];

function getWords() {
    jQuery.get('wordlist.txt', function(word) {
        words = word.split("\n");
    });
}

function setSquareLetters(letters) {
    for (let i = 0; i < letters.length; i++) {
        document.getElementById("square" + i).innerHTML = letters.charAt(i);
    }
}

function addGuessListener() {
    document.getElementById("buttonGuess").addEventListener("click", function(){
        const ul = document.getElementById("solutions");
        const inputText = document.getElementById("inputGuess").value;
        const li = document.createElement("li");

        let solution = "Nope";
        for (let i = 0; i < words.length; i++) {
            if (words[i] === inputText) {
                solution = words[i];
                break;
            }
        }

        li.appendChild(document.createTextNode(solution));
        ul.appendChild(li);
    });
}

window.onload = function () {
    getWords();

    const letters = "AMNCKASDR";
    setSquareLetters(letters);
    addGuessListener();
};

