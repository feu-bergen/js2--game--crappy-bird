export default class Crap {

    constructor(elem, x, y, speedX = -10, speedY = 0) {
        this.elem = elem;

        this.x = x;
        this.y = y;
        this.speedY = speedY;
        this.speedX = speedX;

        this.draw();
    }

    update(gravity, drag) {
        this.speedY += gravity;
        this.speedY *= (1-drag);

        this.y += this.speedY;
        this.x += this.speedX;

        this.draw();
    }

    draw() {
        this.elem.innerText = "💩";
        this.elem.style.position = "absolute";
        this.elem.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${-this.speedY}deg)`;
    }

}