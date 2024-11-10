import Phaser from "phaser";

class obstacles extends Phaser.Scene {
    constructor() {
        super({key: "Obstacles"});
        this.obstacle1 = null;
    }

    preload() {
        this.load.spritesheet("fireObs", "src/assets/obstacles/FireObstacle.png", {
            frameWidth: 100,
            frameHeight: 100,
        });
        this.load.spritesheet("bonesObs", "src/assets/obstacles/BonesObstacle.png", {
            frameWidth: 150,
            frameHeight: 150,
        });
    }

    create() {
        this.obstacle1 = this.physics.add.sprite(650, 340, "fireObs");
        this.obstacle2 = this.physics.add.sprite(250, 580, "fireObs");
        this.obstacle3 = this.physics.add.sprite(250, 115, "bonesObs");
        this.obstacle4 = this.physics.add.sprite(600, 600, "bonesObs");

        this.obstacle1.setBounce(0.2);
        this.obstacle1.setScale(1)
        this.obstacle1.body.setAllowGravity(false);
        this.obstacle1.setCollideWorldBounds(true);
        this.obstacle2.setBounce(0.2);
        this.obstacle2.setScale(1)
        this.obstacle2.body.setAllowGravity(false);
        this.obstacle2.setCollideWorldBounds(true);
        this.obstacle3.setBounce(0.2);
        this.obstacle3.setScale(.75)
        this.obstacle3.body.setAllowGravity(false);
        this.obstacle3.setCollideWorldBounds(true);
        this.obstacle4.setBounce(0.2);
        this.obstacle4.setScale(.75)
        this.obstacle4.body.setAllowGravity(false);
        this.obstacle4.setCollideWorldBounds(true);

        this.anims.create({
            key: "fire",
            frames: this.anims.generateFrameNumbers("fireObs", {start: 0, end: 4}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "bones",
            frames: this.anims.generateFrameNumbers("bonesObs", {start: 0, end: 10}),
            frameRate: 8,
            repeat: -1
        })

        this.obstacle1.anims.play("fire", true);
        this.obstacle2.anims.play("fire", true);
        this.obstacle3.anims.play("bones", true);
        this.obstacle4.anims.play("bones", true);

    }
}

export default obstacles;