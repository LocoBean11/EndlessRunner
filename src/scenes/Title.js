class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }


    preload() {
      this.load.image('title', './assets/Toothachetitle.png'); 
      this.load.audio('select', './assets/audio/select.wav');
  }

create() {
  this.add.image(0, 0, 'title').setOrigin(0, 0);
  this.selectSoundEffect = this.sound.add('select'); 

  const titleText = this.add.text(320, 210, "Press UP arrow to start")
  //titleText.fontFamily = 'Times New Roman';
  titleText.setFontSize(20); 
  titleText.setOrigin(0.5, 0.5); // Center the text

  const title2Text = this.add.text(320, 260, "Press DOWN arrow for instructions");
  title2Text.setFontSize(20); 
  title2Text.setOrigin(0.5, 0.5); // Center the text

  const title3Text = this.add.text(320, 310, "Press RIGHT arrow for credits");
  title3Text.setFontSize(20); 
  title3Text.setOrigin(0.5, 0.5); // Center the text

  const title4Text = this.add.text(320, 405, "Aaron Rodriguez 2023");
  title4Text.setFontSize(17); 
  title4Text.setOrigin(0.5, 0.5); // Center the text
 
  /*this.add.bitmapText(centerX, centerY + textSpacer,
    'gem', 'Move using the UP and DOWN arrow keys.', 24).setOrigin(0.5);
    this.add.bitmapText(centerX, centerY + textSpacer*3,
    'gem',
    "Collect Apples, Cheese and Carrots. Avoid Lollipops, Sodas and Fries or it's GAME OVER",
     36).setOrigin(0.5);*/

      //Define keys
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
}

      update() {
      if (Phaser.Input.Keyboard.JustDown(keyUP)) {
        this.sound.play('select', { volume: 0.2 }); 
        this.scene.start("playScene");    
      }

      if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
        this.sound.play('select', { volume: 0.2 }); 
        this.scene.start("instructionsScene");
      }
     /*   if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          this.sound.play('select', { volume: 0.2 }); 
          this.scene.start("titleScene");
      }*/
      if(Phaser.Input.Keyboard.JustDown(this.keyRIGHT)) {
        this.sound.play('select', { volume: 0.2 }); 
        this.scene.start("creditsScene");
    }

  }

}//end of class