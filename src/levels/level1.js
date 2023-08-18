let level1;
function initLevel() {

  level1 = new level(
  
  (lowEnemies = []),

  (enemies = [new Chicken(9999), new Chicken(9999), new Chicken(9999), new Chicken(9999), new Chicken(9999)]),

  (endboss = []),

  (clouds = [
    new Cloud("src/img/5_background/layers/4_clouds/1.png"),
    new Cloud("src/img/5_background/layers/4_clouds/2.png"),
  ]),

  (backgroundObject = [
    new BackgroundObject("src/img/5_background/layers/air.png", -719),
    new BackgroundObject("src/img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("src/img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("src/img/5_background/layers/1_first_layer/2.png", -719),
    new BackgroundObject("src/img/5_background/layers/air.png", 0),
    new BackgroundObject("src/img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("src/img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("src/img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("src/img/5_background/layers/air.png", 719),
    new BackgroundObject("src/img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("src/img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("src/img/5_background/layers/1_first_layer/2.png", 719),
    new BackgroundObject("src/img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject("src/img/5_background/layers/3_third_layer/1.png", 719 * 2),
    new BackgroundObject("src/img/5_background/layers/2_second_layer/1.png", 719 * 2),
    new BackgroundObject("src/img/5_background/layers/1_first_layer/1.png", 719 * 2),
    new BackgroundObject("src/img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject("src/img/5_background/layers/3_third_layer/2.png", 719 * 3),
    new BackgroundObject("src/img/5_background/layers/2_second_layer/2.png", 719 * 3),
    new BackgroundObject("src/img/5_background/layers/1_first_layer/2.png", 719 * 3), 
    new BackgroundObject("src/img/5_background/layers/air.png", 719 * 4),
    new BackgroundObject("src/img/5_background/layers/3_third_layer/1.png", 719 * 4),
    new BackgroundObject("src/img/5_background/layers/2_second_layer/1.png", 719 * 4),
    new BackgroundObject("src/img/5_background/layers/1_first_layer/1.png", 719 * 4),
  ]),
  
  (egg = [new Eggstate(350, 9999)]), 

  (coin = [new Coin(380), new Coin(440), new Coin(500), new Coin(800), new Coin(860), new Coin(920), new Coin(1120), new Coin(1650), new Coin(1710), new Coin(1770), new Coin(2000), new Coin(2060), new Coin(2400), new Coin(2460), new Coin(2520)]), 
  (bottle = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()]), 
);
}  
