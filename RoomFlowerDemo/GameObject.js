export class GameObject {
    constructor(name = "null", x = 0, y = 0, imgSrc = "", parent = null, state = "block") {
        this.imgSrc = imgSrc;
        this.name = name;
        this.x = x;
        this.y = y;
        this.state = state;
        this.parent = parent;
        this.load();
    }

    setLocation(x, y) {
        this.x = x;
        this.y = y;
        this.img.style.left = this.x + 'px';
        this.img.style.top = this.y + 'px';
    }

    getImgElement() {
        return this.img;
    }

    getName() {
        return this.name;
    }

    load() {
        this.img = document.createElement("img");
        this.parent.appendChild(this.img);
        this.img.src = this.imgSrc;
        this.img.style.transform = "translate(-50%, -50%)";
        this.img.style.position = 'absolute';
        this.img.style.left = this.x + 'px';
        this.img.style.top = this.y + 'px';
        this.img.style.display = this.state;
        this.img.draggable = false;
    }

    setOnClick(func) {
        this.img.addEventListener('click', func);
    }

    remove() {
        this.img.remove();
    }
}
