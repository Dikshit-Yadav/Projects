const questionList = document.getElementById('questionList');
const searchInput = document.getElementById('searchInput');
const questionForm = document.getElementById('questionForm');
const right = document.querySelector(".right");
const newform = document.querySelector("#newform");
const questionDetails = document.getElementById('questionDetails');
const questions = JSON.parse(localStorage.getItem('questions')) || [];
let selectedQuestionIndex = null;

function saveToLocalStorage() {
    localStorage.setItem('questions', JSON.stringify(questions));
}

questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('questionTitle').value;
    const text = document.getElementById('questionText').value;

    if (title === '' || text === '') {
        alert('Please fill in both the title and text fields.');
        return;
    }

    addQuestion(title, text);
    questionForm.reset();
});

function addQuestion(title, text) {
    const question = { title, text, responses: [] };
    questions.push(question);
    saveToLocalStorage();
    displayQuestions();
}

function displayQuestions(filteredQuestions = questions) {
    questionList.innerHTML = '';
    filteredQuestions.forEach((q, index) => {
        const li = document.createElement('li');
        li.textContent = q.title;
        li.style.cursor = 'pointer';

        if (selectedQuestionIndex === index) {
            li.classList.add('selected');
        } else {
            li.classList.remove('selected');
        }

        li.addEventListener('click', () => {
            selectedQuestionIndex = index;
            showQuestionDetails(index);
        });

        questionList.appendChild(li);
    });
}

function showQuestionDetails(index) {
    right.style.visibility = "hidden";
    questionDetails.style.visibility = "visible";
    questionDetails.style.display = "block";
    const question = questions[index];
    questionDetails.innerHTML = `
        <p class="question-title">Question</p>
        <div class="question-info">
            <p class="question-title-text">${question.title}</p>  
            <p class="question-text">${question.text}</p>
        </div>
        <form id="responseForm" class="response-form">
            <input type="text" id="responseName" placeholder="Name" class="response-input" required>
            <textarea id="responseComment" placeholder="Comment" class="response-textarea" required></textarea>
            <button type="submit" class="response-submit">Submit Response</button>
        </form>
        <button onclick="resolveQuestion(${index})" class="resolve-button">Resolve</button>
        <button onclick="toggleResponses(${index})" class="toggle-responses-button">Show/Hide Responses</button>
        <div id="responseList" class="response-list"></div>
    `;

    const responseForm = document.getElementById('responseForm');
    responseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const responseName = document.getElementById('responseName').value.trim();
        const responseComment = document.getElementById('responseComment').value.trim();

        if (responseName === '' || responseComment === '') {
            alert('Please fill in both the name and comment fields.');
            return;
        }

        addResponse(index, responseName, responseComment);
        responseForm.reset();
    });

    displayResponses(index);
}

function addResponse(index, name, comment) {
    questions[index].responses.push({ name, comment });
    saveToLocalStorage();
    displayResponses(index);
}

function displayResponses(index) {
    const responseList = document.getElementById('responseList');
    responseList.innerHTML = '';
    questions[index].responses.forEach(response => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${response.name}:</strong> <p>${response.comment}</p>`;
        responseList.appendChild(div);
    });
}

function toggleResponses(index) {
    const responseList = document.getElementById('responseList');
    responseList.style.display = responseList.style.display === 'none' ? 'block' : 'none';
}

function resolveQuestion(index) {
    questions.splice(index, 1);
    saveToLocalStorage();
    selectedQuestionIndex = null;
    displayQuestions();
    questionDetails.innerHTML = '';
    questionDetails.style.display = "none";
    right.style.display = "flex";
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredQuestions = questions.filter(q =>
        q.title.toLowerCase().includes(searchTerm)
    );
    displayQuestions(filteredQuestions);
});

displayQuestions();

newform.addEventListener('click', () => {
    right.style.visibility = "visible";
    questionDetails.style.display = "none";
});

const style = document.createElement('style');
style.textContent = `
    body {
        font-family: Arial, sans-serif;
        margin: 10px;
        padding: 0;
        box-sizing: border-box;
    }

    .selected {
        background-color: #e0e0e0;
    }

    .question-info {
        background: rgba(244, 234, 234, 0.628);
        padding: 20px;
        border-radius: 10px;
    }

    .question-title {
        font-size: 2rem;
        color: #333;
        margin: 0;
    }

    .question-title-text {
        font-size: 1.5rem;
        color: #333;
        margin: 0;
    }

    .question-text {
        font-size: 1.2rem;
        color: #666;
        margin: 0;
    }

    .response-form {
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
        background: #f9f9f9;
    }

    .response-input {
        width: 100%;
        height: 40px;
        padding: 5px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }

    .response-textarea {
        width: 100%;
        height: 150px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
        resize: vertical;
    }

    .response-submit {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .response-submit:hover {
        background-color: #45a049;
    }

    .resolve-button, .toggle-responses-button {
        background-color: #007BFF;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 10px;
    }

    .resolve-button:hover, .toggle-responses-button:hover {
        background-color: #0056b3;
    }

    .response-list {
        margin-top: 20px;
    }

    .response-list div {
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }

    .response-list div:last-child {
        border-bottom: none;
    }
`;
document.head.appendChild(style);

displayQuestions();