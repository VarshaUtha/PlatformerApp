import Phaser from "phaser";

class Lvl1 extends Phaser.Scene {
    constructor(){
        super({key: 'Lvl1'});
    }
    preload() {
        //load image for platform cubes
        this.load.image('cube1', 'platformCubes/bones.png');
        this.load.image('cube2', 'platformCubes/nobones.png');
    }
    create() {
        const PlatformWidth = 90; //width of each platform segment
        const ScreenWidth = this.cameras.main.width; // get screen width
        let XPos = 0; //starting position on the x-axis
        //create the platform and set its position
        const Platforms = this.physics.add.staticGroup();
        /*loop to create platforms across the entire screen width */
        while (XPos < ScreenWidth){
            //alternate between cube1 and cube2 
            const PlatformKey = (XPos / PlatformWidth) % 5 === 0 ? 'cube1' : 'cube2';
            //creates platform; (x, y, cubePattern set prior)
            Platforms.create(XPos, this.cameras.main.height + 0, PlatformKey).setOrigin(0.3, 0.65).setScale(.80).refreshBody();
            Platforms.create(XPos + 400, 400, PlatformKey).setScale(.70).refreshBody();
            Platforms.create(XPos - 400, 180, PlatformKey).setScale(.70).refreshBody();
            //move the xpos by the width of the platform
            XPos += PlatformWidth;           
        }
        
    }
}

export default Lvl1;