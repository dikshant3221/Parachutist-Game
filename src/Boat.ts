import { boatImage } from "./images";
import { BOAT_WIDTH, BOAT_HEIGHT, BOAT_MOVE_STEP } from "./constants";

// Define the Boat class
export class Boat {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - BOAT_HEIGHT;
  }

  // Draw the boat on the canvas
  draw() {
    this.ctx.drawImage(boatImage, this.x, this.y, BOAT_WIDTH, BOAT_HEIGHT);
  }

  // Move the boat left
  moveLeft() {
    this.x -= BOAT_MOVE_STEP;
    this.x = Math.max(0, this.x);
  }

  // Move the boat right
  moveRight() {
    this.x += BOAT_MOVE_STEP;
    this.x = Math.min(this.canvas.width - BOAT_WIDTH, this.x);
  }

  // Get the x-coordinate of the boat
  getX() {
    return this.x;
  }

  // Get the y-coordinate of the boat
  getY() {
    return this.y;
  }
}
