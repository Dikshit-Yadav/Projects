
const questionList = document.getElementById('questionList'); 
const searchInput = document.getElementById('searchInput'); const questionForm = document.getElementById('questionForm');
const questionDetails = document.getElementById('questionDetails');


const questions = []; questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('questionTitle').value;
    const text = document.getElementById('questionText').value;
    addQuestion(title, text);

    questionForm.reset();
});



function addQuestion(title, text) {
    const question = { title, text }; questions.push(question); displayQuestions();
}


function displayQuestions() {
    questionList.innerHTML = ''; questions.forEach((q, index) => {
        const li = document.createElement('li'); li.textContent = q.title;
        li.addEventListener('click', () => showQuestionDetails(index)); questionList.appendChild(li);
    });
}



function showQuestionDetails(index) {
    const question = questions[index]; questionDetails.innerHTML = `
<h3>${question.title}</h3>
<p>${question.text}</p>
 
<form id="responseForm">
<input type="text" id="responseName" placeholder="Subject" style="position: relative; bottom: 100px;height:25px; " required>
<textarea id="responseComment" placeholder="Question" style="position: relative;top:38px;right:175px; "rows="7" cols="40" required></textarea>
<button type="submit" style=" position :relative; top:60px; right:300px; ">Submit Response</button>
</form>
<button onclick="resolveQuestion(${index})"style="position: relative;top:30px;left:0px; ">Resolve</button>
`;

}



function resolveQuestion(index) {
    questions.splice(index, 1); displayQuestions(); questionDetails.innerHTML = '';
}


questionDetails.addEventListener('submit', (e) => {
    e.preventDefault();
    const responseName = document.getElementById('responseName').value;

    const responseComment = document.getElementById('responseComment').value;
});


searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredQuestions = questions.filter(q =>
        q.title.toLowerCase().includes(searchTerm)

    );
    displayQuestions(filteredQuestions);


})

displayQuestions();

