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

    const creditsText = this.add.text(320, 75, "CREDITS")
    creditsText.fontFamily = 'Times New Roman';
    creditsText.setFontSize(40); 
    creditsText.setOrigin(0.5, 0.5); // Center the text

    const credits2Text = this.add.text(320, 150, "Art and Programming: Aaron Rodriguez")
    credits2Text.fontFamily = 'Times New Roman';
    credits2Text.setFontSize(20); 
    credits2Text.setOrigin(0.5, 0.5); // Center the text


    const credits3Text = this.add.text(320, 200, "Game Over Jingle and Sound Effects: \n Aaron Rodriguez")
    credits3Text.fontFamily = 'Times New Roman';
    credits3Text.setFontSize(20); 
    credits3Text.setOrigin(0.5, 0.5); // Center the text

    const credits4Text = this.add.text(320, 250, "Royalty Free Title Music by HeatleyBros @ \n https://www.youtube.com/watch?v=DykDCJtQQyk ")
    credits4Text.fontFamily = 'Times New Roman';
    credits4Text.setFontSize(20); 
    credits4Text.setOrigin(0.5, 0.5); // Center the text

    const credits5Text = this.add.text(320, 300, "Royalty Free Gameplay Music by Free Music @ \n https://www.youtube.com/watch?v=l7SwiFWOQqM")
    credits5Text.fontFamily = 'Times New Roman';
    credits5Text.setFontSize(20); 
    credits5Text.setOrigin(0.5, 0.5); // Center the text

    const credits6Text = this.add.text(490, 440, "Hit DOWN arrow key to go back");
    credits6Text.fontFamily = 'Times New Roman';
    credits6Text.setFontSize(14); 
    credits6Text.setOrigin(0.5, 0.5); // Center the text


    
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    
  }

  update(){
    if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
        this.scene.start("titleScene");
        this.sound.play('hitHurt', { volume: 0.2 }); 
    }
  }
}