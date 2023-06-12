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
    

    constructor(){
        super().loadImage('src/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);//es werden alle Bilder des Charakters in Bewebung in JSON geladen

        this.animate();
    }

    animate() {
        // Modulo = 0 % 6 = 0/6 = 0, Rest 0
        // Modulo = 1 % 6 = 1/6 = 0, Rest 1
        // Modulo = 5 % 6 = 5/6 = 0, Rest 5
        // Modulo = 6 % 6 = 6/6 = 1, Rest 0
        // Modulo = 7 % 6 = 6/6 = 1, Rest 1 -> Modulo hebt Rest auf und i hat wieder den Wert 1
        // bedeutet i hat den Wert 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0

        setInterval( () => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // % = Modulo funktion - gibt Rest aus
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
        
    }

    jump() {

    }
}