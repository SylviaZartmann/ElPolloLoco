class Coin extends CollectableObject {
  positionY = 80;
  width = 160;
  height = 160;
  timesChanged = 0;
  offsetLeft = 60;
  offsetTop = 60;
  offsetRight = 60;
  offsetBottom = 120;

  collect_coin = new Audio ('src/audio/get_coin.mp3');

  COIN_FLYING = ["src/img/8_coin/coin_1.png", "src/img/8_coin/coin_2.png"];

  constructor(positionX) {
    super().loadImage(this.COIN_FLYING[0]);
    this.loadImages(this.COIN_FLYING);
    this.positionX = positionX;
    this.movingUp = this.getRandomBoolean();
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.rotateCoin();
      this.countRotations();
      this.changePictureRotatedCoin();
    }, 1000 / 20);

    setInterval(() => {
      this.movingUpAndDown();
    }, 1000 / 30);
  }

  rotateCoin() {
    if (this.coinChanged) {
      this.width += 10;
      this.offsetLeft += 5;
      this.offsetRight += 5;
      this.positionX -= 5;
    } else {
      this.width -= 10;
      this.offsetLeft -= 5;
      this.offsetRight -= 5;
      this.positionX += 5;
    }
  }

  countRotations() {
    if (this.width === 160) this.coinChanged = false;
    else if (this.width === 20) {
      this.timesChanged++;
      this.coinChanged = true;
    }
  }

  changePictureRotatedCoin() {
    if (this.timesChanged % 2 === 0) this.otherDirection = true;
    else this.otherDirection = false;
  }

  movingUpAndDown() {
    if (this.movingUp) this.positionY -= 1;
    else this.positionY += 1;
    if (this.positionY === 70) this.movingUp = false;
    else if (this.positionY === 90) this.movingUp = true;
  }
}
