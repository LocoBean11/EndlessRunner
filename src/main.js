    //Aaron Rodriguez

    let config = {
        type: Phaser.CANVAS,
        width: 640,
        height: 480,
        scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Play ]
    }
        //define game
    let game = new Phaser.Game(config);

    // define globals
    //let centerX = game.config.width/2;
    //let centerY = game.config.height/2;
    //let w = game.config.width;
    //let h = game.config.height;
    const textSpacer = 64;
    let p1Tooth = null;
    //const paddleWidth = 16;
    //const paddleHeight = 128;
    //const paddleVelocity = 150;
    //let level;
    let highScore;
    let newHighScore = false;
    //let cursors;

    // set UI sizes
    let borderUISize = game.config.height / 15;
    let borderPadding = borderUISize / 3;

    let keyUP, keyDOWN;