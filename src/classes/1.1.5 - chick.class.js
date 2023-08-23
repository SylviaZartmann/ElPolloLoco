class Chick extends MovableObject {
  positionY = 390;
  height = 35;
  width = 35;
  
  chick_shirping = new Audio('src/audio/Chick shirping.mp3');
 
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
    this.chick_shirping.play();   
    this.chick_shirping.volume = 0.3;   
    setTimeout(() => {
      setInterval(() => {
      if (!this.otherDirection) this.moveLeft();
      if (this.otherDirection) this.moveRight();
      this.chickBecomesChicken();
    }, 1000/60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
    }, 1000);
  }
  
  chickBecomesChicken() {
    if (!this.chickenAdded) {
      let currentTime = new Date();
      if (currentTime - this.hetchTime >= 20000) {
        this.chick_shirping.pause();   
        this.chickenAdded = true;
        world.level.enemies.push(new Chicken(this.positionX, this.otherDirection));
        this.removeInstance(world.level.lowEnemies);
      }
    }
  }
}