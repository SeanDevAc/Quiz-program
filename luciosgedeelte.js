
const ziecollecties = document.getElementById("ziecollecties")
const quizlist = document.getElementById("quizlist")
const questions = document.getElementById("questions")

ziecollecties.onclick = function (event) {
    event.preventDefault()
    quizlist.style.display = "block"
    ziecollecties.style.display = "none"
}   