
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
