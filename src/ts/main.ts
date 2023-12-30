import Game from "./modules/models/Game";
import addEvent from "./modules/utils/dom/addEvent";
import preloadImages from "./modules/utils/canvas/preloadImages";
import yellowBirdMidflap from "/sprites/yellowbird-midflap.png?url";
import yellowBirdDownflap from "/sprites/yellowbird-downflap.png?url";
import yellowBirdUpflap from "/sprites/yellowbird-upflap.png?url";
import "../css/style.css";

async function init() {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const images = await preloadImages([
    yellowBirdMidflap,
    yellowBirdDownflap,
    yellowBirdUpflap,
  ]);

  const game = new Game(ctx, images);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.setBirdSprite();
    game.update();
    requestAnimationFrame(animate);
  }

  animate();

  addEvent("click", window, game.birdJump.bind(game));
}

init();
