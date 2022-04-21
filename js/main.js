import {Hitbox, checkCollisionWith} from './hitbox.js';
import {Timer, Tick, timeLoop} from './lib/time.js';
import {Player} from './player.js';
import {Weapon} from './weapon.js';
import {Enemy} from './enemy.js';
import {Bullet} from './bullet.js';
import {interpeter} from './text.js';//TODO: Chwilowa nazwa pliku!!!
export {generalTimer,drawText};

const can = document.getElementById('gra');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;
let trialWeapon1 = new Weapon('Sztylet', 6, 9, 1, 20, 400, 'melee'),
    trialWeapon2 = new Weapon('Kusza', 6, 9, 5, 35, 16, 'distance'),
    trialWeapon3 = new Weapon('Pistolet', 1, 3, 5, 35, 16, 'distance', 10),
    trialWeapon4 = new Weapon('Karabin Maszynowy',1,1,15,8,15,'distance',80);
let enemy1 = new Enemy(20, 600, 50, 65, 40, trialWeapon1, new Hitbox(undefined, undefined, 50, 65), 2, 1, 'gold', 4);
let enemyHitbox = new Hitbox(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
let player1 = new Player(880, 80, 50, 65, 100, trialWeapon3 , new Hitbox(undefined, undefined, 50, 65), 5, 3);
const generalTimer = new Timer();

let bullets = [];

let enemyColor = 'red';

let showWeaponStatistic = false;

console.log('Enemy: ',enemy1);
console.log('Player: ',player1);
console.log('Weapons: ',trialWeapon1,trialWeapon2,trialWeapon3);

console.log(player1.movingDirectionAxisX);

let attackList = [];

can.addEventListener('click', e => {
    const collisionWith = checkCollisionWith(player1.hitbox, enemyHitbox);
    player1.movingPlayer(e.offsetX,e.offsetY, e);
    player1.playerAttack(e, collisionWith, enemy1, generalTimer);
});

document.addEventListener('keyup', e => {
    const collisionWith = checkCollisionWith(player1.hitbox, enemyHitbox);
    if (player1.weapon.type === 'melee') {
        player1.playerAttack(e, collisionWith, enemy1, generalTimer);
    }
    if (e.keyCode === 49) {
        player1.weapon = trialWeapon1;
    } else if (e.keyCode === 50) {
        player1.weapon = trialWeapon2;
    } else if (e.keyCode === 51) {
        player1.weapon = trialWeapon3;
    } else if (e.keyCode === 52) {
        player1.weapon = trialWeapon4;
    }
    
    if (e.keyCode === 80) {
        showWeaponStatistic = !showWeaponStatistic;
    }
}); 


function drawAll(){
    ctx.clearRect(0, 0, canWidth,canHeight);
    enemy1.drawEnemy(ctx, enemyColor);
    player1.drawPlayer(ctx);
    for (const bullet of bullets) { 
        bullet.drawBullet(ctx);
    }
    requestAnimationFrame(drawAll);
    drawText(15,20,'Hp:'+player1.hp, 'black', 23);
    drawText(15,40,'Your weapon:'+player1.weapon.name);
    drawText(15,60,'Type:'+player1.weapon.type);
    if (showWeaponStatistic) {
        drawText(15,85,'MinDmg:'+player1.weapon.minDmg);
        drawText(15,105,'MaxDmg:'+player1.weapon.maxDmg);
    }
}

function drawText(textX, textY, textToDisplay, fontColor, fontSize, fontFamily = 'Monospace') {
    ctx.fillStyle = fontColor;
    ctx.font = fontSize + 'px ' + fontFamily;
    ctx.fillText(textToDisplay, textX, textY);
}

function gameLoop() {
    const {
        listOfTicks
    } = generalTimer;

    updateHitboxs();

    if (checkCollisionWith(player1.hitbox, enemyHitbox)) {
        if (enemy1.aiState != 'toattack') {
            generalTimer.listOfTicks.push(new Tick('EnemyLightAttack', generalTimer.generalGameTime, generalTimer.generalGameTime + enemy1.weapon.speedLightAttack));
            console.log(generalTimer.listOfTicks);
        }
        enemy1.aiState = 'toattack';

    } else {
        enemy1.aiState = 'quest';
        for (let i = 0; i < listOfTicks.length; i++) {
            if (listOfTicks[i].nameOfTick === 'EnemyLightAttack' && !listOfTicks[i].done) {
                //console.log('The Tick Of Attack Enemy Has Be Taged: "old".');
                listOfTicks[i].old = true;
                i += listOfTicks.length + 1;
            }
        }
    }
    
    for (const bullet of bullets) {
        if (bullet.hitbox != null) {
            if (checkCollisionWith(bullet.hitbox, enemyHitbox)) {
                enemyColor = 'blue';
                const givenDmg = Math.floor(Math.random() * (bullet.maxDmg - bullet.minDmg + 1) + bullet.minDmg);
                enemy1.hp -= givenDmg;
                bullets.splice(bullet,1);
            } else {
                enemyColor = 'red';
            }
        }
    }
}

function updateHitboxs()
{
    for (const bullet of bullets) {
        bullet.hitbox.x = bullet.x;
        bullet.hitbox.y = bullet.y;
    }
    player1.hitbox.x = player1.x;
    player1.hitbox.y = player1.y;
    enemyHitbox.x = enemy1.x;
    enemyHitbox.y = enemy1.y;
}

function enemyLoop() {
    enemy1.enemyAi(attackList, player1, generalTimer);
    for (const bullet of bullets) {
        bullet.move();
        if (bullet.speed === 0 || bullet.distance === 0) {
            bullets.splice(bullet, 1);
            console.log(bullets);
        }
    }
}

function playerLoop()
{
    player1.playerMove();
}

function bulletsLoop() {
    const listOfTicks = generalTimer.listOfTicks;
    
    for (const tick of listOfTicks) { 
        if (tick.nameOfTick.substr(0, 17) === 'Creating a Bullet' && tick.done && !tick.old) {
            let rawData = interpeter(tick.nameOfTick);
            rawData[0] = parseInt(rawData[0].substring(2)); //x
            rawData[1] = parseInt(rawData[1].substring(2)); //y
            rawData[2] = parseInt(rawData[2].substring(6)); //width
            rawData[3] = parseInt(rawData[3].substring(7)); //height
            rawData[4] = parseInt(rawData[4].substring(6)); /*speed*/ console.log(rawData[4]);
            rawData[5] = parseInt(rawData[5].substring(7)); //mindmg   
            rawData[6] = parseInt(rawData[6].substring(7)); //maxdmg
            rawData[7] = parseInt(rawData[7].substring(8)); //targetX
            rawData[8] = parseInt(rawData[8].substring(8)); //targetY

            console.log(rawData);
            bullets.push(new Bullet(rawData[0], rawData[1], rawData[2], rawData[3],
                new Hitbox(rawData[0], rawData[1], rawData[2], rawData[3]), rawData[4], rawData[5], rawData[6], rawData[7], rawData[8], 560));
            tick.old = true;
            for (const bullet of bullets) {
                 bullet.checkTheDirection(player1);
            }
           
            console.log(bullets[tick]);
            break;
        }
    }
}

setInterval(gameLoop, 12);
setInterval(enemyLoop, 25);
setInterval(playerLoop, 25);
setInterval(timeLoop, 1, generalTimer);
setInterval(bulletsLoop, 20);
requestAnimationFrame(drawAll);