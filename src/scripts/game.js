let canvas;
let world;
let keyboard = new Keyboard();
let canvasstarted = false;


let StartEndscreen = new Audio("src/audio/start_end_screen.mp3");

window.addEventListener("keydown", (e) => {
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
  if (e.keyCode == 40) {
    keyboard.ACTION = true;
  }
  if (e.keyCode == 83) {
    keyboard.ACTION = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 68) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 65) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 87) {
    keyboard.UP = false;
  }
  if (e.keyCode == 32) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.ACTION = false;
  }
  if (e.keyCode == 83) {
    keyboard.ACTION = false;
  }
});

document.getElementById('btn-left').addEventListener('touchstart', (ev) => {
  ev.preventDefault();
  keyboard.LEFT = true;
});

document.getElementById('btn-left').addEventListener('touchend', (ev) => {
  ev.preventDefault();
  keyboard.LEFT = false;
});

document.getElementById('btn-right').addEventListener('touchstart', (ev) => {
  ev.preventDefault();
  keyboard.RIGHT = true;
});

document.getElementById('btn-right').addEventListener('touchend', (ev) => {
  ev.preventDefault();
  keyboard.RIGHT = false;
});

document.getElementById('btn-up').addEventListener('touchstart', (ev) => {
  ev.preventDefault();
  keyboard.UP = true;
});
document.getElementById('btn-up').addEventListener('touchend', (ev) => {
  ev.preventDefault();
  keyboard.UP = false;
});
document.getElementById('btn-bottle').addEventListener('touchstart', (ev) => {
  ev.preventDefault();
  keyboard.ACTION = true;
});
document.getElementById('btn-bottle').addEventListener('touchend', (ev) => {
  ev.preventDefault();
  keyboard.ACTION = false;
});

function playMusic() {
  StartEndscreen.play();
  StartEndscreen.addEventListener("ended", () => {
    StartEndscreen.currentTime = 0;
    StartEndscreen.play();
  })
}


function startGame2() {
  StartEndscreen.pause();
  document.getElementById('overlay').classList.add("d-none");
  document.getElementById('controls').classList.add("d-none");
  document.getElementById('mobilButtons').classList.remove("d-none");
  init();
}

function newGame() {
  document.getElementById('overlay').classList.add("d-none");
  document.getElementById('endScreen').classList.add("d-none");
  StartEndscreen.play();
  window.location.reload();
}

function showControls() {
  playMusic();
  document.getElementById('overlay').classList.remove("d-none");
  document.getElementById('controls').classList.remove("d-none");
  document.getElementById('startscreen').classList.add("d-none");
}

function showEndscreen(who) {
  playMusic();
    world.character.endboss_coming.pause();
    document.getElementById('overlay').classList.remove("d-none");
    document.getElementById('endScreen').classList.remove("d-none");
    document.getElementById('mobilButtons').classList.add("d-none");
    document.getElementById('winOrLose').innerHTML = '';
    document.getElementById('killedChicken').innerHTML = '';
if (who instanceof Endboss) {
  document.getElementById('winOrLose').innerHTML = 'YOU WIN';
} else {
  document.getElementById('winOrLose').innerHTML = 'YOU LOSE';
}
  document.getElementById('killedChicken').innerHTML = world.character.killedChicken;  
}

function init() {
  initLevel();  
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, canvasstarted);
}
