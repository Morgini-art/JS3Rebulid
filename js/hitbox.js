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
            this.hitboxY + Hitbox.hitboxHeight < this.hitboxY) {
            return false;
        } else {
            return true
        }
    }
}

export {Hitbox};


//entity1,entity2) {
//      return !(entity1.x + entity1.width < entity2.x ||
//               entity2.x + entity2.width < entity1.x ||
//               entity1.y + entity1.height < entity2.y ||
//               entity2.y + entity2.height < entity1.y);
//    }