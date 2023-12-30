import Bird from "./modules/models/Bird";
import preloadImages from "./modules/utils/canvas/preloadImages";
import yellowBirdMidflap from "/sprites/yellowbird-midflap.png?url";
import yellowBirdDownflap from "/sprites/yellowbird-downflap.png?url";
import yellowBirdUpflap from "/sprites/yellowbird-upflap.png?url";
import { MAX_TICK, MIDFLAP, UPFLAP } from "./constants";
import "../css/style.css";
import addEvent from "./modules/utils/dom/addEvent";

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

  const bird = new Bird(ctx, images);
  let birdSprite = 0,
    tick = 0;

  function updateBirdSprite() {
    if (tick === MAX_TICK) {
      birdSprite++;
      tick = 0;
      if (birdSprite > UPFLAP) birdSprite = MIDFLAP;
    }

    tick++;
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateBirdSprite();
    bird.update(birdSprite);

    requestAnimationFrame(animate);
  }

  animate();

  addEvent("click", window, bird.jump.bind(bird));
}

init();
