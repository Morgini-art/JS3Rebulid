function Enemy(enemyX, enemyY, enemyWidth, enemyHeight, enemyHp, enemyObjectiveX, enemyObjectiveY, enemySpeed, enemyDefendChance,
    enemyMinDmg, enemyMaxDmg, enemyDrop, enemyDropAmount, enemyIsAlive = true, enemyAiState = 'none', enemyWalkingDirection = 'none') {
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
    this.enemyWalkingDirection = enemyWalkingDirection;
    //Wszystkich argumentów 16
}

function drawEnemy(ctx ,enemyX, enemyY) {
    ctx.fillStyle = 'red';
    ctx.fillRect(enemyX, enemyY, 50, 65);
}

export {Enemy,drawEnemy,enemyWherePlayer};
import {playerX, playerY} from './player.js';

function enemyWherePlayer(enemyObject) {
    
    enemyObject.enemyWalkingDirection = (playerX > enemyObject.enemyX) ? enemyObject.enemyWalkingDirection = 'Left' : enemyObject.enemyWalkingDirection = 'Right';
    enemyObject.enemyObjectiveX = playerX;
    
    console.log(enemyObject.enemyWalkingDirection, enemyObject.enemyObjectiveX);
//    if (x < EX) {
//        ELEFT = "here";
//        ERIGHT = "none";
//        EDX = 4;
//        EobjectiveX = x;
//        EnemyIMG = ENEMY_CHARACTER_LEFT_IMG;
//    }
//    if (EX < x) {
//        ELEFT = "none";
//        ERIGHT = "here";
//        EDX = 4;
//        EobjectiveX = x;
//        //console.log("Right!");
//    }
//    if (y > EY) {
//
//
//        EUP = "none";
//        EDOWN = "here";
//        EDY = 5;
//        //console.log("down");
//
//        EobjectiveY = y;
//    }
//
//
//    if (y < EY) {
//
//        EUP = "here";
//        EDOWN = "none";
//        EDY = 5;
//
//        //console.log("up");
//        EobjectiveY = y;
//
//    }

}