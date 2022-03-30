import {checkClickedOnAddingUnits} from './clicksystem.js';
import {Unit, FreeInputUnit} from './unit.js';
import {Board, drawBoard} from './board.js';
import {Button} from './buttons.js';

const can = document.getElementById('canvasScreen');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;

let arrayOfAxisY = [];

for (let z = 10; z < 1200;) {
    arrayOfAxisY.push(z);
    z += 60;
}

let bulidingUnits = [];

const xforAll = 70;

bulidingUnits.push(new Unit(xforAll,undefined,'Gdy żyje', 0, 'Gdy żyje', 'basic'));
bulidingUnits.push(new Unit(xforAll,undefined,'Gdy Umrę', 3, 'Gdy Umrę', 'basic'));
bulidingUnits.push(new Unit(xforAll,undefined,'Gdy dostanę obrażenia', 4, 'Gdy dostanę dmg', 'basic'));
bulidingUnits.push(new Unit(xforAll,undefined,'Idź', 1, 'Idź', 'mobility'));
bulidingUnits.push(new Unit(xforAll,undefined,'Podążaj za graczem', 2, 'Idź do gracza', 'mobility'));
bulidingUnits.push(new Unit(xforAll,undefined,'Parowanie Ciosu', 5, 'Parowanie Ciosu', 'fight'));
bulidingUnits.push(new Unit(xforAll,undefined,'Unik', 5, 'Unik', 'fight'));
bulidingUnits.push(new Unit(xforAll,undefined,'Atak (Szybki Cios)', 5, 'Atak (Szybki Cios)', 'fight'));
bulidingUnits.push(new Unit(xforAll,undefined,'Atak (Ciężki Cios)', 5, 'Atak (Ciężki Cios)', 'fight'));
bulidingUnits.push(new Unit(xforAll,undefined,'Kolizja z graczem', 6, 'Kolizja z graczem', 'events'));
bulidingUnits.push(new Unit(xforAll,undefined,'Jeżeli', 6, 'Jeżeli', 'conditions'));
bulidingUnits.push(new Unit(xforAll,undefined,'mojeHP', 6, 'mojeHP', 'variable'));
bulidingUnits.push(new Unit(xforAll,undefined,'==', 6, '==', 'logical operators'));
bulidingUnits.push(new Unit(xforAll,undefined,'...', 6, '...', 'free input'));

bulidingUnits.push(new FreeInputUnit(xforAll,undefined,'...', 6, '...', 'free input'));

console.log(bulidingUnits[bulidingUnits.length-1]);

for (let z = 10; z < 1200;) {
    z += 60;
    arrayOfAxisY.push(z);
}


let board = new Board();

let deleteLastUnitButton = new Button(1100, 10, 150, 50, 'Usuń ostatni blok', 'deleteLastUnit','#3458eb');
let changeGroupButton = new Button(20, 10, 20, 20, '', 'changeGroupButton', '#c2c0eb');
const listOfGroups = ['basic','mobility','fight','conditions','variable', 'logical operators', 'free input'];
let groupMeter = 0;
let arrayOfAxisYMeter = 0;

function setYOfUnits() {
    for (let b = 0; b < bulidingUnits.length; b++) {
        if (listOfGroups[groupMeter] === bulidingUnits[b].typeOfUnit) {
            arrayOfAxisYMeter++;
        } else {
            arrayOfAxisYMeter = 0;
        }
        bulidingUnits[b].y = arrayOfAxisY[arrayOfAxisYMeter];
    }
    //FOR przez wszystkie elementy tablicy
    /*:   JEŻELI aktualna grupa będzię równa aktualnym 'klocku'
    //:   :zwiększ licznik Y
    //:   W PRZECIWNYM RAZIE
    //:    :ustaw licznik y na 0
    //:zmień y aktualnego elementu na licznikY[] 
    */
}

can.addEventListener('click', e => {
    deleteLastUnitButton.buttonClick(board, e.offsetX, e.offsetY);
    if (changeGroupButton.buttonClick(board, e.offsetX, e.offsetY, groupMeter)) {
        setYOfUnits();
        groupMeter++;
        if (groupMeter > 6) {
            groupMeter = 0;
            arrayOfAxisYMeter = 0;
        }
        console.log(groupMeter);
    }

    checkClickedOnAddingUnits(e.offsetX, e.offsetY, bulidingUnits, board, listOfGroups[groupMeter]);
});


function drawAll(){
    ctx.clearRect(0, 0, canWidth,canHeight);
    drawBoard(ctx, board, arrayOfAxisY);
    for (let i = 0; i < bulidingUnits.length; i++) {
        bulidingUnits[i].drawUnit(ctx, listOfGroups[groupMeter]);
    }
    deleteLastUnitButton.drawButton(ctx);
    changeGroupButton.drawButton(ctx);
    
    requestAnimationFrame(drawAll);
}

function drawText(textX, textY, textToDisplay, fontColor, fontSize, fontFamily = 'Monospace') {
    ctx.fillStyle = fontColor;
    ctx.font = fontSize + 'px ' + fontFamily;
    ctx.fillText(textToDisplay, textX, textY, 146);
}

export {drawText, setYOfUnits};
requestAnimationFrame(drawAll);