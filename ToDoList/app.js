const search = document.querySelector("#search");
const list = document.querySelector("ul");
const button = document.querySelector("button");
let id = 1;
let arr = JSON.parse(localStorage.getItem("todoList")) || [];

function saveToLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(arr));
}

function createSpan(searchValue) {
    const span = document.createElement("span");
    span.textContent = searchValue;
    span.style.flex = "1";
    return span;
}

function createCheckbox(obj) {
    const chkbox = document.createElement("input");
    chkbox.type = "checkbox";
    chkbox.style.marginRight = "10px";
    chkbox.style.position = "relative";
    chkbox.style.left = "-1%";
    chkbox.style.top = "-0px";
    chkbox.checked = obj.status == "Completed";

    chkbox.addEventListener("change", () => {
        obj.status = chkbox.checked ? "Completed" : "Pending";
        saveToLocalStorage();
        console.log(arr);
    });
    return chkbox;
}

function editIcon(span, obj) {
    const edit = document.createElement("i");
    edit.setAttribute("class", "fa-solid fa-pen-to-square color");
    edit.style.cursor = "pointer";
    edit.style.margin = "0 10px";
    edit.style.color = "blue";

    edit.addEventListener("click", () => {
        const e = prompt("Enter the new text:", span.textContent);
        if (e) {
            span.textContent = e;
            obj.title = e;
            saveToLocalStorage();
        }
    });
    return edit;
}

function deleteIcon(listItem, obj) {
    const delet = document.createElement("i");
    delet.setAttribute("class", "fa-solid fa-xmark color");
    delet.style.cursor = "pointer";
    delet.style.color = "red";
    delet.style.marginLeft = "10px";

    delet.addEventListener("click", () => {
        listItem.remove();
        console.log("Deleted item:", obj.title);
        const index = arr.findIndex(item => item.id === obj.id);
        if (index !== -1) {
            arr.splice(index, 1);
            saveToLocalStorage();
        }
    });
    return delet;
}

function addItem() {
    const searchValue = add.value;
    if (!searchValue) return;

    const obj = {
        id: id++,
        status: "Pending",
        title: searchValue
    };
    arr.push(obj);
    saveToLocalStorage();

    createListItem(obj);
    add.value = "";
}

function createListItem(obj) {
    const listItem = document.createElement("li");
    listItem.style.display = "flex";
    listItem.style.alignItems = "center";
    listItem.style.justifyContent = "space-between";
    listItem.style.padding = "10px";
    listItem.style.borderBottom = "1px solid #ddd";

    const chkbox = createCheckbox(obj);
    const span = createSpan(obj.title);
    const edit = editIcon(span, obj);
    const delet = deleteIcon(listItem, obj);

    listItem.appendChild(span);
    listItem.appendChild(chkbox);
    listItem.appendChild(edit);
    listItem.appendChild(delet);
    list.appendChild(listItem);
}

function loadTodoList() {
    arr.forEach(obj => {
        createListItem(obj);
    });
}
add.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addItem();
});

button.addEventListener("click", addItem);

loadTodoList();
