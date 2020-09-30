import Bird from "./bird.js";
import Wall from "./wall.js";

const bird = new Bird(
    document.querySelector(".bird"),
    400,
    400,
    30,
);

let walls = [
];

const interval = setInterval(gameLoop, 33);

let loopCounter = 0;
function gameLoop() {
    console.log(loopCounter);
    
    bird.update(1, 0.03);
    walls.forEach(wall => {
        wall.update();

        if (bird.x < wall.x + wall.width &&
            bird.x + bird.elem.offsetWidth > wall.x &&
            bird.y < wall.y + wall.height &&
            bird.y + bird.elem.offsetHeight > wall.y) {
            console.log("collision!");
            clearInterval(interval);
         }
    });



    if (bird.y > 800 || bird.y < 0) {
        console.log("game over!");
        clearInterval(interval);
    }

    if (loopCounter % 50 === 0) {
        walls.push(new Wall(createWallElem(), 1500, 0, 80, 200 + Math.random() * 100));
        walls.push(new Wall(createWallElem(), 1500, 500 + Math.random() * 100, 80, 300));

        // remove walls that have gone passed the left part of the screen
        walls = walls.filter(wall => {
            if (wall.x > 0) return true;

            // remove the element from the page
            wall.elem.parentElement.removeChild(wall.elem);
        });
    }

    loopCounter++;
}

document.addEventListener("keypress", function (event) {
    event.preventDefault();
    bird.moveUp(30);
});

function createWallElem() {
    const elem = document.createElement("div");
    elem.classList.add("wall");
    document.body.append(elem);
    return elem;
}