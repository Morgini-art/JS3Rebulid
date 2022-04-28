class Invetory{
    numberOfBasicSlots = 20;
    basicSlots = [];
}

class Slot {
    constructor(id, content = 'empty') {
        this.id = id;
        this.content = content;
    }
}

export {Invetory, Slot};