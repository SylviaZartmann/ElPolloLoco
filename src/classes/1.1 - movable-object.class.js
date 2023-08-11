class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  fallingSpeedY = 0;
  acceleration = 2; // Beschleunigungswert
  lastHit = 0;
  offsetLeft = 0;
  offsetTop = 0;
  offsetRight = 0;
  offsetBottom = 0;
  maxExistence = 719 * 4;
  minExistence = 0;

  applyGravity() {
    setInterval(() => {
      if ((this.isAboveGround() && !this.isDead()) || this.fallingSpeedY > 0) {
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

  whichDirection(mo) {
    if (this.otherDirection) {
      this.hitboxX = this.positionX + this.offsetRight;
      mo.hitboxX = mo.positionX + mo.offsetLeft;
    } else if (mo.otherDirection) {
      this.hitboxX = this.positionX + this.offsetLeft;
      mo.hitboxX = mo.positionX + mo.offsetRight;
    } else if (this.otherDirection && mo.otherDirection) {
      this.hitboxX = this.positionX + this.offsetRight;
      mo.hitboxX = mo.positionX + mo.offsetRight;
    } else {
      this.hitboxX = this.positionX + this.offsetLeft;
      mo.hitboxX = mo.positionX + mo.offsetLeft;
    }
  }

  defineHitbox(mo) {
    this.hitboxY = this.positionY + this.offsetTop;
    this.hitboxWidth = this.width - (this.offsetLeft + this.offsetRight);
    this.hitboxHeight = this.height - this.offsetBottom;
    mo.hitboxY = mo.positionY + mo.offsetTop;
    mo.hitboxWidth = mo.width - (mo.offsetLeft + mo.offsetRight);
    mo.hitboxHeight = mo.height - mo.offsetBottom;
  }

  isColliding(mo) {
      return (
        this.hitboxX + this.hitboxWidth > mo.hitboxX &&
        this.hitboxX < mo.hitboxX + mo.hitboxWidth &&
        this.hitboxY + this.hitboxHeight > mo.hitboxY &&
        this.hitboxY < mo.hitboxY + mo.hitboxHeight
      )
  }

  isCollidingFromAbove(mo) {
      return (
        this.hitboxX + this.hitboxWidth > mo.hitboxX &&
        this.hitboxX < mo.hitboxX + mo.hitboxWidth &&
        this.hitboxY + this.hitboxHeight >= mo.hitboxY - 10
      )
  }

  hit(mo) {
    if (mo.charDamage > 0) {
      this.energy -= mo.charDamage;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime(); //Zeitpunkt Speichern, wo verletzt wurde
        resetLastMove();
      }
    }
  }

  killed(mo) {
    if (mo instanceof Chicken) this.killedChicken++;
    if (mo instanceof Endboss) this.killedEndboss++;
    mo.energy -= this.enemDamage;
    if (mo.energy <= 0) {
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
    let i = this.currentImage % images.length; // % = Modulo Funktion
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
        world.level.enemies.push(
          new Chicken(this.positionX, this.otherDirection)
        );
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
      chick.positionX - 60 >= this.hitboxX &&
      chick.positionX - 60 >= this.hitboxX + this.hitboxWidth &&
      chick.positionX + chick.width - 60 >= this.hitboxX &&
      chick.positionX + chick.width - 60 >= this.hitboxX + this.hitboxWidth
    );
  }

  isBehind(chick) {
    return (
      chick.positionX + 60 <= this.hitboxX &&
      chick.positionX + 60 <= this.hitboxX + this.hitboxWidth &&
      chick.positionX + chick.width + 60 <= this.hitboxX &&
      chick.positionX + chick.width + 60 <= this.hitboxX + this.hitboxWidth
    );
  }

  checkDistance(endboss) {
    this.distance = endboss.positionX - this.hitboxX + this.hitboxWidth;
    return this.distance;
  }
}