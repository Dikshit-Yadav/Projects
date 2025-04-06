let addEducation = document.querySelector("#AddEduction");
let form = document.querySelector("#form");
let details = document.querySelector("#details");
let submit = document.querySelector("#submit");
let reset = document.querySelector("#reset");
let table = document.querySelector("table");
let srno = 1;
function display() {
    form.style.display = "block";
    emptyForm();
}
function sm(event) {
    event.preventDefault();
    form.style.display = "none";
    let degree = document.querySelector("#degree").value;
    let year = document.querySelector("#year").value;
    let registration = document.querySelector("#reg").value;
    let university = document.querySelector("#university").value;

    if (!degree || !year || !registration || !university) {
        alert("Please Fill All Fields!");
        return;
        // if(!year)
    }
    else if (degree == " " || year == " " || registration == " " || university == " ") {
        alert("Please Fill All Fields!");
        return;
    }
    let row = table.insertRow();
    row.insertCell(0).innerText = srno++;
    row.insertCell(1).innerText = degree;
    row.insertCell(2).innerText = year;
    row.insertCell(3).innerText = registration;
    row.insertCell(4).innerText = university;
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    editBtn.setAttribute("id", "a1");
    deleteBtn.setAttribute("id", "a2");
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    editBtn.addEventListener("click", () => edit(row));
    deleteBtn.addEventListener("click", () => deleteRow(row));
    row.insertCell(5).append(editBtn, deleteBtn);
    details.style.display = "block";
    emptyForm();
}
function emptyForm() {
    document.querySelector("#degree").value = "";
    document.querySelector("#year").value = "";
    document.querySelector("#reg").value = "";
    document.querySelector("#university").value = "";
}
function resetForm() {
    emptyForm();
    alert("Form reset!");
}
function deleteRow(row) {
    row.remove();
    srno--;
    alert("Row deleted!");
}

function edit(row) {
    form.style.display = "block";
    document.querySelector("#degree").value = row.cells[1].innerText;
    document.querySelector("#year").value = row.cells[2].innerText;
    document.querySelector("#reg").value = row.cells[3].innerText;
    document.querySelector("#university").value = row.cells[4].innerText;
    submit.removeEventListener("click", sm);
    submit.addEventListener("click", function update(event) {
        row.cells[1].innerText = document.querySelector("#degree").value;
        row.cells[2].innerText = document.querySelector("#year").value;
        row.cells[3].innerText = document.querySelector("#reg").value;
        row.cells[4].innerText = document.querySelector("#university").value;
        submit.removeEventListener("click", update);
        submit.addEventListener("click", sm);
        form.style.display = "none";
        emptyForm();
    });
    alert("Row Edited!");
}
addEducation.addEventListener("click", display);
submit.addEventListener("click", sm);
reset.addEventListener("click", resetForm);
const style = document.createElement("style");
style.textContent = `
#a1 {
    background-color: rgb(114, 114, 230);
    color: white;
}
#a2 {
    background-color: rgb(238, 50, 50);
    color: white;
}` ;
document.head.append(style);