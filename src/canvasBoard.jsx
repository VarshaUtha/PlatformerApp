import React, { useRef, useEffect } from "react";
import Phaser from "phaser";
import Lvl1 from "./scene";
import BackGroundScene from "./backGroundScene";
import Sprites from "./sprite";
import obstacles from "./obstacles";

const PhaserGame = () => {
  const gameRef = useRef(null); //hold the reference for the <div> where Phaser will insert the game canvas

  //useEffect = runs code
  useEffect(() => {
    const config = {
      type: Phaser.AUTO /* tell phaser to choose the best rendering option based on browser's capability; will fall back to Canvas if WebGL not available */,
      width: 900,
      height: 700,
      backgroundColor: "#3e5f4c",
      parent: gameRef.current, //property specifies HTML element to attach the Phaser canvas to
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
          gravity: { y: 300 },
        },
      },
      scene: [
        {
          preload: function () {
            this.scene.launch("lvl1");
            this.scene.launch("BackgroundScene");
            this.scene.launch("Sprites");
            this.scene.launch("Obstacles");
          },
        },
        BackGroundScene,
        Lvl1,
        Sprites,
        obstacles
      ],
    };
    const game = new Phaser.Game(config); //initializes the game with the specified configuration setting up the rendering context, scenes etc.

    return () => {
      game.destroy(true); //function will run on unmount and game instance will be destoryed (frees memory and prevents bugs/errors)
    };
  }, []); //[] array shows number of times the window will mount; in this case once and unmount (with clean up) once closed

  return <div ref={gameRef}></div>; //provides specific location in DOM for the Phaser game to render
};

export default PhaserGame;
