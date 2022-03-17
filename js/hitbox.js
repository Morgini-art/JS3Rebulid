class Hitbox {
    constructor(hitboxX, hitboxY, hitboxWidth, hitboxHeight) {
        this.hitboxX = hitboxX;
        this.hitboxY = hitboxY;
        this.hitboxWidth = hitboxWidth;
        this.hitboxHeight = hitboxHeight;
    }
    
    hitboxCollision(Hitbox) {
        if (this.hitboxX + this.hitboxWidth < Hitbox.hitboxX ||
            Hitbox.hitboxX + Hitbox.hitboxWidth < this.hitboxX ||
            this.hitboxY + this.hitboxHeight < Hitbox.hitboxY ||
            Hitbox.hitboxY + Hitbox.hitboxHeight < this.hitboxY) {
            return false;
        } else {
            return true
        }
    }
}

export {Hitbox};