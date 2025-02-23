import { getQuestion } from "./api.js";
import { updateUI, showResult, highlightAnswer } from "./ui.js";

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let correctAnswer = "";
let questionCount = 0;
const maxQuestions = 10;

async function startGame() {
    if (questionCount >= maxQuestions) {
        document.getElementById("question").textContent = "¡FIN! Tu puntuación final: " + score;
        return;
    }
    
    const questionData = await getQuestion();
    if (questionData) {
        questionCount++;
        generateQuestion(questionData);
        const questionCountElement = document.getElementById("question-count");
        if (questionCountElement) {
            questionCountElement.textContent = `Pregunta: ${questionCount}/${maxQuestions}`;
        }
    } else {
        document.getElementById("question").textContent = "No se pudo cargar una pregunta. Intenta de nuevo más tarde.";
    }
}

document.addEventListener("DOMContentLoaded", startGame);

function generateQuestion(questionData) {
    correctAnswer = questionData.correct_answer;
    let answers = [...questionData.incorrect_answers, correctAnswer].sort(() => Math.random() - 0.5);
    
    updateUI(questionData.question, answers, correctAnswer);
}

document.getElementById("answers").addEventListener("click", function(event) {
    if (event.target.classList.contains("answer-button")) {
        checkAnswer(event.target, event.target.textContent);
    }
});

function checkAnswer(button, selectedAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
    }
    highlightAnswer(button, selectedAnswer === correctAnswer, correctAnswer);
    showResult(score, highScore);
    
    setTimeout(startGame, 2000);
}

export { startGame, checkAnswer };