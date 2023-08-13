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

  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkPositions();
      this.checkThrowObjects();
      this.checkHitByBottle();
    }, 50);
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
      }
      )
    };
    if (this.character.isAboveGround()) {
      let enemyTypes = [this.level.enemies, this.level.endboss];
      enemyTypes.forEach((allEnemies) => {
        allEnemies.forEach((enemy) => {
          this.character.whichDirection(enemy);
          this.character.defineHitbox(enemy);
          if (this.character.isColliding(enemy) && this.character.fallingSpeedY <= 0) {
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
      }
      );
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
            } else if (this.character.distance <= 300 && this.character.distance >= 150) {
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
    this.throwableObjects.push(new ThrowableObject(
      this.character.positionX + x,
      this.character.positionY + y,
      this.character.otherDirection,
    ));
  }

  checkHitByBottle() {
    this.level.endboss.forEach((endboss) => {
      this.throwableObjects.forEach((bottle) => {
        if (endboss.isColliding(bottle)) {
          console.log('hit');
          endboss.hit(bottle);
        };
      })
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_X, 0);
    this.addBackgroundToMap(this.level.backgroundObject);
    this.addBackgroundToMap(this.level.clouds);

    this.addBackgroundToMap(this.level.egg);
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
    this.ctx.translate(-this.camera_X, 0);

    let self = this;        //hier ist "this" unbekannt, daher außerhalb definieren
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
    mo.drawFrame(this.ctx);
    mo.drawOffset(this.ctx)

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

