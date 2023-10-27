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
    scene: [ Load, Title, Play, GameOver ]
    }
        //define game
    let game = new Phaser.Game(config);