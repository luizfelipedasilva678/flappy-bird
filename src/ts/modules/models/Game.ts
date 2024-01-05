import Bird from "./Bird";
import Pipe from "./Pipe";
import CollisionDetector from "./CollisionDetector";

export default class Game {
  private sprites: HTMLImageElement[] = [];
  private width: number;
  private height: number;
  private frameCount = 0;
  private score = 0;
  private pipes: Pipe[] = [];
  private pipeGap = 250;
  private bird: Bird;
  private ctx: CanvasRenderingContext2D;
  private _isPlaying = false;
  private _gameOver = false;

  setBestScore() {
    const bestScore = localStorage.getItem("bestScore");

    if (bestScore) {
      if (this.score > parseInt(bestScore)) {
        localStorage.setItem("bestScore", `${this.score}`);
      }
    } else {
      localStorage.setItem("bestScore", `${this.score}`);
    }
  }

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
    this.bird = new Bird(ctx, this, this.sprites.slice(0, 3), 100, height / 2);
    this.pipes = this.createPipes();
  }

  createPipes() {
    return Array.from(
      { length: 2 },
      (_, i) =>
        new Pipe(
          this.ctx,
          this.sprites[4],
          this.width + this.pipeGap * i,
          this.height,
          this.pipeGap
        )
    );
  }

  restart() {
    this.pipes = this.createPipes();
    this.bird = new Bird(
      this.ctx,
      this,
      this.sprites.slice(0, 3),
      100,
      this.height / 2
    );
    this.score = 0;
    this.gameOver = false;
    this.isPlaying = false;
  }

  update() {
    this.drawBackground();

    for (const pipe of this.pipes) {
      if (this.isPlaying) {
        pipe.update();

        if (CollisionDetector.checkCollision(pipe, this.bird)) {
          this.gameOver = true;
          this.isPlaying = false;
          this.setBestScore();
          return;
        }
      }
    }

    this.bird.update();
    this.drawScore();
    this.frameCount++;

    if (this.gameOver) this.drawBestScore();

    const offScreenPipe = this.pipes.find((pipe) => pipe.isOffScreen);

    if (offScreenPipe) {
      this.score++;

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

  private drawBestScore() {
    const bestScore = localStorage.getItem("bestScore");

    if (bestScore) {
      this.ctx.font = "bold 30px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(`Best score: ${bestScore}`, 75, 100);
    }
  }

  private drawScore() {
    this.ctx.font = "bold 50px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`${this.score}`, this.width / 2, 50);
  }

  private drawBackground() {
    this.ctx.drawImage(this.sprites[3], 0, 0, this.width, this.height);
  }

  birdJump() {
    this.bird.jump();
  }

  get isPlaying() {
    return this._isPlaying;
  }

  set isPlaying(value: boolean) {
    this._isPlaying = value;
  }

  get gameOver() {
    return this._gameOver;
  }

  set gameOver(value: boolean) {
    this._gameOver = value;
  }
}
