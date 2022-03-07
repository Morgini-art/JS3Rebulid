let playerX = 250;
let playerY = 250;
let playerTargetX;
let playerTargetY;
let playerIsMovingX = false;
let playerIsMovingY = false;
let playerMovingSpeed = 5;
let playerMovingDirectionAxisX;
let playerMovingDirectionAxisY;

export {
    playerX,
    playerY,
    drawPlayer,
    movingPlayer
};

function drawPlayer(ctx) {
    ctx.fillStyle = 'green';
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
<<<<<<< HEAD

    console.log('TargetX: ' + playerTargetX, playerTargetY, playerX, playerY);
=======
>>>>>>> parent of 193baf7 (PATCH 0.0.2 FOR Version: 1.0.1)
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
<<<<<<< HEAD
            playerX += playerMovingSpeed;
            if (playerX > playerTargetX && playerX > playerTargetX) {
=======
            if (playerX != playerTargetX) {
                playerX += playerMovingSpeed;
            }
            if (playerX == playerTargetX || playerX >= playerTargetX || playerX >= 780) {
>>>>>>> parent of 193baf7 (PATCH 0.0.2 FOR Version: 1.0.1)
                playerIsMovingX = false;
            }
        }
    }
<<<<<<< HEAD
=======

>>>>>>> parent of 193baf7 (PATCH 0.0.2 FOR Version: 1.0.1)
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
<<<<<<< HEAD
            playerY += playerMovingSpeed;
=======
            if (playerY !== playerTargetY) {
                playerY += playerMovingSpeed;
            }
>>>>>>> parent of 193baf7 (PATCH 0.0.2 FOR Version: 1.0.1)
            if (playerY === playerTargetY || playerY >= playerTargetY || playerY >= 630) {
                playerIsMovingY = false;
            }
        }
    }
}

setInterval(playerMove, 35);