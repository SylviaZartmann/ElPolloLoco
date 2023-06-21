class level {
    enemies;
    lowEnemies;
    clouds;
    backgroundObject;
    endboss;
    level_end_x = 2950;

    constructor(lowEnemies, enemies, endboss, clouds, BackgroundObject){
        this.lowEnemies = lowEnemies;
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObject = BackgroundObject;
    }
}