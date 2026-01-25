import { width, height } from "./script.js";

export class GameTextBox {
    constructor(text) {
        const world = document.getElementById("world");
        textBox = document.createElement("img");
        world.appendChild(this.textBox);
        this.text = document.createElement("div");
        this.textBox.appendChild(this.textBox);

        textBox.innerHTML = text;
        textBox.style.backgroundImage = "url('imgs/textBox.png')"
        textBox.style.backgroundPosition = 'center';
        textBox.style.padding =
            textBox.style.transform = "translate(-50%, -50%)";
        textBox.style.position = 'absolute';
        textBox.style.left = width / 2 + 'px';
        textBox.style.top = '650px'
        textBox.style.width = '900px';
        textBox.style.height = '150px';
    }

}