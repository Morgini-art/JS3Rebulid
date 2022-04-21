import {Tick} from './lib/time.js';

class Weapon {
    constructor(name, minDmg, maxDmg, weight, energyLightAttack, speedLightAttack, type) {
        this.name = name;
        this.minDmg = minDmg;
        this.maxDmg = maxDmg;
        this.weight = weight;
        this.energyLightAttack = energyLightAttack;
        this.speedLightAttack = speedLightAttack;
        this.type = type;
    }
    
    attack(wieldingWeapons, objective, generalTimer, e) {
        const { type, minDmg, maxDmg } = this;
        const {x, y} = wieldingWeapons;

        if (type === 'melee') {
            const givenDmg = Math.floor(Math.random() * (this.maxDmg - this.minDmg + 1) + this.minDmg);
            objective.hp -= givenDmg;
            //console.log('A melle attack');
        } else if (type === 'distance') {
            console.log('Create a Bullet!');
            console.log('DMG:'+minDmg,maxDmg);
            //x, y, width, height, hitbox, speed, minDmg, maxDmg
            generalTimer.listOfTicks.push(new Tick('Creating a Bullet{x:'+x+',y:'+y+',width:20,height:20,speed:4,minDmg:'+minDmg+',maxDmg:'+maxDmg+',targetX:'+e.offsetX+',targetY:'+e.offsetY+'}', generalTimer.generalGameTime, generalTimer.generalGameTime + this.speedLightAttack));
            console.log(generalTimer);
            console.log(e.offsetX);
        }
            
    }
}

export {
    Weapon
};