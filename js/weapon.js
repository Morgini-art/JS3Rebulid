class Weapon {
    constructor(name, minDmg, maxDmg, weight, energyLightAttack, speedLightAttack) {
        this.name = name;
        this.minDmg = minDmg;
        this.maxDmg = maxDmg;
        this.weight = weight;
        this.energyLightAttack = energyLightAttack;
        this.speedLightAttack = speedLightAttack;
    }
}

export {
    Weapon
};