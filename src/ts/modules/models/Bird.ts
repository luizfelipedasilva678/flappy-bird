export default class Bird {
  private ctx: CanvasRenderingContext2D;
  private sprites: HTMLImageElement[] = [];

  constructor(ctx: CanvasRenderingContext2D, sprites: HTMLImageElement[] = []) {
    this.ctx = ctx;
    this.sprites = sprites;
  }

  draw(spritePos: number) {
    this.ctx.drawImage(this.sprites[spritePos], 0, 0);
  }

  update(spritePos: number) {
    this.draw(spritePos);
  }
}
