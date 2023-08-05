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

  constructor(positionX, existance) {
    super().loadImage(this.IMAGES_EGGSTATE_SHAKING[0]);
    this.positionX = positionX;
    this.existance = existance;
    this.loadImages(this.IMAGES_EGGSTATE_SHAKING);
    this.loadImages(this.IMAGES_EGGSTATE_CRACKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let currentTime = new Date();
      let elapsedTime = currentTime - this.existance;
      if (elapsedTime < 5000) {
        this.playAnimation(this.IMAGES_EGGSTATE_SHAKING);
      } else {
        this.playAnimationOnce(this.IMAGES_EGGSTATE_CRACKING, this.positionX);
      }
    }, 250);
    
  }
}