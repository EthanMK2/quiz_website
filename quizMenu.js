let timer = new Date()

const standardQuizzes = ["geography", "history", "french"]
const quizEl = document.getElementById("quiz-el")
let createdQuizzes = ["topology"]  // make from localStorage automatically

let standardPackage = localStorage.getItem("standardPackage")  // Backend Request?
standardPackage = JSON.parse(standardPackage)
console.log(standardPackage)

let selectedQuiz = sessionStorage.getItem("currentQuiz")
console.log(selectedQuiz)
let quizTitle = document.getElementById("quiz-title")
quizTitle.textContent = selectedQuiz.charAt(0).toUpperCase() + selectedQuiz.slice(1)

// prepares quiz string for innerHTML. makes and reserves slots for 4 option questions using random placement

function findQuiz(word) {
    for (let i = 0; i < standardQuizzes.length; i++) {
        if (word === standardQuizzes[i]) {
            console.log("found quiz in standardQuizzes")
            return true
        }
    }
    console.log("no quiz found...")
    return
}
if (findQuiz(selectedQuiz)) {
    questions = Object.values(standardPackage[selectedQuiz])
} else {
    let quizArr = JSON.parse(localStorage.getItem("createdQuizzes"))
    for (let i = 0; i < quizArr.length; i++) {
        if (quizArr[i].quizName == selectedQuiz) {
            questions = Object.values(quizArr[i].questions)
        }
    }
}

quizLength = questions.length
htmlQuizData = ""

for (let i = 0; i < quizLength; i++) {

    slots = [1, 2, 3, 4]
    orderOfQuestions = []
    while (slots.length != 0) {
        const randomIndex = Math.floor(Math.random() * slots.length)
        const randomSlot = slots[randomIndex]
        orderOfQuestions.push(randomSlot)
        slots.splice(randomIndex, 1)
    }

    const options = [questions[i].answer, questions[i].wrongs[0], questions[i].wrongs[1], questions[i].wrongs[2]]

    for (let k = 0; k < orderOfQuestions.length; k++) {
        num = orderOfQuestions[k]
        switch(num) {
            case 1:
                slotOne = options[k]
                break
            case 2:
                slotTwo = options[k]
                break
            case 3:
                slotThree = options[k]
                break
            case 4:
                slotFour = options[k]
                break
        }
    }

    htmlQuizData += `
    <div class="question-div-el">
        <li class="question-el"><p class="question-text">${questions[i].question}</p>
            <ul class="answers-ul-el">
                <li class="answer-el"> 
                    <label class="answer-label">
                        <input type="radio" name="${i}" id="${i}0"> <p id="${i}00">${slotOne}</p>
                    </label>
                </li>
                <li class="answer-el">
                    <label class="answer-label">
                        <input type="radio" name="${i}" id="${i}1"> <p id="${i}10">${slotTwo}</p>
                    </label>
                </li>
                <li class="answer-el"> 
                    <label class="answer-label">
                        <input type="radio" name="${i}" id="${i}2"> <p id="${i}20">${slotThree}</p>
                    </label>
                </li>
                <li class="answer-el">
                    <label class="answer-label">
                        <input type="radio" name="${i}" id="${i}3"> <p id="${i}30">${slotFour}</p>
                    </label>
                </li>
            </ul>
        </li>
    </div>
    `
}

// render quiz
quizEl.innerHTML = htmlQuizData


function checkAnswers() {  // this is where the back end request will go?
    // id's work as follows: "02" --> is question one, answer 3's input. "120" --> is question two, answer 3's text
    let submittedAnswers = {}
    let numCorrect = 0
    for (let i = 0; i < quizLength; i++) {
        for (let j = 0; j < 4; j++) {
            const ele = document.querySelector(`#\\3${i} \\3${j} `)  // finds which answer is selected (css only)
            if (ele.checked) {
                answerText = document.querySelector(`#\\3${i} \\3${j} \\30 `)  // finds the text of selected
                submittedAnswers[i] = `${answerText.textContent}`
                console.log(answerText.textContent)
            }
        }
    }
    console.log(submittedAnswers)

    for (let k = 0; k < quizLength; k++) {
        if (questions[k].answer === submittedAnswers[k]) {
            numCorrect++
        }
    }
    console.log(`Your grade: ${numCorrect}/${quizLength}`)
    if (localStorage.getItem("correct") && localStorage.getItem("attempted")) {
        let correctPreviousScore = localStorage.getItem("correct")
        let attemptedPreviousScore = localStorage.getItem("attempted")

        let correctScore = numCorrect + Number(correctPreviousScore)
        let attemptedScore = quizLength + Number(attemptedPreviousScore)

        localStorage.setItem("correct", correctScore.toString())
        localStorage.setItem("attempted", attemptedScore.toString())
    } 
    else {
        localStorage.setItem("correct", numCorrect.toString())
        localStorage.setItem("attempted", quizLength)
    }

    const submitDiv = document.getElementById("submit-div")
    const timeSpent = (new Date() - timer)/1000
    submitDiv.innerHTML = `
    <p>You Scored: ${numCorrect} out of ${quizLength} (${Math.round((numCorrect/quizLength) * 100)}%)</p>
    <p>You took ${timeSpent} seconds to complete the quiz.</p>
    <button id="return-btn" onclick="location.href='index.html'">Return To Home</button>
    `
}
