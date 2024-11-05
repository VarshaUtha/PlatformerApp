import React, {useRef, useEffect} from 'react';
import Phaser from 'phaser';
import Lvl1 from './scene';

const PhaserGame = () => {
    const gameRef = useRef(null); //hold the reference for the <div> where Phaser will insert the game canvas

    //useEffect = runs code 
    useEffect(() => {
        const config = {
            type: Phaser.AUTO, /* tell phaser to choose the best rendering option based on browser's capability; will fall back to Canvas if WebGL not available */
            width: 900,
            height: 700,
            backgroundColor: "#3e5f4c",
            parent: gameRef.current, //property specifies HTML element to attach the Phaser canvas to
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true
                }
            },
            scene: [{ /* Phaser uses scenes to manage different parts of the game (loading screen, main gameplay, game over) */
                key: 'BackgroundScene',
                preload: function () {
                    this.load.image('sceneImage', 'backgroundScene/backScene.png');
                    this.load.image('BackLayer', 'backgroundScene/Background_1.png')
                }, 

                create: function () {
                    const {width, height} = this.scale; //retrieve the width and height of the screen to scale the image
                    //add background image + back layer at set position
                    const BackgroundImage = this.add.image(width/2, height/2, 'sceneImage').setOrigin(0.5, 0.5); 
                    const BackgroundLayer = this.add.image(width/2, height/2, 'BackLayer').setOrigin(0.5, 0.45); 
                    BackgroundImage.setDisplaySize(width, height);
                    BackgroundLayer.setDisplaySize(width, height);
                    //Get image dimensions and convert it to window image without distortion
                    const orgWidth = BackgroundImage.width;
                    const orgHeight = BackgroundImage.height;
                    const scaleX = width/orgWidth;
                    const scaleY = height/orgHeight;
                    const scale = Math.max(scaleX, scaleY);
                    //Apply scale to image
                    BackgroundImage.setScale(scale).setScrollFactor(0);

                    this.scene.launch('Lvl1');
                },
                update: function () {} 
                },
                Lvl1,
            ],
        };
        const game = new Phaser.Game(config); //initializes the game with the specified configuration setting up the rendering context, scenes etc. 


        return () => {
            game.destroy(true); //function will run on unmount and game instance will be destoryed (frees memory and prevents bugs/errors)
        };

    }, []); //[] array shows number of times the window will mount; in this case once and unmount (with clean up) once closed

    return <div ref={gameRef}></div> //provides specific location in DOM for the Phaser game to render
};

export default PhaserGame;