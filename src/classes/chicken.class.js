class Chicken extends MovableObject {
    positionX = 120;
    positionY = 325;
    height= 100;
    width= 100;

    constructor(){
        super().loadImage('src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    
        this.positionX = 200 + Math.random()*500; //ohne super, weil variable
        //Zahl zwischen 200 und 700 - zufällig genereiert
    }


}