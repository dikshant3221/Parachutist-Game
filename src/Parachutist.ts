import { parachutistImage } from "./images.js";
import {
  PARACHUTIST_WIDTH,
  PARACHUTIST_HEIGHT,
  PARACHUTIST_SPEED,
  GAME_OVER_Y_POSITION,
} from "./constants";

// Define the Parachutist class
export class Parachutist {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  private speed: number;

  constructor(canvas: HTMLCanvasElement, startX: number, startY: number) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.x = startX;
    this.y = startY;
    this.speed = PARACHUTIST_SPEED;
  }

  // Draw the parachutist
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      parachutistImage,
      this.x,
      this.y,
      PARACHUTIST_WIDTH,
      PARACHUTIST_HEIGHT
    );
  }

  // Update the parachutist position
  update() {
    this.y += this.speed;
    if (this.y > this.canvas.height) {
      this.y = GAME_OVER_Y_POSITION;
    }
  }
}
