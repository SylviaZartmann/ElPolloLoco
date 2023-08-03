class Eggstate extends MovableObject {
  positionY = 375;
  positionX = 350;
  height = 40;
  width = 40;

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

  constructor() {
    super().loadImage(this.IMAGES_EGGSTATE_SHAKING[0]);
    this.loadImages(this.IMAGES_EGGSTATE_SHAKING);
    this.loadImages(this.IMAGES_EGGSTATE_CRACKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_EGGSTATE_SHAKING);
    }, 250);
  }
}