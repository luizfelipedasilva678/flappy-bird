export default class Bird {
  private ctx: CanvasRenderingContext2D;
  private gravity = 0.5;
  private speed = 0;
  private birdJump = 11.5;
  private xPosition = 100;
  private yPosition = window.innerHeight / 2;
  private sprites: HTMLImageElement[] = [];

  constructor(ctx: CanvasRenderingContext2D, sprites: HTMLImageElement[] = []) {
    this.ctx = ctx;
    this.sprites = sprites;
  }

  draw(spritePos: number) {
    this.ctx.drawImage(this.sprites[spritePos], this.xPosition, this.yPosition);
  }

  update(spritePos: number) {
    this.speed = this.speed + this.gravity;
    this.yPosition = this.yPosition + this.speed;
    this.draw(spritePos);
  }

  jump() {
    this.speed = -this.birdJump;
  }
}
