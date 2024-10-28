
const ziecollecties = document.getElementById("ziecollecties")
const quizlist = document.getElementById("quizlist")
const questions = document.getElementById("questions")

ziecollecties.onclick = function (event) {
    event.preventDefault()
    quizlist.style.display = "block"
    ziecollecties.style.display = "none"
}   

const quizitems = document.getElementsByClassName("listItem")

for (let i=0; i < quizitems.length; i++) {
    quizitems[i].onclick = function () {
        questions.style.display = "block"
        quizlist.style.display = "none"
    }
}