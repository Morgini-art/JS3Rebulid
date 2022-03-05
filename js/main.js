import {drawPlayer,movingPlayer} from './player.js';
import {Enemy} from './enemy.js';
const can = document.getElementById('gra');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;
let Enemy1 = new Enemy(20,20,50,65,35,undefined,undefined,4,0,8,10,'gold',3);
console.log(Enemy1);

can.addEventListener('click', e => {
    movingPlayer(e.offsetX,e.layerY);
});


function drawAll(){
    ctx.clearRect(0, 0, canWidth,canHeight);
    drawPlayer(ctx);
    requestAnimationFrame(drawAll);
}

requestAnimationFrame(drawAll);