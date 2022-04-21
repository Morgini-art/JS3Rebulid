class Bullet {
    constructor(x, y, width, height, hitbox, speed, minDmg, maxDmg, targetX, targetY, distance) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hitbox = hitbox;
        this.minDmg = minDmg;
        this.maxDmg = maxDmg;
        this.speed = speed;
        this.movingDirectionAxisX;
        this.movingDirectionAxisY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.distance = distance;
    }

    drawBullet(ctx) {
        const {
            x,
            y,
            width,
            height
        } = this;
        ctx.fillStyle = '#b3a276';
        ctx.fillRect(x, y, width, height);
    }
    
    checkTheDirection(wieldingWeapon) {
        const {targetX, targetY} = this;
        const {x, y} = wieldingWeapon;
        
        this.movingDirectionAxisX = (x > targetX) ? this.movingDirectionAxisX = 'Left' : this.movingDirectionAxisX = 'Right';

        this.movingDirectionAxisY = (y > targetY) ? this.movingDirectionAxisY = 'Up' : this.movingDirectionAxisY = 'Down';
        
        console.log(this.movingDirectionAxisY);
    }
    
    move() {
        const {
            x,
            y,
            movingDirectionAxisX,
            movingDirectionAxisY,
            speed,
            targetX,
            targetY
        } = this;
        
        
        this.x = parseInt(this.x);
        this.y = parseInt(this.y);
        this.speed = parseInt(this.speed);
        
        if (movingDirectionAxisX === 'Left') {
            this.x -= this.speed;
            this.distance -= this.speed;
        } else if (movingDirectionAxisX === 'Right') {
            this.x += this.speed;
            this.distance -= this.speed;
        }
        
        if (movingDirectionAxisY === 'Up') {
            this.y -= this.speed;
            this.distance -= this.speed;
        } else if (movingDirectionAxisY === 'Down') {
            this.y += this.speed;
            this.distance -= this.speed;
        }
        // 250 - 2 
        //428 - 3 > 432 && 428 - 3 < 
        if (y === targetY || y - 3 >= targetY && y + 3 >= targetY && movingDirectionAxisY !== 'Up') {
            this.movingDirectionAxisY = 'None';
        }
        
        if (this.distance <= 0) {
            this.speed = 0;
        }
        
    }
}
export {Bullet};