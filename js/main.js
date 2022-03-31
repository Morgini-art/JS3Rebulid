import {Player} from './player.js';
import {Timer, Tick, timeLoop} from './lib/time.js';
import {Weapon} from './weapon.js';
import {Enemy} from './enemy.js';
import {Hitbox, checkCollisionWith} from './hitbox.js';
export {generalTimer};

const can = document.getElementById('gra');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;
let trialWeapon1 = new Weapon('Sztylet',6,9,1,20,420), trialWeapon2 = new Weapon('Miecz',8,12,5,35,1200);
let enemy1 = new Enemy(580,30,50,65,35,4,1,'gold',4, trialWeapon1);
let enemyHitbox = new Hitbox(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
let player1 = new Player(250,250,50,65,5, new Hitbox(undefined,undefined,50,65), trialWeapon1,100);
const generalTimer = new Timer();

console.log('Enemy: ',enemy1);
console.log('Player: ',player1);

playerWeapon = trialWeapon1;

let attackList = [];

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
    
    if (checkCollisionWith(player1.hitbox, enemyHitbox)) {
        if (enemy1.aiState != 'toattack') {
            generalTimer.listOfTicks.push(new Tick('EnemyLightAttack', generalTimer.generalGameTime, generalTimer.generalGameTime + enemy1.weapon.speedLightAttack));
            console.log(generalTimer.listOfTicks[0]);
        }
        enemy1.aiState = 'toattack';
        
    } else {
        enemy1.aiState = 'quest';
        if (generalTimer.listOfTicks[0] === 'EnemyLightAttack') {
            generalTimer.listOfTicks.pop();
            console.log('The Last Tick has be deleted');
        }
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

setInterval(gameLoop, 10);
setInterval(enemyLoop, 25);
setInterval(playerLoop, 25);
setInterval(timeLoop, 1, generalTimer);
requestAnimationFrame(drawAll);