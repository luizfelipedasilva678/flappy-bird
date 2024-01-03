import getRandomIntInclusive from "../utils/math/getRandomIntInclusive";

export default class Pipe {
  private ctx: CanvasRenderingContext2D;
  private sprite: HTMLImageElement;
  public dx: number;
  private downPipePosy: number;
  private upPipePosy: number;
  private pipeGap = 200;
  private offScreen = false;

  constructor(
    ctx: CanvasRenderingContext2D,
    sprite: HTMLImageElement,
    pipe: number,
    gameWidth: number,
    gameHeight: number
  ) {
    this.ctx = ctx;
    this.sprite = sprite;
    this.dx = gameWidth + this.pipeGap * pipe;
    this.upPipePosy = getRandomIntInclusive(0, -gameHeight / 2);
    this.downPipePosy = this.upPipePosy + gameHeight / 2 + this.pipeGap;
  }

  rotateAndPaintPipe() {
    this.ctx.save();
    this.ctx.translate(this.sprite.width / 2, this.sprite.height / 2);
    this.ctx.rotate(Math.PI);
    this.ctx.drawImage(
      this.sprite,
      -this.sprite.width / 2 - this.dx,
      -this.sprite.height / 2 - this.upPipePosy
    );
    this.ctx.restore();
  }

  draw() {
    this.rotateAndPaintPipe();
    this.ctx.drawImage(this.sprite, this.dx, this.downPipePosy);
  }

  update() {
    if (this.dx <= -this.sprite.width) {
      this.offScreen = true;
      return;
    }

    this.dx -= 2;
    this.draw();
  }

  set isOffScreen(value: boolean) {
    this.offScreen = value;
  }

  get isOffScreen() {
    return this.offScreen;
  }
}
