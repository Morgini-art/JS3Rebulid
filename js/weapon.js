import {Tick} from './lib/time.js';

class Weapon {
    constructor(name, minDmg, maxDmg, weight, energyLightAttack, speedLightAttack, type, bulletSpeed = 0, distanceOptions) {
        this.name = name;
        this.minDmg = minDmg;
        this.maxDmg = maxDmg;
        this.weight = weight;
        this.energyLightAttack = energyLightAttack;
        this.speedLightAttack = speedLightAttack;
        this.type = type;
        this.bulletSpeed = bulletSpeed;
        this.distanceOptions = distanceOptions;
        this.distance = 500;
    }
    
    reload(generalTimer, ammunition) {
        const {distanceOptions, type} = this;
        if (type === 'distance') {
            const magazine = distanceOptions[0];
            const fullMagazine = distanceOptions[1];
            const isReloading = distanceOptions[2];
            const reloadingTime = distanceOptions[3];
            if (!isReloading && magazine < fullMagazine) {
                for (const ammo of ammunition) {
                    if (distanceOptions[4] === ammo[0] && ammo[1] > 0) {
                        generalTimer.listOfTicks.push(new Tick('Reloading a player distance weapon',generalTimer.generalGameTime,generalTimer.generalGameTime+reloadingTime));
                        this.distanceOptions[2] = true;
                        ammo[1] = ammo[1] - (fullMagazine-magazine);
                    }
                }
            }
        }
    }
    
    attack(wieldingWeapons, objective, generalTimer, e, ammunition, ownerAttack) {
        const {
            type,
            minDmg,
            maxDmg,
            bulletSpeed
        } = this;
        const {
            x,
            y
        } = wieldingWeapons;
        console.log(objective.y, wieldingWeapons.y);

        if (type === 'melee') {
            const givenDmg = Math.floor(Math.random() * (this.maxDmg - this.minDmg + 1) + this.minDmg);
            objective.hp -= givenDmg;
        } else if (type === 'distance') {
            if (this.distanceOptions[0] != 0 && !this.distanceOptions[2] || this.distanceOptions[0] === 'infinity') {
                if (bulletSpeed != 0) {
                    if (ownerAttack === 'player') {
                        generalTimer.listOfTicks.push(new Tick('Creating a Bullet{x:' + x + ',y:' + y + ',width:20,height:20,speed:' + bulletSpeed + ',minDmg:' + minDmg + ',maxDmg:' + maxDmg + ',targetX:' + e.offsetX + ',targetY:' + e.offsetY + ',owner:'+ ownerAttack +'}', generalTimer.generalGameTime, generalTimer.generalGameTime + this.speedLightAttack));
                    } else if (ownerAttack === 'enemy') {
                        generalTimer.listOfTicks.push(new Tick('Creating a Bullet{x:' + x + ',y:' + y + ',width:20,height:20,speed:' + bulletSpeed + ',minDmg:' + minDmg + ',maxDmg:' + maxDmg + ',targetX:' + objective.x + ',targetY:' + objective.y + ',owner:'+ ownerAttack + 'Id-' + wieldingWeapons.id +'}', generalTimer.generalGameTime, generalTimer.generalGameTime + this.speedLightAttack));
                        console.log('WOW2', objective);
                    }
                } else {
                    generalTimer.listOfTicks.push(new Tick('Creating a Bullet{x:' + x + ',y:' + y + ',width:20,height:20,speed:4,minDmg:' + minDmg + ',maxDmg:' + maxDmg + ',targetX:' + e.offsetX + ',targetY:' + e.offsetY + ',owner:'+ ownerAttack + '}', generalTimer.generalGameTime, generalTimer.generalGameTime + this.speedLightAttack));
                }
                if (this.distanceOptions[0] !== 'infinity') {
                    if (ownerAttack !== 'enemy') {
                        this.distanceOptions[0]--;   
                    }
                }
            } 
            if (!this.distanceOptions[2] && this.distanceOptions[0] === 0) {
                this.reload(generalTimer, ammunition);
            }
        }

    }
}

export {Weapon};