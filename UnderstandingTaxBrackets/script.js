//Need: start the quiz and have the questions appear
const startButton = document.getElementById("start_btn")
const nextButton = document.getElementById("next_btn")
const questionContainerElement = document.getElementById("question_container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer_btns")
let shuffledQuestions, currentQuestionIndex


startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    nextQuestion()
})

function startGame() {
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5) //Shuffles our questions for us
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    nextQuestion()
}


//Need: set the next question

function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) { // Only setting this if the answer is correct, making it easier to check for right versus wrong later
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button) //Adds the answer buttons
    })
}

function resetState() {
    clearStatusClass(document.body) // this changes the background color back to neutral as the "next" button is clicked
    nextButton.classList.add("hide") //this hides the "next" button while answers are being chosen
    while (answerButtonsElement.firstChild) { //if there's a child inside of the answer button elements, we want to remove it
        answerButtonsElement.removeChild(answerButtonsElement.firstChild) //removes the first child for the answer element
    }
}


//Need: change the color indicator from neutral to right/wrong based on selected answers

function selectAnswer(quiz_event) {
    const selectedButton = quiz_event.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) { //If we are out of questions, hide the "next" button and show "restart the quiz"
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart the Quiz"
        startButton.classList.remove("hide")
    }
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}


function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}


const questions = [
    {
        question: "What is 2+2?",
        answers: [
            { text: "4", correct: true },
            { text: "22", correct: false }
        ]
    },
    {
        question: "Who is the bab?",
        answers: [
            { text: "Scremblay", correct: false },
            { text: "Toby", correct: true },
            { text: "Peter", correct: false },
            { text: "Ollie", correct: true }
        ]
    },
    {
        question: "If Oliver Waffles' salary is $87,000 per year, how much of his salary is taxed at 24%?",
        answers: [
            { text: "-$86,376", correct: false },
            { text: "$20,880", correct: false },
            { text: "$624", correct: true },
            { text: "$87,000", correct: false }
        ]
    }
]