import Phaser from "phaser";

class Sprites extends Phaser.Scene {
  constructor() {
    super({ key: "Sprites" });
    this.player = null;
    this.cursors = null;
    this.Platforms = null;
    this.obstacles = null;
    this.camera = null;
  }

  preload() {
    this.load.image("cube1", "src/assets/platformCubes/bones.PNG");
    this.load.image("cube2", "src/assets/platformCubes/nobones.PNG");
    this.load.spritesheet("fireObs", "src/assets/obstacles/FireObstacle.png", {
      frameWidth: 50,
      frameHeight: 90,
    });
    this.load.spritesheet("bonesObs", "src/assets/obstacles/BonesObstacle.png", {
        frameWidth: 150,
        frameHeight: 90,
    });
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
      frameWidth: 132.5,
      frameHeight: 150,
    });
    this.load.spritesheet("dudeHurt", "src/assets/sprites/playableHurt.PNG", {
      frameWidth: 110,
      frameHeight: 150
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

    this.obstacle1 = this.physics.add.sprite(680, 470, "fireObs");
    this.obstacle2 = this.physics.add.sprite(240, 870, "fireObs");
    this.obstacle3 = this.physics.add.sprite(250, 165, "bonesObs");
    this.obstacle4 = this.physics.add.sprite(600, 880, "bonesObs");

    this.obstacles = [this.obstacle1, this.obstacle2, this.obstacle3, this.obstacle4];
    this.obstacleGroup = this.physics.add.group();
    this.obstacles.forEach((obstacles) => {
      obstacles.setBounce(0.2);
      obstacles.setImmovable(true);
      obstacles.setCollideWorldBounds(true);
      obstacles.setScale(0.85);
      obstacles.body.setAllowGravity(false);
    });

    this.player = this.physics.add.sprite(100, 450, "DudeIdle"); //sets character to spawn at start at the given x, y coordinates
    this.player.body.setGravityY(250);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //ObstacleAnimations
    this.anims.create({
      key: "fire",
      frames: this.anims.generateFrameNumbers("fireObs", { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "bones",
      frames: this.anims.generateFrameNumbers("bonesObs", {start: 0, end: 9}),
      frameRate: 8,
      repeat: -1,
    });
    //CharacterAnimations
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
      key: "fall",
      frames: [{ key: "dudeJump", frame: 0 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("dudeAttack", {start: 0, end: 3}),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "hurt",
      frames: this.anims.generateFrameNumbers("dudeHurt", {start: 0, end: 5}),
      frameRate: 8,
      repeat: 2
    });

    this.obstacle1.anims.play("fire", true);
    this.obstacle2.anims.play("fire", true);
    this.obstacle3.anims.play("bones", true);
    this.obstacle4.anims.play("bones", true);

    this.physics.add.collider(this.player, this.Platforms);
    this.physics.add.collider(this.player, this.obstacles, (player, obstacles) => {
          player.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            player.anims.play("hurt");
        });
        console.log("Player was hurt.");
    });

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 *2);
    this.physics.world.setBounds(0, 0 , 1920 * 2, 1080 *2);
    this.cameras.main.startFollow(this.player, true);
    
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

    var canDoubleJump = this.player.jumpCount > 2;

    if (this.keyW.isDown && this.player.body.touching.down || canDoubleJump) {
      this.player.jumpCount++;
      this.player.setVelocityY(-600);
    } else if (this.keyS.isDown && this.keyD.isDown) {
      this.player.setVelocityY(600);
      this.player.anims.play("fall");
      this.player.flipX = false;
    } else if (this.keyS.isDown && this.keyA.isDown) {
      this.player.setVelocityY(600);
      this.player.anims.play("fall");
      this.player.flipX = true;
    }

    if (this.keyJ.isDown){
      this.player.setVelocityX(50);
      this.player.anims.play("hurt", true);
    }
  }
}

export default Sprites;
