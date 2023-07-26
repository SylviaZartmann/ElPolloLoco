class World {
  character = new Character();

  level = level1; //wir können auf alle variablen von level zugreifen
  canvas;
  ctx;
  keyboard;
  camera_X = 0;

  throwableObjects = [];

  healthbar = new Healthbar();
  bottlebar = new Bottlebar();
  coinbar = new Coinbar();

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
    [this.level.enemies, this.level.lowEnemies, this.level.endboss].forEach(
      (allEnemies) => {
        allEnemies.forEach((enemy) => {
          if (this.character.isColliding(enemy)) {
            this.character.hit(enemy);                              // jede Gegner hat anderen Damage
            this.healthbar.setPercentage(this.character.energy);    //Schaden, den der Chara nimmt, wird in die Statusbar überführt
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

    this.ctx.translate(-this.camera_X, 0);                    //Kamera wird zurückgesetzt
    this.addToMap(this.healthbar);                            //statusbar wird mit dem Bild geführt
    this.addToMap(this.bottlebar);
    this.addToMap(this.coinbar);

    this.ctx.translate(this.camera_X, 0);                     //Kamera wird vorgesetzt

    this.addToMap(this.character);
    this.addBackgroundToMap(this.level.enemies);
    this.addBackgroundToMap(this.level.endboss);
    this.addBackgroundToMap(this.level.lowEnemies);

    this.ctx.translate(-this.camera_X, 0);                    //dann schieben wir den Kameraausschnitt nach rechts
                                                              // Draw() wird immer wieder aufgerufen - neumalen des Canvas (FPS - frames per second)
    let self = this;
    requestAnimationFrame(() => {
      self.draw();                                            //hier ist "this" unbekannt, daher außerhalb definieren
    });
  }

  addBackgroundToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {            //prüfen ob andere Richtung vorhanden
      this.flipImage(mo);               //runtergelagert
    }

    mo.draw(this.ctx);                  //nach mov-obj ausgelagert
    mo.drawFrame(this.ctx);             //nach mov-obj ausgelagert

    if (mo.otherDirection) {            //prüfen ob context verändert wurde
      this.flipImageBack(mo);           //runtergelagert
    }
  }

  flipImage(mo) {
    this.ctx.save();                    //wenn ja, werden einstellungen vom Context gespeichert - womit wir Bilder einfügen
    this.ctx.translate(mo.width, 0);    //wenn ja, ändern der Methode, wie Bilder eingefügt werden
    this.ctx.scale(-1, 1);              //wenn ja, drehen wir an der y achse - spiegeln
    mo.positionX = mo.positionX * -1;   //wir spiegeln die x koordinate bzw. wandeln um
  }

  flipImageBack(mo) {
    mo.positionX = mo.positionX * -1;
    this.ctx.restore();                 //wenn ja, dann hiermit machen wir rückgängig
  }

  setWorld() {
    this.character.world = this;        //nur "this" damit aktuelle instanz der Welt übergeben wird
  }
}
