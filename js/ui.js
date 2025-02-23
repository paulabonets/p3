function updateUI(question, answers, correctAnswer) {
    document.getElementById("question").innerHTML = question;
    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";
    
    answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("answer-button");
        button.onclick = () => checkAnswer(button, answer);
        answersContainer.appendChild(button);
    });
    
    if (!document.getElementById("question-count")) {
        const questionCounter = document.createElement("p");
        questionCounter.id = "question-count";
        questionCounter.textContent = "Pregunta: 0/20";
        document.body.insertBefore(questionCounter, document.getElementById("question"));
    }
}

function highlightAnswer(selectedButton, isCorrect, correctAnswer) {
    selectedButton.style.backgroundColor = isCorrect ? "green" : "red";
    document.querySelectorAll(".answer-button").forEach(button => {
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = "green";
        }
        button.disabled = true;
    });
}

function showResult(score, highScore) {
    document.getElementById("score").textContent = `Puntuación: ${score}`;
    document.getElementById("high-score").textContent = `Récord: ${highScore}`;
}

export { updateUI, showResult, highlightAnswer };