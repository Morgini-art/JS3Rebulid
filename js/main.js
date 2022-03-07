import {drawPlayer,movingPlayer} from './player.js';
import {Enemy,drawEnemy,enemyWherePlayer} from './enemy.js';
const can = document.getElementById('gra');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;
let enemy1 = new Enemy(20,30,50,65,35,undefined,undefined,4,1,8,10,'gold',3);
console.log(enemy1.enemyY);

can.addEventListener('click', e => {
    movingPlayer(e.offsetX,e.offsetY);
});


function drawAll(){
    ctx.clearRect(0, 0, canWidth,canHeight);
    drawEnemy(ctx, enemy1.enemyX, enemy1.enemyY);
    drawPlayer(ctx);
    requestAnimationFrame(drawAll);
}

requestAnimationFrame(drawAll);