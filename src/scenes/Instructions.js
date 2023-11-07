class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }
preload(){
    this.load.image('instructions', './assets/Instructions.png'); 
    this.load.audio('hitHurt', './assets/audio/hitHurt.wav');
}

create() {
    this.add.image(0, 0, 'instructions').setOrigin(0, 0);
    this.hurtSoundEffect = this.sound.add('hitHurt');

    const instrucText = this.add.text(320, 98, "INSTRUCTIONS")
    instrucText.fontFamily = 'Times New Roman';
    instrucText.setFontSize(40); 
    instrucText.setOrigin(0.5, 0.5); // Center the text

    const instruc2Text = this.add.text(270, 150, "Use the UP and DOWN arrow keys to move.")
    instruc2Text.fontFamily = 'Times New Roman';
    instruc2Text.setFontSize(20); 
    instruc2Text.setOrigin(0.5, 0.5); // Center the text

    const instruc3Text = this.add.text(270, 225, "Collect Apples, Cheese and Carrots to \nraise your score.")
    instruc3Text.fontFamily = 'Times New Roman';
    instruc3Text.setFontSize(20); 
    instruc3Text.setOrigin(0.5, 0.5); // Center the text

    const instruc4Text = this.add.text(330, 325, "Avoid Lollipops, Fries and Soda. Colliding with \nthese foods " +
    "will result in a GAME OVER.")
    instruc4Text.fontFamily = 'Times New Roman';
    instruc4Text.setFontSize(20); 
    instruc4Text.setOrigin(0.5, 0.5); // Center the text

    const instruc5Text = this.add.text(330, 425, "The speed of the game increases every 10 seconds! \n"+
    "Aim to get the highest score!")
    instruc5Text.fontFamily = 'Times New Roman';
    instruc5Text.setFontSize(20); 
    instruc5Text.setOrigin(0.5, 0.5); // Center the text

    const instruc6Text = this.add.text(515, 470, "Hit DOWN arrow key to go back")
    instruc6Text.fontFamily = 'Times New Roman';
    instruc6Text.setFontSize(14); 
    instruc6Text.setOrigin(0.5, 0.5); // Center the text
    
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    
  }

  update(){
    if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
        this.scene.start("titleScene");
        this.sound.play('hitHurt', { volume: 0.2 }); 
    }
  }
}