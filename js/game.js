import Bird from "./bird.js";
import Wall from "./wall.js";
import Crap from "./crap.js";

export default class Game {

    constructor(elem, width, height) {
        this.elem = elem;
        this.width = width;
        this.height = height;

        this.loopCounter = 0;
        
        this.bird = new Bird(
            document.querySelector(".bird"),
            this.width / 2,
            this.height / 2,
            0,
        );
        
        this.walls = [];
        this.craps = [];
    }

    start() {
        this.interval = setInterval(() => this.update(), 33);
    }

    stop() {
        this.bird.elem.innerText = "🏴‍☠️";
        console.log("game over!");
        clearInterval(this.interval);
    }

    reset() {

    }

    update() {
        this.bird.update(0.8, 0.03);
        this.craps.forEach(crap => crap.update(0.8, 0.03));
        this.walls.forEach(wall => {
            wall.update();

            if (this.bird.x < wall.x + wall.width &&
                this.bird.x + this.bird.elem.offsetWidth > wall.x &&
                this.bird.y < wall.y + wall.height &&
                this.bird.y + this.bird.elem.offsetHeight > wall.y) {
                console.log("hit wall!");
                this.stop();
            }
        });

        if (this.bird.y > 800 || this.bird.y < 0) {
            console.log("Hit roof or floor!");
            this.stop();
        }

        if (this.loopCounter % 50 === 0) {
            const wallWidth = 80;
            const birdHeight = 120;
            const minGapDistance = birdHeight * 2;
            const maxGapVariation = birdHeight * 2;
            const maxOffset = minGapDistance * 2;
            // generate wall height based on min height and variation
            const gapHeight = minGapDistance + Math.round(Math.random() * maxGapVariation);
            console.log("gap height", gapHeight);
            // generate how far the gap will be from the middle (if negative the gap will go up and positive will go down)
            const gapOffsetFromMiddle = Math.round((Math.random() - .5) * maxOffset);

            // calculate the size and position of walls based on the gap
            const topWallY = 0; // top wall always starts at 0 (top of the screen)
            const topWallHeight = this.height / 2 - gapHeight / 2 + gapOffsetFromMiddle;
            const bottomWallY = this.height / 2 + gapHeight / 2 + gapOffsetFromMiddle;
            const bottomWallHeight = this.height - bottomWallY; 

            this.walls.push(new Wall(this.createWallElem(), this.width, topWallY, wallWidth, topWallHeight));
            this.walls.push(new Wall(this.createWallElem(), this.width, bottomWallY, wallWidth, bottomWallHeight));

            // remove walls that have gone passed the left part of the screen
            this.walls = this.walls.filter(wall => {
                if (wall.x > 0) return true;

                // remove the element from the page and dont return true
                wall.elem.parentElement.removeChild(wall.elem);
            });
        }

        this.loopCounter++;
    }

    addCrap() {
        this.craps.push(new Crap(this.createCrapElem(), this.bird.x, this.bird.y + 50));
    }

    createWallElem() {
        const wallElem = document.createElement("div");
        wallElem.classList.add("wall");
        this.elem.append(wallElem);
        return wallElem;
    }

    createCrapElem() {
        const wallElem = document.createElement("div");
        wallElem.classList.add("crap");
        this.elem.append(wallElem);
        return wallElem;
    }

}