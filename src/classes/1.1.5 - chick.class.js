class Chick extends MovableObject {
  positionY = 390;
  height = 35;
  width = 35;
 
  IMAGES_WALKING = [
    "src/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "src/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "src/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ['src/img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  constructor(positionX) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.positionX = positionX;
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 0.2 + Math.random() * 0.45;
    this.animate();
  }

  animate() {
    setInterval(() => {
        this.moveLeft();
        
    }, 1000/60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }
}



//if (character.positionX > chicken.positionX+chicken.width ||
//    character-positionX > chick.postionX + chick.width ||
//    character-positionX > endboss.postionX + endboss.width ) {
//      this.moveRight();
//      this.otherDirection = true;
//    }