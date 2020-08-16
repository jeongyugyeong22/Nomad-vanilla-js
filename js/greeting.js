const form = document.querySelector(".js-form"),
    input = document.querySelector(".nameInput"),
    greetContainer = document.querySelector(".greeting-container");
    greeting = document.querySelector(".js-name"),
    greet = document.querySelector(".js-greet");


const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function greetingText(){
    const time = new Date();
    const hour = time.getHours();

    if(hour < 12){
        return "Good morning 🤸‍♀️🤸‍♂️";
    } else if (hour < 18){
        return "Good afternoon 🌼🌻";
    } else {
        return "Good evening 🍺🍻";
    }
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greetContainer.classList.add(SHOWING_CN);
    const greetText = greetingText();

    if(greetText === "Good morning 🤸‍♀️🤸‍♂️"){
        greet.style.color="#95FF00";
    } else if(greetText === "Good afternoon 🌼🌻"){
        greet.style.color="#4AE8BB";
    } else {
        greet.style.color="#3E121B";
    }

    greeting.innerText = `${text}, `;
    greet.innerText = ` ${greetText}`;
    
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();