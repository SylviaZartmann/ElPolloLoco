class Character extends MovableObject{
    positionX = 50;
    positionY = 130;
    height= 300;
    width= 150;
    IMAGES_WALKING = [ 
    'src/img/2_character_pepe/2_walk/W-21.png',
    'src/img/2_character_pepe/2_walk/W-22.png',
    'src/img/2_character_pepe/2_walk/W-23.png',
    'src/img/2_character_pepe/2_walk/W-24.png',
    'src/img/2_character_pepe/2_walk/W-25.png',
    'src/img/2_character_pepe/2_walk/W-26.png'
    ];
    world; //der Charakter hat hiermit eine Variable "world", mit der wir auf die Variablen aus der Wolrd zugreifen können - auch Keyboard
    speed = 5;
    constructor(){
        super().loadImage('src/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);//es werden alle Bilder des Charakters in Bewebung in JSON geladen

        this.animate();
    }

    animate() {
        setInterval( () => {
            if(this.world.keyboard.RIGHT) { //nur wenn Right oder D gedrückt wird, wird Animation ausgeführt
                this.positionX += this.speed;
            }
            if(this.world.keyboard.LEFT) { //nur wenn Left oder A gedrückt wird, wird Animation ausgeführt
                this.positionX -= this.speed;
            }
            }, 1000 / 60);


        // Modulo = 0 % 6 = 0/6 = 0, Rest 0
        // Modulo = 1 % 6 = 1/6 = 0, Rest 1
        // Modulo = 5 % 6 = 5/6 = 0, Rest 5
        // Modulo = 6 % 6 = 6/6 = 1, Rest 0
        // Modulo = 7 % 6 = 6/6 = 1, Rest 1 -> Modulo hebt Rest auf und i hat wieder den Wert 1
        // bedeutet i hat den Wert 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0
       
        setInterval( () => {
        if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { //nur wenn Right gedrückt wird, wird Animation ausgeführt
          
            //LAUFANIMATION
            let i = this.currentImage % this.IMAGES_WALKING.length; // % = Modulo funktion - gibt Rest aus
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }     
        }, 100);
        
    }

    jump() {

    }
}