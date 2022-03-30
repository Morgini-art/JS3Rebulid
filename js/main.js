import {drawPlayer,movingPlayer, playerWeapon, Player} from './player.js';
import {Timer, Tick, timeLoop} from './lib/time.js';
import {Enemy} from './enemy.js';
import {Weapon} from './weapon.js';
import {Hitbox, checkCollisionWith} from './hitbox.js';
export {generalTimer, trialEnemyAttackTime};

const can = document.getElementById('gra');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;
const trialWeapon1 = new Weapon('Sztylet',6,9,1,20,750), trialWeapon2 = new Weapon('Miecz',8,12,5,35,1200);
let enemy1 = new Enemy(580,30,50,65,35,4,1,8,10,'gold',3);
let enemyHitbox = new Hitbox(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
let player1 = new Player(250,250,50,65,5, new Hitbox, trialWeapon1,100);
const generalTimer = new Timer();

//Destrukturyzacja obiektów

//Destrukturyzacja obiektów - end

console.log(enemy1);

playerWeapon = trialWeapon2;
player1.hitbox = new Hitbox(player1.x,player1.y,player1.width,player1.height);



let attackList = [];
enemy1.weapon = trialWeapon1;
enemy1.attackTime = enemy1.weapon;
let trialEnemyAttackTime = enemy1.weapon.weaponSpeedLightAttack;


can.addEventListener('click', e => {
    player1.movingPlayer(e.offsetX,e.offsetY);
});


function drawAll(){
    ctx.clearRect(0, 0, canWidth,canHeight);
    enemy1.drawEnemy(ctx);
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
//    if (checkCollisionWith(player1.playerHitbox, enemy1.playerHitbox) && attackList == null) {
//        enemy1.enemyAiState = 'toattack';
//        generalTimer.listOfTicks.push(new Tick('EnemyLightAttack',generalTimer.generalGameTime,enemy1.enemyWeapon.weaponSpeedLightAttack)); 
//        console.log(generalTimer.listOfTicks);
//    } else if (player1.playerHitbox.hitboxCollision(enemyHitbox)) {
//        enemy1.enemyAiState = 'toattack';
//    } else {
//        enemy1.enemyAiState = 'quest';
//        attackList.pop();
//        enemy1.enemyAttackTime = enemy1.enemyWeapon.weaponSpeedLightAttack;
//    }
    
    if (checkCollisionWith(player1.hitbox, enemyHitbox)) {
        enemy1.aiState = 'stay';
    } else {
        enemy1.aiState = 'quest';
    }
}

function updateHitboxs()
{
    player1.hitbox.x = player1.x;
    player1.hitbox.y = player1.y;
    enemyHitbox.x = enemy1.x;
    enemyHitbox.y = enemy1.y;
}

function enemyLoop()
{
    enemy1.enemyAi(attackList, player1,  generalTimer);
}

function playerLoop()
{
    player1.playerMove();
}

//function enemyAttackTimer(attackList) {
//    //console.log(attackList[0]);
//    if (attackList[attackList.length - 1] === 'EnemyLightAttack') { 
//        enemy1.enemyAttackTime -= 20;
//    }
//}

setInterval(gameLoop, 10);
setInterval(enemyLoop, 35);
setInterval(playerLoop, 30);
setInterval(timeLoop, 1, generalTimer);
requestAnimationFrame(drawAll);