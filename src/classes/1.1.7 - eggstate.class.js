class Eggstate extends MovableObject {
  positionY = 375;
  positionX;
  height = 40;
  width = 40;
  chickAdded = false;

  IMAGES_EGGSTATE_SHAKING = [
    "src/img/10_egg/egg_normal.png",
    "src/img/10_egg/egg_left.png",
    "src/img/10_egg/egg_normal.png",
    "src/img/10_egg/egg_right.png"
  ];

  IMAGES_EGGSTATE_CRACKING = [
    "src/img/10_egg/egg_normal.png",
    "src/img/10_egg/egg_crack01.png",
    "src/img/10_egg/egg_crack02.png",
    "src/img/10_egg/egg_crack03.png",
    "src/img/10_egg/egg_crack04.png"
  ]

  constructor(positionX, eggsistance) {
    super().loadImage(this.IMAGES_EGGSTATE_SHAKING[0]);
    this.positionX = positionX;
    this.isEggsistant(eggsistance);
    this.loadImages(this.IMAGES_EGGSTATE_SHAKING);
    this.loadImages(this.IMAGES_EGGSTATE_CRACKING);
    this.animate();
  }

  isEggsistant(eggsistance) {
    if (eggsistance === 9999) this.existance = new Date();
    else this.existance = eggsistance;
  }

  animate() {
      setInterval(() => {
      this.currentTime = new Date();
      this.elapsedTime = this.currentTime - this.existance;
      if (this.elapsedTime < 5000) {
        this.playAnimation(this.IMAGES_EGGSTATE_SHAKING);
      } else if (!this.chickAdded) {
        this.playAnimation(this.IMAGES_EGGSTATE_CRACKING);
        this.gettingPictureOfInterest('egg_crack04');
      }
      if (!this.chickAdded && world) {
          this.eggBecomesChick(this.positionX);
        }
    }, 250); 
  }
  
  eggBecomesChick(positionX) {
    if (this.imageOfInterest) {
      this.chickAdded = true;
      setTimeout(() => {
        world.level.lowEnemies.push(new Chick(positionX, new Date()));
      }, 800);
    }
  }
}