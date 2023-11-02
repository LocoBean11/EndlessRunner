class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

        preload(){
            this.load.image('background', './assets/MouthBackground.png');
            this.load.image('tooth', './assets/tooth.png');
            this.load.image('lollipop', './assets/lollipop.png');
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
    this.p1Tooth = this.physics.add.sprite(game.config.width * -2, game.config.height /2 - borderUISize - borderPadding, 'tooth').setOrigin(0.5, 0);
    this.p1Tooth.setScale(1.5);

    // Set up other properties for the player sprite
    this.p1Tooth.setCollideWorldBounds(true);
    this.p1Tooth.setBounce(0.5);
    this.p1Tooth.setImmovable();
    this.p1Tooth.setMaxVelocity(0, 600);
    this.p1Tooth.setDragY(200);

    //Add junk food
    this.junkfood01 = new Lollipop(this, game.config.width + borderUISize*6, borderUISize*4, 'lollipop', 0, 30).setOrigin(0, 0);
    this.junkfood01.setScale(1.5);

    // Randomly spawn lollipops on the right side
    

    //define keys
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

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

          // Game Over flag
          this.gameOver = false;


          //this.increaseJunkFoodSpeed(2);
          
          // Set a timer to increase speed after 30 seconds
          /*this.time.addEvent({
            delay: 30000, // 30 seconds in milliseconds
            callback: this.increaseLollipopSpeed,
            callbackScope: this,
            loop: false // Do not repeat the timer
          });*/
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
        this.junkfood01.update();
    }


     // check collisions
    /*if(this.checkCollision(this.p1Tooth, this.lollipop)) {
        this.p1Tooth.reset();
        this.lollipopDestroy(this.lollipop);
    }*/



    }

}