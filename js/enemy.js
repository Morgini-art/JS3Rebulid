import {trialEnemyAttackTime, generalTimer} from './main.js';
import {Tick} from './lib/time.js';
export {Enemy};

class Enemy {
    constructor(x, y, width, height, hp, speed, defendChance, minDmg, maxDmg, drop, dropAmount, weapon) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hp = hp;
        this.objectiveX;
        this.objectiveY;
        this.speed = speed;
        this.defendChance = defendChance;
        this.minDmg = minDmg;
        this.maxDmg = maxDmg;
        this.drop = drop;
        this.dropAmount = dropAmount;
        //Niewymagane argumenty
        this.isAlive = true;
        this.aiState = 'quest';
        this.walkingDirectionX = 'none';
        this.walkingDirectionY = 'none';
        this.attackTime;
        //Wszystkich argumentów 17
    }

    drawEnemy(ctx) {
        const {
            x,
            y,
            width,
            height
        } = this;
        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, width, height);
    }
    
    wherePlayer(playerObject) {
        const {
            x,
            y
        } = this;

        if (playerObject.x > x) {
            this.walkingDirectionX = 'Right';
            this.objectiveX = playerObject.x;
        } else {
            this.walkingDirectionX = 'Left';
            this.objectiveX = playerObject.x;
        }

        if (playerObject.y > y) {
            this.walkingDirectionY = 'Down';
            this.objectiveY = playerObject.y;
        } else {
            this.walkingDirectionY = 'Up';
            this.objectiveY = playerObject.y;
        }
    }
    
    moveToPlayer(playerObject) {
        const {
            x,
            y,
            walkingDirectionX,
            walkingDirectionY,
            speed
        } = this;
        
        if (walkingDirectionX === 'Left' && x != playerObject.x) {
            this.x -= speed;
        } else if (walkingDirectionX === 'Right' && x != playerObject.x) {
            this.x += speed;
        }

        if (walkingDirectionY === 'Up' && y != playerObject.y) {
            this.y -= speed;
        } else if (walkingDirectionY === 'Down' && y != playerObject.y) {
            this.y += speed;
        }
    }
    
    enemyAi(attackList, playerObject, generalTimer) {
        const {
            attackTime,
            isAlive,
            aiState
        } = this;
        
        if (isAlive) {
            this.wherePlayer(playerObject);
            if (aiState === 'quest') {
                this.moveToPlayer(playerObject);
                attackList.pop();
            } else if (aiState === 'toattack') {
                if (attackList[attackList.length - 1] == null) {
                    attackList.push('EnemyLightAttack');
                }
                /*
                if (generalTimer.listOfTicks[0].done == true) {
                    generalTimer.listOfTicks.pop();
                    attackList.pop();
                    console.log('Attack!');
                    //generalTimer.listOfTicks.push('EnemyLightAttack', generalTimer.generalGameTime, enemyObject.enemyWeapon.weaponSpeedLightAttack);
                    console.log(generalTimer.listOfTicks[0]);
                }*/
                console.log(generalTimer.listOfTicks);
            }
        }
    }
}