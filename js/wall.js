export default class Wall {

    constructor(elem, x, y, width, height, speedX = -10) {
        this.elem = elem;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX

        this.draw();
    }

    update(gravity, drag) {
        this.x += this.speedX;

        this.draw();
    }

    draw() {
        this.elem.style.position = "absolute";
        this.elem.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
        this.elem.style.width = this.width + "px";
        this.elem.style.height = this.height + "px";
    }

}