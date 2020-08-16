const body = document.querySelector('body');

const IMG_NUM = 4;

function paintImage(imgNum){
    const img = new Image();
    img.src = `img/${imgNum + 1}.jpg`;
    img.classList.add("bgImage");
    body.prepend(img);
}

function genImage(){
    const num = Math.floor(Math.random() * IMG_NUM);
    return num;
}

function init(){
    const randomNum = genImage();
    paintImage(randomNum);
}

init();
