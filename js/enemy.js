import {Creature} from './lib/creature.js';
import {generalTimer} from './main.js';
import {Tick} from './lib/time.js';
export {Enemy};

class Enemy extends Creature{
    
    constructor(x, y, width, height, hitbox, weapon, hp, movingSpeed,defendChance,drop,dropAmount) {
        super(x, y, width, height, hitbox, weapon, hp ,movingSpeed);
        this.objectiveX;
        this.objectiveY;
        this.defendChance = defendChance;
        this.drop = drop;
        this.dropAmount = dropAmount;
        
        this.isAlive = true;
        this.aiState = 'quest';
        this.walkingDirectionX = 'none';
        this.walkingDirectionY = 'none';
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
            movingSpeed
        } = this;
        
        if (walkingDirectionX === 'Left' && x != playerObject.x) {
            this.x -= movingSpeed;
        } else if (walkingDirectionX === 'Right' && x != playerObject.x) {
            this.x += movingSpeed;
        }

        if (walkingDirectionY === 'Up' && y != playerObject.y) {
            this.y -= movingSpeed;
        } else if (walkingDirectionY === 'Down' && y != playerObject.y) {
            this.y += movingSpeed;
        }
    }
    
    attackThePlayer(playerObject) {
        const {
            weapon
        } = this;

        const givenDmg = Math.floor(Math.random() * (weapon.maxDmg - weapon.minDmg + 1) + weapon.minDmg);
        playerObject.life -= givenDmg;
    }
    
    enemyAi(attackList, playerObject, generalTimer) {
        const {
            isAlive,
            aiState,
            weapon
        } = this;
        
        if (isAlive) {
            this.wherePlayer(playerObject);
            if (aiState === 'quest') {
                this.moveToPlayer(playerObject);
                attackList.pop();
                generalTimer.listOfTicks.pop();
                //console.log('The Last Tick has be deleted');

            } else if (aiState === 'toattack') {
                if (attackList[attackList.length - 1] == null) {
                    attackList.push('EnemyLightAttack');
                }
                
                if (generalTimer.listOfTicks[0].done === true) {
                    generalTimer.listOfTicks.pop();
                    attackList.pop();
                    console.log('Attack!');
                    this.attackThePlayer(playerObject);
                    
                    generalTimer.listOfTicks.push(new Tick('EnemyLightAttack', generalTimer.generalGameTime, generalTimer.generalGameTime + this.weapon.speedLightAttack));
                }
                //console.log(generalTimer.listOfTicks);
            }
        }
    }
}