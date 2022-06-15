import {Hitbox, checkCollisionWith} from './hitbox.js';
import {Timer, Tick, timeLoop} from './lib/time.js';
import {Invetory, Slot, fillInvetoryWithSlots} from './invetory.js';
import {interpeter} from './text.js';//TODO: Chwilowa nazwa pliku!!!
import {Player} from './player.js';
import {Weapon} from './weapon.js';
import {Bullet} from './bullet.js';
import {Enemy} from './enemy.js';
import {Item} from './item.js';
import {Spell} from './spell.js';
import {GameChests, Chest} from './chest.js';
import {KeyboardInput} from './keyboard.js';
import {loadMenuLanguage, polishLanguageMenuUi, englishLanguageMenuUi, langConvert} from './language.js';
export {generalTimer,drawText};

//Language
let menuUi = [
    'Hp:',
    'Your weapon:',
    'Type:',
    'Reloading...'
];
let gameLanguage = 'PL';

menuUi = loadMenuLanguage(menuUi, polishLanguageMenuUi);
//Language

//Canvas Variables
const can = document.getElementById('gra'), ctx = can.getContext('2d');
const canWidth = can.width, canHeight = can.height;
//Canvas Variables
window.scrollTo = function () {console.log('i zablokowane :>');}
//Weapon's and Item's Variables
let trialAmmunition1 = 'Pistol/Caliber9mm/Pistolet NTB',
    trialAmmunition2 = 'Crosbow/ArrowHeadSize20mm/Kusza z XIV wieku',
    trialAmmunition3 = 'Rifle/Caliber12mm/Adminowy Karabin Maszynowy',
    trialAmmunition4 = 'Pistol/Caliber12mm/Pistolet XD';
let actalIdOfAmmunition = 0;

let trialWeapon1 = new Weapon('Sztylet', 6, 9, 1, 20, 340, 'melee'),
    trialWeapon2 = new Weapon('Kusza z XIV wieku', 6, 15, 5, 35, 16, 'distance',  3, [1,1,false,1000,trialAmmunition2]),
    //trialWeapon3 = new Weapon('Pistolet NTB', 1, 3, 5, 35, 16, 'distance', 10, [6,6,false,500,trialAmmunition1]),
    trialWeapon3 = new Weapon('Pistolet XD', 2, 3, 5, 35, 16, 'distance', 8, [20,20,false,500,trialAmmunition1]),
    trialWeapon4 = new Weapon('Adminowy Karabin Maszynowy',1*99*99*99*999*999,1*99*99*99*999*999,15,8,15,'distance',15, ['infinity',1,false,1,trialAmmunition3]);

let items = [
    new Item('Test01',3,0,'test01',false),
    new Item('Test02',7,0,'test02',false)
]; //Weapon's and Item's Variables

//Definition of Class
let enemy1 = new Enemy(20, 600, 50, 65, 40, trialWeapon1, new Hitbox(undefined, undefined, 50, 65), 2, 1, items[0], 1);
let enemyHitbox = new Hitbox(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
let player1 = new Player(can.width/2-50, can.height/2, 50, 65, 100, null, new Hitbox(undefined, undefined, 50, 65), 5,[[trialAmmunition1, 80],[trialAmmunition2, 9],[trialAmmunition3,'infinity']]);
player1.weapon = trialWeapon3;
let playerInvetory = new Invetory();
let gameChests = new GameChests();
gameChests.chests.push(new Chest(50,50,50,50, new Hitbox(50,50,50,50),'nothing'));
const generalTimer = new Timer(), keyboardPlayerInput = new KeyboardInput(); 
playerInvetory.numberOfBasicSlots = 15;
playerInvetory.basicSlots.length = 15;
//Definition of Class

fillInvetoryWithSlots(playerInvetory);

let bullets = [];

let showWeaponStatistic = false;

let playerAmmunition = [
    [trialAmmunition1, 80], 
    [trialAmmunition2, 9],
    [trialAmmunition3, 'infinity']
];
//let enemyAmmunition = ;
let enemies = [
    new Enemy(0, 1080, 20, 50, 65, 40, trialWeapon3, new Hitbox(undefined, undefined, 50, 65), 2, 1, items[0], 1, 0, [[trialAmmunition1, 'infinity'], [trialAmmunition3, 'infinity']]),
    new Enemy(1, 20, 700, 50, 65, 40, trialWeapon1, new Hitbox(undefined, undefined, 50, 65), 2, 1, items[0], 1, 1, [[trialAmmunition1, 'infinity'], [trialAmmunition3, 'infinity']]),
    new Enemy(2, 450, 560, 50, 65, 40, trialWeapon2, new Hitbox(undefined, undefined, 50, 65), 2, 1, items[1], 1, 0, [[trialAmmunition1, 'infinity'], [trialAmmunition3, 'infinity']])
];

console.log(enemies[0]);
console.log(trialWeapon3);
console.group('_MAIN');
console.log('Enemies: ',enemies);
console.log('Player: ',player1);
console.log('Weapons: ',trialWeapon1,trialWeapon2,trialWeapon3,trialWeapon4);
console.log('Items: ',items);
console.log('Invetory: ',playerInvetory);
console.log(enemies[0].x);
console.groupEnd('_MAIN');


let attackList = [];

can.addEventListener('click', e => {
    for (const enemy of enemies) {
        const collisionWith = checkCollisionWith(player1.hitbox, enemy.hitbox);    
        player1.playerAttack(e, collisionWith, enemy, generalTimer, playerAmmunition);
    }
    player1.movingPlayer(e.offsetX, e.offsetY, e);
});

can.addEventListener('contextmenu', e => {
    e.preventDefault();
    for (const enemy of enemies) {
        const collisionWith = checkCollisionWith(player1.hitbox, enemy.hitbox);
        player1.playerAttack(e, collisionWith, enemy, generalTimer, playerAmmunition);
        break;
    }
});

document.addEventListener('keyup', e => {
    for (const enemy of enemies) {
        const collisionWith = checkCollisionWith(player1.hitbox, enemy.hitbox);
        if (player1.weapon.type === 'melee') {
            player1.playerAttack(e, collisionWith, enemy, generalTimer);
        }
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
            }
        } 
    } else if (e.keyCode === 84) {
        //enemy1 = new Enemy(20, 600, 50, 65, 40, trialWeapon1, new Hitbox(undefined, undefined, 50, 65), 2, 1, 'gold', 4);
    } else if (e.keyCode === 73) {
        playerInvetory.show = !playerInvetory.show;
    }
}); 

function drawAll(){
    ctx.clearRect(0, 0, canWidth,canHeight);
    for (const enemy of enemies) {
        enemy.drawEnemy(ctx, 'red');
    }
    player1.drawPlayer(ctx);
    for (const bullet of bullets) { 
        bullet.drawBullet(ctx);
    }
    for (const chest of gameChests.chests) { 
        chest.drawChest(ctx);
    }
    playerInvetory.drawInvetory(ctx, drawTextManyLines);
    requestAnimationFrame(drawAll);
    drawText(15,20,menuUi[0]+player1.hp, 'black', 23);
    drawText(15,40,menuUi[1]+player1.weapon.name);
    drawText(15,60,menuUi[2]+langConvert(player1.weapon.type, gameLanguage));
    if (player1.weapon.type === 'distance') {
        drawText(15, 85, player1.weapon.distanceOptions[0] + '/' + player1.weapon.distanceOptions[1] + '  ' + player1.ammunition[actalIdOfAmmunition][1]);
        if (player1.weapon.distanceOptions[2]) {
            drawText(15, 105, menuUi[3]);
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

function drawTextManyLines(textX, textY, textToDisplay, fontColor, fontSize, fontFamily = 'Monospace', lines, optionalTextAdds = 0) {
    let counterY = textY;
    for (let i = 0; i < lines; i++) {
        if (optionalTextAdds === 'Invetory/content') {
            drawText(textX, counterY, langConvert(textToDisplay[i].content, gameLanguage), fontColor, fontSize, fontFamily);
        } else {
            drawText(textX, counterY, textToDisplay[i], fontColor, fontSize, fontFamily);
        }
        counterY += fontSize + 2;
    }
}

function gameLoop() {
    const {
        listOfTicks
    } = generalTimer;

    updateHitboxs();

    for (const enemy of enemies) {
        if (enemy.aiState !== 'dodge') {
            //console.log('1:' + enemy.aiState, '2:' + enemy.secondAiState);
            if (enemy.weapon.type === 'distance' && enemy.aiState !== 'shooting') {
                enemy.secondAiState = 'icanshoot?';
            }
            if (checkCollisionWith(player1.hitbox, enemy.hitbox) && enemy.weapon.type === 'melee') {
                if (enemy.aiState != 'toattack') {
                    generalTimer.listOfTicks.push(new Tick('EnemyLightAttack EnemyId:' + enemy.id, generalTimer.generalGameTime, generalTimer.generalGameTime + enemy.weapon.speedLightAttack));
                    console.log('ADD');
                }
                enemy.aiState = 'toattack';
            } else {
                if (enemy.weapon.type === 'distance' && enemy.aiState !== 'shooting') {
                    enemy.aiState = 'quest';
                } else if (enemy.weapon.type !== 'distance') {
                    enemy.aiState = 'quest';
                }
                
                for (const tick of listOfTicks) {
                    if (enemy.weapon.type === 'melee' && tick.nameOfTick === 'EnemyLightAttack EnemyId:' + enemy.id && !tick.done) {
                        console.log(tick);
                        //console.log('The Tick Of Attack Enemy Has Be Taged: "old".');
                        tick.old = true;
                        break;
                    }
                }
            }
        }
    }

    for (const bullet of bullets) {
        if (bullet.hitbox != null) {
            for (const enemy of enemies) {
                //console.log(bullet.owner);
                if (checkCollisionWith(bullet.hitbox, enemy.hitbox) && enemy.hitboxActive && bullet.owner === 'player') {
                    const givenDmg = Math.floor(Math.random() * (bullet.maxDmg - bullet.minDmg + 1) + bullet.minDmg);
                    enemy.hp -= givenDmg;
                    bullets.splice(bullet, 1);
                }
            }
            if (checkCollisionWith(bullet.hitbox, player1.hitbox) && bullet.owner.substr(0,5) === 'enemy') {
                const givenDmg = Math.floor(Math.random() * (bullet.maxDmg - bullet.minDmg + 1) + bullet.minDmg);
                player1.hp -= givenDmg;
                bullets.splice(bullet, 1);
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
    for (const enemy of enemies) {
        if (enemy.hitboxActive) {
            enemy.hitbox.x = enemy.x;   
            enemy.hitbox.y = enemy.y; 
        }
    }
}

function enemyLoop() {
    for (const enemy of enemies) {
        enemy.enemyAi(attackList, player1, generalTimer, gameChests, bullets);    
    }
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
            rawData[9] = rawData[9].substring(6); //owner
            console.log(rawData[9]);

            bullets.push(new Bullet(rawData[0], rawData[1], rawData[2], rawData[3],
                new Hitbox(rawData[0], rawData[1], rawData[2], rawData[3]), rawData[4], rawData[5], rawData[6], rawData[7], rawData[8], 560, rawData[9]));

            tick.old = true;
            for (const bullet of bullets) {
                if (bullet.owner === 'player') {
                    bullet.checkTheDirection(player1);
                } else {
                    for (const enemy of enemies) {
                        if (enemy.id === Number(bullet.owner.substr(8))) {
                            bullet.checkTheDirection(enemy);
                        }
                    }
                }
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