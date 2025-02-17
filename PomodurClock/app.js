const timeDisplay = document.querySelector('.time');
const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');

const inputSession = document.getElementById('inputSession');
const inputBreak = document.getElementById('inputBreak');

const increaseSessionBtn = document.querySelector('.increaseSession');
const decreaseSessionBtn = document.querySelector('.decreaseSession');
const increaseBreakBtn = document.querySelector('.increaseBreak');
const decreaseBreakBtn = document.querySelector('.decreaseBreak');

let sessionTime = parseInt(inputSession.value) * 60;
let breakTime = parseInt(inputBreak.value) * 60;
let isSession = true;
let sessionCount = 0;
let breakCount = 0;
let timerInterval;

function updateTimerDisplay() {
    let minutes = Math.floor(sessionTime / 60);
    let seconds = sessionTime % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    let statusText = isSession ? `Session ${sessionCount}` : `Break ${breakCount}`;
    document.querySelector('.session-status').textContent = statusText;
}

function startTimer() {
    if (timerInterval) return;

    if (isSession) {
        sessionCount++;
    } else {
        breakCount++;
    }

    updateTimerDisplay();

    timerInterval = setInterval(() => {
        if (sessionTime > 0) {
            sessionTime--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;

            if (isSession) {
                startBreak();
            } else {
                startNewSession();
            }
        }
    }, 1000);
}

function startBreak() {
    isSession = false;
    sessionTime = parseInt(inputBreak.value) * 60;
    updateTimerDisplay();
    startTimer();
}

function startNewSession() {
    isSession = true;
    sessionTime = parseInt(inputSession.value) * 60;
    updateTimerDisplay();
    startTimer();
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isSession = true;
    sessionCount = 0;
    breakCount = 0;
    sessionTime = parseInt(inputSession.value) * 60;
    updateTimerDisplay();
}

function updateSessionTime(value) {
    let sessionMinutes = parseInt(inputSession.value) + value;
    if (sessionMinutes >= 1) {
        inputSession.value = sessionMinutes;
        if (isSession) {
            sessionTime = sessionMinutes * 60;
            updateTimerDisplay();
        }
    }
}

function updateBreakTime(value) {
    let breakMinutes = parseInt(inputBreak.value) + value;
    if (breakMinutes >= 1) {
        inputBreak.value = breakMinutes;
        if (!isSession) {
            sessionTime = breakMinutes * 60;
            updateTimerDisplay();
        }
    }
}

inputSession.addEventListener('input', () => {
    let value = parseInt(inputSession.value);
    if (!isNaN(value) && value >= 1) {
        sessionTime = value * 60;
        if (isSession) updateTimerDisplay();
    }
});

inputBreak.addEventListener('input', () => {
    let value = parseInt(inputBreak.value);
    if (!isNaN(value) && value >= 1) {
        breakTime = value * 60;
        if (!isSession) updateTimerDisplay();
    }
});

increaseSessionBtn.addEventListener('click', () => updateSessionTime(1));
decreaseSessionBtn.addEventListener('click', () => updateSessionTime(-1));
increaseBreakBtn.addEventListener('click', () => updateBreakTime(1));
decreaseBreakBtn.addEventListener('click', () => updateBreakTime(-1));

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateTimerDisplay();
