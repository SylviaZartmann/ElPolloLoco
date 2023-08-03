class level {
  enemies;
  lowEnemies;
  clouds;
  backgroundObject;
  endboss;
  egg;
  level_end_x = 2950;
  level_start_x =  -615;

  constructor(lowEnemies, enemies, endboss, clouds, BackgroundObject, egg) {
    this.lowEnemies = lowEnemies;
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObject = BackgroundObject;
    this.egg = egg;
  }
}
