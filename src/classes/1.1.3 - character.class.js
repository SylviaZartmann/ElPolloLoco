class Character extends MovableObject {
  positionX = 100;
  positionY = 130;
  height = 300;
  width = 150;
  world; //der Charakter hat hiermit eine Variable "world", mit der wir auf die Variablen aus der Wolrd zugreifen können - auch Keyboard
  //walking_sound = new Audio('src/audio/running.mp3');
  speed = 5;

  IMAGES_IDLE = [
    "src/img/2_character_pepe/1_idle/idle/I-1.png",
    "src/img/2_character_pepe/1_idle/idle/I-2.png",
    "src/img/2_character_pepe/1_idle/idle/I-3.png",
    "src/img/2_character_pepe/1_idle/idle/I-4.png",
    "src/img/2_character_pepe/1_idle/idle/I-5.png",
    "src/img/2_character_pepe/1_idle/idle/I-6.png",
    "src/img/2_character_pepe/1_idle/idle/I-7.png",
    "src/img/2_character_pepe/1_idle/idle/I-8.png",
    "src/img/2_character_pepe/1_idle/idle/I-9.png",
    "src/img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONGIDLE = [
    "src/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "src/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "src/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "src/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "src/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "src/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "src/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "src/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "src/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "src/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_WALKING = [
    "src/img/2_character_pepe/2_walk/W-21.png",
    "src/img/2_character_pepe/2_walk/W-22.png",
    "src/img/2_character_pepe/2_walk/W-23.png",
    "src/img/2_character_pepe/2_walk/W-24.png",
    "src/img/2_character_pepe/2_walk/W-25.png",
    "src/img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "src/img/2_character_pepe/3_jump/J-31.png",
    "src/img/2_character_pepe/3_jump/J-32.png",
    "src/img/2_character_pepe/3_jump/J-33.png",
    "src/img/2_character_pepe/3_jump/J-34.png",
    "src/img/2_character_pepe/3_jump/J-35.png",
    "src/img/2_character_pepe/3_jump/J-36.png",
    "src/img/2_character_pepe/3_jump/J-37.png",
    "src/img/2_character_pepe/3_jump/J-38.png",
    "src/img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_HURT = [
    "src/img/2_character_pepe/4_hurt/H-41.png",
    "src/img/2_character_pepe/4_hurt/H-42.png",
    "src/img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEAD = [
    "src/img/2_character_pepe/5_dead/D-51.png",
    "src/img/2_character_pepe/5_dead/D-52.png",
    "src/img/2_character_pepe/5_dead/D-53.png",
    "src/img/2_character_pepe/5_dead/D-54.png",
    "src/img/2_character_pepe/5_dead/D-55.png",
    "src/img/2_character_pepe/5_dead/D-56.png",
    "src/img/2_character_pepe/5_dead/D-57.png",
  ];



  constructor() {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.loadImages(this.IMAGES_WALKING); //es werden alle Bilder des Charakters in Bewebung in JSON geladen
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      //this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.positionX < this.world.level.level_end_x) { //überprüfen mit < das Spielfeldende
        this.moveRight();
      }

      if (this.world.keyboard.LEFT && this.positionX > this.world.level.level_start_x ) { //kann mit Abfrage > 0 nicht mehr aus dem Bild laufen
        this.moveLeft();
        this.otherDirection = true; //um das Bild zu spiegeln
      }

      if (this.world.keyboard.UP && !this.isAboveGround()) {
         this.jump();
      }

      this.world.camera_X = -this.positionX + 100; //wir heften die Verschiebung der x koordinate an den Charakter
    }, 1000 / 60);

    setInterval(() => {
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isDead() && !this.isHurt() && !this.isAboveGround()) {
        this.playAnimation(this.IMAGES_IDLE);
      } else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {//nur wenn Right ODER Left gedrückt wird, wird Animation ausgeführt
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 100);
  }
}
