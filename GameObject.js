export class GameObject {
    constructor(x = 0, y = 0, imgSrc = "", parent = null, zIndex = 3) {
        this.name = imgSrc;
        this.imgSrc = imgSrc;
        this.x = x;
        this.y = y;
        this.img
        this.state = "";
        this.parent = parent;
        this.zIndex = zIndex;
        this.onClick = null;
        this.onEnter = null;
        this.onLeave = null;
        //   this.icon = null;
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
        this.img.style.display = 'none';
    }

    show() {
        this.img.style.display = 'block';
    }

    isShown() {
        return this.img.style.display != 'none';
    }

    setImgState(imgState = "") {
        this.state = imgState;
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
        this.img.addEventListener('click', () => {
            if (this.onClick != null) {
                this.onClick();
            }
        });
        this.img.addEventListener('mouseenter', () => { if (this.onEnter) this.onEnter() });
        this.img.addEventListener('mouseleave', () => { if (this.onLeave) this.onLeave() });
    }

    setTranslate(translate) {
        if (translate == "bottomRight") {
            this.img.style.transform = 'translate(-100%, -100%)';
        }
    }

    setOnClick(func) {
        this.onClick = func;
    }

    remove() {
        this.img.remove();
    }

    //only add if highlighted image is in imgs
    setHighlight() {
        this.onEnter = () => { this.setImgState("Highlight") };
        this.onLeave = () => { this.setImgState() };
    }

    setInvisibleHighlight() {
        this.img.style.opacity = 0;
        this.onEnter = () => {
            this.img.style.opacity = 1;
        }
        this.onLeave = () => {
            this.img.style.opacity = 0;
        }
    }
}
