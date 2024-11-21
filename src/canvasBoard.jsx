import React, { useRef, useEffect } from "react";
import Phaser from "phaser";
import BackGroundScene from "./backGroundScene";
import Sprites from "./sprite";
import obstacles from "./obstacles";

const PhaserGame = () => {
  const gameRef = useRef(null); //hold the reference for the <div> where Phaser will insert the game canvas

  //useEffect = runs code
  useEffect(() => {
    const config = {
      type: Phaser.AUTO /* tell phaser to choose the best rendering option based on browser's capability; will fall back to Canvas if WebGL not available */,
      width: 1000,
      height: 1000,
      backgroundColor: "blue",
      parent: gameRef.current, //property specifies HTML element to attach the Phaser canvas to
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
          gravity: { y: 300 },
          checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true,
          },
        },
      },
      scale: {},
      dom: {
        createContainer: true,
      },
      scene: [
        {
          preload: function () {
            this.scene.launch("BackgroundScene");
            this.scene.launch("Sprites");
            this.scene.launch("Obstacles");
          },
        },
        BackGroundScene,
        Sprites,
        obstacles,
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
