
const geoEl = document.getElementById("geography")
const historyEl = document.getElementById("history")
const frenchEl = document.getElementById("french")


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


standardPackage = {
    geography: {
        questionOne: {
            question: "What mountain range runs along South America?",
            answer: "Andes",
            wrongs: ["Atlas", "Appalacian", "Rockies"],
        },
        questionTwo: {
            question: "What body of water borders south west of Russia?",
            answer: "Black Sea",
            wrongs: ["Baltic Sea", "South China Sea", "Mediterranean Sea"]
        }
    }
}

console.log()

standard = JSON.stringify(standardPackage)
localStorage.setItem("standardPackage", standard)
