
const standardQuizzes = ["geography", "history", "french", "movies", "books"]
const quizEl = document.getElementById("quiz-el")
let createdQuizzes = ["topology"]  // make from localStorage automatically

let standardPackage = localStorage.getItem("standardPackage")
standardPackage = JSON.parse(standardPackage)

let selectedQuiz = sessionStorage.getItem("currentQuiz")
console.log(selectedQuiz)
console.log(standardPackage)

// prepares quiz string for innerHTML. makes and reserves slots for 4 option questions using random placement
questions = Object.values(standardPackage[selectedQuiz])
htmlQuizData = ""
for (let i = 0; i < questions.length; i++) {

    slots = [1, 2, 3, 4]
    orderOfQuestions = []
    while (slots.length != 0) {
        const randomIndex = Math.floor(Math.random() * slots.length)
        const randomSlot = slots[randomIndex]
        console.log(randomSlot)
        orderOfQuestions.push(randomSlot)
        slots.splice(randomIndex, 1)
    }

    console.log("ORDER:" + orderOfQuestions)
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
                        <input type="radio" name="${i}" id="${i}0"> <p>${slotOne}</p>
                    </label>
                </li>
                <li class="answer-el">
                    <label class="answer-label">
                        <input type="radio" name="${i}"> <p>${slotTwo}</p>
                    </label>
                </li>
                <li class="answer-el"> 
                    <label class="answer-label">
                        <input type="radio" name="${i}"> <p>${slotThree}</p>
                    </label>
                </li>
                <li class="answer-el">
                    <label class="answer-label">
                        <input type="radio" name="${i}"> <p>${slotFour}</p>
                    </label>
                </li>
            </ul>
        </li>
    </div>
    `
}

// render quiz
quizEl.innerHTML = htmlQuizData

function checkAnswer() {
    const ele = document.querySelector('#\\30 \\30 ')  // I hate unicode. 
    console.log(ele.textContent)  // RETURN WORK HERE, how the heck am I gonna gather the answers properly?
    // GIT commit? made selecting for questions
    const allChecked = document.querySelectorAll('.answer-label.checked')
    console.log(allChecked)
}

// will be needed for "questions" variable
function findQuiz(word) {
    for (let i = 0; i < standardQuizzes.length; i++) {
        if (word === standardQuizzes[i]) {
            // startQuiz(word)
            console.log("found quiz in standardQuizzes")
            return
        }
    }
    for (let i = 0; i < createdQuizzes.length; i++) {
        if (word === createdQuizzes[i]) {
            // startQuiz(word)
            console.log("found quiz in createdQuizzes")
            return
        }
    }
    console.log("no quiz found...")
    return
}

function submitAndCheckAnswers() {
    // given length of the quiz, loop by querySelector using (XY) as ID's, where x is question, y is answer.
}

function writeThing() {
    console.log("clicked, gather info")
}
