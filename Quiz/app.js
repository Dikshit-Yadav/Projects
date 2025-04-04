let questions = [
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
        title: "Which HTML tag is used to define an leternal CSS?",
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
    let main() {\n
        let a = 5, b = 10;\n
        prletf("%d", a + b);\n
        return 0;\n
    }`,
        options: ["10", "5", "15", "0"],
        correct: "15",
        score: 1
    }
];

const userAnswers = [];
let questionCount = 0;
let score = 0;
let running = false;
let count1 = 59;
let count2 = 10;
let count3 = 59;
let timeId = 0;
let timesetInterval;

let p1 = document.querySelector(".p1");
let p2 = document.querySelector(".p2");
let p3 = document.querySelector(".p3");
let start = document.querySelector(".start");
let quizcontainer = document.querySelector(".quiz-container");

function shuffleQuestions() {
    return [...questions].sort(() => Math.random() - 0.5);
}


start.addEventListener("click", () => {
    questions = shuffleQuestions(); 
    quizcontainer.style.visibility = "visible";
    start.style.display = "none";
    running = true;
    runningTime();
    quizTime();
    loadQuestion();
});

function runningTime() {
    timeId = setTimeout(() => {
        if (count3 == 0) {
            count3 = 59;
            if (count2 == 0) {
                showResults();
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

function quizTime() {
    timesetInterval = setInterval(() => {
        if (count1 == 0) {
            handleSubmit();
            nextQuestion();
        } else {
            count1--;
            p1.textContent = count1 < 10 ? `0${count1}` : count1;
        }
    }, 1000);
}

function stopTimesetInterval() {
    clearInterval(timeId);
    clearInterval(timesetInterval);
}

function loadQuestion() {
    const quizContainer = document.getElementById('quiz');
    const question = questions[questionCount];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.textContent = question.title;

    const optionsList = document.createElement('ul');
    optionsList.className = 'options';

    question.options.forEach((option, index) => {
        const listItem = document.createElement('li');

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.id = `option${index}`;
        input.value = option;

        const label = document.createElement('label');
        label.htmlFor = `option${index}`;
        label.textContent = option;

        listItem.appendChild(input);
        listItem.appendChild(label);
        optionsList.appendChild(listItem);
    });

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsList);

    const submitButton = document.createElement('button');
    submitButton.id = 'submit-button';
    submitButton.textContent = 'Submit Answer';
    quizContainer.appendChild(submitButton);

    const nextButton = document.createElement('button');
    nextButton.id = 'next-button';
    nextButton.textContent = 'Next Question';
    nextButton.style.display = 'none';
    quizContainer.appendChild(nextButton);

    document.getElementById('next-button').addEventListener('click', nextQuestion);
}


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

    userAnswers.push({
        question: question.title,
        correctAnswer: question.correct,
        userAnswer: selectedOption || "No Answer"
    });

    if (selectedOption === question.correct) {
        score += question.score;
    } 

    options.forEach(option => option.disabled = true);
    document.getElementById('submit-button').style.display = 'none';
    document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
    questionCount++;
    if (questionCount < questions.length) {
        p1.textContent = "59";
        count1 = 59;
        loadQuestion();
    } else {
        // stopTimer(); 
        stopTimesetInterval();
        running = false;
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.style.position = "relative";
    quizContainer.style.bottom = "50px";

    const header = document.querySelector("h1");
    header.style.position = "relative";
    header.style.bottom = "70px";
    quizContainer.innerHTML = '';

    const scoreHeading = document.createElement('h2');
    scoreHeading.textContent = `Your Score: ${score}/${questions.length}`;
    quizContainer.appendChild(scoreHeading);

    const answersHeading = document.createElement('h3');
    answersHeading.textContent = 'Your Answers:';
    quizContainer.appendChild(answersHeading);

    const answersList = document.createElement('ul');

    userAnswers.forEach((answer) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${answer.question}</strong> <br> 
            Your Answer: <span style="color: ${answer.userAnswer === answer.correctAnswer ? 'green' : 'red'}">
            ${answer.userAnswer || "No Answer"}</span> <br>

            Correct Answer: <span style="color: green;">${answer.correctAnswer}</span>`;

        answersList.appendChild(listItem);
    });

    quizContainer.appendChild(answersList);

    document.getElementById('next-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'block';

    stopTimesetInterval();
}


function reset() {
    questionCount = 0;
    score = 0;
    count1 = 59;
    count2 = 10;
    count3 = 59;
    p1.textContent = "59";
    p2.textContent = count2 < 10 ? `0${count2}` : count2;
    p3.textContent = count3 < 10 ? `0${count3}` : count3;
    clearTimeout(timeId);
    runningTime();
    quizTime();
    loadQuestion();
}

function restartQuiz() {
    document.getElementById('restart-button').style.display = 'none';
    questionCount = 0;
    userAnswers.length = 0;
    score = 0;
    questions = shuffleQuestions();
    reset();
}
document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    document.getElementById('next-button').addEventListener('click', nextQuestion);
    document.getElementById('restart-button').addEventListener('click', restartQuiz);
    document.getElementById('quiz').addEventListener('click', (a) => {
        if (a.target.id === 'submit-button') {
            handleSubmit();
        }
    });
});