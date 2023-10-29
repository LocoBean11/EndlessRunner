class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

        preload(){
            this.load.image('background', './assets/MouthBackground.png');
            this.load.image('tooth', './assets/Tooth.png');
            this.load.audio('kirby')
        }

create() {

    //Looping BGM
    this.backgroundMusic = this.sound.add('chiptunemusic'); 
    this.backgroundMusic.play({ loop: true });
    this.backgroundMusic.setVolume(0.1);


    // reset parameters
    this.barrierSpeed = -450;
    this.barrierSpeedMax = -1000;
    //level = 0;
    this.extremeMODE = false;
    this.shadowLock = false;
    
    this.MouthBackground = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

     // white borders
     this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
     this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
     this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
     this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

     // set up player paddle (physics sprite) and set properties
    /* tooth = this.physics.add.sprite(32, 'tooth').setOrigin(0.5);
     tooth.setCollideWorldBounds(true);
     tooth.setBounce(0.5);
     tooth.setImmovable();
     tooth.setMaxVelocity(0, 600);
     tooth.setDragY(200);
     //tooth.setDepth(1);             // ensures that paddle z-depth remains above shadow paddles
     tooth.destroyed = false;       // custom property to track paddle life
     //tooth.setBlendMode('SCREEN');  // set a WebGL blend mode
*/
  }

  update(){
    this.MouthBackground.tilePositionX += 4;  // update tile sprite

    if(!this.gameOver){
        //this.p1Tooth.update();
    }

  }
}