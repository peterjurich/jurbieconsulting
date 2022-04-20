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
        question: "Toby earned a yearly salary of $40,525 - the exact limit of the 12% tax bracket. Then, his boss gave him a raise of $1000. Which of the following is true?",
        answers: [
            { text: "Toby will be taxed at 12% on the $40,525, and 22% on the $1000.", correct: true },
            { text: "Toby will be taxed at 0% on the $40,525, and 22% on the $1000.", correct: false },
            { text: "Toby will be taxed at 12% on the $40,525, and 0% on the $1000.", correct: false },
            { text: "Toby will be taxed at 22% on the entire $41,525.", correct: false }
        ]
    },
    {
        question: "Emily was making a yearly salary of $9,950, and because this fell within the 10% tax bracket, her taxes totaled $995. The next year, thanks to a $2000 raise, she's making $11,950. Only $2000 is taxed at %12, so how much total tax will she pay?",
        answers: [
            { text: "$2995 - so the raise isn't worth it", correct: false },
            { text: "10% of $9,950, minus 12% of $2,000 = $755 total taxes", correct: false },
            { text: "$995 (from last year's taxes) multiplied by 12% = $119.4", correct: false },
            { text: "10% of $9,950, plus 12% of $2,000 = $1235 total taxes", correct: true }
        ]
    },
    {
        question: "If Oliver's salary is $87,000 per year, how much of his salary is taxed at 24%?",
        answers: [
            { text: "-$86,376", correct: false },
            { text: "$20,880", correct: false },
            { text: "$625", correct: true },
            { text: "$87,000", correct: false }
        ]
    }
]