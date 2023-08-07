class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  jumpingHeightY = 0;
  acceleration = 2;     // Beschleunigungswert
  energy = 100;
  lastHit = 0;
  maxExistence = 719*3;
  minExistence = -615;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() && !this.isDead() || this.jumpingHeightY > 0) {
        this.positionY -= this.jumpingHeightY;
        this.jumpingHeightY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.positionY < 85
    }
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

    return (
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
    this.untereKanteChar = (this.positionY + this.bodyTop) + (this.height - this.bodyBottom);

    mo.linkeKanteEne = mo.positionX + mo.bodyLeft;
    mo.rechteKanteEne = (mo.positionX + mo.bodyLeft) + (mo.width - mo.bodyRight);
    mo.obereKanteEne = (mo.positionY + mo.bodyTop);

    return (
      (this.rechteKanteChar + 20 > mo.linkeKanteEne &&
        this.rechteKanteChar - 20 < mo.rechteKanteEne &&
        this.untereKanteChar > mo.obereKanteEne - 25)
      ||
      (this.linkeKanteChar +20 > mo.linkeKanteEne &&
        this.linkeKanteChar -20 < mo.rechteKanteEne &&
        this.untereKanteChar > mo.obereKanteEne - 25)
      ||
      (this.linkeKanteChar -20 < mo.linkeKanteEne &&
        this.rechteKanteChar + 20 > mo.rechteKanteEne &&
        this.untereKanteChar > mo.obereKanteEne - 25))
  }

  hit(mo) {
    if (mo.charDamage > 0) {
      this.energy -= mo.charDamage;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();      //Zeitpunkt Speichern, wo verletzt wurde
        resetLastMove();
      }
    }
  }

  killed(mo) {
    if (mo instanceof Chicken) this.killedChicken++;
    if (mo instanceof Endboss) this.killedEndboss++;
    mo.energy -= this.enemDamage;
    if (mo.energy < 0) {
      mo.energy = 0;
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

  jump() {
    this.jumpingHeightY = 25;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;      // % = Modulo Funktion
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images, positionX) {
    if (!this.chickAdded) {
      this.currentImage = 0;
      for (let i = 0; i < images.length; i++) {
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (i === 4) {
          this.chickAdded = true;
          setTimeout(() => {
            world.level.lowEnemies.push(new Chick(positionX, new Date()));
          }, 800);
        }
      }
    }
  }


  chickBecomesChicken() {
    const index = world.level.lowEnemies.indexOf(this);
    if (!this.chickenAdded) {
      let currentTime = new Date();
      if (currentTime - this.hetchTime >= 20000) {
        this.chickenAdded = true;
        world.level.enemies.push(new Chicken(this.positionX, this.movingDirection));
        if (index !== -1) {
          world.level.lowEnemies.splice(index, 1);
        }
      }
    }
  }

  helloEndboss() {
    if(!this.endbossAdded) {
      if (this.killedChicken >= 20) {
      this.endbossAdded = true;
      world.level.endboss.push(new Endboss());
    }
    }
  }

  isInFrontOf(chick) {
    this.PositionX = this.positionX + this.bodyLeft;
    this.PositionXRight = (this.positionX + this.bodyLeft) + (this.width - this.bodyRight);
    return (
      chick.positionX - 60 >= this.PositionX &&
      chick.positionX - 60 >= this.PositionXRight &&
      chick.positionX + chick.width - 60 >= this.PositionX &&
      chick.positionX + chick.width - 60 >= this.PositionXRight)
  }

  isBehind(chick) {
    this.PositionX = this.positionX + this.bodyLeft;
    this.PositionXRight = (this.positionX + this.bodyLeft) + (this.width - this.bodyRight);
    return (
      chick.positionX + 60 <= this.PositionX &&
      chick.positionX + 60 <= this.PositionXRight &&
      chick.positionX + chick.width + 60 <= this.PositionX &&
      chick.positionX + chick.width + 60 <= this.PositionXRight)
  }
  
  checkDistance(endboss) {
    endboss.leftEdge = endboss.positionX + endboss.bodyLeft;
    this.distance = endboss.leftEdge - this.rechteKanteChar;
    return this.distance;
  }
}