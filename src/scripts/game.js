let canvas;
let world;
let keyboard = new Keyboard();

function init (){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);
}

window.addEventListener("keydown", (e) => { //welche Taste wird gedrückt
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 68) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 65) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }
    if(e.keyCode == 87) {
        keyboard.UP = true;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 83) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32) {
        keyboard.UP = true;
    }
    if(e.keyCode == 16) {
        keyboard.ACTION = true;
    }
});

window.addEventListener("keyup", (e) => { //welche Taste wird losgelassen
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 68) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 65) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }
    if(e.keyCode == 87) {
        keyboard.UP = false;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 83) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) {
        keyboard.UP = false;
    }
    if(e.keyCode == 16) {
        keyboard.ACTION = false;
    }
});