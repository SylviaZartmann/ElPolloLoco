class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  fallingSpeedY = 0;
  acceleration = 2;     // Beschleunigungswert
  energy = 100;
  lastHit = 0;
  offsetLeft = 0;
  offsetTop = 0;
  offsetRight = 0;
  offsetBottom = 0;
  maxExistence = 719 * 4;
  minExistence = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() && !this.isDead() || this.fallingSpeedY > 0) {
        this.positionY -= this.fallingSpeedY;
        this.fallingSpeedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return this.positionY < 400;
    } else if (this instanceof Character) {
      return this.positionY < 85;
    }
  }

  isColliding(mo) {
    this.hitboxXdefault = this.positionX + this.offsetRight;
    this.hitboxXchanged = this.positionX + this.offsetLeft;
    this.hitboxY = this.positionY + this.offsetTop;
    this.hitboxWidth = this.width - (this.offsetLeft + this.offsetRight);
    this.hitboxHeight = this.height - this.offsetBottom;

    mo.hitboxXdefault = mo.positionX + mo.offsetRight;
    mo.hitboxXchanged = mo.positionX + mo.offsetLeft;
    mo.hitboxY = mo.positionY + mo.offsetTop;
    mo.hitboxWidth = mo.width - (mo.offsetLeft + mo.offsetRight);
    mo.hitboxHeight = mo.height - mo.offsetBottom;

    if (this.otherDirection) {
      //character läuft nach links
    } else if (mo.otherDirection) {
      //chicken läuft nach rechts
    } else if (this.otherDirection &&  mo.otherDirection) {
      //beide watscheln in die "falsche" Richtung
    } else {
      //beide in default
    }
  }

  isCollidingFromAbove(mo) {
    //
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
    this.fallingSpeedY = 25;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;      // % = Modulo Funktion
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images, positionX) {
    if (!this.animationPlayed) {
      this.currentImage = 0;
      for (let i = 0; i < images.length; i++) {
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
          if (i === 4 && this instanceof Eggstate) {
          this.animationPlayed = true;  
          setTimeout(() => {
            world.level.lowEnemies.push(new Chick(positionX, new Date()));
          }, 800);
        } else if (i === 5 && this instanceof ThrowableObject) {
          this.animationPlayed = true;
          this.splashed = true;
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
    if (!this.endbossAdded) {
      if (this.killedChicken >= 20) {
        this.endbossAdded = true;
        world.level.endboss.push(new Endboss());
      }
    }
  }

  isInFrontOf(chick) {
    return (
      chick.positionX - 60 >= this.offsetX &&
      chick.positionX - 60 >= this.offsetX + this.offsetWidth &&
      chick.positionX + chick.width - 60 >= this.offsetX &&
      chick.positionX + chick.width - 60 >= this.offsetX + this.offsetWidth)
  }

  isBehind(chick) {
    return (
      chick.positionX + 60 <= this.offsetX &&
      chick.positionX + 60 <= this.offsetX + this.offsetWidth &&
      chick.positionX + chick.width + 60 <= this.offsetX &&
      chick.positionX + chick.width + 60 <= this.offsetX + this.offsetWidth)
  }

  checkDistance(endboss) {
    this.distance = endboss.positionX - this.offsetX + this.offsetWidth;
    return this.distance;
  }
}