class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }
preload(){
    this.load.image('instructions', './assets/Instructions.png'); 
}

create() {
    this.add.image(0, 0, 'instructions').setOrigin(0, 0);
    
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    
  }

  update(){
    if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
        this.scene.start("titleScene");
    }
  }
}