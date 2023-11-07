class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
preload(){
    this.load.image('credits', './assets/Credits.png'); 
    this.load.audio('hitHurt', './assets/audio/hitHurt.wav');
}

create() {
    this.add.image(0, 0, 'credits').setOrigin(0, 0);
    this.hurtSoundEffect = this.sound.add('hitHurt');
    
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    
  }

  update(){
    if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
        this.scene.start("titleScene");
        this.sound.play('hitHurt', { volume: 0.2 }); 
    }
  }
}