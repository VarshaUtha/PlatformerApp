import Phaser from "phaser";

class Sprites extends Phaser.Scene {
  constructor() {
    super({ key: "Sprites" });
    
    this.cursors = null;
    this.Platforms = null;
    this.obstacles = null;
    this.camera = null;
    this.jumpCount = 0;
  }

  preload() {
    this.load.image("cube1", "src/assets/platformCubes/bones.PNG");
    this.load.image("cube2", "src/assets/platformCubes/nobones.PNG");
    this.load.image("endLevel", "src/assets/obstacles/NextLevelPole.PNG");
    this.load.spritesheet("enemy1", "src/assets/sprites/Enemy2Idle.png", {
      frameWidth: 150,
      frameHeight: 150
    });
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

    this.load.spritesheet("dudeCelebrate", "src/assets/sprites/playableCelebrate.PNG", {
      frameWidth: 100,
      frameHeight: 150
    });
  }

  create() {
    const PlatformWidth = 100; //width of each platform segment
    const ScreenWidth = 1920 * 2; // get screen width

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
      XPos += PlatformWidth;
    }

    let TopXPos = 0;
    while (TopXPos <= ScreenWidth/4){
      const TopPlatformKey = (TopXPos / PlatformWidth) % 5 === 0 ? "cube1" : "cube2";
      this.Platforms.create(TopXPos + 500, this.cameras.main.height - 550, TopPlatformKey).setImmovable(true).refreshBody();
      TopXPos += PlatformWidth;
    }


    this.endLevelPole = this.physics.add.sprite(1900*2, 500, "endLevel").setCollideWorldBounds(true).refreshBody();
    this.obstacle1 = this.physics.add.sprite(780, 370, "fireObs");
    this.obstacle2 = this.physics.add.sprite(2600, 870, "fireObs");
    this.obstacle3 = this.physics.add.sprite(1600, 870, "bonesObs");
    this.obstacle4 = this.physics.add.sprite(600, 880, "bonesObs");
    this.enemy1 = this.physics.add.sprite(1200, 150, "enemy1");
    this.enemy2 = this.physics.add.sprite(3000, 500, "enemy1");
    
    this.enemies = [this.enemy1, this.enemy2];
    this.enemyGroup = this.physics.add.group();
    this.enemies.forEach((enemies) => {
      enemies.setBounce(0.2);
      enemies.setImmovable(true);
      enemies.setCollideWorldBounds(true);
      enemies.setScale(1);
      enemies.body.setAllowGravity(false);
    });

    this.obstacles = [this.obstacle1, this.obstacle2,this.obstacle3, this.obstacle4];
    this.obstacleGroup = this.physics.add.group();
    this.obstacles.forEach((obstacles) => {
      obstacles.setBounce(0.2);
      obstacles.setImmovable(true);
      obstacles.setCollideWorldBounds(true);
      obstacles.setScale(0.85);
      obstacles.body.setAllowGravity(false);
    });

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
      key: "enemy1_idle",
      frames: this.anims.generateFrameNumbers("enemy1", {start: 0, end: 3}),
      frameRate: 8,
      repeat: -1
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
      repeat: -1
    });
    
    this.anims.create({
      key: "celebrate",
      frames: this.anims.generateFrameNumbers("dudeCelebrate", {start: 0, end: 3}),
      frameRate: 8,
      repeat: -1
    });

    this.obstacle1.anims.play("fire", true);
    this.obstacle2.anims.play("fire", true);
    this.obstacle3.anims.play("bones", true);
    this.obstacle4.anims.play("bones", true);
    this.enemy1.anims.play("enemy1_idle", true);
    this.enemy2.anims.play("enemy1_idle", true);

    this.player = this.physics.add.sprite(100, 450, "DudeIdle"); //sets character to spawn at start at the given x, y coordinates
    this.player.body.setGravityY(300);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.jumpCount = 0;

    this.physics.add.collider(this.Platforms, this.endLevelPole);
    this.physics.add.collider(this.player, this.Platforms);
    this.physics.add.collider(this.player, this.endLevelPole, (player, endLevelPole) =>{
      player.anims.play("celebrate", true);
    });
    this.physics.add.collider(this.player, this.obstacles, (player, obstacles) =>{
      console.log("player has been hurt");
      player.anims.play("hurt", true);
    });
    this.physics.add.collider(this.player, this.enemies, (player, enemies)=>{
      player.anims.play("hurt", true);
    })

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

    this.cameras.main.setBounds(0, 0, 1920 * 2, 1000);
    this.physics.world.setBounds(0, 0, 1920 * 2, 1000); 
    this.cameras.main.startFollow(this.player, true);
  }

  update() {

    if (this.keyA.isDown) {
      this.player.setVelocityX(-400);
      this.player.anims.play("runLeft", true);
      this.player.flipX = false;
    } else if (this.keyD.isDown) {
      this.player.setVelocityX(400);
      this.player.anims.play("runRight", true);
      this.player.flipX = true;
    } else {
      this.player.setVelocityX(0);
    }

    const isJumpJustDown = Phaser.Input.Keyboard.JustDown(this.keyW);

    if (isJumpJustDown && (this.player.body.touching.down || this.jumpCount < 2)) {
      this.player.setVelocityY(-600);
      ++this.jumpCount;
      console.log(this.player.jumpCount);
    }

    if(this.player.body.touching.down && !isJumpJustDown){
      this.jumpCount = 0;
    }

    if (this.keyS.isDown && this.keyD.isDown) {
      this.player.setVelocityY(600);
      this.player.anims.play("fall");
      this.player.flipX = false;
    } else if (this.keyS.isDown && this.keyA.isDown) {
      this.player.setVelocityY(600);
      this.player.anims.play("fall");
      this.player.flipX = true;
    }

    if (this.keyJ.isDown){
      if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'attack') {
        this.player.anims.play("attack", true); // Restart animation when pressing J
        console.log("Player is attacking");
      }
    }
  }
}

export default Sprites;
