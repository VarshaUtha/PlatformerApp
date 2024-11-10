import Phaser from "phaser";
import Lvl1 from "./scene";

class Sprites extends Phaser.Scene {
  constructor() {
    super({ key: "Sprites" });
    this.player = null; // Declare player variable
    this.cursors = null;
    this.Platforms = getPlatforms();
  }

  preload() {
    // Load the running and idle spritesheets
    this.load.spritesheet("DudeIdle", "src/assets/sprites/playableIdle.PNG", {
      frameWidth: 150,
      frameHeight: 150,
    });

    this.load.spritesheet("dudeRun", "src/assets/sprites/playableRun.png", {
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

    this.anims.create({
      key: "runLeft",
      frames: this.anims.generateFrameNumbers("dudeRun", { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "runRight",
      frames: this.anims.generateFrameNumbers("dudeRun", { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1,
    });

    this.player.anims.play("idle", true);
    this.physics.add.collider(this.player, this.Platforms);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-180);
      this.player.anims.play("runLeft", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(180);
      this.player.anims.play("runRight", true);
      this.player.flipX = true;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("idle");
    }
  }
}

export default Sprites;
