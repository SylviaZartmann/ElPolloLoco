class Endboss extends MovableObject {
  positionY = 50;
  height = 400;
  width = 400;

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
    super().loadImage(this.IMAGES_ALERTING[0]);
    this.positionX = 2950;
    this.loadImages(this.IMAGES_ALERTING); //es werden alle Bilder des Endboss in JSON geladen
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ALERTING);
    }, 250);
  }
}