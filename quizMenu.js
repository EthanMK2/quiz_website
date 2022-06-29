
const standardQuizzes = ["geography", "history", "french", "movies", "books"]
const quizEl = document.getElementById("quiz-questions-el")
let createdQuizzes = ["topology"]

let standardPackage = localStorage.getItem("standardPackage")
standardPackage = JSON.parse(standardPackage)

// console.log(standardPackage)
// console.log(Object.values(standardPackage.geography))
// use currentQuiz to display questions from standard quizzes or custom quizzez


let selectedQuiz = sessionStorage.getItem("currentQuiz")
console.log(selectedQuiz)
console.log(standardPackage)

// prepares quiz string for innerHTML. makes and reserves slots of 4 option questions for random placement
questions = Object.values(standardPackage[selectedQuiz])
htmlQuizData = ""
for (let i = 0; i < questions.length; i++) {
    
    slots = [1, 2, 3, 4]
    orderOfQuestions = []
    while (slots.length != 0) {
        let randomIndex = Math.floor(Math.random() * slots.length)
        let randomSlot = slots[randomIndex]
        console.log(randomSlot)
        orderOfQuestions.push(randomSlot)
        slots.splice(randomIndex, 1)
    }

    console.log("ORDER:" + orderOfQuestions)
    let options = []
    options.push(questions[i].answer)
    options.push(questions[i].wrongs[0])
    options.push(questions[i].wrongs[1])
    options.push(questions[i].wrongs[2])

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
    <li>${questions[i].question} 
        <li>${slotOne}</li>
        <li>${slotTwo}</li>
        <li>${slotThree}</li>
        <li>${slotFour}</li>
    </li>
    `
}

// render quiz
quizEl.innerHTML = htmlQuizData

// make basic quiz first
// make function that dynamically goes through each question until finished

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

