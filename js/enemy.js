import {playerX, playerY} from './player.js';
export {Enemy,drawEnemy,enemyWherePlayer,enemyMoveToPlayer};

class Enemy {
    constructor(enemyX, enemyY, enemyWidth, enemyHeight, enemyHp, enemyObjectiveX, enemyObjectiveY, enemySpeed, enemyDefendChance,
        enemyMinDmg, enemyMaxDmg, enemyDrop, enemyDropAmount, enemyIsAlive = true, enemyAiState = 'none', enemyWalkingDirectionX = 'none', enemyWalkingDirectionY = 'none') {
        this.enemyX = enemyX;
        this.enemyY = enemyY;
        this.enemyWidth = enemyWidth;
        this.enemyHeight = enemyHeight;
        this.enemyHp = enemyHp;
        this.enemyObjectiveX = enemyObjectiveX;
        this.enemyObjectiveY = enemyObjectiveY;
        this.enemySpeed = enemySpeed;
        this.enemyDefendChance = enemyDefendChance;
        this.enemyMinDmg = enemyMinDmg;
        this.enemyMaxDmg = enemyMaxDmg;
        this.enemyDrop = enemyDrop;
        this.enemyDropAmount = enemyDropAmount;
        //Niewymagane argumenty
        this.enemyIsAlive = enemyIsAlive;
        this.enemyAiState = enemyAiState;
        this.enemyWalkingDirectionX = enemyWalkingDirectionX;
        this.enemyWalkingDirectionY = enemyWalkingDirectionY;
        //Wszystkich argumentów 17
    }
}

function drawEnemy(ctx ,enemyX, enemyY) {
    ctx.fillStyle = 'red';
    ctx.fillRect(enemyX, enemyY, 50, 65);
}

function enemyWherePlayer(enemyObject) {
    
    if (playerX > enemyObject.enemyX) {
        enemyObject.enemyWalkingDirectionX = 'Right';
        enemyObject.enemyObjectiveX = playerX;
    } else {
        enemyObject.enemyWalkingDirectionX = 'Left';
        enemyObject.enemyObjectiveX = playerX;
    }

    if (playerY > enemyObject.enemyY) {
        enemyObject.enemyWalkingDirectionY = 'Down';
        enemyObject.enemyObjectiveY = playerY;
    } else {
        enemyObject.enemyWalkingDirectionY = 'Up';
        enemyObject.enemyObjectiveY = playerY;
    }
}

function enemyMoveToPlayer(enemyObject) {
    if (enemyObject.enemyAiState === 'quest') {
        if (enemyObject.enemyWalkingDirectionX === 'Left' && enemyObject.enemyX != playerX) {
            enemyObject.enemyX -= enemyObject.enemySpeed;
        } else if (enemyObject.enemyWalkingDirectionX === 'Right' && enemyObject.enemyX != playerX) {
            enemyObject.enemyX += enemyObject.enemySpeed;
        }
        
        if (enemyObject.enemyWalkingDirectionY === 'Up' && enemyObject.enemyY != playerY) {
            enemyObject.enemyY -= enemyObject.enemySpeed;
        } else if (enemyObject.enemyWalkingDirectionY === 'Down' && enemyObject.enemyY != playerY) {
            enemyObject.enemyY += enemyObject.enemySpeed;
        }
    }
    
}

//function ColisionWithPlayer()
//    {
//        if(x + szer < EX||
//             EX + ESZER < x||
//             y  + wys < EY||
//            EY + EWYS < y)
//            {
//                ESTATE = "quest";
//                ESTATE2 = "none";
//                kolizja = false;
//            }
//        else
//        {
//            kolizja = true;
//            if(ESTATE2!="attack" && ESTATE2!="wait")
//            {
//                ESTATE2 = "readyattack";
//                //console.log(ESTATE);
//            }
//                
//        }
//    }
//    var kolizja = false;