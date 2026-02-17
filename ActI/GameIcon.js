export class GameIcon{
    constructor(name = "", onclick = null) {
        this.name = name;
        this.onclick = onclick;
        let inventoryBox = document.getElementById("inventory");
        this.icon = document.createElement("img");
        this.icon.src = 'imgs/icons/' + this.name + '.png';
        this.icon.addEventListener('click', () => { if (this.onclick) this.onclick() });
        inventoryBox.appendChild(this.icon);
        this.hide();
    }

    hide() {
        this.icon.style.display = 'none';
    }

    show() {
        this.icon.style.display = 'block';
    }
}