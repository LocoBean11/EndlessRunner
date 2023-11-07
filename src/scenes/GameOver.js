class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    init(data) {
        this.score = data.score;
    }
    preload(){
        this.load.image('gameover', './assets/GameOver.png'); 
        this.load.audio('select', './assets/audio/select.wav');
    }

create() {
    this.add.image(0, 0, 'gameover').setOrigin(0, 0);
    this.selectSoundEffect = this.sound.add('select'); 

    const gameOverText = this.add.text(320, 100, "GAME OVER");
    gameOverText.setFontSize(48); // Set the desired font size
    gameOverText.setOrigin(0.5, 0.5); // Center the text

    this.add.text(240, 150, "Your score was \n       " + this.score);
    this.add.text(170, 200, "Press UP arrow key to restart");
    this.add.text(100, 250, "Press DOWN arrow key to return to Title Screen");

    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    keyUP= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    
  }


  update() {
    if (Phaser.Input.Keyboard.JustDown(keyUP)) {
        this.sound.play('select', { volume: 0.2 }); 
        this.scene.start("playScene");    
      }

        if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.sound.play('select', { volume: 0.2 }); 
          this.scene.start("titleScene");
      }
    //this.add.text(20, 20, "Game Over");
  }
}