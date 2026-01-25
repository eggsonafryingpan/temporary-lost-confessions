import { GameObject } from './GameObject.js';

export const width = 1400;
export const height = 788;


const world = document.getElementById("world");
world.style.backgroundImage = "url('imgs/room.png')";
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
    if (window.innerWidth > width) mouseX -= ((window.innerWidth - width) / 2);
    if (window.innerHeight > height) mouseY -= ((window.innerHeight - height) / 2);
    console.log(mouseX, mouseY);
})




const flower = new GameObject("flower", 750, 470, 'imgs/flower.png');

flower.setOnClick(() => { setTextBox("A flower.") });

