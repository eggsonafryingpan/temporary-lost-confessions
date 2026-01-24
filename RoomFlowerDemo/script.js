import { GameObject } from './GameObject.js';
const width = 1400;
const height = 788;
const world = document.getElementById("world");

world.style.backgroundImage = "url('imgs/room.png')";
world.style.width = width + 'px';
world.style.height = height + 'px';

document.addEventListener('mousemove', (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    if (window.innerWidth > width) mouseX -= ((window.innerWidth - width) / 2);
    if (window.innerHeight > height) mouseY -= ((window.innerHeight - height) / 2);
    console.log(mouseX, mouseY);
})

const flower = new GameObject("flower", 750, 470, 'imgs/flower.png');

let roomObjs = new Array();
roomObjs.push(flower);

flower.setOnClick(() => { alert("Flower was clicked") });

