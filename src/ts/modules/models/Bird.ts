import { MAX_TICK, UPFLAP, MIDFLAP } from "../../constants";
import Game from "./Game";

export default class Bird {
  private ctx: CanvasRenderingContext2D;
  private sprites: HTMLImageElement[] = [];
  private xPosition: number;
  private yPosition: number;
  private game: Game;
  private currentSprite = 0;
  private frameInterval = 5;
  private gravity = 0.5;
  private speed = 0;
  private birdJump = 11.5;

  constructor(
    ctx: CanvasRenderingContext2D,
    game: Game,
    sprites: HTMLImageElement[] = [],
    initialXPosition: number = 100,
    initialYPosition: number = window.innerHeight / 2
  ) {
    this.ctx = ctx;
    this.xPosition = initialXPosition;
    this.yPosition = initialYPosition;
    this.sprites = sprites;
    this.game = game;
  }

  private draw() {
    this.ctx.drawImage(
      this.sprites[this.currentSprite],
      this.xPosition,
      this.yPosition
    );
  }

  update() {
    if (this.game.isPlaying) {
      this.speed = this.speed + this.gravity;
      this.yPosition = this.yPosition + this.speed;
    }

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

  get birdWidth() {
    return this.sprites[0].width;
  }

  get birdHeight() {
    return this.sprites[0].height;
  }

  get birdXPosition() {
    return this.xPosition;
  }

  get birdYPosition() {
    return this.yPosition;
  }
}
