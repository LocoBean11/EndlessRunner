class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
        this.minY = 0;
        this.maxY = 0;
    }

        preload(){
            this.load.image('background', './assets/MouthBackground.png');
            this.load.image('tooth', './assets/tooth.png');
            this.load.image('toothblink', './assets/toothblink.png');
            this.load.image('toothhappy', './assets/toothhappy.png');
            this.load.image('toothdeath', './assets/ToothDeath.png');
            this.load.image('apple', './assets/apple.png');
            this.load.image('carrot', './assets/carrot.png');
            this.load.image('cheese', './assets/cheese.png');
            //Load sparkle sprite sheet
            this.load.spritesheet('sparkle', './assets/sparkle.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 2});
            
            this.load.image('fries', './assets/fries.png');
            this.load.image('lollipop', './assets/lollipop.png');
            this.load.image('soda', './assets/soda.png');
            this.load.image('emptyspace', './assets/emptyspace.png');
            this.load.audio('itemsfx', './assets/audio/itemacquire.mp3');
            this.load.audio('gameover', './assets/audio/gameOverJingle.wav');
            this.load.audio('surfingstars', './assets/audio/surfingstars.mp3');
        }

            // Define a collision callback function
            handleCollision(foodItem) {
            this.resetFoodItem(foodItem);
        }

         // Define a function to check for collisions
        checkCollision(object1, object2) {
        return Phaser.Geom.Intersects.RectangleToRectangle(object1.getBounds(), object2.getBounds());
    }
        
create() {
      this.minY = 40;
      this.maxY = 376;
      
      // Create food items and store them in an array
      this.junkFoodItems = [];
      this.healthyFoodItems = [];

      this.junkFoodItems.push(
      new Lollipop(this, 0, 0, 'lollipop', 0, this.minY, this.maxY).setOrigin(0, 0),
      new Soda(this, 0, 0, 'soda', 0, this.minY, this.maxY).setOrigin(0, 0),
      new Fries(this, 0, 0, 'fries', 0, this.minY, this.maxY).setOrigin(0, 0)
      );
      
      //Healthy foods add points to the score
      this.healthyFoodItems.push(
      new Apple(this, 0, 0, 'apple', 0, this.minY, this.maxY, 20).setOrigin(0, 0),
      new Cheese(this, 0, 0, 'cheese', 0, this.minY, this.maxY, 20).setOrigin(0, 0),
      new Carrot(this, 0, 0, 'carrot', 0, this.minY, this.maxY, 20).setOrigin(0, 0)
      );

    //Looping BGM
    this.backgroundMusic = this.sound.add('surfingstars'); 
    this.backgroundMusic.play({ loop: true });
    this.backgroundMusic.setVolume(0.1);
    this.backgroundMusicSpeed = 1;
    
    //Background sprite
    this.MouthBackground = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
    this.backgroundSpeed = 4;

    // reset parameters
    this.ScreenEdgeSpeed = -450;
    this.ScreenEdgeSpeedMax = -1000;

     // white borders
     this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
     this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
     //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
     //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

     //Empty space
     this.emptyspaceTop = this.add.tileSprite(0, 40, 640, 64, 'emptyspace').setOrigin(0, 0);
     this.emptyspaceBottom = this.add.tileSprite(0, 376, 640, 64, 'emptyspace').setOrigin(0, 0);

    //Add tooth (p1)
    this.p1Tooth = this.physics.add.sprite(game.config.width /7, game.config.height /2 - borderUISize - borderPadding, 'tooth').setOrigin(0.5, 0);
    this.p1Tooth.setScale(1.6);

    this.blink = true;

    //Set up other properties for the tooth
    this.p1Tooth.setCollideWorldBounds(true);
    this.p1Tooth.setBounce(0.5);
    this.p1Tooth.setImmovable();
    this.p1Tooth.setMaxVelocity(0, 600);
    this.p1Tooth.setDragY(200);

    //Add junk food
    this.junkfood01 = new Lollipop(this, game.config.width + borderUISize*6, borderUISize*4, 'lollipop', 0, this.minY, this.maxY).setOrigin(0, 0);
    this.junkfood02 = new Soda(this, game.config.width + borderUISize*6, borderUISize*4, 'soda', 0, this.minY, this.maxY).setOrigin(0, 0);
    this.junkfood03 = new Fries(this, game.config.width + borderUISize*6, borderUISize*4, 'fries', 0, this.minY, this.maxY).setOrigin(0, 0);

    //Add healthy food
    this.healthyfood01 = new Apple(this, game.config.width + borderUISize*6, borderUISize*4, 'apple', 0, 0, 30, 20).setOrigin(0, 0);
    this.healthyfood01.setScale(1.5);
    this.healthyfood02 = new Cheese(this, game.config.width + borderUISize*6, borderUISize*4, 'cheese', 0, 0, 30, 20).setOrigin(0, 0);
    this.healthyfood02.setScale(1.5);
    this.healthyfood03 = new Carrot(this, game.config.width + borderUISize*6, borderUISize*4, 'carrot', 0, 30, 20).setOrigin(0, 0);
    this.healthyfood03.setScale(1.5);

    // Create colliders between the player, food and borders
    this.physics.add.collider(this.p1Tooth, this.junkFoodItems, this.handleCollision, null, this);
    this.physics.add.collider(this.p1Tooth, this.healthyFoodItems, this.handleCollision, null, this);
    this.physics.add.collider(this.p1Tooth, this.emptyspaceTop, this.handleCollision, null, this);
    this.physics.add.collider(this.p1Tooth, this.emptyspaceBottom, this.handleCollision, null, this);

    // Randomly spawn junk food on the right side
    this.junkfood01 = new Lollipop(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(this.minY, this.maxY),
        'lollipop',
        0,
        this.minY,
        this.maxY
      ).setOrigin(0, 0);

      this.junkfood02 = new Soda(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(this.minY, this.maxY),
        'soda',
        0,
        this.minY,
        this.maxY
      ).setOrigin(0, 0);

      this.junkfood03 = new Fries(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(this.minY, this.maxY),
        'fries',
        0,
        this.minY,
        this.maxY
      ).setOrigin(0, 0);
      //End of randomly spawning junk food

      //Randomly spawn healthy food
      this.healthyfood01 = new Apple(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(this.minY, this.maxY),
        'apple',
        0,
        this.minY,
        this.maxY
      ).setOrigin(0, 0);

      this.healthyfood02 = new Cheese(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(this.minY, this.maxY),
        'cheese',
        0,
        this.minY,
        this.maxY
      ).setOrigin(0, 0);

      this.healthyfood03 = new Carrot(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(this.minY, this.maxY),
        'carrot',
        0,
        this.minY,
        this.maxY
      ).setOrigin(0, 0);
      //End of randomly spawning healthy food

        //Define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //Initialize the score
        this.p1Score = 0;

        this.timePassed = 0;
        this.spawnInterval = 3000; //  seconds

        //Display score
        let scoreConfig = {
        fontFamily: 'Times New Roman',
        fontSize: '28px',
        backgroundColor: '#123456',
        color: '#FFFF00',
        align: 'right',
        fixedWidth: 100
        }

        // Create a sparkle animation
        this.anims.create({
            key: 'sparkle',
            frames: this.anims.generateFrameNumbers('sparkle', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0, // Play the animation only once
        });

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

          // Game Over flag
          this.gameOver = false;
          
           //Set a timer to increase speed after 10 seconds
          this.time.addEvent({
            delay: 10000, // 10 seconds in milliseconds
            callback: this.increasefoodItemSpeed,
            callbackScope: this,
            loop: true // Timer repeats every 10 seconds
          });

          //Set a timer to animate tooth blink
          this.time.addEvent({
            delay: 2000, // 3 seconds in milliseconds
            callback: this.toothblink,
            callbackScope: this,
            loop: true, // Timer repeats every 3 seconds
            startAt: 100
          });

          //Set a timer to reset tooth blink
          this.time.addEvent({
            delay: 2000, // 3 seconds in milliseconds
            callback: this.resetblink,
            callbackScope: this,
            loop: true // Timer repeats every 3 seconds
             
          });

        // Define a reset method for a food item
        const resetFoodItem = (foodItem) => {
            foodItem.x = game.config.width + borderUISize * 6;
            foodItem.y = Phaser.Math.Between(this.minY, this.maxY);
        };
        
        resetFoodItem(this.junkfood01);
        resetFoodItem(this.junkfood02);
        resetFoodItem(this.junkfood03);
        resetFoodItem(this.healthyfood01);
        resetFoodItem(this.healthyfood02);
        resetFoodItem(this.healthyfood03);
    }//End of create method

        increasefoodItemSpeed() {
            if(!this.gameOver){

            this.junkfood01.increaseSpeed(1.5);
            this.junkfood02.increaseSpeed(1.5);
            this.junkfood03.increaseSpeed(1.5);
            this.healthyfood01.increaseSpeed(1.5);
            this.healthyfood02.increaseSpeed(1.5);
            this.healthyfood03.increaseSpeed(1.5);
            this.backgroundSpeed += 1.5;
            this.backgroundMusicSpeed += 0.1; //Increase music speed
            
            let Speedtext = this.add.text(320, 240, "Speed Increase!", 96).setOrigin(0, 0.5);
            Speedtext.setBlendMode('ADD').setTint(0xFFFFFF);
            this.tweens.add({
                targets: [Speedtext],
                duration: 1500,
                x: { from: 320, to: 320 },
                alpha: { from: 0.9, to: 0 },
                onComplete: function() {
                    Speedtext.destroy();    
                }
            });
        }
        }
        
        toothblink(){
            if(!this.gameOver){
            this.p1Tooth.destroy();
            this.p1Tooth = this.physics.add.sprite(this.p1Tooth.x, this.p1Tooth.y, 'toothblink').setOrigin(0.5, 0);
            this.p1Tooth.setScale(1.6);      
        }
        }//end of toothblink

        resetblink(){
            if(!this.gameOver){
            this.p1Tooth.destroy();
            this.p1Tooth = this.physics.add.sprite(this.p1Tooth.x, this.p1Tooth.y, 'tooth').setOrigin(0.5, 0);
            this.p1Tooth.setScale(1.6);
            }
        }
  
  update(){
    this.backgroundMusic.setRate(this.backgroundMusicSpeed);
    this.scoreLeft.text = this.p1Score;
    if(!this.gameOver){
    // Check if food items are out of bounds and reset their positions
    for (const junkFoodItem of this.junkFoodItems) {
        if (junkFoodItem.x < -junkFoodItem.width) {
            this.resetFoodItem(junkFoodItem, this.minY, this.maxY);
        }

        // Check for collisions
        if (this.checkCollision(this.p1Tooth, junkFoodItem)) {
            this.handleCollision(junkFoodItem);
        }
    }

    // Check if food items are out of bounds and reset their positions
    for (const healthyFoodItem of this.healthyFoodItems) {
        if (healthyFoodItem.x < -healthyFoodItem.width) {
            this.resetFoodItem(healthyFoodItem, this.minY, this.maxY);
        }

        // Check for collisions
        if (this.checkCollision(this.p1Tooth, healthyFoodItem)) {
            this.handleCollision(healthyFoodItem);
        }
    }

    //Food stays between teeth background
    if(this.checkCollision(this.junkfood01, this.emptyspaceTop) || this.checkCollision(this.junkfood01, this.emptyspaceBottom)) {
        this.handleCollision(this.junkfood01);
    }

    if(this.checkCollision(this.junkfood02, this.emptyspaceTop) || this.checkCollision(this.junkfood02, this.emptyspaceBottom)) {
        this.handleCollision(this.junkfood02);
    }

    if(this.checkCollision(this.junkfood03, this.emptyspaceTop) || this.checkCollision(this.junkfood03, this.emptyspaceBottom)) {
        this.handleCollision(this.junkfood03);
    }

    if(this.checkCollision(this.healthyfood01, this.emptyspaceTop) || this.checkCollision(this.healthyfood01, this.emptyspaceBottom)) {
        this.handleCollision(this.healthyfood01);
    }

    if(this.checkCollision(this.healthyfood02, this.emptyspaceTop) || this.checkCollision(this.healthyfood02, this.emptyspaceBottom)) {
        this.handleCollision(this.healthyfood02);
    }

    if(this.checkCollision(this.healthyfood03, this.emptyspaceTop) || this.checkCollision(this.healthyfood03, this.emptyspaceBottom)) {
        this.handleCollision(this.healthyfood03);
    }


    this.MouthBackground.tilePositionX += this.backgroundSpeed;  // update tile sprite

    if (keyUP.isDown && !this.checkCollision(this.p1Tooth, this.emptyspaceTop) ) {
        // Move the player sprite up
        this.p1Tooth.setVelocityY(-300);
    } else if (keyDOWN.isDown && !this.checkCollision(this.p1Tooth, this.emptyspaceBottom) ) {
        // Move the player sprite down
        this.p1Tooth.setVelocityY(300); 
    } else {
        // Stop the player sprite if neither UP nor DOWN key is pressed
        this.p1Tooth.setVelocityY(0);
    }

        this.p1Tooth.update();
        this.junkfood01.update();
        this.junkfood02.update();
        this.junkfood03.update();
        this.healthyfood01.update();
        this.healthyfood02.update();
        this.healthyfood03.update();

    // Check for collisions between tooth and junk foods
    if (this.checkCollision(this.p1Tooth, this.junkfood01) ||
    this.checkCollision(this.p1Tooth, this.junkfood02 ) || 
    this.checkCollision(this.p1Tooth, this.junkfood03)) {

    //Play death animation
    this.sound.play('gameover', { volume: 0.2 }); 
    this.p1Tooth.destroy();
    this.p1Tooth = this.physics.add.sprite(this.p1Tooth.x, this.p1Tooth.y, 'toothdeath').setOrigin(0.5, 0);
    this.p1Tooth.setScale(1.6);
    
    //this.sound.stop();
    this.backgroundMusic.stop();
    this.scene.start("gameoverScene");
    
    this.gameOver = true;
    
    }//end of if statement

    // Check for collisions between healthy foods
    if (this.checkCollision(this.p1Tooth, this.healthyfood01)) {
        this.p1Tooth.destroy();
        this.p1Tooth = this.physics.add.sprite(this.p1Tooth.x, this.p1Tooth.y, 'toothhappy').setOrigin(0.5, 0);
        this.p1Tooth.setScale(1.6);
        // Play the sparkle animation
  const sparkle = this.add.sprite(this.healthyfood01.x, this.healthyfood01.y, 'sparkle').setOrigin(0.5, 0.5);
  sparkle.play('sparkle');
         //Score add and repaint
        this.p1Score += 200;
        this.sound.play('itemsfx', { volume: 0.2 }); 
        this.handleCollision(this.healthyfood01); 
    }
    
    // Check if healthyfood02 is out of bounds and reset it
    if (this.checkCollision(this.p1Tooth, this.healthyfood02)) {
        this.p1Tooth.destroy();
        this.p1Tooth = this.physics.add.sprite(this.p1Tooth.x, this.p1Tooth.y, 'toothhappy').setOrigin(0.5, 0);
        this.p1Tooth.setScale(1.6);
        // Play the sparkle animation
  const sparkle = this.add.sprite(this.healthyfood01.x, this.healthyfood01.y, 'sparkle').setOrigin(0.5, 0.5);
  sparkle.play('sparkle');
        //Score add and repaint
        this.p1Score += 100;
        this.sound.play('itemsfx', { volume: 0.2 }); 
        this.handleCollision(this.healthyfood02);
    }

    // Check if healthyfood03 is out of bounds and reset it
    if (this.checkCollision(this.p1Tooth, this.healthyfood03)) {
        this.p1Tooth.destroy();
        this.p1Tooth = this.physics.add.sprite(this.p1Tooth.x, this.p1Tooth.y, 'toothhappy').setOrigin(0.5, 0);
        this.p1Tooth.setScale(1.6);
        // Play the sparkle animation
  const sparkle = this.add.sprite(this.healthyfood01.x, this.healthyfood01.y, 'sparkle').setOrigin(0.5, 0.5);
  sparkle.play('sparkle');
        //Score add and repaint
        this.p1Score += 150;
        this.sound.play('itemsfx', { volume: 0.2 }); 
        this.handleCollision(this.healthyfood03);
    }//End of check for out of bounds

    //Makes sure all food doesn't overlap when they spawn
    if (this.checkCollision(this.junkfood01, this.junkfood02) || 
        this.checkCollision(this.junkfood01, this.junkfood03) || 
        this.checkCollision(this.junkfood01, this.healthyfood01) || 
        this.checkCollision(this.junkfood01, this.healthyfood02) ||
        this.checkCollision(this.junkfood01, this.healthyfood03))
        {
        this.handleCollision(this.junkfood01);
        }

        if (this.checkCollision(this.junkfood02, this.junkfood03) || 
        this.checkCollision(this.junkfood02, this.healthyfood01) || 
        this.checkCollision(this.junkfood02, this.healthyfood02) ||
        this.checkCollision(this.junkfood02, this.healthyfood03))
        {
        this.handleCollision(this.junkfood02);
        }

        if (this.checkCollision(this.junkfood03, this.healthyfood01) || 
        this.checkCollision(this.junkfood03, this.healthyfood02) || 
        this.checkCollision(this.junkfood03, this.healthyfood03))
        {
        this.handleCollision(this.junkfood03);
        }

        if (this.checkCollision(this.healthyfood01, this.healthyfood02) ||
        this.checkCollision(this.healthyfood01, this.healthyfood03))
        {
        this.handleCollision(this.healthyfood01);
        }

        if (this.checkCollision(this.healthyfood02, this.healthyfood03)) 
        {
        this.handleCollision(this.healthyfood02);
        }//End of food overlapping collision

    }//gameOver

    }//End of update method

    //Reset method for foodItem
    resetFoodItem(foodItem) {
        // Reposition the food item to the right side of the screen
        foodItem.x = game.config.width + borderUISize * 6;
        foodItem.y = Phaser.Math.Between(this.minY, this.maxY);
    }

}//End of class