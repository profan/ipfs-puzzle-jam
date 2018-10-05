const guesses = new Set(["a", "b", "c"]);

window.onload = function () {
    const letters = "AMNCKASDR";
    setSquareLetters(letters);
    addGuessListener();
};

function setSquareLetters(letters) {
    for (let i = 0; i < letters.length; i++) {
        document.getElementById("square" + i).innerHTML = letters.charAt(i);
    }
}

function addGuessListener() {
    document.getElementById("buttonGuess").addEventListener("click", function(){
        var ul = document.getElementById("solutions");
        var li = document.createElement("li");
        var solution = "test";
        li.appendChild(document.createTextNode(solution));
        ul.appendChild(li);
    });
}

