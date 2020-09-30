export default class Bird {

    constructor(elem, x, y, speedY = 0) {
        this.elem = elem;

        this.x = x;
        this.y = y;
        this.speedY = speedY;

        this.draw();
    }

    moveUp(speed) {
        this.speedY += speed;
    }

    update(gravity, drag) {
        this.speedY -= gravity;
        this.speedY *= (1-drag);

        this.y -= this.speedY;

        this.draw();
    }

    draw() {
        this.elem.style.position = "absolute";
        this.elem.style.top = this.y + "px";
        this.elem.style.left = this.x + "px";
        this.elem.style.transform = `rotate(${-this.speedY}deg)`;
    }

}