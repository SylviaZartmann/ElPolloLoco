class World {

    character = new Character();
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
    canvas;
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; //canvas1 kommt von oben - canvas2 aus dem param - beide kennen sich nicht 
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addBackgroundToMap(this.BackgroundObject);
        this.addBackgroundToMap(this.clouds);
        this.addBackgroundToMap(this.enemies);
        this.addBackgroundToMap(this.lowEnemies);
        this.addToMap(this.character);
             
        
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
}