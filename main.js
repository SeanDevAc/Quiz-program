document.getElementById('loadQuestions').addEventListener('click', function() {
    // Gebruik fetch om het quiz.txt bestand op te halen
    fetch('quiz.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Netwerkfout: ' + response.statusText);
            }
            return response.text();
        })
        .then(content => {
            displayQuestions(content);
        })
        .catch(error => {
            alert('Er is een fout opgetreden: ' + error.message);
        });
});

function displayQuestions(content) {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = ''; // Leeg de container

    const lines = content.split('\n');
    lines.forEach((line, index) => {
        const [question, answer] = line.split(',');
        if (question && answer) {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `<strong>Vraag ${index + 1}:</strong> ${question} <em>(Antwoord: ${answer})</em>`;
            questionsContainer.appendChild(questionDiv);
        }
    });
}