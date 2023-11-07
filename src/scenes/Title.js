class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }


    preload() {
      this.load.image('title', './assets/Toothachetitle.png'); 
  }

create() {
  this.add.image(0, 0, 'title').setOrigin(0, 0);
  //this.add.text(game.config.width/2, game.config.height/2, '', scoreConfig).setOrigin(0.5);
  
  //let title01 = this.add.text(this.title01X, this.title01Y, 'PADDLE PARKOUR P3', 64).setOrigin(0.5).setTint(0xff0000);
  //this.add.text(this.title01X, this.title01Y + textSpacer, 'Use the UP & DOWN ARROWS to dodge color paddles', 24).setOrigin(0.5);
 
  /*this.add.bitmapText(centerX, centerY + textSpacer,
    'gem', 'Move using the UP and DOWN arrow keys.', 24).setOrigin(0.5);
    this.add.bitmapText(centerX, centerY + textSpacer*3,
    'gem',
    "Collect Apples, Cheese and Carrots. Avoid Lollipops, Sodas and Fries or it's GAME OVER",
     36).setOrigin(0.5);*/

      // define keys
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
}

      update() {
      if (Phaser.Input.Keyboard.JustDown(keyUP)) {
        this.scene.start("playScene");    
      }

      if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
        this.scene.start("instructionsScene");
      }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          this.scene.start("titleScene");
      }
    }

  

}//end of class