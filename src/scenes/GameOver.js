class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }
    preload(){
        this.load.image('gameover', './assets/GameOver.png'); 
    }

create() {
    this.add.image(0, 0, 'gameover').setOrigin(0, 0);
    this.add.text(20, 20, "Game Over");
    
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    keyUP= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    
  }


  update() {
    if (Phaser.Input.Keyboard.JustDown(keyUP)) {
        this.scene.start("playScene");    
      }

        if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          this.scene.start("titleScene");
      }
    this.add.text(20, 20, "Game Over");
  }
}