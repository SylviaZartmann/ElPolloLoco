class World {
  character = new Character();
  healthbar = new Healthbar();
  bottlebar = new Bottlebar();
  coinbar = new Coinbar();

  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_X = 0;
  bottleTimer;
  lastBottle;
  wantedTime = 5000;
  existing = false;

  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.runSecondInterval();
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkPositions();
      this.checkHitByBottle();
      this.stopGame();
    }, 50);
  }

  runSecondInterval() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 200);
  }

  checkCollision() {
    if (this.character.positionY === 85) {
      let enemyTypes = [this.level.enemies, this.level.endboss];
      enemyTypes.forEach((allEnemies) => {
        allEnemies.forEach((enemy) => {
          this.character.whichDirection(enemy);
          this.character.defineHitbox(enemy);
          if (this.character.isColliding(enemy)) {
            this.character.hit(enemy);
            this.healthbar.setPercentage(this.character.energy);
          }
        });
      });
    }
    if (this.character.isAboveGround()) {
      let enemyTypes = [this.level.enemies, this.level.endboss];
      enemyTypes.forEach((allEnemies) => {
        allEnemies.forEach((enemy) => {
          this.character.whichDirection(enemy);
          this.character.defineHitbox(enemy);
          if (
            this.character.isColliding(enemy) &&
            this.character.fallingSpeedY <= 0
          ) {
            if (enemy instanceof Chicken && !this.character.isDead()) {
              this.character.killed(enemy);
              this.character.jump();
              this.level.egg.push(new Eggstate(enemy.positionX, new Date()));
            } else {
              this.character.hit(enemy);
              this.healthbar.setPercentage(this.character.energy);
            }
          }
        });
      });
    }
    if (this.character) {
      let collectableItems = [this.level.coin, this.level.bottle];
      collectableItems.forEach((allItems) => {
        allItems.forEach((item) => {
          this.character.whichDirection(item);
          this.character.defineHitbox(item);
          if (this.character.isColliding(item)) {
            if (item instanceof Coin) {
              item.removeInstance(this.level.coin);
              this.character.collectedCoins++;
              this.coinbar.setPercentage(this.character.collectedCoins);
            } else {
              item.removeInstance(this.level.bottle);
              this.character.collectedBottles++;
              this.bottlebar.setPercentage(this.character.collectedBottles);
            }
          }
        });
      });
    }
  }
  checkPositions() {
    let enemyTypes = [this.level.lowEnemies, this.level.endboss];
    enemyTypes.forEach((allEnemies) => {
      allEnemies.forEach((enemy) => {
        this.character.whichDirection(enemy);
        this.character.defineHitbox(enemy);
        if (this.character.isInFrontOf(enemy)) {
          enemy.otherDirection = false;
        }
        if (this.character.isBehind(enemy)) {
          enemy.otherDirection = true;
        }
        if (enemy instanceof Endboss) {
          if (this.character.checkDistance(enemy)) {
            if (this.character.distance <= 150) {
              enemy.alerted = false;
              enemy.attacking = true;
            } else if (
              this.character.distance <= 300 &&
              this.character.distance >= 150
            ) {
              enemy.alerted = true;
              enemy.attacking = false;
            } else {
              enemy.alerted = false;
              enemy.attacking = false;
            }
          }
        }
      });
    });
  }

  checkThrowObjects() {
    if (this.keyboard.ACTION) {
      if (!this.character.otherDirection) {
        this.throwingLeftOrRight(+100, +200);
      } else {
        this.throwingLeftOrRight(+20, +200);
      }
    }
  }

  throwingLeftOrRight(x, y) {
    if (this.character.collectedBottles > 0) {
      this.throwableObjects.push(
        new ThrowableObject(
          this.character.positionX + x,
          this.character.positionY + y,
          this.character.otherDirection
        )
      );
      this.character.collectedBottles--;
      this.bottlebar.setPercentage(this.character.collectedBottles);
    }
  }

  checkHitByBottle() {
    this.level.endboss.forEach((endboss) => {
      this.throwableObjects.forEach((bottle) => {
        bottle.whichDirection(endboss);
        bottle.defineHitbox(endboss);
        bottle.checkDistance(endboss);
        if (bottle.distance < -30 && bottle.hitboxY > endboss.hitboxY) {
          bottle.flying = false;
          endboss.hit(bottle);
        }
      });
    });
  }

  stopGame() {
    let endboss = this.level.endboss;
    endboss.forEach((endboss) => {
      if (endboss.energy <= 0) {
      let enemyTypes = [this.level.lowEnemies, this.level.enemies, this.level.egg];
      enemyTypes.forEach((allEnemies) => {
        allEnemies.forEach((enemy) => {
          enemy.removeInstance(allEnemies);
        })
      })
    }
    if (this.character.isDead()) {
      let enemyTypes = [this.level.lowEnemies, this.level.enemies, this.level.egg];
      enemyTypes.forEach((allEnemies) => {
        allEnemies.forEach((enemy) => {
          enemy.removeInstance(allEnemies);
        })
      })
    }
    }
    
    )
    
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_X, 0);
    this.addBackgroundToMap(this.level.backgroundObject);
    this.addBackgroundToMap(this.level.clouds);
    this.addBackgroundToMap(this.level.egg);
    this.addBackgroundToMap(this.level.coin);
    this.ctx.translate(-this.camera_X, 0);

    this.addToMap(this.healthbar);
    this.addToMap(this.bottlebar);
    this.addToMap(this.coinbar);

    this.ctx.translate(this.camera_X, 0);
    this.addBackgroundToMap(this.level.endboss);
    this.addToMap(this.character);
    this.addBackgroundToMap(this.level.enemies);
    this.addBackgroundToMap(this.level.lowEnemies);
    this.addBackgroundToMap(this.throwableObjects);
    this.addBackgroundToMap(this.level.bottle);
    this.ctx.translate(-this.camera_X, 0);

    let self = this; //hier ist "this" unbekannt, daher außerhalb definieren
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  addBackgroundToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.positionX = mo.positionX * -1;
  }

  flipImageBack(mo) {
    mo.positionX = mo.positionX * -1;
    this.ctx.restore();
  }

  setWorld() {
    this.character.world = this;
  }
}
