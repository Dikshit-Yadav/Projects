let me = document.querySelector("#me");
let com = document.querySelector("#com");
let msg = document.querySelector(".msg");
let game = document.querySelectorAll(".game");
let scoreY = 0;
let scoreC = 0;

let comChoice = () => {
    let choices = ["rock", "paper", "scissors"];
    let random = Math.floor(Math.random() * choices.length);
    return choices[random];
}

let play = (user) => {
    let computer = comChoice();
    console.log("Computer choice =", computer);
    console.log("User choice =", user);

    if (user === computer) {
        msg.textContent = "Match is tie!";
        msg.style.background="#5e565a";
    }
    else if (user === "rock") {
        if (computer === "scissors") {
            scoreY++;
            me.textContent = scoreY;
            msg.textContent = `You wins!${user} beats ${computer}`;
            msg.style.background="green";
        } else if (computer === "paper") {
            scoreC++;
            com.textContent = scoreC;
            msg.textContent = `You Lose!${computer} beats ${user}`;
            msg.style.background="red";
        }
    }
    else if (user === "paper") {
        if (computer === "rock") {
            scoreY++;
            me.textContent = scoreY;
            msg.textContent = `You wins!${user} beats ${computer}`;
            msg.style.background="green";
        } else if (computer === "scissors") {
            scoreC++;
            com.textContent = scoreC;
            msg.textContent = `You Lose!${computer} beats ${user}`;
            msg.style.background="red";
        }
    }
    else if (user === "scissors") {
        if (computer === "paper") {
            scoreY++;
            me.textContent = scoreY;
            msg.textContent = `You wins!${user} beats ${computer}`;
            msg.style.background="green";
        } else if (computer === "rock") {
            scoreC++;
            com.textContent = scoreC;
            msg.textContent = `You Lose!${computer} beats ${user}`;
            msg.style.background="red";
        }
    }
}
game.forEach((g) => {
    g.addEventListener("click", () => {
        let user = g.getAttribute("id");
        play(user);
    });
});