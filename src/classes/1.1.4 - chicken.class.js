class Chicken extends MovableObject {
  positionY = 350;
  height = 75;
  width = 75;
  energy = 10;
  charDamage = 5;
  movementRange = 150;
  bodyLeft = 0;
  bodyTop = 20;
  bodyRight = 10;
  bodyBottom = 35;

  IMAGES_WALKING = [
    "src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "src/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "src/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  
  IMAGES_DEAD = ['src/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.findStartPosition();
    while (this.positionX >= 0 && this.positionX <= 500) {
      this.findStartPosition();
    }
    this.loadImages(this.IMAGES_WALKING);               //es werden alle Bilder des chicken in Bewegung in JSON geladen
    this.speed = 0.5 + Math.random() * 0.75;
    this.animate();
  }

  findStartPosition() {
    this.positionX = this.minExistence + Math.random() * this.maxExistence;
    this.startPosition = this.positionX;
  }

  animate() {
    this.movementState = 'moveLeft';
    setInterval(() => {
      if (this.movementState === 'moveLeft') {
        this.moveLeft();
        this.otherDirection = false; 
    
        if (this.positionX <= this.startPosition - this.movementRange) {
          this.movementState = 'moveRight';
        }
      } else if (this.movementState === 'moveRight') {
        this.moveRight();
        this.otherDirection = true; 
    
        if (this.positionX >= this.startPosition + this.movementRange) {
          this.movementState = 'moveLeft';
        }
      }
    }, 1000/60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      //if (this.energy < 0) {
     //   this.playAnimation(this.IMAGES_DEAD);
      //  this.world.level.egg = new Eggstate();
      //}
    }, 250);
  }
}


//if (character.positionX > chicken.positionX+chicken.width ||
//    character-positionX > chick.postionX + chick.width ||
//    character-positionX > endboss.postionX + endboss.width ) {
//      this.moveRight();
//      this.otherDirection = true;
//    }