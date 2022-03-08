import {drawPlayer,movingPlayer,playerHitbox, playerX, playerY} from './player.js';
import {Enemy,drawEnemy,enemyWherePlayer,enemyMoveToPlayer} from './enemy.js';
import {Hitbox} from './hitbox.js';
const can = document.getElementById('gra');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;
let enemy1 = new Enemy(580,30,50,65,35,undefined,undefined,4,1,8,10,'gold',3,undefined,'quest');
console.log(enemy1.enemySpeed);
let enemyHitbox = new Hitbox(enemy1.enemyX, enemy1.enemyY, enemy1.enemyWidth, enemy1.enemyHeight);


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
    updateHitboxs();
    if(playerHitbox.hitboxCollision(enemyHitbox))
    {
        console.log('Kolizja!');
    }
}

function updateHitboxs()
{
    playerHitbox.hitboxX = playerX;
    playerHitbox.hitboxY = playerY;
    enemyHitbox.hitboxX = enemy1.enemyX;
    enemyHitbox.hitboxY = enemy1.enemyY;
}

function enemyLoop()
{
    enemyWherePlayer(enemy1);
    enemyMoveToPlayer(enemy1);
}

setInterval(gameLoop, 10);
setInterval(enemyLoop, 35);
requestAnimationFrame(drawAll);