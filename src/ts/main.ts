import "../css/style.css";

function startGame() {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.beginPath();
  ctx.fillRect(100, 100, 100, 100);
  ctx.fill();
}

startGame();
