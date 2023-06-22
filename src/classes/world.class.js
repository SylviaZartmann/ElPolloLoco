class World {
    character = new Character();

    level = level1; //wir können auf alle variablen von level zugreifen
    canvas;
    ctx;
    keyboard;
    camera_X = 0; 

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; //canvas1 kommt von oben - canvas2 aus dem param - beide kennen sich nicht 
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
    }

    checkCollision() {
        setInterval(() => {
          [this.level.enemies, this.level.lowEnemies, this.level.endboss].forEach((allEnemies) => {
            allEnemies.forEach((enemy) => {
              if (this.character.isColliding(enemy)) {
                this.character.hit(enemy); // jede Gegner hat anderen Damage
                console.log('Lost Energy', this.character.energy);
              }
            });
          });
        }, 200);
      }
    
    draw() { //Reihenfolge bestimmt Darstellungsreihenfolge (Darstellungsebene())
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_X, 0); //wir schieben den Kameraausschnitt nach links
        this.addBackgroundToMap(this.level.backgroundObject); //dann malen wir alle objekte
        this.addBackgroundToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addBackgroundToMap(this.level.enemies);
        this.addBackgroundToMap(this.level.endboss);
        this.addBackgroundToMap(this.level.lowEnemies);
        this.ctx.translate(-this.camera_X, 0);   //dann schieben wir den Kameraausschnitt nach rechts
        // Draw() wird immer wieder aufgerufen - neumalen des Canvas (FPS - frames per second)
        let self = this;
        requestAnimationFrame(function(){
            self.draw(); //hier ist "this" unbekannt, daher außerhalb definieren
        });
    }

    addBackgroundToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj)
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) { //prüfen ob andere Richtung vorhanden
            this.flipImage(mo); //runtergelagert
        }

        mo.draw(this.ctx); //nach mov-obj ausgelagert
        mo.drawFrame(this.ctx); //nach mov-obj ausgelagert
        
        if(mo.otherDirection) { //prüfen ob context verändert wurde
        this.flipImageBack(mo); //runtergelagert
        }
    }

    flipImage(mo) {
        this.ctx.save(); //wenn ja, werden einstellungen vom Context gespeichert - womit wir Bilder einfügen
        this.ctx.translate(mo.width, 0); //wenn ja, ändern der Methode, wie Bilder eingefügt werden
        this.ctx.scale(-1, 1); //wenn ja, drehen wir an der y achse - spiegeln
        mo.positionX = mo.positionX * -1; //wir spiegeln die x koordinate bzw. wandeln um
    }

    flipImageBack(mo) {
        mo.positionX = mo.positionX * -1;
        this.ctx.restore(); //wenn ja, dann hiermit machen wir rückgängig
    }

    setWorld () {
        this.character.world = this; //nur "this" damit aktuelle instanz der Welt übergeben wird
    }
}