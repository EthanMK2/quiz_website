
function additionalQuestion() {  // closure to secure uniqueness of question/answers id's as items are deleted
    let quizList = document.getElementById("quiz-list")
    let questionNumber = 1
    return function () {
        let newQuestion = document.createElement('li')
        newQuestion.id = `${questionNumber}`
        newQuestion.className = "question"
        newQuestion.innerHTML = `
        <label for="${questionNumber}0">Question:</label>
        <input type="text" id="${questionNumber}0">
        <button onclick="deleteQuestion('${questionNumber}')">Delete</button>
        <br>
        <label for="${questionNumber}1">Answer:</label>
        <input type="text" id="${questionNumber}1">
        <br>
        <label for="${questionNumber}2">Option:</label>
        <input type="text" id="${questionNumber}2">
        <br>
        <label for="${questionNumber}3">Option:</label>
        <input type="text" id="${questionNumber}3">
        <br>
        <label for="${questionNumber}4">Option:</label>
        <input type="text" id="${questionNumber}4">
        `
        quizList.append(newQuestion)
        questionNumber++
    }
}

function deleteQuestion(id) {
    document.getElementById(id).remove()
}

function createQuiz() {  // based on how the html children are structured above
    const quizNameText = document.getElementById("quiz-name").value

    const quizList = document.getElementById("quiz-list")
    const questions = quizList.children
    
    let questionCount = 2
    let quizObject = {
        quizName: quizNameText,
        questions: {
            question1: {
                question: "",
                answer: "",
                wrongs: [],
            }
        }
    }

    for (let i = 0; i < questions.length; i++) {
        const childrenOfQuestions = questions[i].children
        const questionTextOfEach = childrenOfQuestions[1].value  // if structure changed above, these need a change too
        const questionAnswerOfEach = childrenOfQuestions[5].value
        let currentQuestionNumber = `question${1 + i}`

        quizObject.questions[`${currentQuestionNumber}`] = {}

        quizObject.questions[`${currentQuestionNumber}`].question = questionTextOfEach
        quizObject.questions[`${currentQuestionNumber}`].answer = questionAnswerOfEach

        quizObject.questions[`${currentQuestionNumber}`].wrongs = []

        for (let j = 6; j < childrenOfQuestions.length; j++) {
            if (childrenOfQuestions[j].tagName === "INPUT") {
                quizObject.questions[`${currentQuestionNumber}`].wrongs.push(childrenOfQuestions[j].value)
            }
        }
    }
    
    console.log(quizObject)

    let quizArray = localStorage.getItem("createdQuizzes")
    let createdQuizArray = JSON.parse(quizArray)
    createdQuizArray.push(quizObject)

    localStorage.setItem("createdQuizzes", JSON.stringify(createdQuizArray))
    location.href = 'index.html'
}

let addQuestion = additionalQuestion()
