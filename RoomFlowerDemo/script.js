import { Object } from './Object.js';

const world = document.getElementById("world");
console.log(world);
const width = 1400;
const height = 788;
world.style.backgroundImage = "url('imgs/room.png')";

world.style.width = `${width}px`;
world.style.height = `${height}px`;
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    console.log(mouseX, mouseY);
})

const flower = new Object("flower", 100, 100, 'imgs/flower.png');
flower.load();


