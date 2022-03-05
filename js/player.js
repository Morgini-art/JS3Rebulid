let playerX = 250;
let playerY = 250;
let playerTargetX;
let playerTargetY;
let playerIsMovingX = false;
let playerIsMovingY = false;
let playerMovingSpeed = 5;
let playerMovingDirectionAxisX;
let playerMovingDirectionAxisY;

export {playerX, playerY, drawPlayer, movingPlayer};

function drawPlayer(ctx) {
    ctx.fillRect(playerX, playerY, 50, 65);
}

function movingPlayer(layerX, layerY) {
//    console.log('Click: x:', layerX, 'y:', layerY);

    //AxisX
    playerMovingDirectionAxisX = (playerX > layerX) ? playerMovingDirectionAxisX = 'Left' : playerMovingDirectionAxisX = 'Right';
    playerTargetX = layerX;
    //AxisX
    //AxisY
    playerMovingDirectionAxisY = (playerY > layerY) ? playerMovingDirectionAxisY = 'Up' : playerMovingDirectionAxisY = 'Down';
    playerTargetY = layerY;
    //AxisY
    playerIsMovingX = true;
    playerIsMovingY = true;
}

function playerMove() {
    if (playerIsMovingX) {
        if (playerMovingDirectionAxisX === 'Left') {
            if (playerX != playerTargetX) {
                playerX -= playerMovingSpeed;
            }
            if (playerX == playerTargetX || playerX <= playerTargetX || playerX <= 0) {
                playerIsMovingX = false;
            }
        }
        if (playerMovingDirectionAxisX === 'Right') {
            if (playerX != playerTargetX) {
                playerX += playerMovingSpeed;
            }
            if (playerX == playerTargetX || playerX >= playerTargetX || playerX >= 780) {
                playerIsMovingX = false;
            }
        }
    }

    if (playerIsMovingY) {
        if (playerMovingDirectionAxisY === 'Up') {
            if (playerY != playerTargetY) {
                playerY -= playerMovingSpeed;
            }
            if (playerY === playerTargetY || playerY <= playerTargetY || playerY <= 0) {
                playerIsMovingY = false;
            }
        }
        if (playerMovingDirectionAxisY === 'Down') {
            if (playerY !== playerTargetY) {
                playerY += playerMovingSpeed;
            }
            if (playerY === playerTargetY || playerY >= playerTargetY || playerY >= 630) {
                playerIsMovingY = false;
            }
        }
    }
}

setInterval(playerMove, 35);