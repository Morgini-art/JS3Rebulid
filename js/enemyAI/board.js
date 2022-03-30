import {drawText} from './enemyAImain.js';
export {Board, drawBoard};

class Board {
    unitsOfWorkSpace = [];
    stateCreatingConditions = 'none';
}


function drawBoard(ctx, board, arrayOfAxisY) {
    for (let i = 0; i < board.unitsOfWorkSpace.length; i++) {
        if (board.unitsOfWorkSpace != null) {

            const typeOfUnit = board.unitsOfWorkSpace[i].typeOfUnit;

            if (typeOfUnit === 'basic') {
                ctx.fillStyle = '#c23b2d';
            } else if (typeOfUnit === 'mobility') {
                ctx.fillStyle = '#b57526';
            } else if (typeOfUnit === 'fight') {
                ctx.fillStyle = '#348ebf';
            } else if (typeOfUnit === 'events') {
                ctx.fillStyle = '#ebf52f';
            } else if (typeOfUnit === 'conditions') {
                ctx.fillStyle = '#272394';
            } else if (typeOfUnit === 'variable') {
                ctx.fillStyle = '#96144c';
            } else if (typeOfUnit === 'logical operators') {
                ctx.fillStyle = '#5eeb2f';
            } else if (typeOfUnit === 'free input') {
                ctx.fillStyle = '#ced9d1';
            }

            ctx.fillRect(575, arrayOfAxisY[i] - 5, 150, 50);

            if (board.unitsOfWorkSpace[i].freeText != undefined) {
                drawText(575 + 4, arrayOfAxisY[i] - 5 + 12, board.unitsOfWorkSpace[i].freeText, 'black', 16);
            } else {
               drawText(575 + 4, arrayOfAxisY[i] - 5 + 12, board.unitsOfWorkSpace[i].unitOperation, 'black', 16); 
            }
        }
    }
}