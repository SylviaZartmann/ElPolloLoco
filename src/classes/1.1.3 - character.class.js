class Character extends MovableObject {
  positionX = 100;
  positionY = 85;
  height = 350;
  width = 175;
  Damage = 100;
  energy = 100;
  offsetLeft = 35;
  offsetTop = 175;
  offsetRight = 55;
  offsetBottom = 190;
  currentTime;
  killedChicken = 0;
  killedEndboss = 0;
  alive = true;
  collectedCoins = 0;
  collectedBottles = 0;

  world;
  walking_sound = new Audio('src/audio/running.mp3');
  hurt_sound = new Audio('src/audio/pepe_hurt.mp3');
  dead_sound = new Audio('src/audio/pepe_dead.mp3');
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
  IMAGES_THROW = [
    "src/img/2_character_pepe/6_throw/T-60.png",
    "src/img/2_character_pepe/6_throw/T-61.png",
    "src/img/2_character_pepe/6_throw/T-62.png",
    "src/img/2_character_pepe/6_throw/T-63.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_THROW);
    this.applyGravity();
    this.animate();
  }

  animate() {
    resetLastMove(); 
    setInterval(() => {
    this.sixtyFramesPerSecond();
    }, 1000 / 60);
    setInterval(() => {
    this.playAllTheAnimations();
  }, 100);
  } 

  sixtyFramesPerSecond() {
      if (this.world.keyboard.RIGHT && this.positionX < this.maxExistence && !this.isDead()) {
        this.moveRight();
        this.otherDirection = false; 
      } 
      if (this.world.keyboard.LEFT && this.positionX > this.minExistence && !this.isDead()) {
        this.moveLeft();
        this.otherDirection = true; 
      } 
      if (this.world.keyboard.UP && !this.isAboveGround() && !this.isDead()) this.jump();  
      if (!this.isAboveGround() && !this.isDead()) this.resetpositionY();
      this.whatToDoWithDeadMan();
      this.world.camera_X = -this.positionX + 100; 
      this.helloEndboss();
  }

  playAllTheAnimations() {
      if (this.isDead()) {
        this.deadManWalking();
      } else if (this.isHurt()) {
        this.walking_sound.pause();
        this.playAnimation(this.IMAGES_HURT);
        this.hurt_sound.volume = 0.5; 
        this.hurt_sound.play();
      } else if (this.isAboveGround()) {
        this.walking_sound.pause();
        this.playAnimation(this.IMAGES_JUMPING);
      } else  if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.walking_sound.play();
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.world.keyboard.ACTION) this.playAnimation(this.IMAGES_THROW);
        else if (!this.world.keyboard.ACTION && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isDead() && !this.isHurt() && !this.isAboveGround()) {
        this.walking_sound.pause();
        this.whatAboutIdleStates();
      } 
  }

  resetpositionY() {
    this.positionY = 85;
  }
  
  whatToDoWithDeadMan() {
  if (this.isDead()) {
    this.alive = false;
    setTimeout(() => {
      this.positionY += 5;
    }, 500);
    setTimeout(() => {
      showEndscreen(this);
    }, 3000);
  }
}

   deadManWalking() {
    if (!this.dead_soundPlayed) {
      this.dead_sound.play(); 
      this.dead_soundPlayed = true;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    this.walking_sound.pause();
    this.playAnimation(this.IMAGES_DEAD);
   }

  whatAboutIdleStates() { 
    let currentTime = new Date();
    let passedTime = currentTime - lastMove;
    if (passedTime >= 5000) this.playAnimation(this.IMAGES_LONGIDLE);
    else this.playAnimation(this.IMAGES_IDLE);
  }
  
}

function resetLastMove() {
  lastMove = new Date();
}

document.addEventListener ("keyup", function() {
  resetLastMove();
});

