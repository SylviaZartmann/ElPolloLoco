class Chicken extends MovableObject {
    positionY = 350;
    height= 75;
    width= 75;
    
    IMAGES_WALKING = [ 
        'src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ];

    constructor(){
        super().loadImage('src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.positionX = 500 + Math.random()*500; //ohne super, weil variable //Zahl zwischen 200 und 700 - zufällig genereiert
        this.loadImages(this.IMAGES_WALKING);//es werden alle Bilder des chicken in Bewebung in JSON geladen
        this.speed = 0.15 + Math.random()*0.35;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval( () => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 250);
    }
}