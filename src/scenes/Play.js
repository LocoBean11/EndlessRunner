class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

        preload(){
            this.load.image('background', './assets/MouthBackground.png');
            this.load.image('tooth', './assets/tooth.png');
            this.load.audio('surfingstars', './assets/surfingstars.mp3');
        }

create() {

    //Looping BGM
    this.backgroundMusic = this.sound.add('surfingstars'); 
    this.backgroundMusic.play({ loop: true });
    this.backgroundMusic.setVolume(0.1);

    //Background sprite
    this.MouthBackground = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

    // reset parameters
    this.barrierSpeed = -450;
    this.barrierSpeedMax = -1000;
    //level = 0;
    this.extremeMODE = false;
    this.shadowLock = false;

     // white borders
     this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
     this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
     this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
     this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

    //add tooth (p1)
    this.p1Tooth = this.physics.add.sprite(game.config.width/2, game.config.height /2 - borderUISize - borderPadding, 'tooth').setOrigin(0.5, 0);

    // Set up other properties for the player sprite
    this.p1Tooth.setCollideWorldBounds(true);
    this.p1Tooth.setBounce(0.5);
    this.p1Tooth.setImmovable();
    this.p1Tooth.setMaxVelocity(0, 600);
    this.p1Tooth.setDragY(200);

    //define keys
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

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

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
        fontFamily: 'Times New Roman',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
        top: 5,
        bottom: 5,
        },
        fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
  }

  update(){

        
        
    this.MouthBackground.tilePositionX += 4;  // update tile sprite

    if (keyUP.isDown) {
        // Move the player sprite up
        this.p1Tooth.setVelocityY(-200); // Adjust the velocity value as needed
    } else if (keyDOWN.isDown) {
        // Move the player sprite down
        this.p1Tooth.setVelocityY(200); // Adjust the velocity value as needed
    } else {
        // Stop the player sprite if neither UP nor DOWN key is pressed
        this.p1Tooth.setVelocityY(0);
    }

    if(!this.gameOver){
        this.p1Tooth.update();
    }

  }
}