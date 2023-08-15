class level {
  enemies;
  lowEnemies;
  clouds;
  backgroundObject;
  endboss;
  egg;
  coin;
  bottle;
  level_end_x = 2950;
  level_start_x =  -615;

  constructor(lowEnemies, enemies, endboss, clouds, BackgroundObject, egg, coin, bottle) {
    this.lowEnemies = lowEnemies;
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObject = BackgroundObject;
    this.egg = egg;
    this.coin = coin;
    this.bottle = bottle;
  }
}
