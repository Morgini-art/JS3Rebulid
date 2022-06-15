import {Creature} from './lib/creature.js';
import {generalTimer} from './main.js';
import {Tick} from './lib/time.js';
import {drawText} from './main.js';
import {Chest} from './chest.js';
import {Hitbox} from './hitbox.js';
export {Enemy};

class Enemy extends Creature {
    constructor(id, x, y, width, height, hitbox, weapon, hp, movingSpeed, defendChance, drop, dropAmount, inteligence, ammunition) {
        super(x, y, width, height, hitbox, weapon, hp, movingSpeed);
        this.id = id;
        this.objectiveX;
        this.objectiveY;
        this.defendChance = defendChance;
        this.drop = drop;
        this.dropAmount = dropAmount;
        this.inteligence = inteligence;

        this.isAlive = true;
        this.aiState = 'quest';
        this.secondAiState = 'none';
        this.walkingDirectionX = 'none';
        this.walkingDirectionY = 'none';
        this.hitboxActive = true;
        this.levelOfThreat = 0;
        this.ammunition = ammunition;
    }

    drawEnemy(ctx, color) {
        const {
            x,
            y,
            width,
            height,
            isAlive
        } = this;
        ctx.fillStyle = color;
        if (!isAlive) {
            ctx.fillStyle = 'black';
        } else {
            ctx.fillRect(x, y, width, height);
            drawText(x + 5, y - 5, 'Hp:' + this.hp + ' ' + this.id, 'black', 17);
        }
    }

    wherePlayer(playerObject) {
        const {
            x,
            y,
            aiState
        } = this;

        if (aiState === 'quest') {
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
    
    moveTo(generalTimer) {
        const {
            x,
            y,
            walkingDirectionX,
            walkingDirectionY,
            movingSpeed,
            aiState
        } = this;
        
        let bonusSpeed = 1;
        if (aiState === 'dodge') {
            bonusSpeed = 1.5;
        }

        if (walkingDirectionX === 'Left') {
            this.x -= movingSpeed;
        } else if (walkingDirectionX === 'Right') {
            this.x += movingSpeed;
        }

        if (walkingDirectionY === 'Up') {
            this.y -= movingSpeed * bonusSpeed;
            if (this.y <= this.objectiveY) {
                this.walkingDirectionY = 'None';
                this.aiState = 'quest';
                this.secondAiState = 'none';
                this.deleteLastReloadingTick(generalTimer);
            }
        } else if (walkingDirectionY === 'Down') {
            this.y += movingSpeed * bonusSpeed;
            if (this.y < this.objectiveY) {
                this.walkingDirectionY = 'None';
                this.aiState = 'quest';
                this.secondAiState = 'none';
                this.deleteLastReloadingTick(generalTimer);
            }
        }
    }
    
    deleteLastReloadingTick(generalTimer) {
        for (const thisTick of generalTimer.listOfTicks) {
            if (thisTick.nameOfTick === 'Reloading Enemy Distance Weapon EnemyId:' + this.id) {
                if (thisTick.done && !thisTick.old) {
                    thisTick.old = true;
                    console.log(thisTick.old);
                    break;
                }
            }
        }
    }

    afterDeath(chests) {
        this.isAlive = false;
        const {
            x,
            y,
            drop,
            dropAmount
        } = this;
        chests.chests.push(new Chest(x, y, 30, 30, new Hitbox(x, y, 30, 30), drop));
        console.log(chests);
        this.hitboxActive = false;
    }

    threats(bullets, playerObject) {
        const {
            x,
            y,
            width,
            height
        } = this;
        this.levelOfThreat = 0;
        let xAxis = false;
        let yAxis = false;
        let distance = false;

        //BulletThreats
        if (this.inteligence >= 1) {
            //console.log(this.levelOfThreat);
            for (const bullet of bullets) {
                if (bullet.owner === 'player') {
                    if (bullet.movingDirectionAxisX === 'Left' && bullet.x > x ||
                        bullet.movingDirectionAxisX === 'Right' && bullet.x < x) {
                        this.levelOfThreat += 1;
                        xAxis = true;
                    }
                    if (bullet.x - x <= 0) {
                        if (bullet.distance >= x - bullet.x - 25) {
                            this.levelOfThreat += 1;
                            distance = true;
                        }
                    } else {
                        if (bullet.distance >= bullet.x - x - 25) {
                            this.levelOfThreat += 1;
                            distance = true;
                        }
                    }
                    if (bullet.movingDirectionAxisY === 'Up' && bullet.y > y ||
                        bullet.movingDirectionAxisY === 'Down' && bullet.y < y ||
                        bullet.movingDirectionAxisY === 'None' && distance) {
                        this.levelOfThreat += 1;
                        yAxis = true;
                    }
                    if (distance && xAxis && bullet.movingDirectionAxisY === 'None') {
                        this.levelOfThreat += 1;
                    }
                    if (this.levelOfThreat >= 3) {
                        /*this.x = playerObject.x + playerObject.width * 2;
                        this.y = playerObject.y + playerObject.height * 2;*/
                        this.aiState = 'dodge';
                        if (bullet.movingDirectionAxisY === 'Down') {
                            this.objectiveY = y - height * 1.2;
                            this.walkingDirectionY = 'Up';
                        } else if (bullet.movingDirectionAxisY === 'Up') {
                            this.objectiveY = y + height * 1.2;
                            this.walkingDirectionY = 'Down';
                        } else {
                            this.objectiveY = y + height;
                            this.walkingDirectionY = 'Down';
                        }
                    }
                }

            }
        }
        //BulletThreats
    }
    
    checkCanShoot(playerObject, generalTimer) {
        const {x, y, weapon, ammunition, secondAiState} = this;
        const {x2, y2} = playerObject;
        //250 < x2
        if (x < playerObject.x) {
            //I am a left side from player
            if (weapon.distance >= (y - playerObject.y) + (playerObject.x - x) - 50) {
                this.aiState = 'shooting';
            } else {
                this.aiState = 'quest';
                this.secondAiState = 'none';
                this.deleteLastReloadingTick(generalTimer);
            }
        } else if (x > playerObject.x) {
            //I am a right side from player
            if (weapon.distance >= (playerObject.y - y) + (x - playerObject.x) - 50) {
                this.aiState = 'shooting';
            } else {
                this.aiState = 'quest';
                this.secondAiState = 'none';
                this.deleteLastReloadingTick(generalTimer);
            }
        }
    }
    
    enemyAi(attackList, playerObject, generalTimer, chests, bullets) {
        const {
            isAlive,
            aiState,
            secondAiState,
            weapon,
            hp,
            ammunition
        } = this;

        const {
            listOfTicks
        } = generalTimer;
        //console.log(secondAiState);
        if (hp <= 0) {
            if (isAlive) {
                this.afterDeath(chests);
            }
            this.isAlive = false;
        } else {
            if (isAlive) {
                this.threats(bullets, playerObject);
                this.wherePlayer(playerObject);
                if (aiState === 'quest') {
                    this.moveToPlayer(playerObject);
                    attackList.pop();
                } else if (aiState === 'dodge') {
                    this.moveTo(generalTimer);
                } else if (aiState === 'toattack') {
                    if (weapon.type === 'melee') {
                        let attackIs = false;
                        //Szukanie ataku i jeżeli jest na liście atak i jest on skończony i nie stary to wykonaj atak:
                        while (!attackIs) {
                            for (let i = 0; i < listOfTicks.length; i++) {
                                console.log('WOWOOW!');
                                if (listOfTicks[i].nameOfTick === 'EnemyLightAttack EnemyId:' + this.id) {
                                    if (listOfTicks[i].done && !listOfTicks[i].old) { //Jeśli skończony i nie stary:
                                        attackList.pop();
                                        this.weapon.attack(this, playerObject, generalTimer);

                                        generalTimer.listOfTicks.push(new Tick('EnemyLightAttack EnemyId:' + this.id, generalTimer.generalGameTime, generalTimer.generalGameTime + this.weapon.speedLightAttack));

                                        listOfTicks[i].old = true;

                                        attackIs = true;
                                        i += listOfTicks.length + 1;
                                    }
                                    attackIs = true;
                                }
                            }
                        }
                    }
                    if (attackList[attackList.length - 1] !== 'EnemyLightAttack EnemyId:' + this.id) {
                        attackList.push('EnemyLightAttack' + this.id);
                    }
                } 
                if (aiState === 'shooting' && secondAiState === 'icanshoot?') {
                    this.secondAiState = 'reloading';   
                }
                if (secondAiState === 'icanshoot?') {
                    this.checkCanShoot(playerObject, generalTimer);
                } else if (secondAiState === 'waitforreaload') {
                    for (const thisTick of listOfTicks) {
                        if (thisTick.nameOfTick === 'Reloading Enemy Distance Weapon EnemyId:' + this.id) {
                            if (thisTick.done && !thisTick.old) {
                                this.secondAiState = 'shoot';
                                thisTick.old = true;
                                console.log(listOfTicks);
                                this.checkCanShoot(playerObject, generalTimer);
                                break;
                            }
                        } 
                    }
                    
                } else if (secondAiState === 'shoot' && aiState === 'shooting') {
                    weapon.attack(this, playerObject, generalTimer, undefined, ammunition, 'enemy');
                    this.secondAiState = 'reloading';
                }  else if (secondAiState === 'reloading' && aiState === 'shooting') {
                    generalTimer.listOfTicks.push(new Tick('Reloading Enemy Distance Weapon EnemyId:' + this.id, generalTimer.generalGameTime, generalTimer.generalGameTime + 500));
                    this.secondAiState = 'waitforreaload';
//                    this.checkCanShoot(playerObject, generalTimer);
                }
            }
        }
    }
}