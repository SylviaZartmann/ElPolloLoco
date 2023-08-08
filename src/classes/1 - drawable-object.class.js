class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
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
      this.height,
    );
  }

  drawFrame(ctx) {
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



  drawOffset(ctx) {
    this.offsetX = this.positionX + this.offsetPositionX;
    this.offsetY = this.positionY + this.offsetPositionY;
    if (
      this instanceof Character ||
      this instanceof Chick ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "green";
      ctx.rect(this.offsetX, this.offsetY, this.offsetWidth, this.offsetHeight);
      ctx.stroke();
    }
  }
}