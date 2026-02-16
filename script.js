const title = document.getElementById("title");
const play = document.getElementById("play");
const homeScreen = document.getElementById("homeScreen");
const doors = document.getElementById("doors");
const door1 = document.getElementById("door1");
const door2 = document.getElementById("door2");

door1.src = "imgs/door1.png";
door2.src = "imgs/door2.png";



title.src = "imgs/title1.png";

setInterval(() => {
    if (title.src.endsWith("imgs/title1.png")) {
        title.src = "imgs/title2.png";
    } else {
        title.src = "imgs/title1.png";
    }
}, 600);

play.addEventListener('click', () => {
    homeScreen.classList.add('flyOut');
    doors.classList.add("flyIn");
})

doors.addEventListener('animationend', () => {
    door1.addEventListener("mouseover", () => {
        door1.src = "imgs/door1Opened.png";
    })

    door1.addEventListener("mouseleave", () => {
        door1.src = "imgs/door1.png";
    })

    door2.addEventListener("mouseover", () => {
        door2.src = "imgs/door2Opened.png";
    })

    door2.addEventListener("mouseleave", () => {
        door2.src = "imgs/door2.png";
    })
});
