const container = document.querySelector("#container");
let Message = document.querySelector("#message");
let p = document.querySelector("#p");
const reg = document.getElementById("reg");
const login = document.querySelector(".login");
const form = document.querySelector("#form");
let right = document.querySelector(".right")
const smt = document.querySelector("#smt");
const my_footer = document.querySelector(".my-footer");

let xmark = document.createElement("i");
xmark.setAttribute("class", "fa-regular fa-circle-xmark")
right.appendChild(xmark);
xmark.addEventListener("click", () => {
    form.style.display = "none";
});
console.log(xmark)
reg.addEventListener("click", () => {
    let ale = confirm("Are you 18+.");
    if (ale) {
        login.style.display = "grid";
        form.style.display = "block";
    } else {
        alert("You must be 18 or older to register.");
    }
});

Message.addEventListener("click", () => {
    let mes = prompt("Enter your message:");
    if (mes) {
        p.textContent = mes;
    }
});
my_footer.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

smt.addEventListener("click", function (event) {
    event.preventDefault();

    const formData = {
        name: document.querySelector("#nme").value,
        dob: document.querySelector("#dob").value,
        sex: document.querySelector("#sex").value,
        college: document.querySelector("#college").value,
        course: document.querySelector("#course").value,
        number: document.querySelector("#number").value,
        email: document.querySelector("#email").value,
        district: document.querySelector("#district").value,
        code: document.querySelector("#code").value,
        textarea: document.querySelector("#textarea").value,
        accept: document.querySelector("#accept").checked
    };

    for (const [key, value] of Object.entries(formData)) {
        if (value === "" && key !== 'accept') {
            alert(`Please fill out the ${key} field.`);
            return;
        }
    }

    form.querySelectorAll("input, select, textarea").forEach(element => {
        element.disabled = true;
    });

    form.style.display = "none";

    const showDataBtn = document.createElement("button");
    showDataBtn.textContent = "Show Data";
    showDataBtn.setAttribute("class", "showdt")
    container.appendChild(showDataBtn);

    showDataBtn.addEventListener("click", function () {
        let displayMessage = alert(`
            Submitted Data:
            Name: ${formData.name}
            DOB: ${formData.dob}
            Sex:${formData.sex}
            College: ${formData.college}
            Course: ${formData.course}
            Number: ${formData.number}
            Email: ${formData.email}
            District: ${formData.district}
            Code ${formData.code}
            Textarea: ${formData.textarea}
            Accepted: ${formData.accept ? 'Yes' : 'No'}
        `);
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit Data";
        editBtn.setAttribute("class", "edt");
        container.appendChild(editBtn);

        editBtn.addEventListener("click", function () {
            form.querySelectorAll("input, select, textarea").forEach(element => {
                element.disabled = false;
            });
            form.style.display = "block";
            showDataBtn.remove();
            editBtn.remove();
        });
    });
});

let style = document.createElement("style");
style.innerHTML = `
.edt {
     height: 30px;
    border: none;
    border-radius: 8px;
    background-color: #ef7d30;
    color: white;
    margin-right: 10px;
    font-weight: 600;
}
.showdt{
    height: 30px;
    border: none;
    border-radius: 8px;
    background-color: #ef7d30;
    color: white;
     margin-right: 20px; 
     margin-left: 10px;
    font-weight: 600;
}    
    .fa-circle-xmark{
    font-size: x-large;
    color: white;
    position: relative;
    bottom: 415px;
    margin-left: 350px;
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .my-footer{
    cursor: pointer;
    }
`;
document.head.appendChild(style);