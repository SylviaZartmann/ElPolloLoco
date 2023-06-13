class World {
  
    enemies = [     
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    lowEnemies = [
        new Chick(),     
        new Chick()
    ]
    clouds = [     
        new Cloud()
    ];
    
    BackgroundObject = [        
        new BackgroundObject('src/img/5_background/layers/air.png', 0),
        new BackgroundObject('src/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('src/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('src/img/5_background/layers/1_first_layer/1.png', 0)      
    ];
    character = new Character();
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; //canvas1 kommt von oben - canvas2 aus dem param - beide kennen sich nicht 
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    draw() { //Reihenfolge bestimmt Darstellungsreihenfolge (Darstellungsebene())
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addBackgroundToMap(this.BackgroundObject);
        this.addBackgroundToMap(this.clouds);
        this.addToMap(this.character);
        this.addBackgroundToMap(this.enemies);
        this.addBackgroundToMap(this.lowEnemies);
   
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
        this.ctx.drawImage(mo.img, mo.positionX, mo.positionY, mo.width, mo.height);
    }

    setWorld () {
        this.character.world = this; //nur "this" damit aktuelle instanz der Welt übergeben wird
    }
}