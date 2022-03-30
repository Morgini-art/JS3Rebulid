class Button {
    constructor(x, y, width, height, text, operation, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.operation = operation;
        this.color = color;
    }

    drawButton(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        drawText(this.x + 2, this.y + this.height / 2, this.text, 'black', 16);
    }

    buttonClick(board, clickX, clickY, meter) {
        if (clickX >= this.x && clickX <= this.x + this.width && clickY >= this.y && clickY <= this.y + this.height) {
            if (this.operation === 'deleteLastUnit') {
                board.unitsOfWorkSpace.pop();
                if (board.stateCreatingConditions != 'none') {
                    let number = board.stateCreatingConditions.substr(15);
                    number--;
                    board.stateCreatingConditions = 'addingCondition'+number;
                }
                console.log('The Last Unit has be deleted.');
            } else if (this.operation === 'changeGroupButton') {
                console.log(true);
                return true;
            }
        }
    }
}

import {drawText} from './enemyAImain.js';
export {Button};