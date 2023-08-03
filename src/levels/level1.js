const level1 = new level(
  
  (lowEnemies = []),

  (enemies = [new Chicken()]),

  (endboss = []),

  (clouds = [
    new Cloud("src/img/5_background/layers/4_clouds/1.png"),
    new Cloud("src/img/5_background/layers/4_clouds/2.png"),
  ]),

  (backgroundObject = [
    new BackgroundObject("src/img/5_background/layers/air.png", -719),
    new BackgroundObject(
      "src/img/5_background/layers/3_third_layer/2.png",
      -719
    ),
    new BackgroundObject(
      "src/img/5_background/layers/2_second_layer/2.png",
      -719
    ),
    new BackgroundObject(
      "src/img/5_background/layers/1_first_layer/2.png",
      -719
    ),
    new BackgroundObject("src/img/5_background/layers/air.png", 0),
    new BackgroundObject("src/img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("src/img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("src/img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("src/img/5_background/layers/air.png", 719),
    new BackgroundObject("src/img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("src/img/5_background/layers/2_second_layer/2.png",719),
    new BackgroundObject(
      "src/img/5_background/layers/1_first_layer/2.png",
      719
    ),
    new BackgroundObject("src/img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject(
      "src/img/5_background/layers/3_third_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "src/img/5_background/layers/2_second_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "src/img/5_background/layers/1_first_layer/1.png",
      719 * 2
    ),
    new BackgroundObject("src/img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject(
      "src/img/5_background/layers/3_third_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "src/img/5_background/layers/2_second_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "src/img/5_background/layers/1_first_layer/2.png",
      719 * 3
    ),
    new BackgroundObject("src/img/5_background/layers/air.png", 719 * 4),
    new BackgroundObject(
      "src/img/5_background/layers/3_third_layer/1.png",
      719 * 4
    ),
    new BackgroundObject(
      "src/img/5_background/layers/2_second_layer/1.png",
      719 * 4
    ),
    new BackgroundObject(
      "src/img/5_background/layers/1_first_layer/1.png",
      719 * 4
    ),
  ]),
  
  (egg = [new Eggstate()])
);
