import React from "react";
import Phaser from "phaser";

class BackGroundScene extends Phaser.Scene {
  constructor() {
    super({ key: "BackgroundScene" });
  }
  preload() {
    this.load.image("sceneImage", "backgroundScene/backScene.png");
    this.load.image("BackLayer", "backgroundScene/Background_1.png");
  }

  create() {
    const { width, height } = this.scale; //retrieve the width and height of the screen to scale the image
    //add background image + back layer at set position
    const BackgroundImage = this.add
      .image(width / 2, height / 2, "sceneImage")
      .setOrigin(0.5, 0.5);
    const BackgroundLayer = this.add
      .image(width / 2, height / 2, "BackLayer")
      .setOrigin(0.5, 0.45);
    BackgroundImage.setDisplaySize(width, height);
    BackgroundLayer.setDisplaySize(width, height);
    //Get image dimensions and convert it to window image without distortion
    const orgWidth = BackgroundImage.width;
    const orgHeight = BackgroundImage.height;
    const scaleX = width / orgWidth;
    const scaleY = height / orgHeight;
    const scale = Math.max(scaleX, scaleY);
    //Apply scale to image
    BackgroundImage.setScale(scale).setScrollFactor(0);
  }
}
export default BackGroundScene;
