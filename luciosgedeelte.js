
const ziecollecties = document.getElementById("ziecollecties")
const quizlist = document.getElementById("quizlist")
const questions = document.getElementById("questions")

ziecollecties.onclick = function (event) {
    event.preventDefault()
    quizlist.style.visibility = "visible"
    ziecollecties.style.display = "none"
    console.log("first event triggered")
}   

const quizitems = document.getElementsByClassName("listItem")

for (let i=0; i < quizitems.length; i++) {
    quizitems[i].onclick = function () {
        questions.style.display = "flex"
        quizlist.style.visibility = "hidden"
        console.log("second event triggered")
    }
}