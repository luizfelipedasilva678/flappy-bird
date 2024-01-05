import getRandomIntInclusive from "../utils/math/getRandomIntInclusive";

export default class Pipe {
  private ctx: CanvasRenderingContext2D;
  private sprite: HTMLImageElement;
  private dx: number = 2;
  private pipePosx: number;
  private downPipePosy: number;
  private upPipePosy: number;
  private pipeGap: number;
  private offScreen = false;

  constructor(
    ctx: CanvasRenderingContext2D,
    sprite: HTMLImageElement,
    xPosition: number,
    gameHeight: number,
    pipeGap: number
  ) {
    this.ctx = ctx;
    this.pipeGap = pipeGap;
    this.sprite = sprite;
    this.pipePosx = xPosition;
    this.upPipePosy = getRandomIntInclusive(0, -gameHeight / 2);
    this.downPipePosy = this.upPipePosy + gameHeight / 2 + this.pipeGap;
  }

  rotateAndPaintPipe() {
    this.ctx.save();
    this.ctx.translate(this.sprite.width / 2, this.sprite.height / 2);
    this.ctx.rotate(Math.PI);
    this.ctx.drawImage(
      this.sprite,
      -this.sprite.width / 2 - this.pipePosx,
      -this.sprite.height / 2 - this.upPipePosy
    );
    this.ctx.restore();
  }

  draw() {
    this.rotateAndPaintPipe();
    this.ctx.drawImage(this.sprite, this.pipePosx, this.downPipePosy);
  }

  update() {
    if (this.pipePosx <= -this.sprite.width) {
      this.offScreen = true;
      return;
    }

    this.pipePosx -= this.dx;
    this.draw();
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

  get pipeXPosition() {
    return this.pipePosx;
  }

  get upPipeYPosition() {
    return this.upPipePosy;
  }

  get downPipeYPosition() {
    return this.downPipePosy;
  }
}
