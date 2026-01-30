export class GameObject {
    constructor(x = 0, y = 0, imgSrc = "", parent = null, zIndex = 3) {
        this.imgSrc = imgSrc;
        this.x = x;
        this.y = y;
        this.state = "";
        this.parent = parent;
        this.zIndex = zIndex;
        this.onClick = null;
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
        this.img.addEventListener('click', () => {
            if (this.onClick != null) {
                this.onClick();
            }
        });
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
    addHighlight() {
        this.img.addEventListener('mouseenter', () => {
            this.img.src = this.imgSrc + "Highlight" + ".png";
        })
        this.img.addEventListener('mouseleave', () => {
            this.img.src = this.imgSrc + ".png";
        })
    }
}
