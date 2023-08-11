class Chicken extends MovableObject {
  positionY = 350;
  height = 75;
  width = 75;
  energy = 100;
  charDamage = 1;
  movementRange = 250;
  offsetLeft = 5;
  offsetTop = 10;
  offsetRight = 10;
  offsetBottom = 25;
  minExistence = 400;
  maxExistence = 2560;

  IMAGES_WALKING = [
    "src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "src/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "src/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  
  IMAGES_DEAD = ['src/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  constructor(positionX, otherDirection) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.isPositionX(positionX);
    this.otherDirection = otherDirection;
    this.loadImages(this.IMAGES_WALKING);               //es werden alle Bilder des chicken in Bewegung in JSON geladen
    this.loadImages(this.IMAGES_DEAD); 
    this.speed = 0.5 + Math.random() * 0.75;
    this.animate();
  }

  isPositionX(positionX) {
    if (positionX === 9999) {
      this.findStartPosition();
    } else {
      this.positionX = positionX;
      this.startPosition = positionX;
    }
  }

  findStartPosition() {
      this.positionX = this.minExistence + Math.random() * this.maxExistence;
      this.startPosition = this.positionX;
  }

  animate() {
    setInterval(() => {
      if (!this.otherDirection && !this.isDead()) {
        this.moveLeft();
    
        if (this.positionX <= this.startPosition - this.movementRange) {
          this.otherDirection = true; 
        }
      } else if (this.otherDirection && !this.isDead()) {
        this.moveRight();
    
        if (this.positionX >= this.startPosition + this.movementRange) {
          this.otherDirection = false; 
        }
      }
      if (this.isDead()) {
        this.charDamage = 0;
        this.offsetTop = 500;
        setTimeout(() => {
          this.positionY += 5;
        }, 2000);
      }
    }, 1000/60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      }
    }, 250);
  }
}
