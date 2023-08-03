class World {
  character = new Character();
  healthbar = new Healthbar();
  bottlebar = new Bottlebar();
  coinbar = new Coinbar();

  level = level1; //wir können auf alle variablen von level zugreifen
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
      this.checkCollisionFromAbove();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.ACTION) {
      let bottle = new ThrowableObject(
        this.character.positionX,
        this.character.positionY
      );
      this.throwableObjects.push(bottle);
    }
  }

  checkCollision() {
    let enemyTypes = [this.level.enemies, this.level.lowEnemies, this.level.endboss];
    enemyTypes.forEach((allEnemies) => {
        allEnemies.forEach((enemy) => {
          if (this.character.isColliding(enemy)) {
            this.character.hit(enemy);
            this.healthbar.setPercentage(this.character.energy);
          }
        });
      }
    );
  }

  checkCollisionFromAbove() {
    let enemyTypes = [this.level.enemies];
    enemyTypes.forEach((allEnemies) => {
        allEnemies.forEach((enemy) => {
          if (this.character.isCollidingFromAbove(enemy)) {
            //const landingHeight = enemy.positionY - this.character.height;
            //this.character.setPosition(this.character.positionX, landingHeight);    
            //this.character.jump();
            //this.character.killed(enemy);
            console.log('above Enemy');
          }
        });
      }
    );
  }

  draw() {
    //Reihenfolge bestimmt Darstellungsreihenfolge (Darstellungsebene())
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_X, 0);                     //wir schieben den Kameraausschnitt nach links
    this.addBackgroundToMap(this.level.backgroundObject);     //dann malen wir alle objekte
    this.addBackgroundToMap(this.level.clouds);
    this.addBackgroundToMap(this.throwableObjects);
    this.addBackgroundToMap(this.level.egg);
    this.ctx.translate(-this.camera_X, 0);                   //Kamera wird zurückgesetzt

    this.addToMap(this.healthbar);                            //statusbar wird mit dem Bild geführt
    this.addToMap(this.bottlebar);
    this.addToMap(this.coinbar);

    this.ctx.translate(this.camera_X, 0);                     //Kamera wird vorgesetzt
    this.addToMap(this.character);
    this.addBackgroundToMap(this.level.enemies);
    this.addBackgroundToMap(this.level.endboss);
    this.addBackgroundToMap(this.level.lowEnemies);
    
    this.ctx.translate(-this.camera_X, 0);                    //dann schieben wir den Kameraausschnitt nach rechts


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
