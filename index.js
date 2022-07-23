
const geoEl = document.getElementById("geography")
const historyEl = document.getElementById("history")
const frenchEl = document.getElementById("french")
const resetBtn = document.getElementById("reset-score-btn")

function setScore() {
    const correctEl = document.getElementById("correct")
    const attemptedEl = document.getElementById("attempted")
    if (localStorage.getItem("correct") && localStorage.getItem("attempted")) {
        correctEl.textContent = localStorage.getItem("correct")
        attemptedEl.textContent = localStorage.getItem("attempted")
    } 
    else {
        correctEl.textContent = "--"
        attemptedEl.textContent = "--"
    }
}

geoEl.addEventListener("click", function() {
    console.log("Geography")
    sessionStorage.setItem("currentQuiz", "geography")
})

historyEl.addEventListener("click", function() {
    console.log("History")
    sessionStorage.setItem("currentQuiz", "history")
})

frenchEl.addEventListener("click", function() {
    console.log("French")
    sessionStorage.setItem("currentQuiz", "french")
})

resetBtn.addEventListener("click", function() {
    localStorage.removeItem("correct")
    localStorage.removeItem("attempted")
    setScore()
})

function clickedUserQuiz(nameOfQuiz) {
    sessionStorage.setItem("currentQuiz", nameOfQuiz)
    location.href = "quizMenu.html"
}

standardPackage = {
    geography: {
        questionOne: {
            question: "What mountain range runs along South America?",
            answer: "Andes",
            wrongs: ["Atlas", "Appalacian", "Rockies"]
        },
        questionTwo: {
            question: "What body of water borders south west of Russia?",
            answer: "Black Sea",
            wrongs: ["Baltic Sea", "South China Sea", "Mediterranean Sea"]
        },
        questionThree: {
            question: "What desert is in western USA?",
            answer: "Mojave",
            wrongs: ["Sahara", "Gobi", "Arabian"]
        },
    },
    history: {
        questionOne: {
            question: "The Holy Roman Empire's territory was mainly modern ____?",
            answer: "Germany", 
            wrongs: ["France", "Italy", "Spain"]
        },
        questionTwo: {
            question: "Who was the president of the United States during World War One?",
            answer: "Woodrow Wilson",
            wrongs: ["Franklin D. Roosevelt", "George Washington", "Dwight D. Eisenhower"]
        },
        questionThree: {
            question: "Which empire was NOT dismantled after World War One?",
            answer: "French",
            wrongs: ["Ottoman", "Russian", "German"]
        },
        questionFour: {
            question: "What year was the Declaration of Independence signed?",
            answer: "1776",
            wrongs: ["1812", "1944", "1673"]
        }
    },
    french: {
        questionOne: {
            question: "\"Inondation\" means what in English?",
            answer: "Flood", 
            wrongs: ["Swarm", "Waterfall", "Wave"]
        },
        questionTwo: {
            question: "",
            answer: "",
            wrongs: []
        },
        questionThree: {
            question: "How many letters are silent in any French word?",
            answer: "Depends",
            wrongs: ["None of them", "Who knows?", "All of them"]
        }
    }
}

console.log()

setScore()

standard = JSON.stringify(standardPackage)
localStorage.setItem("standardPackage", standard)

if (!localStorage.getItem("createdQuizzes") || (JSON.parse(localStorage.getItem("createdQuizzes")).length == 0)) {
    localStorage.setItem("createdQuizzes", "[]")
    const createdEl = document.getElementById("user-quiz-list")
    createdEl.innerHTML = `<p>No quizzes created yet.</p>`
} else {
    let createdQuizList = JSON.parse(localStorage.getItem("createdQuizzes"))
    let htmlString = ``
    for (let i = 0; i < createdQuizList.length; i++) {
        htmlString += `
        <li>
            <button onclick="clickedUserQuiz('${createdQuizList[i].quizName}')">${createdQuizList[i].quizName}</button>
        </li>
        `
    }
    document.getElementById("user-quiz-list").innerHTML = htmlString
}
