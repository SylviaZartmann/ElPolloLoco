let canvas;
let ctx;
let character = new Image();

function init (){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    character.src = 'src/img/2_character_pepe/2_walk/W-21.png';

    ctx.drawImage(character, 20, 20, 30, 150); // malt Bild auf Canvas in 2d Context an bestimmten Koordinaten (x, y, Breite, Höhe)
}