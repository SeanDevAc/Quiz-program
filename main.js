let quizData = [];
let currentQuestionIndex = 0;
let answeredQuestions = 0;
let totalQuestions = 0;

// Laad de CSV en kies een willekeurige vraag
function loadQuiz(filePath) {
  Papa.parse(filePath, {
    download: true,
    header: true,
    complete: function(results) {
      if (results && results.data && Array.isArray(results.data)) {
        quizData = results.data.filter(row => row.Vraag && row.Antwoord); // Filter lege rijen
        totalQuestions = quizData.length;
        if (quizData.length === 0) {
          console.error('Geen geldige quizvragen gevonden in de CSV.');
          document.getElementById('question').innerText = 'Geen vragen gevonden in de CSV.';
        } else {
          showNextQuestion();
        }
      } else {
        console.error('Fout bij het verwerken van de CSV:', results.errors);
        document.getElementById('question').innerText = 'Er is een probleem met het laden van de quiz.';
      }
    },
    error: function(error) {
      console.error('Fout bij het laden van de CSV:', error);
      document.getElementById('question').innerText = 'Kan de quizdata niet laden.';
    }
  });
}

// Toon de volgende vraag
function showNextQuestion() {
  if (answeredQuestions < totalQuestions) {
    showQuestionAtIndex(currentQuestionIndex);
    currentQuestionIndex++;
  } else {
    document.getElementById('finalMessage').innerText = 'Gefeliciteerd, je hebt alles beantwoord!';
  }
}

// Toon de vraag op basis van de huidige index
function showQuestionAtIndex(index) {
  currentQuestion = quizData[index];
  document.getElementById('question').innerText = currentQuestion.Vraag;
  document.getElementById('result').innerText = '';
  document.getElementById('answerInput').value = '';
}

// Controleer het antwoord
function checkAnswer() {
  const userAnswer = document.getElementById('answerInput').value.trim();
  const correctAnswer = currentQuestion.Antwoord.trim();

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    document.getElementById('result').innerText = 'Correct!';
    document.getElementById('result').style.color = 'green';
    answeredQuestions++;
    // Wacht een paar seconden en laad de volgende vraag
    setTimeout(showNextQuestion, 1000);
  } else {
    document.getElementById('result').innerText = `Fout!`;
    document.getElementById('result').style.color = 'red';
    // Wacht een paar seconden en laad de volgende vraag
    setTimeout(showNextQuestion, 2000);
  }
}

// Start de quiz
loadQuiz('quizzes/Oorlog.csv');
