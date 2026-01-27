import { width, height } from "./script.js";

export class GameTextBox {
    constructor() {
        this.box = document.getElementById("textBox");
        this.text = document.getElementById("textBoxText");
        this.confirmBox = document.getElementById("textBoxConfirm");
        this.confirmYes = document.getElementById("textBoxConfirmYes");
        this.confirmNo = document.getElementById("textBoxConfirmNo");
        this.arrow = document.getElementById("arrow");
        this.box.style.left = width / 2 + 'px';
        this.box.style.top = height * 0.85 + 'px';
        this.yesFunc = null;
        this.noFunc = null;
        this.textPromise = null;
        this.textResolve = null;
        this.confirming = false;

        this.confirmYes.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideConfirming();
            if (this.yesFunc != null) this.yesFunc();
            if (this.textResolve) {
                this.textResolve();
            }
        })


        this.confirmNo.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideConfirming();
            if (this.noFunc != null) this.noFunc();
            if (this.textResolve) { //!!!! delete if u dont want chaintext running when clicked no
                this.textResolve();
            }
        })


        this.box.addEventListener('click', () => {
            if (!this.confirming) {
                this.hide(this.box);
                if (this.textResolve) {
                    this.textResolve();
                }
            }
        });



    }
    show(box) {
        box.style.display = 'block';
    }
    hide(box) {
        box.style.display = 'none';
    }

    isHidden() {
        if (window.getComputedStyle(this.box).display == 'none') {
            return true;
        } else {
            return false;
        }
    }

    hideConfirming() {
        this.hide(this.box);
        this.hide(this.confirmBox);
        this.confirming = false;
    }

    setText(text) {
        if (!this.confirming) {
            this.show(this.box);
            this.show(this.arrow);
            this.text.innerHTML = text;
            this.textPromise = new Promise(resolve => {
                this.textResolve = resolve;
            });
        }
    }
    setTextConfirm(text, yes = null, no = null) {
        this.hide(this.arrow);
        this.show(this.box);
        this.show(this.confirmBox);
        this.text.innerHTML = text;
        this.yesFunc = yes;
        this.noFunc = no;
        this.textPromise = new Promise(resolve => {
            this.textResolve = resolve;
        });
        this.confirming = true;
    }
}
