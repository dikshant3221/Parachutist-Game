// Import GameController class
import { GameController } from "./GameController.js";
// Get the canvas element
const canvas = document.getElementById("canvas");
// Create an instance of GameController and pass the canvas element
const gameController = new GameController(canvas);
// Game loop
function gameLoop() {
    gameController.update();
    gameController.draw();
    requestAnimationFrame(gameLoop);
}
// Start the game loop
gameLoop();
