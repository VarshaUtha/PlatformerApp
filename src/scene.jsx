import Phaser from "phaser";

class Lvl1 extends Phaser.Scene {
  constructor() {
    super({ key: "lvl1" });
    this.Platforms = null;
  }

  preload() {
    //load image for platform cubes
    this.load.image("cube1", "platformCubes/bones.png");
    this.load.image("cube2", "platformCubes/nobones.png");
  }

  create() {
    const PlatformWidth = 90; //width of each platform segment
    const ScreenWidth = this.cameras.main.width; // get screen width
    let XPos = 0; //starting position on the x-axis

    /*loop to create platforms across the entire screen width */
    while (XPos <= ScreenWidth) {
      this.Platforms = this.physics.add.staticGroup(); //create the platform and set its position
      //alternate between cube1 and cube2
      const PlatformKey = (XPos / PlatformWidth) % 5 === 0 ? "cube1" : "cube2";
      //creates platform; (x, y, cubePattern set prior)
      this.Platforms.create(XPos, this.cameras.main.height + 0, PlatformKey)
        .setOrigin(0.5, 0.65)
        .setScale(0.7)
        .refreshBody();
      this.Platforms.create(XPos + 400, 425, PlatformKey)
        .setScale(0.7)
        .refreshBody();
      this.Platforms.create(XPos - 400, 190, PlatformKey)
        .setScale(0.7)
        .refreshBody();
      //move the xpos by the width of the platform
      XPos += PlatformWidth;
    }
    
  }

  getPlatforms(){
    return this.Platforms;
  }
};

export default Lvl1;
