import {
    Hitbox
} from './hitbox.js';

class Player {
    constructor(playerX, playerY, playerWidth, playerHeight, playerMovingSpeed, playerHitbox, playerWeapon, playerLife) {
        this.playerX = playerX;
        this.playerY = playerY;
        this.playerWidth = playerWidth;
        this.playerHeight = playerHeight;
        this.playerHeight = playerHeight;
        this.playerMovingSpeed = playerMovingSpeed;
        this.playerHitbox = playerHitbox;
        this.playerWeapon = playerWeapon;
        this.playerLife = playerLife;
        this.playerMovingDirectionAxisX;
        this.playerMovingDirectionAxisY;
        this.playerTargetX;
        this.playerTargetY;
        this.playerIsMovingX;
        this.playerIsMovingY;
    }

    drawPlayer(ctx) {
        const {
            playerX,
            playerY,
            playerHeight,
            playerWidth
        } = this;
        ctx.fillStyle = 'green';
        ctx.fillRect(playerX, playerY, playerHeight, playerWidth);
    }

    movingPlayer(layerX, layerY) {
        const {
            playerX,
            playerY,
            playerTargetX,
            playerTargetY,
            playerMovingDirectionAxisX,
            playerMovingDirectionAxisY,
            playerIsMovingX,
            playerIsMovingY
        } = this;

        this.playerMovingDirectionAxisX = (playerX > layerX) ? this.playerMovingDirectionAxisX = 'Left' : this.playerMovingDirectionAxisX = 'Right';
        this.playerTargetX = layerX;

        this.playerMovingDirectionAxisY = (playerY > layerY) ? this.playerMovingDirectionAxisY = 'Up' : this.playerMovingDirectionAxisY = 'Down';
        this.playerTargetY = layerY;

        this.playerIsMovingX = true;
        this.playerIsMovingY = true;

    }

    playerMove() {

        const {
            playerX,
            playerY,
            playerTargetX,
            playerTargetY,
            playerMovingDirectionAxisX,
            playerMovingDirectionAxisY,
            playerIsMovingX,
            playerIsMovingY,
            playerMovingSpeed
        } = this;

        if (playerIsMovingX) {
            if (playerMovingDirectionAxisX === 'Left') {
                this.playerX -= playerMovingSpeed;
                if (playerX == playerTargetX || playerX <= playerTargetX || playerX <= 0) {
                    this.playerIsMovingX = false;
                }
            } else if (playerMovingDirectionAxisX === 'Right') {
                this.playerX += playerMovingSpeed;
                if (playerX == playerTargetX || playerX >= playerTargetX || playerX >= 780) {
                    this.playerIsMovingX = false;
                }
            }
        }

        if (playerIsMovingY) {
            if (playerMovingDirectionAxisY === 'Up') {
                this.playerY -= playerMovingSpeed;
                if (playerY === playerTargetY || playerY <= playerTargetY || playerY <= 0) {
                    this.playerIsMovingY = false;
                }
            } else if (playerMovingDirectionAxisY === 'Down') {
                this.playerY += playerMovingSpeed;
                if (playerY === playerTargetY || playerY >= playerTargetY || playerY >= 630) {
                    this.playerIsMovingY = false;
                }
            }
        }
    }

    playerAttack() {

    }

}

export {
    playerWeapon,
    Player
};