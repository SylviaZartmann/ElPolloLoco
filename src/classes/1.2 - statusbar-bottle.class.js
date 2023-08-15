class Bottlebar extends DrawableObject  {
    positionX = 5;
    positionY = 50
    height  = 60;
    width = 200;
    maxBottles = 10;
  
    IMAGES_BOTTLE = [
        "src/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
        "src/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
        "src/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
        "src/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
        "src/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "src/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
      ];

  percentage = 0;

  constructor() {
    super().loadImage(this.IMAGES_BOTTLE[0]); //initialisierung der übergeordneten Objekte
    this.loadImages(this.IMAGES_BOTTLE);
    this.setPercentage(0);
  }

  setPercentage(collectedBottle) {
    this.percentage = collectedBottle / this.maxBottles * 100;   
    let imagePath = this.IMAGES_BOTTLE[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
    }   

    resolveImageIndex() {
      if (this.percentage == 100) {
        return 5;
      } else if (this.percentage > 70) {
        return 4;
      } else if (this.percentage > 50) {
        return 3;
      } else if (this.percentage > 30) {
        return 2;
      } else if (this.percentage > 0) {
        return 1;
      } else {
        return 0;
      }
    }
}