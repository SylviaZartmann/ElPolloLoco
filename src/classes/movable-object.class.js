class MovableObject {
    img;
    imageCache = {};
    currentImage = 0;
    speed;
    otherDirection = false;
    speedY = 0; //vordefiniert "speedY"... nach bspw. 2 sekunden sind 10px gefallen
    acceleration = 2; //... pro Sekunde wird pixel hinzugefügt - Beschleunigungswert
    energy = 100;
    lastHit = 0;

    applyGravity(){ //wir implementieren Gravitation
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) { 
                this.positionY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25);
    }

    isAboveGround (){
        return this.positionY < 130; //wenn Chara in Pos unter 130 ist, fällt er bis y=130px
        //einzeln geschrieben und nicht oben direkt integriert, weil wir die funktion noch einzeln brauchen
    }

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

    draw (ctx) {
        ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height); //einfügen des Bildes gespiegelt oder nicht
    }

    drawFrame (ctx) {
        //RAHMEN SETZEN um Objekte
        if (this instanceof Character || this instanceof Chick || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.positionX, this.positionY, this.width, this.height);
            ctx.stroke();
            }
        }

    isColliding(mo) {
        return this.positionX + this.width > mo.positionX &&
        this.positionX + this.width < mo.positionX + mo.width &&
        this.positionY + this.height > mo.positionY ||
        this.positionX > mo.positionX &&
        this.positionX < mo.positionX + mo.width &&
        this.positionY + this.height > mo.positionY ||
        this.positionX < mo.positionX &&
        this.positionX + this.width > mo.positionX + mo.width &&
        this.positionY + this.height > mo.positionY;
    }

    hit (mo) {
        this.energy -= mo.charDamage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); //Zeitpunkt Speichern, wo verletzt wurde
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; //in Sekunden
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight(){
        //überprüfen mit < das Spielfeldende
        //nur wenn Right oder D gedrückt wird, wird Animation ausgeführt
        this.positionX += this.speed;
        this.otherDirection = false; //um das Bild des Charas zurückzuspiegeln
    }

    moveLeft(){
        this.positionX -= this.speed; //wie sich die x Koordinate verändern soll
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // % = Modulo funktion - gibt Rest aus
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 25;  
      }
}

    // Modulo = 0 % 6 = 0/6 = 0, Rest 0
    // Modulo = 1 % 6 = 1/6 = 0, Rest 1
    // Modulo = 5 % 6 = 5/6 = 0, Rest 5
    // Modulo = 6 % 6 = 6/6 = 1, Rest 0
    // Modulo = 7 % 6 = 6/6 = 1, Rest 1 -> Modulo hebt Rest auf und i hat wieder den Wert 1
    // bedeutet i hat den Wert 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0