import Pipe from "./Pipe";
import Bird from "./Bird";

export default class CollisionDetector {
  static checkCollision(pipe: Pipe, bird: Bird) {
    const insideUpPipe =
      bird.birdXPosition + bird.birdWidth >= pipe.upPipeXPosition &&
      bird.birdXPosition <= pipe.upPipeXPosition + pipe.pipeWidth &&
      bird.birdYPosition + bird.birdHeight >= pipe.upPipeYPosition &&
      bird.birdYPosition <= pipe.upPipeYPosition + pipe.pipeHeight;

    const insideDownPipe =
      bird.birdXPosition + bird.birdWidth >= pipe.downPipeXPosition &&
      bird.birdXPosition <= pipe.downPipeXPosition + pipe.pipeWidth &&
      bird.birdYPosition + bird.birdHeight >= pipe.downPipeYPosition &&
      bird.birdYPosition <= pipe.downPipeYPosition + pipe.pipeHeight;

    if (insideUpPipe || insideDownPipe) {
      console.log("collision !!");
    }
  }
}
