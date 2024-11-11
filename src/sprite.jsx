import Phaser from "phaser";

class Sprites extends Phaser.Scene {
  constructor() {
    super({ key: "Sprites" });
    this.player = null;
  }

  preload() {
    // Load the running and idle spritesheets
    this.load.spritesheet("DudeIdle", "src/assets/sprites/playableIdle.PNG", {
      frameWidth: 150,
      frameHeight: 150,
    });

  }
  
  create() {
    this.player = this.physics.add.sprite(100, 450, "DudeIdle"); //sets character to spawn at start at the given x, y coordinates
    this.player.setBounce(0.2);
    this.player.body.setGravityY(300);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("DudeIdle", { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1,
    });

    this.player.anims.play("idle", true);
  }
}

export default Sprites;
