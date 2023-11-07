    //Aaron Rodriguez
    //Game Title: Toothache
    //Appoximate hours spent: 35
    //The music speeds up to match the increasingly frantic pace of the game
    //The player controls an expressive and animated tooth in an interesting and unusual environment for an endless runner

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
    scene: [ Title, Instructions, Credits, Play, GameOver ]
    }

        //define game
    let game = new Phaser.Game(config);

    // define globals
    const textSpacer = 64;
    let p1Tooth = null;
    let highScore;
    let newHighScore = false;
    //let cursors;

    // set UI sizes
    let borderUISize = game.config.height / 15;
    let borderPadding = borderUISize / 3;

    let keyUP, keyDOWN;