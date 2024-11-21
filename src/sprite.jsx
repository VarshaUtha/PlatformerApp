import Phaser from "phaser";
import obstacles from "./obstacles";

class Sprites extends Phaser.Scene {
  constructor() {
    super({ key: "Sprites" });
    this.player = null;
    this.cursors = null;
    this.Platforms = null;
    this.obstacleScene = null;
    this.camera = null;
  }

  preload() {
    this.load.image("cube1", "platformCubes/bones.PNG");
    this.load.image("cube2", "platformCubes/nobones.PNG");
    // Load the running and idle spritesheets
    this.load.spritesheet("DudeIdle", "src/assets/sprites/playableIdle.PNG", {
      frameWidth: 76.6,
      frameHeight: 150,
    });
    this.load.spritesheet("dudeRun", "src/assets/sprites/playableRun.PNG", {
      frameWidth: 120,
      frameHeight: 150,
    });
    this.load.spritesheet("dudeJump", "src/assets/sprites/playableJump.PNG", {
      frameWidth: 100,
      frameHeight: 150,
    });
    this.load.spritesheet("dudeAttack", "src/assets/sprites/playableAttack.PNG", {
      frameWidth: 120,
      frameHeight: 150,
      spacing: 2,
    });
    this.load.spritesheet("dudeHurt", "src/assets/sprites/playableHurt.PNG", {
      frameWidth: 120,
      frameHeight: 150,
    });
  }

  create() {
    const PlatformWidth = 100; //width of each platform segment
    const ScreenWidth = this.cameras.main.width; // get screen width
    let XPos = 0; //starting position on the x-axis
    this.Platforms = this.physics.add.staticGroup(); //create the platform and set its position
    /*loop to create platforms across the entire screen width */
    while (XPos <= ScreenWidth) {
      //alternate between cube1 and cube2
      const PlatformKey = (XPos / PlatformWidth) % 5 === 0 ? "cube1" : "cube2";

      //creates platform; (x, y, cubePattern set prior)
      this.Platforms.create(XPos, this.cameras.main.height - 50, PlatformKey)
        .setOrigin(0, 0.5)
        .setImmovable(true)
        .setScale(1)
        .refreshBody();
      this.Platforms.create(XPos + 400, 500, PlatformKey)
        .setOrigin(0, 0)
        .setImmovable(true)
        .setScale(1)
        .refreshBody();
      this.Platforms.create(XPos - 500, 250, PlatformKey)
        .setOrigin(0.5, 0.65)
        .setImmovable(true)
        .setScale(1)
        .refreshBody();
      //move the xpos by the width of the platform
      XPos += PlatformWidth;
    }

    this.player = this.physics.add.sprite(100, 450, "DudeIdle"); //sets character to spawn at start at the given x, y coordinates
    this.player.body.setGravityY(250);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.Platforms);

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("DudeIdle", { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "runLeft",
      frames: this.anims.generateFrameNumbers("dudeRun", { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "runRight",
      frames: this.anims.generateFrameNumbers("dudeRun", { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: [{ key: "dudeJump", frame: 2 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "fall",
      frames: [{ key: "dudeJump", frame: 0 }],
      frameRate: 20,
    });

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    }
 
  update() {
    if (this.keyA.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("runLeft", true);
      this.player.flipX = false;
    } else if (this.keyD.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("runRight", true);
      this.player.flipX = true;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("idle", true);
    }

    if (this.keyW.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-400);
    } else if (this.keyS.isDown && this.keyD.isDown) {
      this.player.setVelocityY(200);
      this.player.anims.play("fall");
      this.player.flipX = false;
    } else if (this.keyS.isDown && this.keyA.isDown) {
      this.player.setVelocityY(200);
      this.player.anims.play("fall");
      this.player.flipX = true;
    }
  }

}
export default Sprites;
