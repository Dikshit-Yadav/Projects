let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let p3 = document.querySelector("#p3");
let p4 = document.querySelector("#p4");

let start = document.querySelector("#start");
let stp = document.querySelector("#Stop");
let lap = document.querySelector("#laps");

let count1 = "00";
let count2 = "00";
let count3 = "00";
let count4 = "00";

let timeId = 0;
let running = false;
function pt4() {
  timeId = setTimeout(() => {
    count4++;
    p4.textContent = count4;
    if (count4 === 100) {
      count4 = 0;
      p4.textContent = count4;
      count3++;
      p3.textContent = count3;
      if (count3 === 60) {
        count3 = 0;
        p3.textContent = count3;
        count2++;
        p2.textContent = count2;
        if (count2 === 60) {
          count2 = 0;
          p2.textContent = count2;
          count1++;
          p1.textContent = count1;
        }
      }
    }
    pt4();
  }, 10);
}

function startTimer() {
  running = true;
  pt4();
}
function stopTimer() {
  running = false;
  clearTimeout(timeId);
}
function createLap() {
  let laptime = document.createElement("li");
  laptime.textContent = `${p1.textContent}:${p2.textContent}:${p3.textContent}:${p4.textContent}`;
  lap.appendChild(laptime);
}
function reset() {
  count1 = "00";
  count2 = "00";
  count3 = "00";
  count4 = "00";
  lap.innerHTML = "";
  p1.textContent = count1;
  p1.textContent = count2;
  p3.textContent = count3;
  p4.textContent = count4;
}

start.addEventListener("click", function () {
  if (start.textContent === "Start") {
    startTimer();
    start.textContent = "Stop";
    stp.textContent = "Lap";
  } else {
    stopTimer();
    start.textContent = "Start";
    stp.textContent = "Reset";
  }
});

stp.addEventListener("click", function () {
  if (stp.textContent === "Lap") {
    createLap();
  } else if (stp.textContent === "Reset") {
    reset();
  }
});
let style = document.createElement("style");
style.innerHTML = `
li {
  list-style: none;
  width: 215px;
  font-size: 40px;
  color: #0776de;
  margin-top: 10px;
  margin-left: 500px;
  padding: 10px;
  border-radius: 30px;
  display: block;
  box-shadow: 6px -6px 8px #9d9d9d,
      -6px 6px 8px #ffffff;
  position: relative;
  left: 38%;
  bottom: 450px;
}`;
document.head.appendChild(style);