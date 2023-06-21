class Chicken extends MovableObject {
  positionY = 350;
  height = 75;
  width = 75;

  IMAGES_WALKING = [
    "src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "src/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "src/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ['src/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  constructor() {
    super().loadImage(this.IMAGES_DEAD[0]);
    this.positionX = 500 + Math.random() * 500; //ohne super, weil variable //Zahl zwischen 200 und 700 - zufällig genereiert
    this.loadImages(this.IMAGES_WALKING); //es werden alle Bilder des chicken in Bewegung in JSON geladen
    this.speed = 0.15 + Math.random() * 0.35;
    this.animate();
  }

  animate() {
    setInterval(() => {
        this.moveLeft(); //wie sich die x Koordinate verändern soll
    }, 1000/60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
  }
}
