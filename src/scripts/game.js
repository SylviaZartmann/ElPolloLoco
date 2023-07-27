let canvas;
let world;


function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

let keyboard = new Keyboard();

window.addEventListener("keydown", (e) => {
  //welche Taste wird gedrückt
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 68) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 65) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 87) {
    keyboard.UP = true;
  }
  if (e.keyCode == 32) {
    keyboard.UP = true;
  }
  if (e.keyCode == 16) {
    keyboard.ACTION = true;
  }
  if (e.keyCode == 67) {
    keyboard.ACTION = true;
  }
});

window.addEventListener("keyup", (e) => {
  //welche Taste wird losgelassen
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
    let startIdleTime = new Date().getTime();
  }
  if (e.keyCode == 68) {
    keyboard.RIGHT = false;
    let startIdleTime = new Date().getTime();
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
    let startIdleTime = new Date().getTime();
  }
  if (e.keyCode == 65) {
    keyboard.LEFT = false;
    let startIdleTime = new Date().getTime();
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
    let startIdleTime = new Date().getTime();
  }
  if (e.keyCode == 87) {
    keyboard.UP = false;
    let startIdleTime = new Date().getTime();
  }
  if (e.keyCode == 32) {
    keyboard.UP = false;
    let startIdleTime = new Date().getTime();
  }
  if (e.keyCode == 16) {
    keyboard.ACTION = false;
    let startIdleTime = new Date().getTime();
  }
  if (e.keyCode == 67) {
    keyboard.ACTION = false;
    let startIdleTime = new Date().getTime();
  }
});


