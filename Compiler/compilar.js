const codeEditor = document.getElementById('codeEditor');
const languageSelect = document.getElementById('languageSelect');
const comBtn = document.getElementById('comBtn');
const output = document.getElementById('output');
let codeId;
let intervalId;

comBtn.addEventListener('click', () => {
    const cod = codeEditor.value;
    const languaId = languageSelect.value;
    const data = {
        "code": cod,
        "langId": languaId
    };
    console.log(data);
    if (!cod) {
        alert('Please write your code');
        return;
    }

    output.textContent = '';
    clearInterval(intervalId);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://course.codequotient.com/api/executeCode');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        codeId = data.codeId;
        intervalId = setInterval(() => {
            result(codeId);
        }, 1000);
    };
    xhr.send(JSON.stringify(data));
});

function result(codeId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://course.codequotient.com/api/codeResult/${codeId}`);
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        const result=JSON.parse(data.data);
        output.textContent = result.output;
    };
    xhr.send();
}
