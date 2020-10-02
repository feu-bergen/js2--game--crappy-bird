import Game from "./game.js";


document.querySelector(".playbutton").addEventListener("click", function (event) {
    event.currentTarget.parentElement.style.display = "none";
    
    const game = new Game(
        document.getElementById("game"),
        window.innerWidth,
        window.innerHeight,
    )
    
    game.start();

    document.addEventListener("keypress", function (event) {
        event.preventDefault();
        game.bird.moveUp(20);
        game.addCrap();
    });
    document.addEventListener("click", function (event) {
        event.preventDefault();
        game.bird.moveUp(20);
        game.addCrap();
    });
    return false;
});