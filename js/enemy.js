import {Creature} from './lib/creature.js';
import {generalTimer} from './main.js';
import {Tick} from './lib/time.js';
import {drawText} from './main.js';
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

    drawEnemy(ctx, color) {
        const {
            x,
            y,
            width,
            height
        } = this;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
        
        drawText(x+5,y-5,'Hp:'+this.hp, 'black',17);
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
    
    enemyAi(attackList, playerObject, generalTimer) {
        const {
            isAlive,
            aiState,
            weapon
        } = this;

        const {
            listOfTicks
        } = generalTimer;

        if (isAlive) {
            this.wherePlayer(playerObject);
            if (aiState === 'quest') {
                this.moveToPlayer(playerObject);
                attackList.pop();
                //generalTimer.listOfTicks.pop();
                //console.log('The Last Tick has be deleted');

            } else if (aiState === 'toattack') {
                if (attackList[attackList.length - 1] !== 'EnemyLightAttack') {
                    attackList.push('EnemyLightAttack');
                }
                var attackIs = false;

                //Szukanie ataku i jeżeli jest na liście atak i jest on skończony i nie stary to wykonaj atak:
                while (!attackIs) {
                    for (let i = 0; i < listOfTicks.length; i++) {
                        if (listOfTicks[i].nameOfTick === 'EnemyLightAttack') {
                            if (listOfTicks[i].done && !listOfTicks[i].old) {//Jeśli skończony i nie stary:
                                attackList.pop();
                                console.log('Attack!');
                                this.weapon.attack(this, playerObject, generalTimer);   

                                generalTimer.listOfTicks.push(new Tick('EnemyLightAttack', generalTimer.generalGameTime, generalTimer.generalGameTime + this.weapon.speedLightAttack));

                                //console.log(generalTimer.listOfTicks);
                                listOfTicks[i].old = true;
                                
                                attackIs = true;
                                i += listOfTicks.length + 1;
                            }
                            attackIs = true;
                        }
                    }
                }
            }
        }
    }
}