class Cloud extends MovableObject {
    
    positionY = 50;
    width = 400;
    height = 250;

    constructor(){
        super().loadImage('src/img/5_background/layers/4_clouds/1.png');
    
        this.positionX = 0 + Math.random()*500; //ohne super, weil variable
        //Zahl zwischen 200 und 700 - zufällig genereiert
    }
}