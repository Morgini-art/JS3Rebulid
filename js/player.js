import {Creature} from './lib/creature.js';
import {Hitbox} from './hitbox.js';

class Player extends Creature{
    constructor(x, y, width, height, hitbox, weapon, hp, movingSpeed) {
        super(x, y, width, height, hitbox, weapon, hp ,movingSpeed);
        this.movingDirectionAxisX;
        this.movingDirectionAxisY;
        this.targetX;
        this.targetY;
        this.isMovingX;
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

    movingPlayer(layerX, layerY) {
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

        this.movingDirectionAxisX = (x > layerX) ? this.movingDirectionAxisX = 'Left' : this.movingDirectionAxisX = 'Right';
        this.targetX = layerX;

        this.movingDirectionAxisY = (y > layerY) ? this.movingDirectionAxisY = 'Up' : this.movingDirectionAxisY = 'Down';
        this.targetY = layerY;

        this.isMovingX = true;
        this.isMovingY = true;

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
                if (x == targetX || x >= targetX || x >= 780) {
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
                if (y === targetY || y >= targetY || y >= 630) {
                    this.isMovingY = false;
                }
            }
        }
    }

    playerAttack() {

    }

}

export {
    Player
};