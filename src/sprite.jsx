import Phaser from "phaser";

class Sprites extends Phaser.Scene {
  constructor() {
    super({ key: "Sprites" });
    this.player = null;
    this.cursors = null;
  }

  preload() {
    // Load the running and idle spritesheets
    this.load.spritesheet("DudeIdle", "src/assets/sprites/playableIdle.PNG", {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet("dudeRun", "src/assets/sprites/playableRun.PNG", {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet("dudeJump", "src/assets/sprites/playableJump.PNG",{
      frameWidth: 150,
      frameHeight: 150
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
    this.anims.create({
      key: "jump",
      frames: [{key: "dudeJump", frame: 0}],
      frameRate: 20
    });
    this.anims.create({
      key: "fall",
      frames: [{key: "dudeJump", frame: 1}],
      frameRate: 20
    });
    this.anims.create({
      key: "jumpOnly",
      frames: [{key: "dudeJump", frame: 2}],
      frameRate: 20
    });

    this.player.body.setGravityY(400);

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

  }

  update() {
    if (this.keyA.isDown) {
      this.player.setVelocityX(-180);
      this.player.anims.play("runLeft", true);
      this.player.flipX = false;
    } else if (this.keyD.isDown) {
      this.player.setVelocityX(180);
      this.player.anims.play("runRight", true);
      this.player.flipX = true;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("idle", true);
    };

    if(this.keyW.isDown){
      this.player.setVelocityY(-300);
      this.player.anims.play("jumpOnly");
    }

     if (this.keyW.isDown && this.keyD.isDown) {
      this.player.setVelocityY(-300);
      this.player.anims.play("jump");
      this.player.flipX = false;
    }else if (this.keyW.isDown && this.keyA.isDown){
      this.player.setVelocity(-300);
      this.player.anims.play("jump");
      this.player.flipX = true;
    }else if(this.keyS.isDown && this.keyD.isDown){
      this.player.setVelocityY(300);
      this.player.anims.play("fall");
      this.player.flipX = false;
    }else if (this.keyS.isDown && this.keyA.isDown){
      this.player.setVelocityY(300);
      this.player.anims.play("fall");
      this.player.flipX = true;
    }
  } 
}
export default Sprites;
