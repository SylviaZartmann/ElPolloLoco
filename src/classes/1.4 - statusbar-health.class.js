class Healthbar extends DrawableObject  {
  positionX = 5;
  positionY = 0;
  height = 60;
  width = 200;
  percentage;

  IMAGES_HEALTH = [
    "src/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "src/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "src/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "src/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "src/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "src/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];


  constructor() {
    super().loadImage(this.IMAGES_HEALTH[5]);
    this.loadImages(this.IMAGES_HEALTH);
    this.setPercentage(100);
  }

  /**
   * set the percentage and responds with suitable statusbar
   * @param {*} percentage defines hitpoints given by character being hit
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.IMAGES_HEALTH[this.resolveImageIndex()];
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
