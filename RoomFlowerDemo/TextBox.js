import { GameObject } from "./GameObject";
import { width, height } from "./script";

export class TextBox {
    constructor(text) {
        const world = document.getElementById("world");
        this.textBox = document.createElement("div");
        world.appendChild(this.textBox);
        this.textBox.innerHTML = text;
        this.textBox.style.backgroundImage = "url('imgs/textBox.png')"
        this.textBox.style.backgroundPosition = 'center';
        this.textBox.style.transform = "translate(-50%, -50%)";
        this.textBox.style.position = 'absolute';
        this.textBox.style.left = width / 2 + 'px';
        this.textBox.style.bottom = 150
        this.textBox.style.width = '900px';
        this.textBox.style.height = '150px';
    }

}