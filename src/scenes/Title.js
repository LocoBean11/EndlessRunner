class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }


    preload() {
      this.load.image('title', './assets/Toothachetitle.png'); 
  }

create() {
  this.add.image(0, 0, 'title').setOrigin(0, 0);
 
  /*this.add.bitmapText(centerX, centerY + textSpacer,
    'gem', 'Move using the UP and DOWN arrow keys.', 24).setOrigin(0.5);
    this.add.bitmapText(centerX, centerY + textSpacer*3,
    'gem',
    "Collect Apples, Cheese and Carrots. Avoid Lollipops, Sodas and Fries or it's GAME OVER",
     36).setOrigin(0.5);*/

      // define keys
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
}

      update() {
      if (Phaser.Input.Keyboard.JustDown(keyUP)) {
        this.scene.start("playScene");    
      }
    }

  

}//end of class