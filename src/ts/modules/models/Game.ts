import Bird from "./Bird";
import Pipe from "./Pipe";
import CollisionDetector from "./CollisionDetector";

export default class Game {
  private sprites: HTMLImageElement[] = [];
  private width: number;
  private height: number;
  private frameCount = 0;
  private pipes: Pipe[] = [];
  private pipeGap = 250;
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
      (_, i) =>
        new Pipe(
          ctx,
          this.sprites[4],
          this.width + this.pipeGap * i,
          this.height,
          this.pipeGap
        )
    );
  }

  update() {
    this.renderBackground();

    for (const pipe of this.pipes) {
      if (CollisionDetector.checkCollision(pipe, this.bird)) {
        return;
      }

      pipe.update();
    }

    this.bird.update();
    this.frameCount++;

    const offScreenPipe = this.pipes.find((pipe) => pipe.isOffScreen);

    if (offScreenPipe) {
      const lastPipe = this.pipes[this.pipes.length - 1];

      this.pipes = [
        ...this.pipes.slice(1),
        new Pipe(
          this.ctx,
          this.sprites[4],
          lastPipe.pipeXPosition + this.pipeGap,
          this.height,
          this.pipeGap
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
