export class GameObject {
    constructor(x = 0, y = 0, imgSrc = "", parent = null, zIndex = 3) {
        this.imgSrc = imgSrc;
        this.x = x;
        this.y = y;
        this.state = "";
        this.parent = parent;
        this.zIndex = zIndex;
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

    hide() {
        if (this.img.style.display == 'none') {
            this.img.style.display = 'block';
        } else {
            this.img.style.display = 'none';
        }
    }

    setImgState(imgState) {
        this.state = imgState;
        console.log(this.imgSrc + this.state + ".png");
        this.img.src = this.imgSrc + this.state + ".png";
    }

    load() {
        this.img = document.createElement("img");
        this.parent.appendChild(this.img);
        this.imgSrc = 'imgs/' + this.parent.id + '/' + this.imgSrc;
        this.img.src = this.imgSrc + '.png';
        // this.img.style.transform = "translate(-50%, -50%)";
        this.img.style.position = 'absolute';
        this.img.style.left = this.x + 'px';
        this.img.style.top = this.y + 'px';
        this.img.style.display = this.state;
        this.img.draggable = false;
        this.img.style.zIndex = this.zIndex;
    }

    setTranslate(translate) {
        if (translate == "bottomRight") {
            this.img.style.transform = 'translate(-100%, -100%)';
        }
    }

    setOnClick(func) {
        this.img.addEventListener('click', func);
    }

    remove() {
        this.img.remove();
    }
}
