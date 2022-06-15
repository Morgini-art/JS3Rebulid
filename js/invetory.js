class Invetory{
    numberOfBasicSlots = 20;
    basicSlots = [];
    show = false;

    drawInvetory (ctx, functionDrawText) {
        const {basicSlots, numberOfBasicSlots, show} = this;
        if (show) {
            functionDrawText(1080, 40, basicSlots, 'black', 20, 'Monospace', numberOfBasicSlots, 'Invetory/content');
        }
    }
}

class Slot {
    constructor(id, content = 'empty') {
        this.id = id;
        this.content = content;
    }
}

function fillInvetoryWithSlots(invetoryObject) {
	for (let i = 0; i < invetoryObject.basicSlots.length; i++) {
		invetoryObject.basicSlots[i] = new Slot(i);
	}
}

export {Invetory, Slot, fillInvetoryWithSlots};