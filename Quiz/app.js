const questions = [
    {
        title: "Who invented C language?",
        options: ["Dennis", "Dennis Ritchie", "Ritchie", "Rome"],
        correct: "Dennis Ritchie",
        score: 1
    },
    {
        title: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: "4",
        score: 1
    },
    {
        title: "What is : 14 % 28?",
        options: ["28", "14", "0", "1"],
        correct: "14",
        score: 1
    },
    {
        title: "Which HTML tag is used to define an internal CSS?",
        options: ["Style", "Script", "Link", "None of these"],
        correct: "Style",
        score: 1
    },
    {
        title: "Which is the correct CSS syntax?",
        options: ["p{color:red}", "{p;color:red}", "{p:color=red(p)}", "p:color=red"],
        correct: "p{color:red}",
        score: 1
    },
    {
        title: "What is full form of DBMS?",
        options: ["Data Backup Management System", "Database Management System", "Digital Business Management System", "Distributed Base Management System"],
        correct: "Database Management System",
        score: 1
    },
    {
        title: " Which programming language is most commonly used in competitive programming due to its speed?",
        options: ["Python", "Java", "C++", "JavaScript"],
        correct: "C++",
        score: 1
    },
    {
        title: "What is the formula of sum a range of cells in Excel?",
        options: ["=ADD(A1:A10)", "=SUM(A1:A10)", "=TOTAL(A1:A10)", "=SUMMATION(A1:A10)"],
        correct: "=SUM(A1:A10)",
        score: 1
    },
    {
        title: "Change Decimal to Binary: 65?",
        options: ["1000001", "1000000", "1100001", "1010001"],
        correct: "1000001",
        score: 1
    },
    {
        title: `What is the output of the following C code?\n
    #include <stdio.h>\n
    int main() {\n
        int a = 5, b = 10;\n
        printf("%d", a + b);\n
        return 0;\n
    }`,
        options: ["10", "5", "15", "0"],
        correct: "15",
        score: 1
    }
];

let questionCount = 0;
let score = 0;

function loadQuestion() {
    const quizContainer = document.getElementById('quiz');
    const question = questions[questionCount];

    quizContainer.innerHTML = `
        <div class="question">${question.title}</div>
        <ul class="options">
            ${question.options.map((option, index) => `
                <li>
                    <input type="radio" name="option" id="option${index}" value="${option}">
                    <label for="option${index}">${option}</label>
                </li>
            `).join('')}
        </ul>
        <button id="submit-button">Submit Answer</button>
        <div id="feedback" style="margin-top:10px;"></div>
    `;

    document.getElementById('next-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'none';
}

function showFeedback(isCorrect) {
    const feedback = document.getElementById('feedback');
    feedback.innerText = isCorrect ? "Correct!" : "Incorrect!";
}
let p1 = document.querySelector(".p1");
let p2 = document.querySelector(".p2");
let p3 = document.querySelector(".p3");
let count1 = 0;
let count2 = 10;
let count3 = 59;
let timeId = 0;

function runningTime() {
    timeId = setTimeout(() => {
        if (count3 === 0) {
            count3 = 59;
            if (count2 === 0) {
                count2 = 59;
            } else {
                count2--;
            }
        } else {
            count3--;
        }
        p2.textContent = count2 < 10 ? `0${count2}` : count2;
        p3.textContent = count3 < 10 ? `0${count3}` : count3;

        runningTime();
    }, 1000);
}


runningTime();

function quizTime() {
    timeId = setTimeout(() => {
        count1++;
        p1.textContent = count1 < 10 ? `0${count1}` : count1;
        if (count1 === 60) {
            count1 = 0;
            p1.textContent = "00";
        }
        quizTime();
    }, 1000);
}
quizTime();

function time() {
    setInterval(() => {
        handleSubmit();
    }, 60000);
}
time();

function handleSubmit() {
    const options = document.querySelectorAll('input[name="option"]');
    let selectedOption;

    options.forEach(option => {
        if (option.checked) {
            selectedOption = option.value;
        }
    });

    // if (!selectedOption) {
    //     alert('Please select an option');
    //     return;
    // }

    const question = questions[questionCount];

    if (selectedOption === question.correct) {
        score += question.score;
        showFeedback(true);
    } else {
        showFeedback(false);
    }

    options.forEach(option => option.disabled = true);
    document.getElementById('submit-button').style.display = 'none';
    document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
    questionCount++;
    if (questionCount < questions.length) {
        p1.textContent = "00";
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = `
        <h2>Your Score: ${score}/${questions.length}</h2>
        <h3>Correct Answers:</h3>
        <ul>
            ${questions.map(q => `<li>${q.title} - Correct answer: ${q.correct}</li>`).join('')}
        </ul>
    `;
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'block';
}

function showFeedback(isCorrect) {
    const feedback = document.getElementById('feedback');
    if (isCorrect) {
        feedback.innerText = "Correct!";
        feedback.className = "correct";
    } else {
        feedback.innerText = "Incorrect!";
        feedback.className = "incorrect";
    }
}

function reset() {
    questionCount = 0;
    score = 0;

    count1 = 0;
    count2 = 10;
    count3 = 59;

    p1.textContent = "00";
    p2.textContent = count2 < 10 ? `0${count2}` : count2;
    p3.textContent = count3 < 10 ? `0${count3}` : count3;

    clearTimeout(timeId);
    runningTime();
    quizTime();

    loadQuestion();
}

function restartQuiz() {
    questionCount = 0;
    score = 0;
    reset();
    loadQuestion();
    document.getElementById('restart-button').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    document.getElementById('next-button').addEventListener('click', nextQuestion);
    document.getElementById('restart-button').addEventListener('click', restartQuiz);
    document.getElementById('quiz').addEventListener('click', (a) => {
        if (a.target.id === 'submit-button') {
            handleSubmit();
        }
    });
});