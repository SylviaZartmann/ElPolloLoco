class MovableObject {
    img;
    imageCache = {};
    currentImage = 0;
    speed;
    otherDirection = false;

    //bspw ('img/test.png')
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementByID('image') <img id="image" src>
        this.img.src = path;
    }

    loadImages(array) { //images werden in JSON gespeichert (in bspw character script ausgeführt mit entsprechenden bildern)
        array.forEach((path) => { //rotieren durch vorhandenen Bilder in entspr. script hinterlegt bis durch
        let img = new Image(); 
        img.src = path;
        this.imageCache[path] = img;
        });
        
    }

    moveRight(){
        console.log('Moving Right');
    }

    moveLeft(){
        setInterval(() => {
            this.positionX -= this.speed; //wie sich die x Koordinate verändern soll
        }, 1000/60); //die millisekunden, die sich das Interval wiederholen soll   
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // % = Modulo funktion - gibt Rest aus
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}