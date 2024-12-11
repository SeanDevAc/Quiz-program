document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.listItem');
    const quizContainer = document.getElementById('quizContainer');
    const questionText = document.getElementById('questionText');
    const answerBox = document.getElementById('answerBox');
    const introText = document.getElementsByClassName("introText");
    const quizList = document.getElementsByClassName("quizList");
    const resultContainer = document.getElementById('resultContainer'); // This will display the result at the end

    let currentQuestions = []; // To store the current quiz questions
    let currentQuestionIndex = 0; // To track the current question index
    let correctAnswersCount = 0; // To track the number of correct answers

    // Load previous answers from localStorage
    const storedAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || [];

    listItems.forEach(item => {
        item.addEventListener('click', async () => {
            const category = item.id; // Get the ID of the clicked category (e.g., 'oorlog')
            const csvFile = `${category}.csv`; // Construct the file name
            const questions = await loadCSV(csvFile); // Load and parse the CSV file

            if (questions.length > 0) {
                currentQuestions = questions; // Store the questions for the selected category
                currentQuestionIndex = 0; // Reset to the first question

                questionText.textContent = currentQuestions[currentQuestionIndex].question; // Display the first question
                quizContainer.style.visibility = 'visible'; // Show the quiz container

                // Hide the introText and quizList
                if (introText.length > 0) introText[0].style.display = 'none';
                if (quizList.length > 0) quizList[0].style.display = 'none';

                // Load the answer from stored answers (if any)
                answerBox.value = storedAnswers[currentQuestionIndex] || ''; // Set the answer for this question
            } else {
                alert('No questions available for this category.');
            }
        });
    });

    // Event listener for checking the answer when pressing Enter
    answerBox.addEventListener('keydown', event => {
        if (event.key === 'Enter') { // Check if Enter key is pressed
            checkAnswer(); // Call the function to check the answer
        }
    });

    // Event listener for "Previous Question" button (Terug)
    const previousQuestionButton = document.getElementById('previousQuestion');
    previousQuestionButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--; // Decrease the question index to go back to the previous question
            questionText.textContent = currentQuestions[currentQuestionIndex].question; // Show the previous question
            answerBox.value = storedAnswers[currentQuestionIndex] || ''; // Load the stored answer for the previous question
        } else {
            alert('You are already at the first question.');
        }
    });

    // Event listener for "Next Question" button (Volgende)
    const nextQuestionButton = document.getElementById('nextQuestion');
    nextQuestionButton.addEventListener('click', () => {
        // Store the current answer before moving to the next question
        storedAnswers[currentQuestionIndex] = answerBox.value.trim(); // Save the answer
        localStorage.setItem('quizAnswers', JSON.stringify(storedAnswers)); // Save all answers to localStorage

        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++; // Increase the question index to move to the next question
            questionText.textContent = currentQuestions[currentQuestionIndex].question; // Show the next question
            answerBox.value = storedAnswers[currentQuestionIndex] || ''; // Load the stored answer for the next question
        } else {
            // Calculate the result
            const result = `${correctAnswersCount} / ${currentQuestions.length}`; // Correct answers / total questions
            resultContainer.textContent = `Your result: ${result}`; // Display the result

            quizContainer.style.visibility = 'hidden'; // Hide the quiz container
            resultContainer.style.visibility = 'visible'; // Show the result container

            if (introText.length > 0) introText[0].style.display = 'block'; // Show the intro text
            if (quizList.length > 0) quizList[0].style.display = 'block'; // Show the quiz list
        }
    });

    // Function to check the answer and show the next question
    function checkAnswer() {
        const userAnswer = answerBox.value.trim().toLowerCase(); // Get the user's input, trimmed and in lowercase
        const correctAnswer = currentQuestions[currentQuestionIndex].answer.toLowerCase(); // Correct answer in lowercase

        if (userAnswer === correctAnswer) {
            correctAnswersCount++; // Increment the correct answers count
        }

        // Store the current answer before moving to the next question
        storedAnswers[currentQuestionIndex] = answerBox.value.trim(); // Save the answer
        localStorage.setItem('quizAnswers', JSON.stringify(storedAnswers)); // Save answers to localStorage

        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++; // Move to the next question
            questionText.textContent = currentQuestions[currentQuestionIndex].question; // Show the next question
            answerBox.value = storedAnswers[currentQuestionIndex] || ''; // Load the stored answer for the next question
        } else {
            // Calculate the result
            const result = `${correctAnswersCount} / ${currentQuestions.length}`; // Correct answers / total questions
            resultContainer.textContent = `Your result: ${result}`; // Display the result

            quizContainer.style.visibility = 'hidden'; // Hide the quiz container
            resultContainer.style.visibility = 'visible'; // Show the result container

            if (introText.length > 0) introText[0].style.display = 'block'; // Show the intro text
            if (quizList.length > 0) quizList[0].style.display = 'block'; // Show the quiz list
        }
    }
});

// Function to load and parse the CSV file
async function loadCSV(fileName) {
    try {
        const response = await fetch(fileName); // Fetch the CSV file
        const data = await response.text(); // Read it as text
        return parseCSV(data); // Parse the CSV data
    } catch (error) {
        console.error('Error loading CSV:', error);
        return [];
    }
}

// Function to parse CSV into an array of questions and answers
function parseCSV(csvData) {
    const lines = csvData.split('\n'); // Split by line
    console.log('CSV lines:', lines); // Debugging

    return lines
        .map(line => {
            const parts = line.split(','); // Split by comma
            if (parts.length < 2) {
                console.warn('Skipping malformed line:', line); // Warn about issues
                return null; // Skip this line
            }
            const [question, answer] = parts; // Extract question and answer
            if (!question || !answer) {
                console.warn('Skipping line with missing data:', line); // Warn about missing data
                return null; // Skip this line
            }
            return {
                question: question.trim(),
                answer: answer.trim(),
            };
        })
        .filter(item => item !== null); // Remove null entries
}
