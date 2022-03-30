import {drawText} from './enemyAImain.js';

class Unit {
    constructor(x, y, nameOfUnit, idOfUnit, unitOperation, typeOfUnit) {
        this.x = x;
        this.y = y;
        this.nameOfUnit = nameOfUnit;
        this.idOfUnit = idOfUnit;
        this.unitOperation = unitOperation;
        this.typeOfUnit = typeOfUnit;
    }

    drawUnit(ctx, actualgroup) {
        let optionalFontColor;
        if (this.typeOfUnit === 'basic') {
            ctx.fillStyle = '#c23b2d';
        } else if (this.typeOfUnit === 'mobility') {
            ctx.fillStyle = '#b57526';
        } else if (this.typeOfUnit === 'fight') {
            ctx.fillStyle = '#348ebf';
        } else if (this.typeOfUnit === 'events') {
            ctx.fillStyle = '#ebf52f';
        } else if (this.typeOfUnit === 'conditions') {
            ctx.fillStyle = '#272394';
        } else if (this.typeOfUnit === 'variable') {
            ctx.fillStyle = '#96144c';
        } else if (this.typeOfUnit === 'logical operators') {
            ctx.fillStyle = '#5eeb2f';
        } else if (this.typeOfUnit === 'free input') {
            ctx.fillStyle = '#ced9d1';
        }

        if (this.typeOfUnit === actualgroup) {
            ctx.fillRect(this.x, this.y, 150, 50);
            drawText(this.x + 4, this.y + 12, this.unitOperation, 'black', 16);
        }

    }
}

class FreeInputUnit extends Unit {
    freeText = '';
}

export {Unit, FreeInputUnit};