class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  jumpingHeightY = 0;
  acceleration = 0.7;     // Beschleunigungswert
  energy = 100;
  lastHit = 0;
  maxExistence = 2950;
  minExistence =  -615;

  applyGravity() {
    let isMovingUp = true;
    this.originalPositionY = 85;

  setInterval(() => {
    if (this.isAboveGround() || this.jumpingHeightY > 0) {
      if (isMovingUp) {
        if (this.jumpingHeightY <= 10) {
          this.jumpingHeightY++;
          this.positionY -= this.jumpingHeightY;
          this.jumpingHeightY -= this.acceleration;
        } else {
          isMovingUp = false;
        }
      } else {
        if (this.positionY < this.originalPositionY) {
          this.positionY += this.jumpingHeightY;
          this.jumpingHeightY += this.acceleration;
        } else {
          isMovingUp = true;
        }
      }
      console.log('positionY', this.positionY);
    }
  }, 1000/50);
  }
  
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.positionY < 85
    }
  }  
  
  jump() {
    this.jumpingHeightY = 1; // Sprunghöhe
    this.positionY = 85;
  }
/**
 * checks collision between Character and enemies
 * at first if character and enemies are in default state
 * second if charcter and enemies changed direction
 * last if enemies are inside of the character
 */
  isColliding(mo) {
    this.rechteKanteChar = (this.positionX + this.bodyLeft) + (this.width - this.bodyRight);
    this.linkeKanteChar = this.positionX + this.bodyLeft;
    this.untereKanteChar = (this.positionY + this.bodyTop) + (this.height - this.bodyBottom);

    mo.rechteKanteEne = (mo.positionX + mo.bodyLeft) + (mo.width - mo.bodyRight);
    mo.linkeKanteEne = mo.positionX + mo.bodyLeft;
    mo.obereKanteEne = (mo.positionY + mo.bodyTop);

    return(
      (this.rechteKanteChar > mo.linkeKanteEne && 
        this.rechteKanteChar < mo.rechteKanteEne &&
        this.untereKanteChar > mo.obereKanteEne) 
        ||
       (this.linkeKanteChar > mo.linkeKanteEne &&
        this.linkeKanteChar < mo.rechteKanteEne && 
        this.untereKanteChar > mo.obereKanteEne) 
        ||
       (this.linkeKanteChar < mo.linkeKanteEne && 
        this.rechteKanteChar > mo.rechteKanteEne && 
        this.untereKanteChar > mo.obereKanteEne))
  }

  isCollidingFromAbove(mo) {
    this.linkeKanteChar = this.positionX + this.bodyLeft;
    this.rechteKanteChar = (this.positionX + this.bodyLeft) + (this.width - this.bodyRight);
    this.charFrameKanteUnten = this.offTop + this.offBottom;

    mo.linkeKanteEne = mo.positionX + mo.bodyLeft;
    mo.rechteKanteEne = (mo.positionX + mo.bodyLeft) + (mo.width - mo.bodyRight);
    mo.eneFrameKanteOben = mo.offTop;
    mo.eneFrameKanteUnten = mo.offTop + mo.offBottom;

    return (
      (this.charFrameKanteUnten <= mo.eneFrameKanteOben &&
      mo.eneFrameKanteOben - this.charFrameKanteUnten <= 20 && 
      this.linkeKanteChar <= mo.linkeKanteEne &&
      this.rechteKanteChar >= mo.rechteKanteEne) 
      ||
      (this.charFrameKanteUnten <= mo.eneFrameKanteOben &&
      mo.eneFrameKanteOben - this.charFrameKanteUnten <= 20 && 
      this.linkeKanteChar > mo.linkeKanteEne &&
      this.linkeKanteChar < mo.rechteKanteEne) 
      ||
      (this.charFrameKanteUnten <= mo.eneFrameKanteOben &&
      mo.eneFrameKanteOben - this.charFrameKanteUnten <= 20 && 
      this.rechteKanteChar > mo.linkeKanteEne &&
      this.rechteKanteChar < mo.rechteKanteEne ))
  }

  hit(mo) {
    this.energy -= mo.charDamage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();      //Zeitpunkt Speichern, wo verletzt wurde
      resetLastMove();
    }
  }

  killed(mo) {
    mo.energy -= this.enemDamage;
    if (mo.energy < 0) {
      mo.energy = 0;
      this.world.level.egg = new Eggstate();
    } 
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
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
    let i = this.currentImage % images.length;      // % = Modulo Funktion
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

}