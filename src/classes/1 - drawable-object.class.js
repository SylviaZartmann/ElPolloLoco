class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;

  //bspw ('img/test.png')
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementByID('image') <img id="image" src>
    this.img.src = path;
  }

  loadImages(array) {
    //images werden in JSON gespeichert (in bspw character script ausgeführt mit entsprechenden bildern)
    array.forEach((path) => {
      //rotieren durch vorhandenen Bilder in entspr. script hinterlegt bis durch
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    ); //einfügen des Bildes gespiegelt oder nicht
  }

  drawFrame(ctx) {
    //RAHMEN SETZEN um Objekte
    if (
      this instanceof Character ||
      this instanceof Chick ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.positionX, this.positionY, this.width, this.height);
      ctx.stroke();
    }
  }
}
