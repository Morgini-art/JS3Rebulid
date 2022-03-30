function checkClickedOnAddingUnits(clickX, clickY, bulidingUnits, board, actualGroup) {
    console.log(clickX, clickY);

    for (let i = 0; i < bulidingUnits.length; i++) {
        if (clickX > bulidingUnits[i].x && clickX < bulidingUnits[i].x + 150 && clickY > bulidingUnits[i].y && clickY < bulidingUnits[i].y + 50) {
            console.log('The Block on the name: ' + bulidingUnits[i].nameOfUnit + ' has be clicked.');

            if (bulidingUnits[i].typeOfUnit === actualGroup) {
                if (board.unitsOfWorkSpace[0] == null) {
                    switch (bulidingUnits[i].typeOfUnit) {
                        case 'basic':
                            board.unitsOfWorkSpace.push(bulidingUnits[i]);
                            console.table(board.unitsOfWorkSpace);
                            break;
                        case 'events':
                            board.unitsOfWorkSpace.push(bulidingUnits[i]);
                            console.table(board.unitsOfWorkSpace);
                            break;
                    }
                } else {
                    switch (bulidingUnits[i].typeOfUnit) {
                        case 'basic':
                            break;
                        case 'events':
                            break;
                        case 'conditions':
                            if (board.stateCreatingConditions != 'addingCondition1') {
                                board.unitsOfWorkSpace.push(bulidingUnits[i]);
                                console.table(board.unitsOfWorkSpace);
                                board.stateCreatingConditions = 'addingCondition1';
                            }
                            break;
                        case 'variable':
                            if (board.stateCreatingConditions === 'addingCondition1') {
                                board.unitsOfWorkSpace.push(bulidingUnits[i]);
                                console.table(board.unitsOfWorkSpace);
                                board.stateCreatingConditions = 'addingCondition2';
                                console.log(board.stateCreatingConditions);
                            }
                            break;
                        case 'logical operators':
                            if (board.stateCreatingConditions === 'addingCondition2') {
                                board.unitsOfWorkSpace.push(bulidingUnits[i]);
                                console.table(board.unitsOfWorkSpace);
                                board.stateCreatingConditions = 'addingCondition3';
                                console.log(board.stateCreatingConditions);
                            }
                            break;
                        case 'free input':
                            if (board.stateCreatingConditions === 'addingCondition3') {
                                board.unitsOfWorkSpace.push(bulidingUnits[i]);
                                console.table(board.unitsOfWorkSpace);
                                board.stateCreatingConditions = 'addingCondition4';
                                console.log(board.stateCreatingConditions);
                                console.log(board.unitsOfWorkSpace[board.unitsOfWorkSpace.length-1]);
                                
                                board.unitsOfWorkSpace[board.unitsOfWorkSpace.length-1].freeText = prompt('Podaj Wartość: ');
                                
//                                console.log('---');
//                                console.log(bulidingUnits[i].unitOperation);
//                                console.log('---');
//                                console.log(board.unitsOfWorkSpace[board.unitsOfWorkSpace.length-1].unitOperation);
//                                
//                                console.log('!---!');
                            }
                            break;
                        default:
                            board.unitsOfWorkSpace.push(bulidingUnits[i]);
                            console.table(board.unitsOfWorkSpace);
                            break;
                    }
                }
            }
        }
    }
}

export {
    checkClickedOnAddingUnits,
};