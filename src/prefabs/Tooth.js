class Tooth extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) { //pointValue goes after frame
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        this.moveSpeed = 4; //pixels per frame
        this.fasterMoveSpeed = 4;
    }

    update() {
        
    }

    //position reset
    reset() {
        this.x = game.config.width;
    }
}