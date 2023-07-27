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
      this.height
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
    this.offLeft = this.positionX + this.bodyLeft;
    this.offTop =  this.positionY + this.bodyTop; 
    this.offRight = this.width - this.bodyRight;
    this.offBottom = this.height - this.bodyBottom;
    if (
      this instanceof Character ||
      this instanceof Chick ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "green";
      ctx.rect(this.offLeft, this.offTop, this.offRight, this.offBottom);
      ctx.stroke();
    }
  }
}
