const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = document.querySelector(".toDoInput"),
    toDoTitle = document.querySelector(".toDoTitle"),
    finishedTitle = document.querySelector(".finishTitle"),
    pendingList = document.querySelector(".js-pendingList"),
    finishList = document.querySelector(".js-finishList");

const TODO_P = 'PENDING';
const TODO_F = 'FINISHED';
let pending = [];
let finished = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;

    pendingList.removeChild(li);

    //filterFn이 체크가 된 아이템들의 array 를 줌
    const cleanToDo = pending.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });

    pending = cleanToDo;
    saveToDo();
}

function deleteFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;

    finishList.removeChild(li);

    //filterFn이 체크가 된 아이템들의 array 를 줌
    const cleanToDo = finished.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });

    finished = cleanToDo;
    saveFinished();
}

function saveToDo() {
    localStorage.setItem(TODO_P, JSON.stringify(pending));
}

function saveFinished() {
    localStorage.setItem(TODO_F, JSON.stringify(finished));
}

function paintDone(text,id) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const undoBtn = document.createElement("button");
    const span = document.createElement("span");
    const space = document.createElement("span");

    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteFinished);
    undoBtn.innerHTML = "⏪";
    undoBtn.addEventListener("click", () => {
        paintToDo(text);
        deleteFinished(event);
    });
    span.innerText = text;
    space.innerHTML = "&nbsp";

    li.appendChild(span);
    li.appendChild(space);
    li.appendChild(delBtn);
    li.appendChild(undoBtn);
    li.id = id;
    finishList.appendChild(li);

    const toDonesObj = {
        text: text,
        id: id
    };

    finished.push(toDonesObj);
    saveFinished();
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const span = document.createElement("span");
    const space = document.createElement("span");
    const newId = new Date().getTime();

    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    checkBtn.innerHTML = "🎉";
    checkBtn.addEventListener("click", (e) => {
        paintDone(text, newId);
        deleteToDo(e);
    });
    
    span.innerText = text;
    space.innerHTML = "&nbsp";

    li.appendChild(span);
    li.appendChild(space);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = newId;

    pendingList.appendChild(li);

    const toDosObj = {
        text: text,
        id: newId
    };

    pending.push(toDosObj);
    saveToDo();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODO_P);
    const loadedFinished = localStorage.getItem(TODO_F);

    if (loadedToDos !== null) {
        //object 변환
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
    if (loadedFinished !== null) {
        const parsedDones = JSON.parse(loadedFinished);
        parsedDones.forEach(function (toDo) {
            paintDone(toDo.text,toDo.id);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();