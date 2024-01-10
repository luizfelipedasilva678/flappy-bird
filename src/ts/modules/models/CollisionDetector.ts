import Pipe from "./Pipe";
import Bird from "./Bird";

export default class CollisionDetector {
  static checkCollision(pipe: Pipe, bird: Bird) {
    const insideUpPipe =
      bird.birdXPosition + bird.birdWidth >= pipe.pipeXPosition &&
      bird.birdXPosition <= pipe.pipeXPosition + pipe.pipeWidth &&
      bird.birdYPosition + bird.birdHeight >= pipe.upPipeYPosition &&
      bird.birdYPosition <= pipe.upPipeYPosition + pipe.pipeHeight;

    const insideDownPipe =
      bird.birdXPosition + bird.birdWidth >= pipe.pipeXPosition &&
      bird.birdXPosition <= pipe.pipeXPosition + pipe.pipeWidth &&
      bird.birdYPosition + bird.birdHeight >= pipe.downPipeYPosition &&
      bird.birdYPosition <= pipe.downPipeYPosition + pipe.pipeHeight;

    return insideUpPipe || insideDownPipe;
  }
}
