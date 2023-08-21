class ThrowableObject extends MovableObject {
  height = 60;
  width = 60;
  fallingSpeedY = 18;
  Damage = 10;
  flying = true;
  splashed = false;
  offsetLeft = 0;
  offsetTop = 0;
  offsetRight = 0;
  offsetBottom = 0;

  rotating_sound = new Audio('src/audio/throw_bottle.mp3');
  spalshing_sound = new Audio('src/audio/break_bottle.mp3');

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
      this.flyingAndStuff();
    }, 1000 / 60);
    setInterval(() => {
      this.soundAndAnimation();
    }, 100);
  }

  flyingAndStuff() {
    if (this.flying && this.otherDirection) {
      this.positionX -= 4;
    } else if (this.flying) {
      this.positionX += 4;
    }
    if (this.flying && this.positionY + this.height >= 400) {
      this.flying = false;
    }
  }

  soundAndAnimation() {
    if (this.flying) {
      this.rotating_sound.play();
      this.playAnimation(this.ROTATING_BOTTLE);
    }
    if (!this.flying) {
      this.rotating_sound.pause();
      this.spalshing_sound.play();
      
      this.playAnimation(this.SPLASH_BOTTLE);
      this.gettingPictureOfInterest('6_bottle_splash');
      setTimeout(() => {
        this.spalshing_sound.pause(); 
      }, 1000);
      if (this.imageOfInterest) {
      this.removeInstance(world.throwableObjects);
      }
    }
  }
}


