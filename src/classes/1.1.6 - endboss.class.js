class Endboss extends MovableObject {
  positionY = 50;
  height = 400;
  width = 400;
  Damage = 20;
  speed = 1;
  energy = 100;
  offsetLeft = 30;
  offsetTop = 70;
  offsetRight = 55;
  offsetBottom = 120;
  alerted = false;
  attacking = false;
  attacked = false;
  jumpingwidth = 20;

  IMAGES_WALKING = [
    "src/img/4_enemie_boss_chicken/1_walk/G1.png",
    "src/img/4_enemie_boss_chicken/1_walk/G2.png",
    "src/img/4_enemie_boss_chicken/1_walk/G3.png",
    "src/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERTING = [
    "src/img/4_enemie_boss_chicken/2_alert/G5.png",
    "src/img/4_enemie_boss_chicken/2_alert/G6.png",
    "src/img/4_enemie_boss_chicken/2_alert/G7.png",
    "src/img/4_enemie_boss_chicken/2_alert/G8.png",
    "src/img/4_enemie_boss_chicken/2_alert/G9.png",
    "src/img/4_enemie_boss_chicken/2_alert/G10.png",
    "src/img/4_enemie_boss_chicken/2_alert/G11.png",
    "src/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACKING = [
    "src/img/4_enemie_boss_chicken/3_attack/G13.png",
    "src/img/4_enemie_boss_chicken/3_attack/G14.png",
    "src/img/4_enemie_boss_chicken/3_attack/G15.png",
    "src/img/4_enemie_boss_chicken/3_attack/G16.png",
    "src/img/4_enemie_boss_chicken/3_attack/G17.png",
    "src/img/4_enemie_boss_chicken/3_attack/G18.png",
    "src/img/4_enemie_boss_chicken/3_attack/G19.png",
    "src/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "src/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "src/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "src/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "src/img/4_enemie_boss_chicken/5_dead/G24.png",
    "src/img/4_enemie_boss_chicken/5_dead/G25.png",
    "src/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.positionX = 2500;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERTING);
    this.loadImages(this.IMAGES_ATTACKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.alerted && !this.attacking && !this.isDead()) {
        this.Damage = 20;
        this.moveLeft();

      }
      if (this.attacking && this.imageOfInterest && !this.isDead()) {
        this.Damage = 35;
        this.positionX = this.positionX - this.jumpingwidth;
      }

      if (this.isDead()) {
        this.Damage = 0;
        this.positionX += 2;
      }
    }, 1000/60);
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt() && !this.isDead()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (!this.alerted && !this.attacking && !this.isDead() && !this.isHurt()) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.alerted && !this.attacking && !this.isDead() && !this.isHurt()) {
        this.playAnimation(this.IMAGES_ALERTING);
      } else if (this.attacking && !this.alerted && !this.isDead() && !this.isHurt()) {
        this.playAnimation(this.IMAGES_ATTACKING);
        this.gettingPictureOfInterest('G18');
      } 
    }, 175);
  }


}