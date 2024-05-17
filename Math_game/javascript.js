var playing = false;
var score = 0;
var timeleft;
var correctAnswer;
var countdown;

function generateNewQuestion() {
    var num1 = Math.floor(Math.random() * 10) + 1;
    var num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 + num2;
    document.getElementById("question").innerHTML = num1 + " + " + num2;

    // Randomly assign the correct answer to one of the answer boxes
    var correctBox = Math.floor(Math.random() * 4) + 1;
    for (var i = 1; i <= 4; i++) {
        var answerElement = document.getElementById("ans" + i);
        if (i === correctBox) {
            answerElement.innerHTML = correctAnswer;
        } else {
            // Generate incorrect answers
            var incorrectAnswer = Math.floor(Math.random() * 20) + 1;
            while (incorrectAnswer === correctAnswer) {
                incorrectAnswer = Math.floor(Math.random() * 20) + 1;
            }
            answerElement.innerHTML = incorrectAnswer;
        }
    }
}

function updateTime() {
    document.getElementById("timeremainingvalue").innerHTML = timeleft;
    if (timeleft === 0) {
        clearInterval(countdown);
        gameOver();
    } else {
        timeleft--;
    }
}

function startGame() {
    if (playing) {
        location.reload();
    } else {
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        timeleft = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeleft;
        document.getElementById("startreset").innerHTML = "Reset";
        document.getElementById("gameOver").style.display = "none";

        countdown = setInterval(updateTime, 1000);
        generateNewQuestion();
    }
}

function gameOver() {
    playing = false;
    document.getElementById("startreset").innerHTML = "Start";
    document.getElementById("gameOver").innerHTML = "Game Over! Your Score: " + score;
    document.getElementById("gameOver").style.display = "block";
}

function answerQuestion(selectedAnswer) {
    if (playing) {
        if (selectedAnswer) {
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            document.getElementById("correct").style.display = "block";
            setTimeout(function () {
                document.getElementById("correct").style.display = "none";
            }, 1000);
        } else {
            document.getElementById("wrong").style.display = "block";
            setTimeout(function () {
                document.getElementById("wrong").style.display = "none";
            }, 1000);
        }
        generateNewQuestion();
    }
}

document.getElementById("startreset").onclick = startGame;
for (var i = 1; i <= 4; i++) {
    document.getElementById("ans" + i).onclick = function () {
        answerQuestion(parseInt(this.innerHTML) === correctAnswer);
    };
}

// Initialize the game
startGame();
