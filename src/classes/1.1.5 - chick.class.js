class Chick extends MovableObject {
  positionY = 390;
  height = 35;
  width = 35;
  movingDirection = 'left';
 
  IMAGES_WALKING = [
    "src/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "src/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "src/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ['src/img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  constructor(positionX, hetchTime) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.positionX = positionX;
    this.hetchTime = hetchTime;
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 1.2 + Math.random() * 1.5;
    this.animate();
    
  }

  animate() {
    setTimeout(() => {
      setInterval(() => {
      if (this.movingDirection == 'left') {
        this.moveLeft();
        this.otherDirection = false;
      }
      if (this.movingDirection == 'right') {
        this.moveRight();
        this.otherDirection = true;
      }
      this.chickBecomesChicken();
    }, 1000/60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
    }, 1000);
  }
}