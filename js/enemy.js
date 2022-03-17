import {playerX, playerY, playerLife} from './player.js';
import {trialEnemyAttackTime} from './main.js';
export {Enemy,drawEnemy,enemyWherePlayer,enemyMoveToPlayer,enemyAi};

class Enemy {
    constructor(enemyX, enemyY, enemyWidth, enemyHeight, enemyHp,enemySpeed, enemyDefendChance, enemyMinDmg, enemyMaxDmg, enemyDrop, enemyDropAmount,enemyWeapon) {
        this.enemyX = enemyX;
        this.enemyY = enemyY;
        this.enemyWidth = enemyWidth;
        this.enemyHeight = enemyHeight;
        this.enemyHp = enemyHp;
        this.enemyObjectiveX
        this.enemyObjectiveY
        this.enemySpeed = enemySpeed;
        this.enemyDefendChance = enemyDefendChance;
        this.enemyMinDmg = enemyMinDmg;
        this.enemyMaxDmg = enemyMaxDmg;
        this.enemyDrop = enemyDrop;
        this.enemyDropAmount = enemyDropAmount;
        //Niewymagane argumenty
        this.enemyIsAlive = true;
        this.enemyAiState = 'quest';
        this.enemyWalkingDirectionX = 'none';
        this.enemyWalkingDirectionY = 'none';
        this.enemyAttackTime;
        //Wszystkich argumentów 17
    }
}

function drawEnemy(ctx ,enemyX, enemyY) {
    ctx.fillStyle = 'red';
    ctx.fillRect(enemyX, enemyY, 50, 65);
}

function enemyWherePlayer(enemyObject, playerObject) {
    
    if (playerObject.playerX > enemyObject.enemyX) {
        enemyObject.enemyWalkingDirectionX = 'Right';
        enemyObject.enemyObjectiveX = playerObject.playerX;
    } else {
        enemyObject.enemyWalkingDirectionX = 'Left';
        enemyObject.enemyObjectiveX = playerObject.playerX;
    }

    if (playerObject.playerY > enemyObject.enemyY) {
        enemyObject.enemyWalkingDirectionY = 'Down';
        enemyObject.enemyObjectiveY = playerObject.playerY;
    } else {
        enemyObject.enemyWalkingDirectionY = 'Up';
        enemyObject.enemyObjectiveY = playerObject.playerY;
    }
}

function enemyMoveToPlayer(enemyObject, playerObject) {
    if (enemyObject.enemyWalkingDirectionX === 'Left' && enemyObject.enemyX != playerObject.playerX) {
        enemyObject.enemyX -= enemyObject.enemySpeed;
    } else if (enemyObject.enemyWalkingDirectionX === 'Right' && enemyObject.enemyX != playerObject.playerX) {
        enemyObject.enemyX += enemyObject.enemySpeed;
    }

    if (enemyObject.enemyWalkingDirectionY === 'Up' && enemyObject.enemyY != playerObject.playerY) {
        enemyObject.enemyY -= enemyObject.enemySpeed;
    } else if (enemyObject.enemyWalkingDirectionY === 'Down' && enemyObject.enemyY != playerObject.playerY) {
        enemyObject.enemyY += enemyObject.enemySpeed;
    }
}

function enemyAi(enemyObject, attackList, attackTime1, playerLife, playerObject) {
    var attackTime = enemyObject.enemyAttackTime;
    if (enemyObject.enemyIsAlive) {
        enemyWherePlayer(enemyObject, playerObject);
        if (enemyObject.enemyAiState === 'quest') {
            enemyMoveToPlayer(enemyObject, playerObject);
            attackList.pop();
        } else if (enemyObject.enemyAiState === 'toattack') {
            if (attackList[attackList.length - 1] == null) {
                attackList.push('EnemyLightAttack');
            }
            if (attackTime <= 0) {
                attackList.pop();
                //console.log('Attack!');
                playerLife = 2;
                enemyObject.enemyAttackTime = enemyObject.enemyWeapon.weaponSpeedLightAttack;
            }
        }
    }
}