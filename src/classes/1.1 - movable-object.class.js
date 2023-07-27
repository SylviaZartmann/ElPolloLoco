class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  fallingSpeedY = 0;
  acceleration = 2;     //... pro Sekunde wird pixel hinzugefügt - Beschleunigungswert
  energy = 100;
  lastHit = 0;
  maxExistence = 2950;
  minExistence =  -615;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.fallingSpeedY > 0) {
        this.positionY -= this.fallingSpeedY;
        this.fallingSpeedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.positionY < 130;
    }
  }

  isColliding(mo) {
    this.rechteKanteChar = (this.positionX + this.bodyLeft) + (this.width - this.bodyRight);
    this.linkeKanteChar = this.positionX + this.bodyLeft;
    this.untereKanteChar = (this.positionY + this.bodyTop) + (this.height - this.bodyBottom);

    mo.rechteKanteEne = (mo.positionX + mo.bodyLeft) + (mo.width - mo.bodyRight);
    mo.linkeKanteEne = mo.positionX + mo.bodyLeft;
    mo.obereKanteEne = (mo.positionY + mo.bodyTop);

    return(
    //Variante 1 checkt ob rechte Kante kollidiert
      (this.rechteKanteChar > mo.linkeKanteEne && //
        this.rechteKanteChar < mo.rechteKanteEne &&
        this.untereKanteChar > mo.obereKanteEne) ||
      //Variante 2 checkt ob linke Kante kollidiert
       (this.linkeKanteChar > mo.linkeKanteEne &&
        this.linkeKanteChar < mo.rechteKanteEne && 
        this.untereKanteChar > mo.obereKanteEne) ||
       //Variante 3 checkt ob sich mo innerhalb Char befindet
       (this.linkeKanteChar < mo.linkeKanteEne && 
        this.rechteKanteChar > mo.rechteKanteEne && 
        this.untereKanteChar > mo.obereKanteEne))
  }

  hit(mo) {
    this.energy -= mo.charDamage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();      //Zeitpunkt Speichern, wo verletzt wurde
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;             //in Sekunden
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.positionX += this.speed;
  }

  moveLeft() {
    this.positionX -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;      // % = Modulo funktion - gibt Rest aus
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.fallingSpeedY = 25;
  }
}