class Spell {
    constructor(requiredMagicEnergy, type, action, availablesObjects, reload) {
        this.requiredMagicEnergy = requiredMagicEnergy;
        this.type = type;
        this.action = action;
        this.availablesObjects = availablesObjects;
        this.reload = reload;
        if (type === 'dmg') {
            this.minDmg;
            this.maxDmg;
        }
    }
}

export {Spell};