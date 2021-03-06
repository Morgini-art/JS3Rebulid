class Chest {
    constructor(x, y, width, height, hitbox, content, icon = 'item', isOpen = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hitbox = hitbox;
        this.content = content;
        this.icon = icon;
        this.isOpen = isOpen;
    }
    
    drawChest(ctx) {
        const {x, y, width, height, icon, isOpen} = this;
        if (icon === 'item') {
            ctx.fillStyle = '#239db0';
        } else if (icon === 'chest') {
            ctx.fillStyle = '#b0531e';
        }
        
        if (!isOpen) {
            ctx.fillRect(x, y, width, height);
        }
    }
    
    
    open(opener, openerInvetory) {
        const {isOpen, content} = this;

        if (!isOpen) {
            this.isOpen = true;
            var end = false;
            openerInvetory.basicSlots.forEach((slot, actualId) => {
                if (slot.content === 'empty' && !end) {
                    openerInvetory.basicSlots[actualId].content = content;
                    console.log(openerInvetory.basicSlots);
                    console.log(slot);
                    end = true;
                }
            });
        }
    }
}

class GameChests {
    chests = [];
}

export {Chest, GameChests};