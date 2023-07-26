class ThrowableObject extends MovableObject {
  height = 60;
  width = 60;

  ROTATING_BOTTLE = [
    "src/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "src/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "src/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "src/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  SPLASH_BOTTLE = [
    "src/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "src/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "src/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "src/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "src/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "src/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage(this.ROTATING_BOTTLE[0]); //initialisierung der übergeordneten Objekte
    this.positionX = x;
    this.positionY = y;
    this.loadImages(this.ROTATING_BOTTLE);
    this.throw();
  }

  throw() {
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
      this.positionX += 10;
    }, 25);
  }
}
