class MovableObject {
    img;


    //bspw ('img/test.png')
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementByID('image') <img id="image" src>
        this.img.src = path;
    }

    moveRight(){
        console.log('Moving Right');
    }

    
    moveLeft() {

    }
}