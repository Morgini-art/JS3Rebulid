import {Creature} from './lib/creature.js';
import {Hitbox} from './hitbox.js';

class Player extends Creature{
    constructor(x, y, width, height, hitbox, weapon, hp, movingSpeed, ammunition, magicEnergy) {
        super(x, y, width, height, hitbox, weapon, hp ,movingSpeed);
        this.ammunition = ammunition;
        this.movingDirectionAxisX;
        this.movingDirectionAxisY;
        this.targetX;
        this.targetY;
        this.isMovingX;
        this.isMovingY;
        this.isMovingY;
    }

    drawPlayer(ctx) {
        const {
            x,
            y,
            height,
            width
        } = this;
        ctx.fillStyle = 'green';
        ctx.fillRect(x, y, width, height);
    }

    movingPlayer(layerX, layerY, e) {
        const {
            x,
            y,
            targetX,
            targetY,
            movingDirectionAxisX,
            movingDirectionAxisY,
            isMovingX,
            isMovingY
        } = this;

        if (!e.ctrlKey) {
            this.movingDirectionAxisX = (x > layerX) ? this.movingDirectionAxisX = 'Left' : this.movingDirectionAxisX = 'Right';
            this.targetX = layerX;

            this.movingDirectionAxisY = (y > layerY) ? this.movingDirectionAxisY = 'Up' : this.movingDirectionAxisY = 'Down';
            this.targetY = layerY;

            this.isMovingX = true;
            this.isMovingY = true;
        }
    }

    playerMove() {

        const {
            x,
            y,
            targetX,
            targetY,
            movingDirectionAxisX,
            movingDirectionAxisY,
            isMovingX,
            isMovingY,
            movingSpeed
        } = this;
        
        if (isMovingX) {
            if (movingDirectionAxisX === 'Left') {
                this.x -= movingSpeed;
                if (x == targetX || x <= targetX || x <= 0) {
                    this.isMovingX = false;
                }
            } else if (movingDirectionAxisX === 'Right') {
                this.x += movingSpeed;
                if (x == targetX || x >= targetX || x >= 1150) {
                    this.isMovingX = false;
                }
            }
        }

        if (isMovingY) {
            if (movingDirectionAxisY === 'Up') {
                this.y -= movingSpeed;
                if (y === targetY || y <= targetY || y <= 0) {
                    this.isMovingY = false;
                }
            } else if (movingDirectionAxisY === 'Down') {
                this.y += movingSpeed;
                if (y === targetY || y >= targetY || y >= 730) {
                    this.isMovingY = false;
                }
            }
        }
    }

    playerAttack(e, collision, objective, generalTimer, playerAmmunition) {
        const {weapon, ammunition} = this;
        //console.log('CTRL:',e.ctrlKey, collision);
        //console.log('Key Code: ' + e.key, 'Type: '+weapon.type);
        //console.log(collision);
        if (e.key === 'q' && collision && weapon.type === 'melee') {
            weapon.attack(this, objective, generalTimer);
        } else if (!collision && weapon.type === 'distance' && e.button === 2) {
            weapon.attack(this, objective, generalTimer, e, ammunition, 'player');
        }
    }

}

export {
    Player
};