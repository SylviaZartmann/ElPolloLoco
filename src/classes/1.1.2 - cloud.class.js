class Cloud extends MovableObject {
  positionY = 50;
  width = 400;
  height = 250;
  speed = 0.15;

  constructor(imagepath, positionX) {
    super().loadImage(imagepath);
    this.positionX = positionX;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000/60);
    
    if (this.positionX <= -300) {
      this.positionX = 719*4;
    }
  }
}
