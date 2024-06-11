import { Boat } from "./Boat";
import { Parachutist } from "./Parachutist";
import { airplaneImage, backgroundImage, seaImage } from "./images.js";
import {
  INITIAL_LIVES,
  SCORE_INCREMENT,
  SPAWN_INTERVAL,
  SEA_HEIGHT,
  TEXT_FONT,
  TEXT_COLOR,
  LIVES_TEXT_X,
  LIVES_TEXT_Y,
  SCORE_TEXT_X,
  SCORE_TEXT_Y,
  PLANE_WIDTH,
  PLANE_HEIGHT,
  PLANE_START_X,
  PLANE_SPEED,
  BOAT_WIDTH,
  BOAT_HEIGHT,
  PARACHUTIST_WIDTH,
  PARACHUTIST_HEIGHT,
  PARACHUTIST_START_Y,
} from "./constants.js";

// Define the GameController class
export class GameController {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private boat: Boat;
  private parachutists: Parachutist[];
  private lives: number;
  private score: number;
  private gameEnded: boolean;
  private planeX: number;
  private planeSpeed: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.boat = new Boat(canvas);
    this.parachutists = [];
    this.lives = INITIAL_LIVES;
    this.score = 0;
    this.gameEnded = false;
    this.planeX = canvas.width;
    this.planeSpeed = PLANE_SPEED;
    this.handleInput();
    this.spawnParachutists();
  }

  // Handle keyboard input for boat movement
  private handleInput() {
    window.addEventListener("keydown", (event) => {
      if (!this.gameEnded) {
        if (event.key === "ArrowLeft") {
          this.boat.moveLeft();
        } else if (event.key === "ArrowRight") {
          this.boat.moveRight();
        }
      }
    });
  }

  // Spawn parachutists at regular intervals
  private spawnParachutists() {
    setInterval(() => {
      if (!this.gameEnded) {
        const numberOfParachutesToSpawn = 2; // Number of parachutes to spawn in each interval
        for (let i = 0; i < numberOfParachutesToSpawn; i++) {
          const startX =
            this.canvas.width +
            Math.random() * (this.canvas.width - PARACHUTIST_WIDTH);
          const startY = -PARACHUTIST_HEIGHT - Math.random() * 100; // Randomize initial y position
          const parachutist = new Parachutist(this.canvas, startX, startY);
          this.parachutists.push(parachutist);
        }
      }
    }, SPAWN_INTERVAL); // Spawn parachutists every 3 seconds
  }

  // Update the game state
  update() {
    if (!this.gameEnded) {
      this.planeX -= this.planeSpeed; // Move the plane
      if (this.planeX < -PLANE_WIDTH) {
        this.planeX = this.canvas.width; // Reset plane position
      }

      this.parachutists.forEach((parachutist, index) => {
        parachutist.update();
        // Check for collision with boat
        if (
          parachutist.x < this.boat.x + BOAT_WIDTH &&
          parachutist.x + PARACHUTIST_WIDTH > this.boat.x &&
          parachutist.y < this.boat.y + BOAT_HEIGHT &&
          parachutist.y + PARACHUTIST_HEIGHT > this.boat.y
        ) {
          this.score += SCORE_INCREMENT; // Increase score
          this.parachutists.splice(index, 1); // Remove parachutist
        }
        // Check for collision with water
        if (parachutist.y > this.canvas.height - SEA_HEIGHT) {
          this.lives--; // Decrease lives
          if (this.lives === 0) {
            this.gameEnded = true;
            this.showGameOver();
          }
          this.parachutists.splice(index, 1); // Remove parachutist
        }
      });
    }
  }

  // Draw the game objects on the canvas
  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw background
    this.ctx.drawImage(
      backgroundImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    // Draw sea below the boat
    this.ctx.drawImage(
      seaImage,
      0,
      this.canvas.height - SEA_HEIGHT,
      this.canvas.width,
      SEA_HEIGHT
    );

    // Draw game objects
    this.boat.draw();
    this.parachutists.forEach((parachutist) => {
      parachutist.draw(this.ctx);
    });

    // Draw lives and score
    this.ctx.font = TEXT_FONT;
    this.ctx.fillStyle = TEXT_COLOR;
    this.ctx.fillText("Lives: " + this.lives, LIVES_TEXT_X, LIVES_TEXT_Y);
    this.ctx.fillText("Score: " + this.score, SCORE_TEXT_X, SCORE_TEXT_Y);

    // Draw airplane
    this.ctx.drawImage(
      airplaneImage,
      this.planeX,
      PLANE_START_X,
      PLANE_WIDTH,
      PLANE_HEIGHT
    );
  }

  // Show game over screen
  private showGameOver() {
    const gameOverText = "Game Over! Your score: " + this.score;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    this.ctx.font = TEXT_FONT;
    this.ctx.fillStyle = TEXT_COLOR;
    this.ctx.textAlign = "center";
    this.ctx.fillText(gameOverText, centerX, centerY);
  }
}
