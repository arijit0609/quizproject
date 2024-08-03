const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: 0 },
            { text: "Blue Whale", correct: 1 },
            { text: "Elephant", correct: 0 },
            { text: "Giraffe", correct: 0 },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: 1 },
            { text: "Bhutan", correct: 0 },
            { text: "Nepal", correct: 0 },
            { text: "Sri Lanka", correct: 0 },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: 0 },
            { text: "Thar", correct: 0 },
            { text: "Sahara", correct: 1 },
            { text: "Misor", correct: 0 },
        ]
    },
    {
        question: "Which is the largest continent in the world?",
        answers: [
            { text: "Africa", correct: 0 },
            { text: "Asia", correct: 1 },
            { text: "Arctic", correct: 0 },
            { text: "Australia", correct: 0 },
        ]
    },
    // Add more questions here...
    {
        question: "What is the capital city of Japan?",
        answers: [
            { text: "Seoul", correct: 0 },
            { text: "Tokyo", correct: 1 },
            { text: "Beijing", correct: 0 },
            { text: "Bangkok", correct: 0 },
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: 0 },
            { text: "Jane Austen", correct: 0 },
            { text: "Mark Twain", correct: 0 },
            { text: "William Shakespeare", correct: 1 },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: 0 },
            { text: "Mars", correct: 1 },
            { text: "Jupiter", correct: 0 },
            { text: "Venus", correct: 0 },
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: 1 },
            { text: "O2", correct: 0 },
            { text: "CO2", correct: 0 },
            { text: "NaCl", correct: 0 },
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: 0 },
            { text: "Pablo Picasso", correct: 0 },
            { text: "Leonardo da Vinci", correct: 1 },
            { text: "Claude Monet", correct: 0 },
        ]
    },
    {
        question: "What is the boiling point of water?",
        answers: [
            { text: "90°C", correct: 0 },
            { text: "100°C", correct: 1 },
            { text: "110°C", correct: 0 },
            { text: "120°C", correct: 0 },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    shuffleArray(questions);
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "1";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct == "1") {
                button.classList.add("correct");
            }
        });
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

startQuiz();
