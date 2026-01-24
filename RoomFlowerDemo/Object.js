export class Object {
    constructor(name = "null", x = 0, y = 0, imgSrc = "", defaultState = null) {
        this.img = document.createElement("img");
        this.imgSrc = imgSrc;
        this.name = name;
        this.x = x;
        this.y = y;
        this.defaultState = defaultState;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setLocation(x, y) {
        this.img.style.left = '${x}px';
        this.img.style.right = '${y}px';
    }

    getImgElement() {
        return this.img;
    }

    getName() {
        return this.name;
    }

    load() {
        const world = document.getElementById("world");
        world.appendChild(this.img);
        this.img.src = "url('${imgSrc}')";
        this.img.style.transform = "translate(50px, 30px)";
        this.img.style.position = 'absolute';
        this.img.style.left = '${x}px';
        this.img.style.right = '${y}px';
    }

    remove() {
        this.img.remove();
    }
}
