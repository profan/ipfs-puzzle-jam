window.onload = function () {
    const letters = "AMNCKASDR";
    setSquareLetters(letters);
};

function setSquareLetters(letters) {
    for (var i = 0; i < letters.length; i++) {
        document.getElementById("square" + i).innerHTML = letters.charAt(i);
    }
}