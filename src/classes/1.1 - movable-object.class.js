class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  fallingSpeedY = 0;
  acceleration = 2;
  lastHit = 0;
  offsetLeft = 0;
  offsetTop = 0;
  offsetRight = 0;
  offsetBottom = 0;
  maxExistence = 719 * 4;
  minExistence = 0;
  imageOfInterest = false;

  endboss_coming = new Audio('src/audio/endboss_coming.mp3');

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

  /**
   * we define the hitbox X-coordinates based on the direction the objects are oriented
   * first if character walks other direction than default and mo default
   * second if the enemy walks other direction than default and character default
   * third if both move different direction than default
   * last if both oriented in default direction
   * @param {*} mo it is the movableObject we wanna check
   * for instance chick, chicken, endboss
   */
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
/**
   * we define the hitbox based on whichDirection(mo) outcome
   * @param {*} mo it is the movableObject we wanna check
   * for instance chick, chicken, endboss
   */
  defineHitbox(mo) {
    this.hitboxY = this.positionY + this.offsetTop;
    this.hitboxWidth = this.width - (this.offsetLeft + this.offsetRight);
    this.hitboxHeight = this.height - this.offsetBottom;
    mo.hitboxY = mo.positionY + mo.offsetTop;
    mo.hitboxWidth = mo.width - (mo.offsetLeft + mo.offsetRight);
    mo.hitboxHeight = mo.height - mo.offsetBottom;
  }
/**
   * we check for collision of character and mo
   * @param {*} mo it is the movableObject we wanna check
   * for instance chick, chicken, endboss
   */
  isColliding(mo) {
      return (
        this.hitboxX + this.hitboxWidth > mo.hitboxX &&
        this.hitboxX < mo.hitboxX + mo.hitboxWidth &&
        this.hitboxY + this.hitboxHeight > mo.hitboxY &&
        this.hitboxY < mo.hitboxY + mo.hitboxHeight
      )
  }

  hit(mo) {
    if (mo.Damage > 0) {
      this.energy -= mo.Damage;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
        resetLastMove();
      }
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

 killed(mo) {
    if (mo instanceof Chicken) this.killedChicken++;
    mo.energy -= this.Damage;
    if (mo.energy <= 0) {
      mo.energy = 0;
    }
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
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  helloEndboss() {
    if (!this.endbossAdded) {
      if (this.killedChicken === 10) {
        this.endbossAdded = true;
        this.endboss_coming.play();  
        world.level.endboss.push(new Endboss());
      }
    }
  }

  isInFrontOf(chick) {
    return (
      chick.positionX - 40 >= this.hitboxX &&
      chick.positionX - 40 >= this.hitboxX + this.hitboxWidth &&
      chick.positionX + chick.width - 40 >= this.hitboxX &&
      chick.positionX + chick.width - 40 >= this.hitboxX + this.hitboxWidth
    );
  }

  isBehind(chick) {
    return (
      chick.positionX + 40 <= this.hitboxX &&
      chick.positionX + 40 <= this.hitboxX + this.hitboxWidth &&
      chick.positionX + chick.width + 40 <= this.hitboxX &&
      chick.positionX + chick.width + 40 <= this.hitboxX + this.hitboxWidth
    );
  }

  checkDistance(endboss) {
    this.distance = endboss.hitboxX - this.hitboxX + this.hitboxWidth;
    return this.distance;
  }

  gettingPictureOfInterest(picture){
    if (this.img.currentSrc.includes(picture)) {
      return this.imageOfInterest = true;
    } else {
      return this.imageOfInterest = false;
    }
  }
/**
 * removes objects from world
 * @param {*} whatToSplice defines from which Object or Array we want to remove an object
 */
  removeInstance(whatToSplice) {
    let index = whatToSplice.indexOf(this);
    if (index !== -1) {
      whatToSplice.splice(index, 1);
    }
  }

  findStartPosition() {
      this.positionX = this.minExistence + Math.random() * this.maxExistence;
      this.startPosition = this.positionX;
      return this.positionX;
  }

  getRandomBoolean() {
    return Math.random() < 0.5;
  }
}