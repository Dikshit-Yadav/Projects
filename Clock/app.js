var numberHours = document.querySelector(".number_hours");
var secondsBar = document.querySelector(".seconds_bar");

var numberElement = [];
var barElement = [];

for (let i = 1; i <= 12; i++) {
  numberElement.push(`<span style="--index:${i}"><p>${i}</p></span>`);
  // console.log(numberElement);
}
numberHours.insertAdjacentHTML("afterbegin", numberElement.join(""));
console.log(numberHours);

for (let i = 1; i <= 60; i++) {
  barElement.push(`<span style="--index:${i}"><p></p></span>`);
}
secondsBar.insertAdjacentHTML("afterbegin", barElement.join(""));
console.log(numberHours);

const pinHours = document.querySelector(".pin.hour");
const pinMinutes = document.querySelector(".pin.minute");
const pinSeconds = document.querySelector(".pin.second");

function getCurrentTime() {
  let date = new Date();
  let currentHours = date.getHours();
  let currntMinutes = date.getMinutes();
  let currentSeconds = date.getSeconds();

  pinHours.style.transform = `rotate(${
    currentHours * 30 + currntMinutes / 2
  }deg)`;

  pinMinutes.style.transform = `rotate(${currntMinutes * 6}deg)`;

  pinSeconds.style.transform = `rotate(${currentSeconds * 6}deg)`;
}

getCurrentTime();

setInterval(getCurrentTime, 1000);
