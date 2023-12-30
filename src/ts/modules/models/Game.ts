import Bird from "./Bird";
import { MAX_TICK, MIDFLAP, UPFLAP } from "../../constants";

export default class Game {
  private ctx: CanvasRenderingContext2D;
  private sprites: HTMLImageElement[] = [];
  private bird: Bird;
  private birdSprite = 0;
  private frameInterval = 5;

  constructor(ctx: CanvasRenderingContext2D, sprites: HTMLImageElement[] = []) {
    this.ctx = ctx;
    this.sprites = sprites;
    this.bird = new Bird(ctx, this.sprites.slice(0, 3));
  }

  update() {
    this.bird.update(this.birdSprite);
  }

  renderBackground() {
    this.ctx.drawImage(
      this.sprites[3],
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
  }

  setBirdSprite() {
    if (this.frameInterval === MAX_TICK) {
      this.birdSprite++;
      this.frameInterval = 0;

      if (this.birdSprite > UPFLAP) this.birdSprite = MIDFLAP;
    }

    this.frameInterval++;
  }

  birdJump() {
    this.bird.jump();
  }
}
