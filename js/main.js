import {drawPlayer,movingPlayer, playerWeapon, Player} from './player.js';
import {Enemy,drawEnemy,enemyAi} from './enemy.js';
import {Weapon} from './weapon.js';
import {Hitbox} from './hitbox.js';
export {trialEnemyAttackTime};
const can = document.getElementById('gra');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;
const trialWeapon1 = new Weapon('Sztylet',6,9,1,20,750), trialWeapon2 = new Weapon('Miecz',8,12,5,35,1200);
let enemy1 = new Enemy(580,30,50,65,35,4,1,8,10,'gold',3);
let enemyHitbox = new Hitbox(enemy1.enemyX, enemy1.enemyY, enemy1.enemyWidth, enemy1.enemyHeight);
let player1 = new Player(250,250,65,50,5, new Hitbox, trialWeapon1,100);
playerWeapon = trialWeapon2;
console.log(enemy1);
player1.playerHitbox = new Hitbox(player1.playerX,player1.playerY,player1.playerWidth,player1.playerHeight1);

let attackList = [];
enemy1.enemyWeapon = trialWeapon2;
enemy1.enemyAttackTime = enemy1.enemyWeapon.weaponSpeedLightAttack;
let trialEnemyAttackTime = enemy1.enemyWeapon.weaponSpeedLightAttack;


can.addEventListener('click', e => {
    player1.movingPlayer(e.offsetX,e.offsetY);
});


function drawAll(){
    ctx.clearRect(0, 0, canWidth,canHeight);
    drawEnemy(ctx, enemy1.enemyX, enemy1.enemyY);
    player1.drawPlayer(ctx);
    requestAnimationFrame(drawAll);
}

function drawText(textX, textY, textToDisplay, fontColor, fontSize, fontFamily = 'Monospace') {
    ctx.fillStyle = fontColor;
    ctx.font = fontSize + 'px ' + fontFamily;
    ctx.fillText(textToDisplay, textX, textY);
}

function gameLoop() {
    updateHitboxs();
    if (player1.playerHitbox.hitboxCollision(enemyHitbox)) {
        enemy1.enemyAiState = 'toattack';
    } else {
        enemy1.enemyAiState = 'quest';
        attackList.pop();
        enemy1.enemyAttackTime = enemy1.enemyWeapon.weaponSpeedLightAttack;
    }
}

function updateHitboxs()
{
    player1.playerHitbox.hitboxX = player1.playerX;
    player1.playerHitbox.hitboxY = player1.playerY;
    enemyHitbox.hitboxX = enemy1.enemyX;
    enemyHitbox.hitboxY = enemy1.enemyY;
}

function enemyLoop()
{
    enemyAi(enemy1, attackList,enemy1.enemyAttackTime, undefined, player1);
}

function enemyAttackTimer(attackList) {
    //console.log(attackList[0]);
    if (attackList[attackList.length - 1] === 'EnemyLightAttack') { 
        enemy1.enemyAttackTime -= 20;
    }
}

setInterval(gameLoop, 10);
setInterval(enemyAttackTimer,20,attackList);
setInterval(enemyLoop, 35);
setInterval(player1.playerMove, 30);
requestAnimationFrame(drawAll);