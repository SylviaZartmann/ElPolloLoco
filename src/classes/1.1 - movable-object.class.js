class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  jumpingHeightY = 0;
  acceleration = 2;     // Beschleunigungswert
  energy = 100;
  lastHit = 0;
  maxExistence = 2950;
  minExistence =  -615;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.jumpingHeightY > 0) {
        this.positionY -= this.jumpingHeightY;
        this.jumpingHeightY -= this.acceleration; 
      }
    }, 1000/25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.positionY < 85;
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
       //Variante 3 checkt ob sich mo innerhalb Char befindet - für chicks relevant
       (this.linkeKanteChar < mo.linkeKanteEne && 
        this.rechteKanteChar > mo.rechteKanteEne && 
        this.untereKanteChar > mo.obereKanteEne))
  }

  isCollidingFromAbove(mo) {
    this.linkeKanteChar = this.positionX + this.bodyLeft;
    this.rechteKanteChar = (this.positionX + this.bodyLeft) + (this.width - this.bodyRight);
    this.picFrameKanteUnten = this.positionY + this.height;
    this.charFrameKanteUnten = this.positionY + (this.height - this.bodyBottom);

    mo.linkeKanteEne = mo.positionX + mo.bodyLeft;
    mo.rechteKanteEne = (mo.positionX + mo.bodyLeft) + (mo.width - mo.bodyRight);
    mo.picFrameKanteOben = mo.positionY;
    mo.eneFrameKanteOben = mo.positionY - mo.bodyBottom;


    // wenn rechts grün hinter rechts grün und hinter links grün &&
    // wenn links grün vor rechts grün und vor links grün
    // wenn unten grün unter oben rot && über oben grün
    // wenn unten rot unter oben grün 
    // wenn unten grün == oben grün
    
    
    return (
        //rechts grün hinter links grün
      (this.rechteKanteChar > mo.linkeKanteEne && 
        //rechts grün vor rechts grün
        this.rechteKanteChar < mo.rechteKanteEne &&
        //grün unten über oder gleich grün oben
        this.charFrameKanteUnten < mo.eneFrameKanteOben &&
        //grün unten unter oder gleich rot oben
        this.charFrameKanteUnten > mo.picFrameKanteOben) ||
      
        //links grün hinter links grün
      (this.linkeKanteChar > mo.linkeKanteEne &&
        //links grün vor rechts grün
        this.linkeKanteChar < mo.rechteKanteEne && 
        //grün unten über grün oben
        this.charFrameKanteUnten < mo.eneFrameKanteOben &&
        //grün unten unter rot oben
        this.charFrameKanteUnten > mo.picFrameKanteOben) ||

        // links grün vor links grün
        (this.linkeKanteChar < mo.linkeKanteEne && 
          // rechts grün hinter rechts grün
          this.rechteKanteChar > mo.rechteKanteEne && 
          //grün unten über grün oben
        this.charFrameKanteUnten < mo.eneFrameKanteOben &&
        //grün unten unter rot oben
        this.charFrameKanteUnten > mo.picFrameKanteOben))
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

  jump() {
    this.jumpingHeightY = 25; // Sprunghöhe
  }
}