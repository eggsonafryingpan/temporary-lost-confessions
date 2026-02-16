const title = document.getElementById("title");
const play = document.getElementById("play");
const homeScreen = document.getElementById("homeScreen");
title.src = "imgs/title1.png";

setInterval(() => {
    if (title.src.endsWith("imgs/title1.png")) {
        title.src = "imgs/title2.png";
    } else {
        title.src = "imgs/title1.png";
    }
}, 600);

play.addEventListener('click', () => {
    homeScreen.classList.add('flyUp');
})

function loadDoors() {

}