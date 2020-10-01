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
        this.elem.innerText = this.speedY > 0 ? "🦅" : "🦆";
        this.elem.style.position = "absolute";
        this.elem.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${-this.speedY}deg) scale(-1, 1)`;
    }

}