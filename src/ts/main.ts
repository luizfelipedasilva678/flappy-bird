import Game from "./modules/models/Game";
import addEvent from "./modules/utils/dom/addEvent";
import preloadImages from "./modules/utils/canvas/preloadImages";
import yellowBirdMidflap from "/sprites/yellowbird-midflap.png?url";
import yellowBirdDownflap from "/sprites/yellowbird-downflap.png?url";
import yellowBirdUpflap from "/sprites/yellowbird-upflap.png?url";
import backgroundDay from "/sprites/background-day.png?url";
import pipeGreen from "/sprites/pipe-green.png?url";
import "../css/style.css";

async function init() {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = 320;
  canvas.height = 480;

  const images = await preloadImages([
    yellowBirdMidflap,
    yellowBirdDownflap,
    yellowBirdUpflap,
    backgroundDay,
    pipeGreen,
  ]);

  const game = new Game(ctx, canvas.width, canvas.height, images);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    window.requestAnimationFrame(animate);
  }

  animate();

  addEvent("click", window, game.birdJump.bind(game));
}

init();
