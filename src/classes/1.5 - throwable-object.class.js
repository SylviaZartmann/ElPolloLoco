class ThrowableObject extends MovableObject {
  height = 60;
  width = 60;
  fallingSpeedY = 18;
  energy = 1;
  enemDamage = 10;
  flying = true;
  splashed = false;

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

  constructor(x, y, direction) {
    super().loadImage(this.ROTATING_BOTTLE[0]);
    this.positionX = x;
    this.positionY = y;
    this.otherDirection = direction;
    this.loadImages(this.ROTATING_BOTTLE);
    this.loadImages(this.SPLASH_BOTTLE);
    this.throw();
  }

  throw() {
    this.applyGravity();

    setInterval(() => {
      if (this.flying && this.otherDirection) {
        this.positionX -= 4;
      } else if (this.flying) {
        this.positionX += 4;
      }
      if (this.flying && this.positionY + this.height >= 400) {
        this.isDead();
        this.flying = false;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.flying) this.playAnimation(this.ROTATING_BOTTLE);
      if (!this.flying) {
        this.playAnimationOnce(this.SPLASH_BOTTLE, this.positionX);
      }
    }, 100);
  }
}


