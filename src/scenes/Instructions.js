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

    const instrucText = this.add.text(320, 250, "Move UP")
    instrucText.fontFamily = 'Times New Roman';
    instrucText.setFontSize(20); 
    instrucText.setOrigin(0.5, 0.5); // Center the text
    
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    
  }

  update(){
    if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
        this.scene.start("titleScene");
        this.sound.play('hitHurt', { volume: 0.2 }); 
    }
  }
}