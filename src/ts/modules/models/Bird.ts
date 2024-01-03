import { MAX_TICK, UPFLAP, MIDFLAP } from "../../constants";

export default class Bird {
  private ctx: CanvasRenderingContext2D;
  private currentSprite = 0;
  private frameInterval = 5;
  private gravity = 0.5;
  private speed = 0;
  private birdJump = 11.5;
  private xPosition = 20;
  private yPosition = window.innerHeight / 2;
  private sprites: HTMLImageElement[] = [];

  constructor(ctx: CanvasRenderingContext2D, sprites: HTMLImageElement[] = []) {
    this.ctx = ctx;
    this.sprites = sprites;
  }

  private draw() {
    this.ctx.drawImage(
      this.sprites[this.currentSprite],
      this.xPosition,
      this.yPosition
    );
  }

  update() {
    this.speed = this.speed + this.gravity;
    this.yPosition = this.yPosition + this.speed;
    this.updateSprite();
    this.draw();
  }

  private updateSprite() {
    if (this.frameInterval === MAX_TICK) {
      this.currentSprite++;
      this.frameInterval = 0;

      if (this.currentSprite > UPFLAP) this.currentSprite = MIDFLAP;
    }

    this.frameInterval++;
  }

  jump() {
    this.speed = -this.birdJump;
  }
}
