class Bottle extends CollectableObject { 
    positionY = 355;
    width = 70;
    height = 70;
    offsetLeft = 30;
    offsetTop = 15;
    offsetRight = 15;
    offsetBottom = 22;
    maxExistence = 2700;
    minExistence = 300;
    
    collect_bottle = new Audio ('src/audio/get_bottle.mp3');

    BOTTLE_GROUND = [
        "src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "src/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
      ];
    
      constructor () {
        super().loadImage(this.BOTTLE_GROUND[0]);
        this.loadImages(this.BOTTLE_GROUND);
        this.positionX = this.findStartPosition();
        this.otherDirection = this.getRandomBoolean();
      }
    }