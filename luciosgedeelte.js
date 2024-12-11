document.addEventListener('DOMContentLoaded', () => {
    const quizList = document.querySelectorAll('.listItem');
    const quizContainer = document.getElementById('quizContainer');
    const questionText = document.getElementById('questionText');

    quizList.forEach(item => {
        item.addEventListener('click', async () => {
            const category = item.id; // Get the ID of the clicked category (e.g., 'oorlog')
            const csvFile = `${category}.csv`; // Construct the file name
            const questions = await loadCSV(csvFile); // Load and parse the CSV file

            if (questions.length > 0) {
                questionText.textContent = questions[0].question; // Display the first question
                quizContainer.style.visibility = 'visible'; // Show the quiz container
            } else {
                alert('No questions available for this category.');
            }
        });
    });
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


