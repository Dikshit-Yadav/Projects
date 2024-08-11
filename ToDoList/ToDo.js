const search = document.querySelector("#search");
const list = document.querySelector("ul");
const button = document.querySelector("button");
const head = document.querySelector("head");
        function li() {
    const searchValue = add.value;
    const li = document.createElement("li");
    const cross = document.createElement("i");
    const edit = document.createElement("i");
    cross.setAttribute("class", "fa-solid fa-xmark color");
    edit.setAttribute("class", "fa-solid fa-pen-to-square color");
    li.textContent = searchValue;
    list.appendChild(li);
    list.appendChild(cross);
    list.appendChild(edit);
    
    function remove(){
        li.remove();
        cross.remove();
        edit.remove();
    }
    function edt() {
const e = prompt("Enter the new text:");
if (e) {
    li.textContent = e;
}
}

    cross.addEventListener("click",remove);
    edit.addEventListener("click",edt);

}
button.addEventListener("click", li);
const styles = document.createElement('style');
styles.innerHTML = `
    .fa-solid {
        display: inline-block;
        position: relative;
        left: 100px;
        bottom: 18px;
        color: green;
    }
        .color{
        color: green;
        }
        
`;
document.head.appendChild(styles);