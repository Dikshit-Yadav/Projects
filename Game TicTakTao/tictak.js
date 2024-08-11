let btn = document.querySelectorAll(".btn");
let reset = document.querySelector(".reset");
let win = document.querySelector(".win");
let trueO = true;
let arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function winContainer(a) {
    win.style.display = "block";
    win.style.color = "#F8DE7E"
    win.style.boxshadow = `16px 16px #E3FF00`
    win.textContent = `congratulations! ${a} Won Game`
}
btn.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (trueO) {
            btn.textContent = "X";
            trueO = false;
            btn.disabled = true
        }
        else {
            btn.textContent = "O";
            trueO = true;
            btn.disabled = true
        } check()
    });

});

const check = () => {
    let tie = true;
    for (let i of arr) {
        let a = btn[i[0]].textContent;
        let b = btn[i[1]].textContent;
        let c = btn[i[2]].textContent;
        if (a !== "" && b !== "" && c != "") {
            if (a == b && b == c) {
                reset.disabled = false
                winContainer(a);
                for (let i of btn) {
                    i.disabled = true
                }
                tie = false;
            }
            else{
                tie = false;
            }
        }
        if (tie) {
            win.style.display = "block";
            win.style.color = "#F8DE7E";
            win.style.filter= `drop-shadow(1px 1px #E3FF00)`;
            win.textContent = "Game is tie!";
            reset.disabled = false;
        }
    }
}
// let re = () => {
//     trueO = true;
//     for (let i of btn) {
//         i.textContent = ""
//         i.disabled = false
//     }
//      win.style.display = "none";
// }
reset.addEventListener("click", () => {
    trueO = true;
    for (let i of btn) {
        i.textContent = ""
        i.disabled = false
    }
    win.style.display = "none";
});