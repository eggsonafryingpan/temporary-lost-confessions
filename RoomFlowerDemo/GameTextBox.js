import { width, height } from "./script.js";

export class GameTextBox {
    constructor() {
        this.box = document.getElementById("textBox");
        this.Text = document.getElementById("textBoxText");
        this.confirmBox = document.getElementById("textBoxConfirm");
        this.confirmYes = document.getElementById("textBoxConfirmYes");
        this.confirmNo = document.getElementById("textBoxConfirmNo");
        this.box.style.left = width / 2 + 'px';
        this.box.style.top = height * 0.85 + 'px';
        this.yesFunc = null;
        this.noFunc = null;
        this.confirmYes.addEventListener('click', () => { if (this.yesFunc != null) this.yesFunc(); });
        this.confirmYes.addEventListener('click', () => { this.hideConfirming() })
        this.confirmNo.addEventListener('click', () => { if (this.noFunc != null) this.noFunc(); });
        this.confirmNo.addEventListener('click', () => { this.hideConfirming() })
        this.confirming = false;
        this.box.addEventListener('click', () => { if (!this.confirming) this.hide(this.box); });
    }
    show(box) {
        box.style.display = 'block';
    }
    hide(box) {
        box.style.display = 'none';
    }

    hideConfirming() {
        this.hide(this.box);
        this.hide(this.confirmBox);
        this.confirming = false;
    }

    setText(text) {
        this.show(this.box);
        this.Text.innerHTML = text;
    }
    setTextConfirm(text, yes = null, no = null) {
        this.setText(text);
        this.show(this.confirmBox);
        this.yesFunc = yes;
        this.noFunc = no;
        this.confirming = true;
    }
}
