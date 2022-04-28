import {Hitbox, checkCollisionWith} from './hitbox.js';
import {Timer, Tick, timeLoop} from './lib/time.js';
import {Invetory, Slot} from './invetory.js';
import {interpeter} from './text.js';//TODO: Chwilowa nazwa pliku!!!
import {Player} from './player.js';
import {Weapon} from './weapon.js';
import {Bullet} from './bullet.js';
import {Enemy} from './enemy.js';
import {Item} from './item.js';
import {GameChests, Chest} from './chest.js';
export {generalTimer,drawText};

const can = document.getElementById('gra');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;

let trialAmmunition1 = 'Pistol/Caliber9mm/Pistolet NTB';
let trialAmmunition2 = 'Crosbow/ArrowHeadSize20mm/Kusza z XIV wieku';
let actalIdOfAmmunition = 0;

let gameChests = new GameChests();

let trialWeapon1 = new Weapon('Sztylet', 6, 9, 1, 20, 340, 'melee'),
    trialWeapon2 = new Weapon('Kusza z XIV wieku', 6, 15, 5, 35, 16, 'distance',  3, [1,1,false,1000,trialAmmunition2]),
    trialWeapon3 = new Weapon('Pistolet NTB', 1, 3, 5, 35, 16, 'distance', 10, [6,6,false,500,trialAmmunition1]),
    trialWeapon4 = new Weapon('Adminowy Karabin Maszynowy',1*99*99*99*999*999,1*99*99*99*999*999,15,8,15,'distance',20, [200*99,1,false,1]);

let items = [
    new Item('Test01',3,0,'test01',false),
    new Item('Test02',7,0,'test02',false)
];

let enemy1 = new Enemy(20, 600, 50, 65, 40, trialWeapon1, new Hitbox(undefined, undefined, 50, 65), 2, 1, 'gold', 4);
let enemyHitbox = new Hitbox(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
let player1 = new Player(880, 80, 50, 65, 100, trialWeapon3 , new Hitbox(undefined, undefined, 50, 65), 5, 3);
let playerInvetory = new Invetory();
playerInvetory.numberOfBasicSlots = 15;
playerInvetory.basicSlots.length = 15;

for (let i = 0; i < playerInvetory.basicSlots.length; i++) {
    playerInvetory.basicSlots[i] = new Slot(i);
}

const generalTimer = new Timer();

let bullets = [];

let enemyColor = 'red';

let showWeaponStatistic = false;

let playerAmmunition = [
    [trialAmmunition1, 18], 
    [trialAmmunition2, 5]
];

console.group('_MAIN');
console.log('Enemy: ',enemy1);
console.log('Player: ',player1);
console.log('Weapons: ',trialWeapon1,trialWeapon2,trialWeapon3);
console.log('Items: ',items);
console.log('Invetory: ',playerInvetory);
console.groupEnd('_MAIN');


let attackList = [];

can.addEventListener('click', e => {
    const collisionWith = checkCollisionWith(player1.hitbox, enemyHitbox);
    player1.movingPlayer(e.offsetX, e.offsetY, e);
    player1.playerAttack(e, collisionWith, enemy1, generalTimer, playerAmmunition);
});

document.addEventListener('keyup', e => {
    const collisionWith = checkCollisionWith(player1.hitbox, enemyHitbox);
    if (player1.weapon.type === 'melee') {
        player1.playerAttack(e, collisionWith, enemy1, generalTimer);
    }
    if (e.keyCode === 49) {
        player1.weapon = trialWeapon1;
    } else if (e.keyCode === 50) {
        actalIdOfAmmunition = 1;
        player1.weapon = trialWeapon2;
    } else if (e.keyCode === 51) {
        actalIdOfAmmunition = 0;
        player1.weapon = trialWeapon3;
    } else if (e.keyCode === 52) {
        player1.weapon = trialWeapon4;
    }
    
    if (e.keyCode === 80) {
        showWeaponStatistic = !showWeaponStatistic;
    } else if (e.keyCode === 82) {
        player1.weapon.reload(generalTimer,playerAmmunition);
    } else if (e.keyCode === 32) {
        for (const chest of gameChests.chests) { 
            if (checkCollisionWith(player1.hitbox, chest.hitbox)) {
                chest.open(player1, playerInvetory);
                console.log(chest.open);
            }
        } 
    } else if (e.keyCode === 84) {
        enemy1 = new Enemy(20, 600, 50, 65, 40, trialWeapon1, new Hitbox(undefined, undefined, 50, 65), 2, 1, 'gold', 4);
    }
}); 

function drawAll(){
    ctx.clearRect(0, 0, canWidth,canHeight);
    enemy1.drawEnemy(ctx, enemyColor);
    player1.drawPlayer(ctx);
    for (const bullet of bullets) { 
        bullet.drawBullet(ctx);
    }
    for (const chest of gameChests.chests) { 
        chest.drawChest(ctx);
    } 
    for (const slot of playerInvetory.basicSlots) { 
        if (slot.content !== 'empty') {
            console.log(slot.content);
            drawText(980, 20, slot.content+`
    `, 'black', 19);
        }
    }
    requestAnimationFrame(drawAll);
    drawText(15,20,'Hp:'+player1.hp, 'black', 23);
    drawText(15,40,'Your weapon:'+player1.weapon.name);
    drawText(15,60,'Type:'+player1.weapon.type);
    if (player1.weapon.type === 'distance') {
        drawText(15, 85, player1.weapon.distanceOptions[0] + '/' + player1.weapon.distanceOptions[1] + '  ' + playerAmmunition[actalIdOfAmmunition][1]);
        if (player1.weapon.distanceOptions[2]) {
            drawText(15, 105, 'Reloading...');
        }
    }
    
    
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
    const {listOfTicks} = generalTimer;

    updateHitboxs();

    if (checkCollisionWith(player1.hitbox, enemyHitbox)) {
        if (enemy1.aiState != 'toattack') {
            generalTimer.listOfTicks.push(new Tick('EnemyLightAttack', generalTimer.generalGameTime, generalTimer.generalGameTime + enemy1.weapon.speedLightAttack));
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
                const givenDmg = Math.floor(Math.random() * (bullet.maxDmg - bullet.minDmg + 1) + bullet.minDmg);
                enemy1.hp -= givenDmg;
                bullets.splice(bullet,1);
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
    enemy1.enemyAi(attackList, player1, generalTimer, gameChests);
    for (const bullet of bullets) {
        bullet.move();
        if (bullet.speed === 0 || bullet.distance === 0) {
            bullets.splice(bullet, 1);
        }
    }
}

function playerLoop() {
    const listOfTicks = generalTimer.listOfTicks;
    player1.playerMove();

    for (const tick of listOfTicks) {
        if (tick.nameOfTick === 'Reloading a player distance weapon' && tick.done && !tick.old) {
            tick.old = true;
            player1.weapon.distanceOptions[2] = false; //isReloading = false
            player1.weapon.distanceOptions[0] = player1.weapon.distanceOptions[1]; //magazine = fullmagazine
            break;
        }
    }
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
            rawData[4] = parseInt(rawData[4].substring(6)); //speed
            rawData[5] = parseInt(rawData[5].substring(7)); //mindmg   
            rawData[6] = parseInt(rawData[6].substring(7)); //maxdmg
            rawData[7] = parseInt(rawData[7].substring(8)); //targetX
            rawData[8] = parseInt(rawData[8].substring(8)); //targetY

            bullets.push(new Bullet(rawData[0], rawData[1], rawData[2], rawData[3],
                new Hitbox(rawData[0], rawData[1], rawData[2], rawData[3]), rawData[4], rawData[5], rawData[6], rawData[7], rawData[8], 560));
            
            tick.old = true;
            for (const bullet of bullets) {
                 bullet.checkTheDirection(player1);
            }
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