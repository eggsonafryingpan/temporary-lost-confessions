import { GameObject } from './GameObject.js';

export const width = 1400;
export const height = 788;


const bedroom = document.getElementById("bedroom");
console.log(bedroom);
let currRoom = bedroom;
const world = document.getElementById("world");
world.style.width = width + 'px';
world.style.height = height + 'px';

const textBox = document.getElementById("textBox");
const textBoxText = document.getElementById("textBoxText");
textBox.style.left = width / 2 + 'px';
textBox.style.top = height * 0.85 + 'px';
textBox.addEventListener('click', () => { textBox.style.display = 'none' });

function setTextBox(text) {
    textBox.style.display = 'block';
    textBoxText.innerHTML = text;
}



document.addEventListener('mousemove', (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    if (innerWidth > width) mouseX -= ((innerWidth - width) / 2);
    if (innerHeight > height) mouseY -= ((innerHeight - height) / 2);
    console.log(mouseX, mouseY);
})



//                                x     y     path to img           room
// const flower = new GameObject(750, 470, 'flower', test);
// flower.setOnClick(() => { setTextBox("A flower.") });

// room 1 loading
// const alarmclock = new GameObject(300, 300, 'alarmclock', bedroom);
// alarmclock.setOnClick(() => { setTextBox("An alarm clock. It's 7:00 am.") });
// const bed = new GameObject(,,'bed')
const gameWindow = new GameObject(167, 259, 'window', bedroom);
gameWindow.setOnClick(() => {
    if (gameWindow.state == "") {
        console.log("dsjlkfjs");
        gameWindow.setImgState("Poster");
    } else { gameWindow.setImgState("") };
});