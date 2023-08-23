class Endbossbar extends DrawableObject {
  positionX = 500;
  positionY = 0;
  height = 60;
  width = 200;
  percentage;

  IMAGES_ENDBOSSHEALTH = [
    "src/img/7_statusbars/2_statusbar_endboss/green_00.png",
    "src/img/7_statusbars/2_statusbar_endboss/green_20.png",
    "src/img/7_statusbars/2_statusbar_endboss/green_40.png",
    "src/img/7_statusbars/2_statusbar_endboss/green_60.png",
    "src/img/7_statusbars/2_statusbar_endboss/green_80.png",
    "src/img/7_statusbars/2_statusbar_endboss/green.png"
  ];


  constructor() {
    super().loadImage(this.IMAGES_ENDBOSSHEALTH[5]);
    this.loadImages(this.IMAGES_ENDBOSSHEALTH);
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.IMAGES_ENDBOSSHEALTH[this.resolveImageIndex()];
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
