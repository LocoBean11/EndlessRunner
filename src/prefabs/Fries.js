class Fries extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, minY, maxY) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.moveSpeed = 2; //pixels per frame

        this.minY = minY; // Minimum Y-coordinate
        this.maxY = maxY; // Maximum Y-coordinate
        //this.fasterMoveSpeed = game.settings.lollipopSpeed; //JunkFood move faster after 30 seconds
    }

    update() {
        //move the JunkFood left    
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }    
    }

    increaseSpeed(amount) {
        // Increase the speed by the specified amount
        this.moveSpeed += amount;
    }

    //position reset
    reset() {
        this.x = game.config.width;
        this.y = Phaser.Math.Between(this.minY, this.maxY); // Set the random Y-position
    }
}