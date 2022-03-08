import {drawPlayer,movingPlayer} from './player.js';
import {Enemy,drawEnemy,enemyWherePlayer,enemyMoveToPlayer} from './enemy.js';
const can = document.getElementById('gra');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;
let enemy1 = new Enemy(580,30,50,65,35,undefined,undefined,4,1,8,10,'gold',3,undefined,'quest');
console.log(enemy1.enemySpeed);


can.addEventListener('click', e => {
    movingPlayer(e.offsetX,e.offsetY);
});


function drawAll(){
    ctx.clearRect(0, 0, canWidth,canHeight);
    drawEnemy(ctx, enemy1.enemyX, enemy1.enemyY);
    drawPlayer(ctx);
    requestAnimationFrame(drawAll);
}

function gameLoop()
{
    
}

function enemyLoop()
{
    enemyWherePlayer(enemy1);
    enemyMoveToPlayer(enemy1);
}

setInterval(gameLoop, 10);
setInterval(enemyLoop, 35);
requestAnimationFrame(drawAll);