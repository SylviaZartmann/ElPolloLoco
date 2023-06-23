class Coinbar extends DrawableObject {
    positionX = 5;
    positionY = 100
    height  = 60;
    width = 200;

    IMAGES_COIN = [
      "src/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
      "src/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
      "src/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
      "src/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
      "src/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
      "src/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
    ];

  percentage = 0;

  constructor() {
    super().loadImage(this.IMAGES_COIN[0]); //initialisierung der übergeordneten Objekte
    this.loadImages(this.IMAGES_COIN);
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage; //aus dem Stapel Bilder muss Index zwischen 0 und 5 ermitteln
    let imagePath = this.IMAGES_COIN[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
    }   

    resolveImageIndex() {
      if (this.percentage == 100) {
        return 5; //Bildindex, der ausgegeben wird
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