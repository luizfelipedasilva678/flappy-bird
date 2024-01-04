import getRandomIntInclusive from "../utils/math/getRandomIntInclusive";

export default class Pipe {
  private ctx: CanvasRenderingContext2D;
  private sprite: HTMLImageElement;
  private dx: number;
  private downPipePosy: number;
  private upPipePosy: number;
  private pipeGap = 200;
  private offScreen = false;
  private _upPipeXPosition: number = 0;
  private _upPipeYPosition: number = 0;

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
    this._upPipeXPosition = -this.sprite.width / 2 - this.dx;
    this._upPipeYPosition = -this.sprite.height / 2 - this.upPipePosy;
    this.ctx.drawImage(
      this.sprite,
      this._upPipeXPosition,
      this._upPipeYPosition
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

  get pipeWidth() {
    return this.sprite.width;
  }

  get pipeHeight() {
    return this.sprite.height;
  }

  get upPipeXPosition() {
    return this._upPipeXPosition;
  }

  get upPipeYPosition() {
    return this._upPipeYPosition;
  }

  get downPipeXPosition() {
    return this.dx;
  }

  get downPipeYPosition() {
    return this.downPipePosy;
  }
}
