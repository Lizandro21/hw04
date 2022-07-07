const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterTxt = document.getElementById('questionCounter')
const scoreTxt = document.getElementById('score')
console.log(choices);

let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {    
    question: "How do you get the type of arguments passed down to a function?",
    choice1: "Use typof Operator",
    choice2: "Use getof Operator",
    choice3: "Both of the above",
    choice4: "None of the above",
    answer: 1

},
{    
    question: "What built in method returns the length of a string?",
    choice1: "size()",
    choice2: "length()",
    choice3: "lengthof",
    choice4: "console.log(howlong)",
    answer: 2

},
{    
    question: "Which of the functions shown adds elements to the end of the array and returns the new length of the array?",
    choice1: "pop()",
    choice2: "None of these",
    choice3: "addEl()",
    choice4: "push()",
    answer: 4

},
{    
    question: "Which of the methods returns calling string value but coverted to lowercase?",
    choice1: "lowercaseRetrun()",
    choice2: "You have to make a new string",
    choice3: "toLowerCase()",
    choice4: ".lowercase",
    answer: 3

},
{    
    question: "Which of the following function of Boolean object returns the primitive value of the Boolean object?",
    choice1: "valueOf()",
    choice2: "toSource()",
    choice3: "returnValue()",
    choice4: "All of the above!",
    answer: 1

},
{    
    question: "Which of the following functions extracts a part of a string and returns it as a new string?",
    choice1: "extract()",
    choice2: "slice()",
    choice3: "cutOf()",
    choice4: "All of the above!()",
    answer: 2

},

]

const CORRECT_BONUS = 10
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    console.log(availableQuestions)
    getNewQuestion()
}
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('./end.html')
    }

    questionCounter++
    questionCounterTxt.innerText = questionCounter + '/' + MAX_QUESTIONS


    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)
    console.log(availableQuestions)
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false

        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        const classToApply =
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';


            if (classToApply === 'correct') {
                incrementScore(CORRECT_BONUS)
            }

            console.log(classToApply)

        console.log(selectedAnswer)
        selectedChoice.parentElement.classList.add(classToApply)
            setTimeout( () => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
            }, 500)
    })
})

incrementScore = num => {
    score +=num
    scoreTxt.innerText = score
}

startGame()