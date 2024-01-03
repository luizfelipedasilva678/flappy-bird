import Bird from "./Bird";
import Pipe from "./Pipe";

export default class Game {
  private sprites: HTMLImageElement[] = [];
  private width: number;
  private height: number;
  private frameCount = 0;
  private pipes: Pipe[] = [];
  private bird: Bird;
  private ctx: CanvasRenderingContext2D;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    sprites: HTMLImageElement[] = []
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.sprites = sprites;
    this.bird = new Bird(ctx, this.sprites.slice(0, 3));
    this.pipes = Array.from(
      { length: 2 },
      (_, i) => new Pipe(ctx, this.sprites[4], i, this.width, this.height)
    );
  }

  update() {
    this.renderBackground();
    this.pipes.forEach((pipe) => pipe.update());
    this.bird.update();
    this.frameCount++;

    const offScreenPipeIdx = this.pipes.findIndex((pipe) => pipe.isOffScreen);

    if (offScreenPipeIdx !== -1) {
      this.pipes = [
        ...this.pipes.slice(1),
        new Pipe(
          this.ctx,
          this.sprites[4],
          offScreenPipeIdx,
          this.width,
          this.height
        ),
      ];
    }
  }

  renderBackground() {
    this.ctx.drawImage(this.sprites[3], 0, 0, this.width, this.height);
  }

  birdJump() {
    this.bird.jump();
  }
}
