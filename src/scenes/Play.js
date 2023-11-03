class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

        preload(){
            this.load.image('background', './assets/MouthBackground.png');
            this.load.image('tooth', './assets/tooth.png');
            this.load.image('apple', './assets/apple.png');
            this.load.image('cheese', './assets/cheese.png');
            this.load.image('fries', './assets/fries.png');
            this.load.image('lollipop', './assets/lollipop.png');
            this.load.image('soda', './assets/soda.png');
            this.load.audio('surfingstars', './assets/surfingstars.mp3');
        }

                // Define a collision callback function
        handleCollision(p1Tooth, junkfood01) {
            // Handle the collision logic here
            // For example, you can destroy the food and update the score
            junkfood01.destroy();
            this.p1Score += 10;
            this.scoreLeft.text = this.p1Score; // Update the displayed score
        }

         // Define a function to check for collisions
    checkCollision(object1, object2) {
        return Phaser.Geom.Intersects.RectangleToRectangle(object1.getBounds(), object2.getBounds());
    }

    // Define a "reset" method for a food item
    resetFoodItem(foodItem) {
    const minY = borderUISize * 2; // Adjust as needed
    const maxY = game.config.height - (borderUISize * 2); // Adjust as needed

    // Reposition the food item to the right side of the screen
    foodItem.x = game.config.width + borderUISize * 6;
    foodItem.y = Phaser.Math.Between(minY, maxY);
    }
        
create() {

      // Create food items and store them in an array
      this.foodItems = [];
      this.foodItems.push(this.junkfood01 = new Lollipop(this, 0, 0, 'lollipop', 0, 30).setOrigin(0, 0));
      this.foodItems.push(this.junkfood02 = new Soda(this, 0, 0, 'soda', 0, 30).setOrigin(0, 0));
      this.foodItems.push(this.junkfood03 = new Fries(this, 0, 0, 'fries', 0, 30).setOrigin(0, 0));
      this.foodItems.push(this.healthyfood01 = new Apple(this, 0, 0, 'apple', 0, 30).setOrigin(0, 0));
      this.foodItems.push(this.healthyfood02 = new Cheese(this, 0, 0, 'cheese', 0, 30).setOrigin(0, 0));

    //Looping BGM
    /*this.backgroundMusic = this.sound.add('surfingstars'); 
    this.backgroundMusic.play({ loop: true });
    this.backgroundMusic.setVolume(0.1);*/

    //Background sprite
    this.MouthBackground = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

    // reset parameters
    this.barrierSpeed = -450;
    this.barrierSpeedMax = -1000;
    //level = 0;
    this.extremeMODE = false;
    //this.shadowLock = false;

     // white borders
     this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
     this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
     this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
     this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

    //add tooth (p1)
    this.p1Tooth = this.physics.add.sprite(game.config.width * -2, game.config.height /2 - borderUISize - borderPadding, 'tooth').setOrigin(0.5, 0);
    this.p1Tooth.setScale(1.6);

    // Set up other properties for the player sprite
    this.p1Tooth.setCollideWorldBounds(true);
    this.p1Tooth.setBounce(0.5);
    this.p1Tooth.setImmovable();
    this.p1Tooth.setMaxVelocity(0, 600);
    this.p1Tooth.setDragY(200);

    //Add junk food
    //this.junkfood01 = new Lollipop(this, game.config.width + borderUISize*6, borderUISize*4, 'lollipop', 0, 30).setOrigin(0, 0);
    //this.junkfood02 = new Soda(this, game.config.width + borderUISize*6, borderUISize*4, 'soda', 0, 30).setOrigin(0, 0);
    //this.junkfood03 = new Fries(this, game.config.width + borderUISize*6, borderUISize*4, 'fries', 0, 30).setOrigin(0, 0);

    //Add healthy food
    this.healthyfood01 = new Apple(this, game.config.width + borderUISize*6, borderUISize*4, 'apple', 0, 30).setOrigin(0, 0);
    this.healthyfood01.setScale(1.5);

    this.healthyfood02 = new Cheese(this, game.config.width + borderUISize*6, borderUISize*4, 'cheese', 0, 30).setOrigin(0, 0);
    this.healthyfood02.setScale(1.5);

    // Create a collider between the player (this.p1Tooth) and junkfood01
    this.physics.add.collider(this.p1Tooth, this.junkfood01, this.handleCollision, null, this);


    // Randomly spawn food on the right side
    const minY = borderUISize * 2; // Adjust as needed
    const maxY = game.config.height - (borderUISize * 2); // Adjust as needed

    this.junkfood01 = new Lollipop(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(minY, maxY),
        'lollipop',
        0,
        30
      ).setOrigin(0, 0);

      this.junkfood02 = new Soda(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(minY, maxY),
        'soda',
        0,
        30
      ).setOrigin(0, 0);

      this.junkfood03 = new Fries(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(minY, maxY),
        'fries',
        0,
        30
      ).setOrigin(0, 0);

      //Randomly spawn healthy food
      this.healthyfood01 = new Apple(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(minY, maxY),
        'apple',
        0,
        30
      ).setOrigin(0, 0);

      this.healthyfood02 = new Cheese(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(minY, maxY),
        'cheese',
        0,
        30
      ).setOrigin(0, 0);


    //define keys
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // initialize score
        this.p1Score = 0;

        this.timePassed = 0;
        this.spawnInterval = 10000; // 10 seconds

        // display score
        let scoreConfig = {
        fontFamily: 'Times New Roman',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        /*padding: {
        top: 5,
        bottom: 5,
        },*/
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

    // Check if food items are out of bounds and reset their positions
    for (const foodItem of this.foodItems) {
        if (foodItem.x < -foodItem.width) {
            this.resetFoodItem(foodItem);
        }

        // Check for collisions
        if (this.checkCollision(this.p1Tooth, foodItem)) {
            this.handleCollision(this.p1Tooth, foodItem);
        }
    }

    this.MouthBackground.tilePositionX += 4;  // update tile sprite

    if (keyUP.isDown) {
        // Move the player sprite up
        this.p1Tooth.setVelocityY(-300); // Adjust the velocity value as needed
    } else if (keyDOWN.isDown) {
        // Move the player sprite down
        this.p1Tooth.setVelocityY(300); // Adjust the velocity value as needed
    } else {
        // Stop the player sprite if neither UP nor DOWN key is pressed
        this.p1Tooth.setVelocityY(0);
    }

    if(!this.gameOver){
        this.p1Tooth.update();
        this.junkfood01.update();
        this.junkfood02.update();
        this.junkfood03.update();
        this.healthyfood01.update();
        this.healthyfood02.update();
    }

    // Check if junkfood01 is out of bounds and reset it
    if (this.junkfood01.x < -this.junkfood01.width) {
        //this.junkfood01.reset();
        //this.destroy();
    }
    // Check for collisions
if (this.checkCollision(this.p1Tooth, this.junkfood01)) {
    this.handleCollision(this.p1Tooth, this.junkfood01);
}

    // Check if junkfood02 is out of bounds and reset it
    if (this.junkfood02.x < -this.junkfood02.width) {
       // this.junkfood02.reset();
        //this.destroy();
    }
    if (this.checkCollision(this.p1Tooth, this.junkfood02)) {
        this.handleCollision(this.p1Tooth, this.junkfood02);
    }

    // Check if junkfood02 is out of bounds and reset it
    if (this.junkfood03.x < -this.junkfood03.width) {
        //this.junkfood03.reset();
        //this.destroy();
    }
    if (this.checkCollision(this.p1Tooth, this.junkfood03)) {
        this.handleCollision(this.p1Tooth, this.junkfood03);
    }

    if (this.junkfood01.x < -this.junkfood01.width) {
        this.resetFoodItem(this.junkfood01);
    }

    }
    // Define a "reset" method for a food item
    resetFoodItem(foodItem) {
        const minY = borderUISize * 2; // Adjust as needed
        const maxY = game.config.height - (borderUISize * 2); // Adjust as needed

        // Reposition the food item to the right side of the screen
        foodItem.x = game.config.width + borderUISize * 6;
        foodItem.y = Phaser.Math.Between(minY, maxY);
    }
  
}