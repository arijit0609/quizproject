const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: 0 },
            { text: "Blue Whale", correct: 1 },
            { text: "Elephant", correct: 0 },
            { text: "Giraffe", correct: 0 },
        ]
    },
    {
        question: "Which is smallest country in the world?",
        answers: [
            { text: "Vatican city", correct: 1 },
            { text: " Bhutan", correct: 0},
            { text: "Nepal", correct: 0 },
            { text: "Srilanka", correct: 0 },
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: 0 },
            { text: "Thar", correct: 0 },
            { text: "Sahara", correct: 1 },
            { text: "Misor", correct: 0 },
        ]
    },
    {
        question: "Which is largest continent in the world?",
        answers: [
            { text: "Africa", correct: 0 },
            { text: "Asia", correct: 0 },
            { text: "Arctic", correct: 0 },
            { text: "Australia", correct: 1 },
        ]
    },

];

const questionElement=document.getElementById("question");
const answerbutton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currIndex=0,score=0;

function startQuiz()
{
    currIndex=0;
    score=0;
    showQuestion();
}
function showQuestion()
{
    resetState();
    let currquestion=questions[currIndex];
    let questionNo=currIndex+1;
   
    questionElement.innerHTML=questionNo+". "+currquestion.question;

    currquestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answer.correct==1)
        {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
}
function resetState()
{
    nextButton.style.display="none";
    while(answerbutton.firstChild)
    {
        answerbutton.removeChild(answerbutton.firstChild);
    }
}
function selectAnswer(e)
{
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==1;
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button=>{
        if(button.dataset.correct==1)
        {
            button.classList.add("correct");
        }
        button.disabled=1;
    });
    nextButton.style.display="block";
}
function showScore()
{
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML="play again";
    nextButton.style.display="block";
}
function handleNext()
{
    currIndex++;
    if(currIndex<questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currIndex<questions.length)
    {
        handleNext();
    }
    else{
        startQuiz();
    }
})
startQuiz();