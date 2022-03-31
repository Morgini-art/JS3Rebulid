import {generalTimer} from './main.js';
import {Tick} from './lib/time.js';
export {Enemy};

//new Enemy(x:580,y:30,w:50,h:65,hp:35,speed:4,defendChance:1,drop:8,dropamount:10,weapon:trialWeapon1);

//new Enemy(580,30,50,65,35,4,1,'gold',4,trialWeapon1);
class Enemy {
    constructor(x, y, width, height, hp, speed, defendChance, drop, dropAmount, weapon) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hp = hp;
        this.objectiveX;
        this.objectiveY;
        this.speed = speed;
        this.defendChance = defendChance;
        this.drop = drop;
        this.dropAmount = dropAmount;
        this.weapon = weapon;
        //Niewymagane argumenty
        this.isAlive = true;
        this.aiState = 'quest';
        this.walkingDirectionX = 'none';
        this.walkingDirectionY = 'none';
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
                console.log('The Last Tick has be deleted');

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