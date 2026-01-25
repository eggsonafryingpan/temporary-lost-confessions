import { GameObject } from './GameObject.js';
import { TextBox } from './TextBox.js';
const world = document.getElementById("world");
export const width = 1400;
export const height = 788;



world.style.backgroundImage = "url('imgs/room.png')";
world.style.width = width + 'px';
world.style.height = height + 'px';


document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    if (window.innerWidth > width) mouseX -= ((window.innerWidth - width) / 2);
    if (window.innerHeight > height) mouseY -= ((window.innerHeight - height) / 2);
    console.log(mouseX, mouseY);
})

const flower = new GameObject("flower", 750, 470, 'imgs/flower.png');

flower.setOnClick(() => { textBox("A flower.") });

function textBox(text) {
    let textBox = new TextBox(text);
}