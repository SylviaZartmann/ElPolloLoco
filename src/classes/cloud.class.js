class Cloud extends MovableObject {
  positionY = 50;
  width = 400;
  height = 250;
  speed = 0.15;

  constructor(imagepath) {
    super().loadImage(imagepath);
    this.positionX = 120 + Math.random() * 500; //ohne "super()", weil variable
    //Zahl zwischen 200 und 700 - zufällig genereiert
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
