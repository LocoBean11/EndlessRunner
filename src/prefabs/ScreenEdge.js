class ScreenEdge extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity) { 
        super(scene, game.config.width + junkFoodwidth, Phaser.Math.Between(junkFoodHeight/2, game.config.height - junkFoodHeight/2), 'junkFood' );
        
        this.parentScene = scene;
     
        
     // set up physics sprite
     this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
     this.parentScene.physics.add.existing(this);    // add to physics system
     this.setVelocityX(velocity);            // make it go!
     this.setImmovable();                    
     this.tint = Math.random() * 0xFFFFFF;   // randomize tint
     this.ScreenEdge = true;                 // custom property to control barrier spawning
 }

 update() {
     // add new barrier when existing barrier hits center X
     if(this.newScreenEdge && this.x < centerX) {
         // (recursively) call parent scene method from this context
         this.parentScene.addScreenEdge(this.parent, this.velocity);
         this.ScreenEdge = false;
     }

     // destroy food if it reaches the left edge of the screen
     if(this.x < -this.width) {
         this.destroy();
     }
    }
}
