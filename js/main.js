import {drawPlayer,movingPlayer} from './player.js';
const can = document.getElementById('gra');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;
export {can as mainCanvas};

can.addEventListener('click', e => {
    movingPlayer(e.layerX,e.layerY);
});


function drawAll(){
    ctx.clearRect(0, 0, canWidth,canHeight);
    drawPlayer(ctx);
    requestAnimationFrame(drawAll);
}

requestAnimationFrame(drawAll);